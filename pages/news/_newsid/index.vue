<template>
  <v-app>
    <v-row justify="center">
      <v-col cols="10">
        <ToolsBackButton />
        <div v-if="$vuetify.breakpoint.xs">
          <p>
            {{ dateFormatter(news.timestamp) }}
            {{ timeFormatter(news.timestamp) }}
          </p>
          <p class="font-weight-bold">{{ news.author }}</p>
        </div>
        <div v-else>
          <v-row>
            <v-col cols="4"
              ><p>
                {{ dateFormatter(news.timestamp) }}
                {{ timeFormatter(news.timestamp) }}
              </p></v-col
            >
            <v-col cols="8">
              <p class="font-weight-bold">{{ news.author }}</p>
            </v-col>
          </v-row>
        </div>
        <h1 class="info-title" style="margin-bottom: 20px">{{ news.title }}</h1>
        <p style="margin-top: 20px">{{ news.detail }}</p>
      </v-col>
    </v-row>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { News } from 'types/quaint'

export default Vue.extend({
  auth: false,

  async asyncData({ $axios, params }) {
    const news: News = await $axios.$get('/news/' + params.newsid)

    return { news }
  },

  methods: {
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
