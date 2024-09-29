<template>
  <v-app>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-btn icon fab small @click="$router.go(-1)">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-card class="pa-2 pb-8">
          <v-card-title class="text-h5">
            <v-icon class="mx-1" color="blue-grey"
              >mdi-ticket-confirmation</v-icon
            >{{ group.groupname }}
            <span class="mx-1 grey--text text-subtitle-1"
              >整理券の残席状況</span
            >
          </v-card-title>
          <v-btn class="ma-2 mb-4" color="primary" @click="$nuxt.refresh()"
            ><v-icon class="mr-1">mdi-reload</v-icon>再読み込み</v-btn
          >

          <v-row>
            <v-col
              v-for="(event, index) in events"
              :key="event.id"
              cols="12"
              sm="6"
              md="6"
            >
              <v-card class="pa-2" outlined>
                <v-card class="ma-2 d-flex">
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
                      v-else-if="
                        list_taken_tickets[index] / list_stock[index] < 0.5
                      "
                      color="green"
                      outlined
                      style="font-weight: bold"
                      >配布中<v-icon>mdi-circle-double</v-icon></v-btn
                    >
                    <!--5割以上で黄色になる-->
                    <v-btn
                      v-else-if="
                        list_taken_tickets[index] / list_stock[index] >= 0.5 &&
                        list_taken_tickets[index] < list_stock[index]
                      "
                      color="orange"
                      outlined
                      style="font-size: 80%; font-weight: bold"
                      >残りわずか<v-icon>mdi-triangle-outline</v-icon></v-btn
                    >
                    <v-btn
                      v-else-if="list_taken_tickets[index] >= list_stock[index]"
                      color="red"
                      outlined
                      style="font-weight: bold"
                      >完売<v-icon>mdi-close</v-icon></v-btn
                    >
                    <!--ここまで配布ステータスの条件分岐-->
                  </div>
                </v-card>
                <span class="ma-3"
                  >取得率：{{ list_taken_tickets[index] ?? '-' }} /
                  {{ list_stock[index] ?? '-' }}
                </span>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>
<script lang="ts">
import { Event, Group } from 'types/quaint'
import Vue from 'vue'
type Data = {
  user_groups: { admin: string; owner: string }
  group: Group | undefined
  events: Event[]
  list_stock: number[]
  list_taken_tickets: number[]
}
export default Vue.extend({
  name: 'IndivisualGroupPageData',
  async asyncData({ params, $axios, payload }): Promise<Partial<Data>> {
    const events = await $axios.$get('/groups/' + params.groupId + '/events')
    events.sort((i: Event) => {
      return i.target === 'paper' ? 1 : -1
    })
    events.sort((x: Event, y: Event) => {
      return new Date(x.starts_at) > new Date(y.starts_at) ? 1 : -1
    })
    // 下はisAvailableと同じ処理
    events.sort((i: Event) => {
      return new Date() > new Date(i.sell_starts) &&
        new Date(i.sell_ends) > new Date()
        ? -1
        : 1
    })

    // nuxt generate時はpayloadを代入
    const group = payload ?? (await $axios.$get('/groups/' + params.groupId))

    // 各ticketsを取得
    if (events.length !== 0) {
      const get_tickets_info = []
      for (let i = 0; i < events.length; i++) {
        get_tickets_info.push(
          $axios.$get(`/groups/${group.id}/events/${events[i].id}/tickets`)
        )
      }
      const list_stock: number[] = []
      const list_taken_tickets: number[] = []
      Promise.all(get_tickets_info).then((tickets_info) => {
        for (let i = 0; i < tickets_info.length; i++) {
          list_stock.push(tickets_info[i].stock)
          list_taken_tickets.push(tickets_info[i].taken_tickets)
        }
      })
      return { group, events, list_stock, list_taken_tickets }
    } else {
      return { group, events }
    }
  },
  data(): Data {
    return {
      user_groups: {
        admin: process.env.AZURE_AD_GROUPS_QUAINT_ADMIN as string,
        owner: process.env.AZURE_AD_GROUPS_QUAINT_OWNER as string,
      },
      group: undefined,
      events: [],
      list_stock: [],
      list_taken_tickets: [],
    }
  },
  head() {
    return {
      title: this.group?.groupname + ' - 整理券の残席状況',
    }
  },
  created() {
    if (
      !(this.$auth.user?.groups as string[]).includes(this.user_groups.admin)
    ) {
      this.$nuxt.error({ statusCode: 403, message: 'Forbidden' })
    }
  },
  methods: {
    // isAvailable: 整理券が配布時間内であればtrue，それ以外はfalseを返すmethod
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
  },
})
</script>
