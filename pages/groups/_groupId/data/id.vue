<template>
  <v-app>
    <v-row justify="center">
      <v-col cols="10">
        <h1 class="info-title" style="text-align: left">
          受付用整理券ID確認ページ
        </h1>
        <v-btn to="/tickets/intoScanner" color="theme_color"
          ><span style="color: white">QRコードスキャナー</span></v-btn
        >
        <v-card v-for="event in events" :key="event.id">
          <v-card-title>{{ event.eventname }}</v-card-title>

          <v-btn @click="getAllTickets(event)">取得</v-btn>
          <v-card-text>{{ tickets_id }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { Event } from '~/types/quaint'

type Data = {
  events: Event[]
  tickets_id: string[]
}

export default Vue.extend({
  data(): Data {
    return {
      events: [],
      tickets_id: [],
    }
  },

  async created() {
    if (
      !(this.$auth.user?.groups as string[]).includes(this.user_groups.students)
    ) {
      this.$nuxt.error({ statusCode: 403, message: 'Forbidden' })
    }

    this.events = await this.$axios
      .$get('/groups/' + this.$route.params.groupId + '/events')
      .then((result) => {
        result.sort((x: Event, y: Event) => {
          return new Date(x.starts_at) > new Date(y.starts_at) ? 1 : -1
        })
        return result
      })
      .catch(() => {
        this.$store.commit('ShowInternetErrorSnackbar', {
          message: '情報の取得に失敗しました。再読み込みしてください。',
        })
        return []
      })
  },

  methods: {
    async getAllTickets(event: Event) {
      await this.$axios
        .$get(
          '/groups/' +
            event.group_id +
            '/events/' +
            event.id +
            '/tickets/active'
        )
        .then((res) => {
          this.tickets_id = res
        })
        .catch((err) => {
          this.$store.commit('ShowInternetErrorSnackbar', {
            message:
              '情報の取得に失敗しました。再読み込みしてください。エラー内容：' +
              err,
          })
        })
    },
  },
})
</script>
