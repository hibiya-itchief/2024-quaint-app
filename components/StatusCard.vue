<template>
  <div>
    <v-card :to="'/groups/' + group.id">
      <v-row>
        <v-col cols="3">
          <v-card-title>{{ group.groupname }}</v-card-title>
        </v-col>
        <v-col cols="8">
          <div v-if="allEvents.length >= 2">
            <div v-for="i in [0, 1]" :key="i">
              <StatusEventCard :group="group" :event="events[i]" />
            </div>
          </div>
          <div v-else-if="allEvents.length == 1">
            <StatusEventCard :group="group" :event="events[0]" />
          </div>
          <div v-else>
            <v-card-subtitle>公演なし</v-card-subtitle>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Event } from 'types/quaint'
import Vue from 'vue'

type Data = {
  filtered_events: Event[]
  events: Event[]
}

export default Vue.extend({
  props: {
    group: {
      type: Object,
      required: true,
    },
    allEvents: {
      type: Array,
      required: true,
    },
  },

  data(): Data {
    return {
      filtered_events: [],
      events: this.allEvents as Event[],
    }
  },

  created() {
    // groupがeventsを保持している
    if (this.events) {
      // eventsの並び替え
      this.events.sort((x: Event, y: Event) => {
        // return new Date(x.starts_at) > new Date(y.starts_at) ? 1 : -1
        if (new Date() > new Date(x.sell_ends)) {
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
