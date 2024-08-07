<!--イベント一覧を表示するダイアログを発生させるボタン-->
<template>
  <div>
    <!--全てのチケットを表示する-->
    <v-btn
      v-ripple
      depressed
      color="primary"
      dark
      outlined
      @click="dialog = true"
      >全ての公演を表示</v-btn
    >
    <v-dialog
      v-model="dialog"
      hide-overlay
      max-width="500px"
      scrollable
      persistent
      no-click-animation
    >
      <v-card>
        <v-toolbar dark color="theme_color">
          <v-toolbar-title>公演一覧</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-divider></v-divider>

        <v-card-text style="height: 80vh">
          <v-row>
            <v-col>
              <!--一日目の欄-->
              <v-card-subtitle>一日目({{ date['1'] }})</v-card-subtitle>
              <!--各チケットの描画-->
              <div v-for="(event, index) in first_day_events" :key="event.id">
                <!--スマホ表示の時はチケットの情報を少なくしてコンパクトに収まるように調整している-->
                <div v-if="$vuetify.breakpoint.xs">
                  <EventsEventCard
                    :group="group"
                    :event="event"
                    :taken_tickets="list_taken_tickets[index]"
                    :ticket_stock="list_stock[index]"
                    :is_family_ticket="false"
                    :cut_volume_icon_text="true"
                    :cut_volume_date="true"
                  />
                </div>
                <div v-else>
                  <EventsEventCard
                    :group="group"
                    :event="event"
                    :taken_tickets="list_taken_tickets[index]"
                    :ticket_stock="list_stock[index]"
                    :is_family_ticket="false"
                  />
                </div>
              </div>

              <v-divider></v-divider>

              <!--二日目の欄-->
              <v-card-subtitle>二日目({{ date['2'] }})</v-card-subtitle>
              <!--各チケットの描画-->
              <div v-for="(event, index) in second_day_events" :key="event.id">
                <!--スマホ表示の時はチケットの情報を少なくしてコンパクトに収まるように調整している-->
                <div v-if="$vuetify.breakpoint.xs">
                  <EventsEventCard
                    :group="group"
                    :event="event"
                    :taken_tickets="list_taken_tickets[index]"
                    :ticket_stock="list_stock[index]"
                    :is_family_ticket="false"
                    :cut_volume_icon_text="true"
                    :cut_volume_date="true"
                  />
                </div>
                <div v-else>
                  <EventsEventCard
                    :group="group"
                    :event="event"
                    :taken_tickets="list_taken_tickets[index]"
                    :ticket_stock="list_stock[index]"
                    :is_family_ticket="false"
                  />
                </div>
              </div>

              <!--その他の配布時間のチケット-->
              <div v-if="other_day_events.length !== 0">
                <v-divider></v-divider>
                <v-card-subtitle>その他</v-card-subtitle>
                <div v-for="(event, index) in other_day_events" :key="event.id">
                  <!--スマホ表示の時はチケットの情報を少なくしてコンパクトに収まるように調整している-->
                  <div v-if="$vuetify.breakpoint.xs">
                    <EventsEventCard
                      :group="group"
                      :event="event"
                      :taken_tickets="list_taken_tickets[index]"
                      :ticket_stock="list_stock[index]"
                      :is_family_ticket="false"
                      :cut_volume_icon_text="true"
                    />
                  </div>
                  <div v-else>
                    <EventsEventCard
                      :group="group"
                      :event="event"
                      :taken_tickets="list_taken_tickets[index]"
                      :ticket_stock="list_stock[index]"
                      :is_family_ticket="false"
                    />
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Event } from '../../types/quaint'
import Vue from 'vue'

type Data = {
  dialog: boolean
  first_day_events: Event[] // 一日目のチケットを格納する
  second_day_events: Event[] // 二日目のチケットを格納する
  other_day_events: Event[] // 開催期間外のチケットを格納する
  date: { [date: string]: string } // 星陵祭１日目、２日目の日付を入れる dialogの１日目、２日目の欄にチケットを振り分けるのに使用
}

export default Vue.extend({
  props: {
    group: {
      type: Object,
      required: true,
    },
    events: {
      type: Array,
      required: true,
    },
    list_stock: {
      type: Array,
      required: true,
    },
    list_taken_tickets: {
      type: Array,
      required: true,
    },
  },

  data(): Data {
    return {
      dialog: false,
      first_day_events: [],
      second_day_events: [],
      other_day_events: [],
      date: {
        '1': '9/14',
        '2': '9/15',
      },
    }
  },

  created() {
    // eventsを一日目のものと二日目のものに振り分け
    // first_day_eventsに一日目、second_day_eventsに二日目のチケットを代入する
    for (const event of this.suitableEvents()) {
      if (this.dateFormatter(event.starts_at) === this.date['1']) {
        this.first_day_events.push(event)
      } else if (this.dateFormatter(event.starts_at) === this.date['2']) {
        this.second_day_events.push(event)
      } else {
        // 開催期間外のチケットをother_day_eventsに格納
        this.other_day_events.push(event)
      }
    }
  },

  methods: {
    //  未ログイン状態では全ての公演，ログインしている状態ではユーザ属性に合った公演のみが表示されるようにするmethod
    suitableEvents() {
      //  全ての公演（events）から，ログイン中のユーザ属性（e.g.students,parents）に合致する公演のみがfiltered_eventsに格納される
      //  '&& this.isToday(val.sell_starts, val.sell_ends, val.starts_at)'を付け加えれば，当日の整理券のみが表示されるようになる
      const filtered_events: Event[] = (this.events as Event[]).filter(
        (val: Event) => {
          return this.$quaintUserRole(val.target, this.$auth.user)
        }
      )

      if (!this.$auth.loggedIn) {
        return this.events as Event[]
      } else {
        return filtered_events as Event[]
      }
    },

    dateFormatter(input_date: string) {
      const d = new Date(input_date)
      return d.getMonth() + 1 + '/' + d.getDate()
    },
  },
})
</script>
