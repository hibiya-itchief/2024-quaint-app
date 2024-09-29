<!--イベントを表示するコンポーネント-->
<template>
  <div>
    <div v-if="is_family_ticket">
      <v-card
        class="ma-2 d-flex"
        :disabled="isSellEnd(event) || taken_tickets >= ticket_stock"
        @click.stop="selectEvent(event, is_family_ticket)"
      >
        <div>
          <v-card-text
            class="pt-1 pb-0 mb-0 grey--text text--darken-2 text-caption"
          >
            <div v-if="!cut_volume_date">
              {{ dateFormatter(event.starts_at) }}
            </div>
            <div v-if="!cut_volume_title">
              {{ event.eventname }}
            </div>
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-title class="pt-0 pb-1 text-h5">
            {{ timeFormatter(event.starts_at) }}
            <span class="caption pl-1">
              - {{ timeFormatter(event.ends_at) }}</span
            >
          </v-card-title>
        </div>
        <v-spacer></v-spacer>
        <div class="my-auto mx-2">
          <!--ここから配布ステータスの条件分岐-->
          <v-btn
            v-if="isSellEnd(event)"
            color="grey"
            outlined
            style="font-weight: bold"
            ><div v-if="!cut_volume_icon_text">時間外</div>
            <v-icon>mdi-cancel</v-icon></v-btn
          >
          <v-btn
            v-else-if="taken_tickets / ticket_stock < 0.5"
            color="green"
            outlined
            style="font-weight: bold"
            ><div v-if="!cut_volume_icon_text">配布中</div>
            <v-icon>mdi-circle-double</v-icon></v-btn
          >
          <!--5割以上で黄色になる-->
          <v-btn
            v-else-if="
              taken_tickets / ticket_stock >= 0.5 &&
              taken_tickets < ticket_stock
            "
            color="orange"
            outlined
            style="font-size: 80%; font-weight: bold"
            ><div v-if="!cut_volume_icon_text">残りわずか</div>
            <v-icon>mdi-triangle-outline</v-icon></v-btn
          >
          <v-btn
            v-else-if="taken_tickets >= ticket_stock"
            color="red"
            outlined
            style="font-weight: bold"
            ><div v-if="!cut_volume_icon_text">完売</div>
            <v-icon>mdi-close</v-icon></v-btn
          >
          <!--ここまで配布ステータスの条件分岐-->
        </div>
      </v-card>
    </div>
    <div v-else>
      <v-card
        class="ma-2 d-flex"
        :disabled="!isAvailable(event) || taken_tickets >= ticket_stock"
        @click.stop="selectEvent(event, is_family_ticket)"
      >
        <div>
          <v-card-text
            class="pt-1 pb-0 mb-0 grey--text text--darken-2 text-caption"
          >
            <div v-if="!cut_volume_date">
              {{ dateFormatter(event.starts_at) }}
            </div>
            <div v-if="!cut_volume_title">
              {{ event.eventname }}
            </div>
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-title class="pt-0 pb-1 text-h5">
            {{ timeFormatter(event.starts_at) }}
            <span class="caption pl-1">
              - {{ timeFormatter(event.ends_at) }}</span
            >
          </v-card-title>
        </div>
        <v-spacer></v-spacer>
        <div class="my-auto mx-2">
          <!--ここから配布ステータスの条件分岐-->
          <v-btn
            v-if="!isAvailable(event)"
            color="grey"
            outlined
            style="font-weight: bold"
            ><div v-if="!cut_volume_icon_text">時間外</div>
            <v-icon>mdi-cancel</v-icon></v-btn
          >
          <v-btn
            v-else-if="taken_tickets / ticket_stock < 0.5"
            color="green"
            outlined
            style="font-weight: bold"
            ><div v-if="!cut_volume_icon_text">配布中</div>
            <v-icon>mdi-circle-double</v-icon></v-btn
          >
          <!--5割以上で黄色になる-->
          <v-btn
            v-else-if="
              taken_tickets / ticket_stock >= 0.5 &&
              taken_tickets < ticket_stock
            "
            color="orange"
            outlined
            style="font-size: 80%; font-weight: bold"
            ><div v-if="!cut_volume_icon_text">残りわずか</div>
            <v-icon>mdi-triangle-outline</v-icon></v-btn
          >
          <v-btn
            v-else-if="taken_tickets >= ticket_stock"
            color="red"
            outlined
            style="font-weight: bold"
            ><div v-if="!cut_volume_icon_text">完売</div>
            <v-icon>mdi-close</v-icon></v-btn
          >
          <!--ここまで配布ステータスの条件分岐-->
        </div>
      </v-card>
    </div>

    <v-dialog v-model="dialog" max-width="500" persistent>
      <v-card class="pa-2">
        <div v-if="is_family_ticket">
          <v-card-title>この公演の保護者用優先券をとりますか？</v-card-title>
        </div>
        <div v-else>
          <v-card-title>この公演の整理券をとりますか？</v-card-title>
        </div>

        <v-card-subtitle class="pt-5 pb-0">
          {{ dateFormatter(event.starts_at) }}
          {{ event.eventname }}</v-card-subtitle
        >
        <v-card-title class="pt-0 mb-2">{{ group?.title }} </v-card-title>
        <v-card-subtitle>
          {{ group?.groupname }}
        </v-card-subtitle>
        <v-card-subtitle class="py-2">
          <span class="text-h5"
            ><v-icon>mdi-clock-time-nine</v-icon>
            {{ timeFormatter(event.starts_at) }}
          </span>
          -
          {{ timeFormatter(event.ends_at) }}
        </v-card-subtitle>

        <v-card-subtitle
          v-if="
            $quaintUserRole('school', $auth.user) || is_family_ticket === true
          "
          ><span class="text-h5"><v-icon>mdi-account-supervisor</v-icon>1</span
          >人</v-card-subtitle
        >
        <div v-else>
          <v-card-subtitle>
            <v-icon>mdi-account-plus</v-icon>同時に入場する人数(ご家族など)
          </v-card-subtitle>
          <v-card-actions>
            <v-slider
              v-model="ticket_person"
              :tick-labels="person_labels"
              min="1"
              max="3"
            >
              <template #thumb-label="props">
                <v-icon dark>
                  {{ person_icons[props.value - 1] }}
                </v-icon>
              </template>
            </v-slider>
          </v-card-actions>
        </div>
        <v-card-actions class="px-1">
          <v-spacer></v-spacer>

          <v-btn color="red" text @click.stop="dialog = false"> いいえ </v-btn>
          <div v-if="is_family_ticket">
            <v-btn color="primary" @click="createFamilyTicket()"> はい </v-btn>
          </div>
          <div v-else>
            <v-btn color="primary" @click="createTicket()"> はい </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Event } from '../../types/quaint'
