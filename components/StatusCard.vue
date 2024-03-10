<template>
  <div>
    <v-card :to="'/groups/' + group.id">
      <v-row>
        <v-col cols="3">
          <v-card-title>{{ group.groupname }}</v-card-title>
        </v-col>
        <v-col cols="8">
          <div v-for="event of events" :key="event.id">
            <StatusEventCard :group="group" :event="event" />
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

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
  },
})
</script>
