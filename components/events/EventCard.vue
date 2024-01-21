<!--イベントを表示するコンポーネント-->
<template>
  <div>
    <v-dialog v-model="dialog" max-width="500" persistent>
      <template v-slot:activator="{ on, attrs }">
        <v-card
          class="ma-2 d-flex"
          v-bind="attrs"
          :disabled="
            !isAvailable(event) ||
            listTakenTickets[index] >= listStock[index] ||
            !$auth.loggedIn
          "
          v-on="on"
          @click.stop="selectEvent(event)"
        >
          <div>
            <v-card-text
              class="pt-1 pb-0 mb-0 grey--text text--darken-2 text-caption"
            >
              {{ dateFormatter(event.starts_at) }}
              {{ event.eventname }}
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
              >時間外<v-icon>mdi-cancel</v-icon></v-btn
            >
            <v-btn
              v-else-if="listTakenTickets[index] / listStock[index] < 0.5"
              color="green"
              outlined
              style="font-weight: bold"
              >配布中<v-icon>mdi-circle-double</v-icon></v-btn
            >
            <!--5割以上で黄色になる-->
            <v-btn
              v-else-if="
                listTakenTickets[index] / listStock[index] >= 0.5 &&
                listTakenTickets[index] < listStock[index]
              "
              color="orange"
              outlined
              style="font-size: 80%; font-weight: bold"
              >残りわずか<v-icon>mdi-triangle-outline</v-icon></v-btn
            >
            <v-btn
              v-else-if="listTakenTickets[index] >= listStock[index]"
              color="red"
              outlined
              style="font-weight: bold"
              >完売<v-icon>mdi-close</v-icon></v-btn
            >
            <!--ここまで配布ステータスの条件分岐-->
          </div>
        </v-card>
      </template>

      <v-card class="pa-2">
        <v-card-title>この公演の整理券をとりますか？</v-card-title>

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

        <v-card-subtitle v-if="$quaintUserRole('school', $auth.user)"
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
          <v-btn color="primary" @click="CreateTicket(event, ticket_person)">
            はい
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div>
      <v-snackbar v-model="success_alert" color="success" elevation="2">
        {{ success_message }}
        <a
          v-show="success_snackbar_link"
          :href="success_snackbar_link"
          class="link-snackbar"
        >
          取得した整理券を表示
        </a>
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
        <a
          v-show="error_snackbar_link"
          :href="error_snackbar_link"
          class="link-snackbar"
        >
          ログイン
        </a>
        <template #action="{ attrs }">
          <v-btn color="white" icon v-bind="attrs" @click="error_alert = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </div>
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
  success_alert: boolean
  error_alert: boolean
  success_message: string
  error_message: string
  success_snackbar_link: string | undefined
  error_snackbar_link: string | undefined
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
    index: {
      type: Number,
      required: true,
    },
    listTakenTickets: {
      type: Array,
      required: true,
    },
    listStock: {
      type: Array,
      required: true,
    },
  },

  data(): Data {
    return {
      dialog: false,
      success_alert: false,
      error_alert: false,
      success_message: '',
      error_message: '',
      success_snackbar_link: undefined,
      error_snackbar_link: undefined,
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

    dateFormatter(inputDate: string) {
      const d = new Date(inputDate)
      return d.getMonth() + 1 + '/' + d.getDate()
    },

    timeFormatter(inputDate: string) {
      const d = new Date(inputDate)
      return (
        d.getHours().toString().padStart(2, '0') +
        ':' +
        d.getMinutes().toString().padStart(2, '0')
      )
    },

    async CreateTicket(event: Event, person: number) {
      if (!this.$auth.loggedIn) {
        this.error_message = '整理券の取得には'
        this.error_snackbar_link = '/login'
        this.error_alert = true
        return 1
      }
      this.dialog = false
      await this.$axios
        .post(
          '/groups/' +
            event.group_id +
            '/events/' +
            event.id +
            '/tickets?person=' +
            person
        )
        .then(() => {
          this.success_message = '整理券を取得できました！'
          this.success_snackbar_link = '/tickets'
          this.success_alert = true
        })
        .catch((e) => {
          if (e.response) {
            this.error_message = e.response.data.detail
          } else {
            this.error_message =
              '予期せぬエラーが発生しました。IT委員にお声がけください🙇‍♂️'
          }
          this.error_snackbar_link = undefined
          this.error_alert = true
        })
    },

    selectEvent(event: Event) {
      if (
        new Date() < new Date(event.sell_starts) ||
        new Date(event.sell_ends) < new Date()
      ) {
        this.error_message = '配布時間外です'
        this.error_snackbar_link = undefined
        this.error_alert = true
      } else if (!this.$auth.loggedIn) {
        this.error_message = '整理券の取得には'
        this.error_snackbar_link = '/login'
        this.error_alert = true
      } else {
        this.dialog = true
        this.error_alert = false
      }
    },
  },
})
</script>

<style>
a.link-snackbar {
  color: white;
  font-weight: bold;
  text-decoration: underline;
  text-decoration-color: white;
}
</style>