import Vue from 'vue'

type Data = {
  dialog: boolean
  ticket_person: number
  person_labels: any[]
  person_icons: any[]
}

export default Vue.extend({
  props: {
    group: {
      type: Object,
      required: true,
    },
    event: {
      type: Object,
      required: true,
    },
    taken_tickets: {
      type: Number,
      required: true,
    },
    ticket_stock: {
      type: Number,
      required: true,
    },
    is_family_ticket: {
      type: Boolean,
      required: true,
    },

    // 配布状況のアイコンの横のテキストをカットするか
    cut_volume_icon_text: {
      type: Boolean,
      required: false,
      default: false,
    },
    // チケットの日付をカットするか
    cut_volume_date: {
      type: Boolean,
      required: false,
      default: false,
    },
    // チケットのタイトル
    cut_volume_title: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data(): Data {
    return {
      dialog: false,
      ticket_person: 1,
      person_labels: ['1人', '2人', '3人'],
      person_icons: [
        'mdi-account',
        'mdi-account-multiple',
        'mdi-account-group',
      ],
    }
  },

  methods: {
    isAvailable(event: Event) {
      if (
        new Date() > new Date(event.sell_starts) &&
        new Date(event.sell_ends) > new Date()
      ) {
        return true
      } else {
        return false
      }
    },

    isSellEnd(event: Event) {
      if (new Date() > new Date(event.sell_ends)) {
        return true
      } else {
        return false
      }
    },

    dateFormatter(input_date: string) {
      const d = new Date(input_date)
      return d.getMonth() + 1 + '/' + d.getDate()
    },

    timeFormatter(input_date: string) {
      const d = new Date(input_date)
      return (
        d.getHours().toString().padStart(2, '0') +
        ':' +
        d.getMinutes().toString().padStart(2, '0')
      )
    },

    createTicket() {
      if (!this.$auth.loggedIn) {
        this.$store.commit('ShowErrorSnackbar', {
          message: '整理券の取得には',
          link: '/login',
        })
        return 1
      }
      this.dialog = false
      this.$store.commit('ShowInternetErrorSnackbar', {
        message: '2024年星陵祭は終了しました。',
      })
    },

    createFamilyTicket() {
      if (!this.$auth.loggedIn) {
        this.$store.commit('ShowErrorSnackbar', {
          message: '整理券の取得には',
          link: '/login',
        })
        return 1
      }
      this.dialog = false
      this.$store.commit('ShowInternetErrorSnackbar', {
        message: '2024年星陵祭は終了しました。',
      })
    },

    selectEvent(event: Event, is_family_ticket: boolean) {
      if (is_family_ticket) {
        if (new Date() > new Date(event.sell_ends)) {
          this.$store.commit('ShowErrorSnackbar', {
            message: '配布時間外です',
            link: '',
          })
        } else if (!this.$auth.loggedIn) {
          this.$store.commit('ShowErrorSnackbar', {
            message: '整理券の取得には',
            link: '/login',
          })
        } else {
          this.dialog = true
          this.$store.commit('CloseErrorSnackbar')
        }
      } else if (
        new Date() < new Date(event.sell_starts) ||
        new Date(event.sell_ends) < new Date()
      ) {
        this.$store.commit('ShowErrorSnackbar', {
          message: '配布時間外です',
          link: '',
        })
      } else if (!this.$auth.loggedIn) {
        this.$store.commit('ShowErrorSnackbar', {
          message: '整理券の取得には',
          link: '/login',
        })
      } else {
        this.dialog = true
        this.$store.commit('CloseErrorSnackbar')
      }
    },
  },
})
</script>
