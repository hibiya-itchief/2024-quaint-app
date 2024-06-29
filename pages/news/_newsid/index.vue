<template>
  <v-app>
    <v-row justify="center">
      <v-col cols="10">
        <ToolsBackButton />
        <h1 class="info-title" style="margin-bottom: 20px">{{ news.title }}</h1>
        <div v-if="$vuetify.breakpoint.xs">
          <h3>
            {{ dateFormatter(news.timestamp) }}
            {{ timeFormatter(news.timestamp) }}
          </h3>
          <h3>{{ news.author }}</h3>
        </div>
        <div v-else>
          <v-row>
            <v-col cols="4"
              ><h3>
                {{ dateFormatter(news.timestamp) }}
                {{ timeFormatter(news.timestamp) }}
              </h3></v-col
            >
            <v-col cols="8">
              <h3>{{ news.author }}</h3>
            </v-col>
          </v-row>
        </div>
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
