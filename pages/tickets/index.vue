<template>
  <v-app>
    <div v-if="!nowloading">
      <v-container name="ticket_container">
        <v-row justify="center" align-content="center">
          <v-col cols="12" sm="6" lg="6">
            <!--現在時刻を表示・現在時刻を取得するとv-progress-linearが正常に動作しないため非表示-->
            <!--
            <v-chip v-if="time" label class="ma-1"
              >{{ time }} <span class="text-h5">{{ seconds }} </span></v-chip
            >
            -->

            <!--校内への入場処理が行われていない場合に，入場処理を促すメッセージと処理用のQRコードを表示-->
            <!--ここのデザインをもうちょっと可愛く出来ないかな-->
            <v-card
              v-if="
                !(
                  $auth.user?.jobTitle?.includes('Visited') ||
                  $auth.$state.strategy === 'ad'
                )
              "
            >
              <v-card-title class="text-h5">🥳星陵祭へようこそ！</v-card-title>
              <v-card-subtitle class="text-h6"
                >校門でこの画面をご提示ください。</v-card-subtitle
              >
              <v-card-text
                >※日比谷生の入場手続きは不要です。そのままお待ちください。</v-card-text
              >
              <v-img
                class="mx-auto my-0"
                style="display: block"
                :src="qrcode_url"
                width="90%"
              />
              <!--mx-autoで画像を中央寄せに-->
              <v-card-text
                >User ID:{{ $auth.user?.oid ?? $auth.user?.sub }}</v-card-text
              >
            </v-card>

            <!--整理券未取得の場合に，「探す」タブへ誘導-->
            <v-card
              v-if="
                now_loading == false &&
                tickets.length == 0 &&
                ($auth.user?.jobTitle?.includes('Visited') ||
                  $auth.$state.strategy === 'ad')
              "
              class="ma-1 pa-2"
            >
              <div>
                <v-card-title>まだ整理券を取得していません</v-card-title>
                <v-card-actions>
                  <v-btn :href="'/groups'" block
                    ><v-icon>mdi-magnify</v-icon>公演を探す</v-btn
                  >
                </v-card-actions>
              </div>
            </v-card>

            <!--開場中の整理券がある場合に上部に大きく表示-->
            <div
              v-for="ticket_info in tickets"
              :key="ticket_info.ticket.id"
              focusable
            >
              <v-card
                v-if="
                  isUpNext(
                    new Date(ticket_info.event.starts_at),
                    new Date(ticket_info.event.ends_at)
                  ) && !(ticket_info.ticket.status == 'cancelled')
                "
              >
                <v-card-title class="mb-2"
                  ><v-icon>mdi-ticket</v-icon>整理券
                  <v-spacer></v-spacer>
                  <v-chip color="primary" outlined label
                    ><v-icon>mdi-theater</v-icon>開場中</v-chip
                  ></v-card-title
                >
                <v-card-subtitle
                  >この画面を各クラスの受付に提示してください。</v-card-subtitle
                >
                <v-divider></v-divider>
                <div class="text-truncate">
                  <v-card-title class="text-h7 text-truncate">
                    {{ ticket_info.group.title }}
                  </v-card-title>
                  <v-card-subtitle
                    class="grey--text text--darken-2 text-h5 pb-0 text-truncate"
                  >
                    {{ ticket_info.event.eventname }}</v-card-subtitle
                  >

                  <v-card-subtitle class="pb-0 text-truncate">
                    {{ ticket_info.group.groupname }}<br />
                    ID :{{ ticket_info.ticket.id }}</v-card-subtitle
                  >
                  <div style="display: flex">
                    <v-card-subtitle
                      class="grey--text text--darken-2 text-truncate"
                    >
                      <!--日付：画面がごちゃごちゃするため省略．1日目の整理券を画面収録して2日目に使う人が現れるなどしたら，実装が必要-->
                      <!--
                <span class="text-h3"
                  ><v-icon>mdi-calendar</v-icon
                  >{{ dateFormatter(ticket_info.event.starts_at) }}</span
                >
                -->
                      <!--上演時刻-->
                      <span class="text-h3"
                        ><v-icon>mdi-clock-time-nine</v-icon
                        >{{ timeFormatter(ticket_info.event.starts_at) }}</span
                      >
                      -{{ timeFormatter(ticket_info.event.ends_at) }}
                      <v-spacer></v-spacer>
                      <!--入場人数-->
                      <span class="text-h3"
                        ><v-icon>mdi-account-supervisor</v-icon
                        >{{ ticket_info.ticket.person }}</span
                      >人
                    </v-card-subtitle>
                    <v-spacer></v-spacer>
                    <ToolsMagicLamp
                      :logo_size="110"
                      style="margin-left: 15px"
                    />
                  </div>
                </div>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <!--終演時刻前の時だけ「整理券をキャンセル」ボタンを表示-->
                  <v-btn v-if="isUsed(ticket_info)" color="orange">
                    <v-icon color="white">mdi-ticket-outline</v-icon>
                    <span style="color: white">入場済み</span>
                  </v-btn>
                  <v-btn v-else color="green">
                    <v-icon color="white">mdi-close</v-icon>
                    <span style="color: white">入場待ち</span>
                  </v-btn>
                </v-card-actions>
                <!-- QR code表示部分 -->
                <div v-if="!isUsed(ticket_info)" class="qrcode-container">
                  <v-img
                    class="mx-auto my-0"
                    style="display: block"
                    :src="ticket_info.qrcode"
                    width="90%"
                  />
                </div>
                <v-img
                  v-if="ticket_info.group.public_thumbnail_image_url != null"
                  :src="ticket_info.group.public_thumbnail_image_url"
                  width="100%"
                  contain
                  max-height="300px"
                ></v-img>
              </v-card>
            </div>
            <!--取得した整理券一覧-->
            <v-card v-if="tickets.length !== 0" class="my-4">
              <v-card-title
                ><v-icon>mdi-ticket-account</v-icon>あなたの整理券</v-card-title
              >
              <v-expansion-panels inset>
                <v-expansion-panel
                  v-for="ticket_info in tickets"
                  :key="ticket_info.ticket.id"
                  focusable
                >
                  <!--activeな整理券のみ表示．キャンセル済み整理券とUpNextな整理券は表示されない-->
                  <div
                    v-if="
                      !(ticket_info.ticket.status == 'cancelled') &&
                      !isUpNext(
                        new Date(ticket_info.event.starts_at),
                        new Date(ticket_info.event.ends_at)
                      )
                    "
                  >
                    <v-expansion-panel-header class="pa-3">
                      <div class="text-truncate">
                        <v-list-item>
                          <div>
                            <v-img
                              v-if="
                                ticket_info.group.public_thumbnail_image_url !=
                                null
                              "
                              height="120px"
                              width="90px"
                              contain
                              :src="
                                ticket_info.group.public_thumbnail_image_url
                              "
                            ></v-img>
                            <v-img
                              v-else
                              :class="hashColor(ticket_info.group.id)"
                              height="120px"
                              width="90px"
                            ></v-img>
                          </div>
                          <div class="ma-2 text-truncate">
                            <!--取得した整理券の情報を表示-->
                            <v-list-item-subtitle class="text-truncate"
                              >{{ dateFormatter(ticket_info.event.starts_at) }}
                              {{
                                ticket_info.event.eventname
                              }}</v-list-item-subtitle
                            >
                            <v-list-item-title class="text-h7 text-truncate">
                              {{ ticket_info.group.title }}
                            </v-list-item-title>
                            <v-list-item-subtitle class="text-truncate">
                              {{
                                ticket_info.group.groupname
                              }}</v-list-item-subtitle
                            >
                            <v-list-item-subtitle
                              class="mt-2 grey--text text--darken-2 text-truncate"
                            >
                              <span class="text-h5"
                                ><v-icon>mdi-clock-time-nine</v-icon
                                >{{
                                  timeFormatter(ticket_info.event.starts_at)
                                }}</span
                              >
                              -{{ timeFormatter(ticket_info.event.ends_at) }}
                            </v-list-item-subtitle>
                            <v-list-item-subtitle
                              class="mb-2 grey--text text--darken-2 text-truncate"
                            >
                              <v-row>
                                <v-col cols="6">
                                  <span class="text-h5"
                                    ><v-icon>mdi-account-supervisor</v-icon
                                    >{{ ticket_info.ticket.person }}</span
                                  >人
                                </v-col>
                                <v-col
                                  v-if="
                                    ticket_info.ticket.is_family_ticket == true
                                  "
                                  style="margin-top: 7%"
                                  cols="5"
                                >
                                  <div>
                                    <span style="color: orange">優先権</span>
                                  </div>
                                </v-col>
                              </v-row>
                            </v-list-item-subtitle>

                            <!--整理券の状況を「開場前」（開演20分前まで），「開場中」（開演20分前から終演），「公演終了」（終演以降）に分けて表示-->
                            <v-chip
                              v-if="
                                isUpNext(
                                  new Date(ticket_info.event.starts_at),
                                  new Date(ticket_info.event.ends_at)
                                )
                              "
                              color="primary"
                              outlined
                              label
                              ><v-icon>mdi-theater</v-icon>開場中</v-chip
                            >
                            <v-chip
                              v-else-if="
                                isEventEnds(new Date(ticket_info.event.ends_at))
                              "
                              color="error"
                              outlined
                              label
                              ><v-icon>mdi-check</v-icon>公演終了</v-chip
                            >
                            <v-chip v-else color="green" outlined label>
                              <v-icon>mdi-account-clock</v-icon>開場前
                            </v-chip>
                          </div>
                        </v-list-item>
                      </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="pa-1">
                      <v-divider></v-divider>
                      <v-card-text>
                        <p class="text-body-2 grey--text">
                          ID: {{ ticket_info.ticket.id }}
                        </p>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn :href="'/groups/' + ticket_info.group.id"
                          >公演詳細
                        </v-btn>
                        <v-spacer></v-spacer>

                        <!--終演時刻前の時だけ「整理券をキャンセル」ボタンを表示-->
                        <v-btn v-if="isUsed(ticket_info)" color="orange">
                          <v-icon color="white">mdi-ticket-outline</v-icon>
                          <span style="color: white">入場済み</span>
                        </v-btn>
                        <v-btn
                          v-else
                          color="error"
                          @click="selectCancelTicket(ticket_info)"
                        >
                          <v-icon>mdi-close</v-icon>
                          取り消し
                        </v-btn>
                      </v-card-actions>
                      <!-- QR code表示部分 -->
                      <div v-if="!isUsed(ticket_info)" class="qrcode-container">
                        <v-img
                          class="mx-auto my-0"
                          style="display: block"
                          :src="ticket_info.qrcode"
                          width="90%"
                        />
                      </div>
                    </v-expansion-panel-content>
                  </div>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>

            <!--整理券キャンセルの有無を問うダイアログ-->
            <v-dialog
              v-if="selected_ticket"
              v-model="cancel_dialog"
              max-width="500"
            >
              <v-card>
                <v-card-title class="text-h5">
                  本当にキャンセルしますか？
                </v-card-title>
                <v-card-subtitle class="pt-5 pb-0"
                  >{{ dateFormatter(selected_ticket.event.starts_at) }}
                  {{ selected_ticket.event.eventname }}</v-card-subtitle
                >
                <v-card-title class="pt-0">
                  {{ selected_ticket.group.title }}
                </v-card-title>
                <v-card-subtitle>{{
                  selected_ticket.group.groupname
                }}</v-card-subtitle>
                <v-card-text>この操作は取り消せません</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="cancel_dialog = false">いいえ</v-btn>
                  <v-btn color="error" @click="cancelTicket(selected_ticket)"
                    >はい</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
        <v-snackbar v-model="success_alert" color="success" elevation="2">
          {{ success_message }}
          <template #action="{ attrs }">
            <v-btn
              color="white"
              icon
              v-bind="attrs"
              @click="success_alert = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-snackbar>
        <v-snackbar v-model="error_alert" color="red" elevation="2">
          {{ error_message }}
          <template #action="{ attrs }">
            <v-btn
              color="white"
              icon
              v-bind="attrs"
              @click="error_alert = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-snackbar>
      </v-container>
    </div>
    <div v-else>
      <LoadingPage />
    </div>
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
    this.fetchTicket()
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
