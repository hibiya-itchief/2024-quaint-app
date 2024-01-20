<template>
  <div>
    <!--全てのチケットを表示する-->
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on"
          >全ての公演を表示</v-btn
        >
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-row>
            <v-col class="d-flex justify-space-around">
              <v-toolbar-title> 公演一覧</v-toolbar-title>
            </v-col>
          </v-row>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <div v-for="(event, index) in suitableEvents()" :key="event.id">
          <div>
            <EventsEventCard
              :group="group"
              :event="event"
              :index="index"
              :list-taken-tickets="listTakenTickets"
              :list-stock="listStock"
            />
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Event } from '../../types/quaint'
import Vue from 'vue'

type Data = {
  dialog: boolean
  filteredEvents: Event[]
}

export default Vue.extend({
  props: {
    group: {
      type: Object,
      required: true,
    },
    events: {
      type: Object,
      required: true,
    },
    listStock: {
      type: Array,
      required: true,
    },
    listTakenTickets: {
      type: Array,
      required: true,
    },
  },

  data(): Data {
    return {
      dialog: false,
      filteredEvents: [],
    }
  },

  created() {
    //  全ての公演（events）から，ログイン中のユーザ属性（e.g.students,parents）に合致する公演のみがfilteredEventsに格納される
    //  '&& this.isToday(val.sell_starts, val.sell_ends, val.starts_at)'を付け加えれば，当日の整理券のみが表示されるようになる
    this.filteredEvents = this.events.filter((val: Event) => {
      return this.$quaintUserRole(val.target, this.$auth.user)
    })
  },

  methods: {
    //  未ログイン状態では全ての公演，ログインしている状態ではユーザ属性に合った公演のみが表示されるようにするmethod
    suitableEvents() {
      if (!this.$auth.loggedIn) {
        return this.events
      } else {
        return this.filteredEvents
      }
    },
  },
})
</script>
