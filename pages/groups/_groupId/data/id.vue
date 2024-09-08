<template>
  <v-app>
    <v-row justify="center">
      <v-col cols="10">
        <h1 class="info-title" style="text-align: left; margin-bottom: 5%">
          受付用整理券ID確認ページ
        </h1>
        <br />
        <p>
          受付では観客の方に整理券ページ移ってもらいQRコードを表示してもらってください。
        </p>
        <br />
        <v-btn
          to="/tickets/intoScanner"
          color="theme_color"
          style="margin-bottom: 5%"
          ><span style="color: white">QRコードスキャナー</span></v-btn
        ><br />
        <p>
          以下の機能は人力でお客さんの整理券のIDが正しいものかを照らし合わせるためのものです。お客さんの整理券のIDは整理券ページに表示されています。QRコードでの読み取りがうまくいかないときに使用してください。<br />
          <br />
          <span style="font-weight: bold">＜使い方＞</span><br />
          整理券のID一覧を取得したい公演の横に表示されている「取得」ボタンを押してください。その公演で取得されている整理券のID一覧がが下にある「結果」に表示されます。
        </p>
        <v-card>
          <v-card-title>公演を選択してください</v-card-title>
          <ul>
            <li
              v-for="event in events"
              :key="event.id"
              style="margin-bottom: 5%"
            >
              <v-row>
                <v-col cols="8"> {{ event.eventname }}</v-col
                ><v-col cols="4" style="text-align: center"
                  ><v-btn
                    style="text-align: right"
                    @click="getAllTickets(event)"
                    >取得</v-btn
                  ></v-col
                >
              </v-row>
            </li>
          </ul>
        </v-card>
        <v-card>
          <v-card-title> 結果 </v-card-title>
          <v-card-text>
            {{ tickets_id }}
          </v-card-text>
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
  user_groups: {
    students: string
  }
}

export default Vue.extend({
  data(): Data {
    return {
      events: [],
      tickets_id: [],
      user_groups: {
        students: process.env.AZURE_AD_GROUPS_QUAINT_STUDENTS as string,
      },
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
          this.$store.commit('ShowInternetSuccessSnackbar', {
            message: '情報の取得に成功しました。',
          })
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
