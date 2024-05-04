<template>
  <div>
    <div v-if="!$vuetify.breakpoint.xs">
      <v-card :to="'/groups/' + group.id">
        <v-row>
          <v-col cols="3">
            <v-card-title>{{ group.groupname }}</v-card-title>
          </v-col>
          <v-col cols="8">
            <div v-if="events.length >= 2">
              <div v-for="i in [0, 1]" :key="i">
                <StatusEventCard :group="group" :event="events[i]" />
              </div>
            </div>
            <div v-else-if="events.length == 1">
              <StatusEventCard :group="group" :event="events[0]" />
            </div>
            <div v-else>
              <v-card-subtitle>公演なし</v-card-subtitle>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <div v-else>
      <v-card :to="'/groups/' + group.id">
        <v-row>
          <v-col cols="12">
            <v-card-title>{{ group.groupname }}</v-card-title>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="11">
            <div v-if="events.length >= 2">
              <div v-for="i in [0, 1]" :key="i">
                <StatusEventCard :group="group" :event="events[i]" />
              </div>
            </div>
            <div v-else-if="events.length == 1">
              <StatusEventCard :group="group" :event="events[0]" />
            </div>
            <div v-else>
              <v-card-subtitle>公演なし</v-card-subtitle>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Event } from 'types/quaint'
import Vue from 'vue'

type Data = {
  events: Event[]
}

export default Vue.extend({
  props: {
    group: {
      type: Object,
      required: true,
    },
    all_events: {
      type: Array,
      required: true,
    },
  },

  data(): Data {
    return {
      events: [],
    }
  },

  created() {
    // eventsにまだ演劇が終了していないeventを追加していく
    const res_events = this.all_events as Event[]
    this.events = res_events.filter(
      (event) => new Date(event.ends_at) > new Date()
    )

    // groupがeventsを保持している
    if (this.events) {
      // eventsの並び替え
      this.events.sort((x: Event, y: Event) => {
        // 販売が終了していたら後ろに
        if (new Date() < new Date(x.sell_ends)) {
          // 講演開始が先なら前、後なら後ろ
          if (new Date(x.starts_at) < new Date(y.starts_at)) {
            return -1
          } else {
            return 1
          }
        } else {
          return 1
        }
      })
    }
  },
})
</script>
