<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <div style="height: 220px"></div>
          <div v-if="$vuetify.breakpoint.xs" class="container">
            <h3 id="title">第49回星陵祭は終了しました。</h3>
            <h3 id="title">お越しいただき、本当にありがとうございました。</h3>
          </div>
          <div v-else class="container">
            <h2 id="title">第49回星陵祭は終了しました。</h2>
            <h2 id="title">お越しいただき、本当にありがとうございました。</h2>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { toDataURL as getQRCodeDataUrl } from 'qrcode'
import { Event, Group, Ticket } from 'types/quaint'
import Vue from 'vue'
type TicketInfo = {
  group: Group
  event: Event
  ticket: Ticket
  qrcode: string
}
type Data = {
  nowloading: boolean
  groups: Group[]
  events: Event[]
  tickets: TicketInfo[]
  cancel_dialog: boolean
  selected_ticket: TicketInfo | null
  // template内の実装で該当部分を削除したため不要
  // display_userid: boolean
  qrcode_url: string
  success_alert: boolean
  error_alert: boolean
  success_message: string
  error_message: string
  time: string
  seconds: string
  now_loading: boolean
  user_groups: {
    admin: string
    entry: string
    owner: string
    parents: string
    students: string
    teachers: string
    chief: string
    guest: string
  }
}
export default Vue.extend({
  name: 'UsersTicketsPage',
  async asyncData() {},
  data(): Data {
    return {
      nowloading: true,
      groups: [],
      events: [],
      tickets: [],
      cancel_dialog: false,
      selected_ticket: null,
      // template内の実装で該当部分を削除したため不要
      // display_userid: false,
      qrcode_url: '',
      success_alert: false,
      error_alert: false,
      success_message: '',
      error_message: '',
      time: '',
      seconds: '',
      now_loading: true,
      user_groups: {
        admin: process.env.AZURE_AD_GROUPS_QUAINT_ADMIN as string,
        entry: process.env.AZURE_AD_GROUPS_QUAINT_ENTRY as string,
        owner: process.env.AZURE_AD_GROUPS_QUAINT_OWNER as string,
        parents: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS as string,
        students: process.env.AZURE_AD_GROUPS_QUAINT_STUDENTS as string,
        teachers: process.env.AZURE_AD_GROUPS_QUAINT_TEACHERS as string,
        chief: process.env.AZURE_AD_GROUPS_QUAINT_CHIEF as string,
        guest: process.env.AZURE_AD_GROUPS_QUAINT_GUEST as string,
      },
    }
  },
  head: {
    title: '整理券',
  },
  async created() {
    try {
      if (this.$auth.$state.strategy === 'ad') {
        this.qrcode_url = await getQRCodeDataUrl(this.$auth.user?.oid as string)
      } else {
        this.qrcode_url = await getQRCodeDataUrl(this.$auth.user?.sub as string)
      }
    } catch {}
    // 500msごとに現在時刻を取得
    // setInterval(this.getNow, 500)

    this.nowloading = false
  },

  methods: {
    // 現在時刻を取得
    // 現在時刻を取得するとv-progress-linearが正常に動作しないため非表示
    /*
    getNow: function () {
      const today = new Date()
      const date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate()
      const time = today.getHours() + ':' + today.getMinutes()
      const dateTime = date + ' ' + time + ':'
      const seconds = today.getSeconds()
      this.time = dateTime
      this.seconds = seconds + ''
    },
    */

    // upNext（開演X分前から終演時刻まで）かどうかを判定するmethod
    // 引数には（開演時刻，終演時刻）を代入
    isUpNext: function (start: Date, end: Date) {
      const date = new Date()
      // 現在時刻を取得
      const current_time: Date = new Date(date.getTime())
      // 開演20分前の時刻を計算する
      const minutes_before_start = new Date(start.getTime() - 1000 * 60 * 20)

      // 「 開演20分前<現在時刻」かつ「現在時刻<終演時刻」を判定
      if (minutes_before_start < current_time && current_time < end) {
        return true
      } else {
        return false
      }
    },

    isEventEnds: function (end: Date) {
      const date = new Date()
      const current_time: Date = new Date(date.getTime())

      if (end < current_time) {
        return true
      }
      return false
    },

    // 整理券が使用済みか
    // 今年はQRコードの利用を完全に信用されていない関係で時間でも判定されるようになっている
    isUsed: function (ticket_info: TicketInfo) {
      const end = new Date(ticket_info.event.ends_at)
      const date = new Date()
      const current_time: Date = new Date(date.getTime())

      // 整理券の状態がused
      if (ticket_info.ticket.status === 'used') {
        return true
      }

      // 「終演時刻<現在時刻」を判定
      if (end < current_time) {
        return true
      }
      return false
    },

    async fetchTicket() {
      const tickets: Ticket[] = await this.$axios.$get('/users/me/tickets')

      const ticket_infos: TicketInfo[] = []
      for (const ticket of tickets) {
        if (ticket.status === 'active' || ticket.status === 'used') {
          const group: Group = await this.$axios.$get(
            '/groups/' + ticket.group_id
          )
          const event: Event = await this.$axios.$get(
            '/groups/' + ticket.group_id + '/events/' + ticket.event_id
          )
          const qrcode = await getQRCodeDataUrl(ticket.id as string)
          const ticket_info: TicketInfo = {
            group,
            event,
            ticket,
            qrcode,
          }
          ticket_infos.push(ticket_info)
        }
      }

      ticket_infos.sort((first, second) => {
        if (
          new Date(first.event.starts_at).getTime() <
          new Date(second.event.starts_at).getTime()
        )
          return -1
        else if (
          new Date(first.event.starts_at).getTime() >
          new Date(second.event.starts_at).getTime()
        )
          return 1
        else return 0
      })
      this.tickets = ticket_infos
      this.now_loading = false
    },
    timeFormatter(input_date: string) {
      const d = new Date(input_date)
      return (
        /*
        d.getMonth() +
        1 +
        '月' +
        d.getDate() +
        '日 ' +
        */
        d.getHours().toString().padStart(2, '0') +
        ':' +
        d.getMinutes().toString().padStart(2, '0')
      )
    },
    dateFormatter(input_date: string) {
      const d = new Date(input_date)
      return d.getMonth() + 1 + '/' + d.getDate()
    },
    selectCancelTicket(ticket_info: TicketInfo) {
      this.cancel_dialog = true
      this.selected_ticket = ticket_info
    },
    async cancelTicket(delete_ticket: TicketInfo) {
      await this.$axios
        .delete(
          '/groups/' +
            delete_ticket.group.id +
            '/events/' +
            delete_ticket.event.id +
            '/tickets/' +
            delete_ticket.ticket.id
        )
        .then(() => {
          this.success_alert = true
          this.success_message = '整理券が正常にキャンセルされました'
        })
        .catch((e) => {
          this.error_alert = true
          this.error_message = e.message
        })
      this.cancel_dialog = false
      this.fetchTicket()
    },
    hashColor(text: string) {
      // group.idを色数で割った余りでデフォルトの色を決定
      const colors = [
        'blue-grey',
        'brown',
        'deep-orange',
        'amber',
        'lime',
        'light-green',
        'teal',
        'cyan',
        'light-blue',
        'indigo',
        'pink',
      ]
      let index = 0
      for (let i = 0; i < text.length; i++) {
        // 文字列をUnicodeの和に変換
        index += text.codePointAt(i) ?? 1
      }
      index = index % colors.length
      return colors[index]
    },
  },
})
</script>
<style>
@keyframes flap {
  0% {
    transform: translateY(0);
  }

  10% {
    transform: translateY(0);
  }

  20% {
    transform: translateY(-10px);
  }

  30% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-20px) rotate(10deg);
  }

  50% {
    transform: translateY(0);
  }
}
</style>
