<template>
  <v-app>
    <v-row v-if="isAdmin" justify="center">
      <v-col cols="12" md="8" lg="6">
        <h1 class="my-2">👑管理者用画面</h1>
        <v-btn class="my-2" outlined color="primary" @click="updateFrontend"
          >フロントエンドをビルドして最新の状態に更新</v-btn
        >
        <v-btn
          class="my-2"
          outlined
          color="primary"
          @click="$router.push('/admin/manage_owner')"
          >Owner権限の割り当てを管理</v-btn
        >
        <h2 class="my-2">使用しているサービスへのリンク</h2>
        <h3>
          <a :href="api_url + 'docs'">{{ api_url }}docs</a>
        </h3>
        <p>quaint-apiのAPIドキュメント、およびSwagger-ui</p>
        <h3>
          <a
            href="https://analytics.google.com/analytics/web/?authuser=1#/p332029403/reports/reportinghub"
            >Google Analytics</a
          >
        </h3>
        <p>
          サイトのアクセス解析。Googleアカウントでログインすると、アクセス解析が見れるようになります。
        </p>
        <h3>
          <a href="https://portal.azure.com/signin/index/@seiryofes.com"
            >Azure ディレクトリ - @seiryofes.com(Azure AD)</a
          >
        </h3>
        <p>
          quaintのユーザーを管理しているAzure
          ADのディレクトリ。学校から配布されているアカウントをインポートして用いたり、IT委員会側から配布するアカウントを管理したりしている。
        </p>
        <h3>
          <a
            href="https://portal.azure.com/signin/index/@seiryofesb2c.onmicrosoft.com"
            >Azure ディレクトリ - @seiryofesb2c.onmicrosoft.com(Azure B2C)</a
          >
        </h3>
        <p>
          quaintのユーザーを管理しているAzure
          B2Cのディレクトリ。一般客が自分のメールアドレスでサインアップするアカウントを管理している。
        </p>
        <v-divider></v-divider>
        <v-card>
          <v-card-title>公演の一括追加</v-card-title>
          <v-card-text class="mx-0 px-0 py-2">
            <v-file-input
              v-model="events_data_csv_input"
              label="csvファイルをアップロード"
              filled
              prepend-icon="mdi-image"
            ></v-file-input>
          </v-card-text>
          <v-card-actions class="ma-0 px-0 py-0">
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="uploadEventsDataCsv()"> 適用 </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!--接続確認-->
    <v-btn @click="check()">ボタン</v-btn>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue'

type Data = {
  api_url: string | undefined
  user_groups: any
  isAdmin: boolean
  events_data_csv_form: boolean
  events_data_csv_input: any
}

export default Vue.extend({
  data(): Data {
    return {
      api_url: process.env.BASEURL,
      user_groups: {
        admin: process.env.AZURE_AD_GROUPS_QUAINT_ADMIN as string,
      },
      isAdmin: false,
      events_data_csv_form: false,
      events_data_csv_input: null,
    }
  },
  created() {
    if (
      (this.$auth.user?.groups as string[]).includes(this.user_groups.admin)
    ) {
      this.isAdmin = true
    } else {
      this.$nuxt.error({ statusCode: 403, message: 'Forbidden' })
    }
  },
  methods: {
    async updateFrontend() {
      await this.$axios.$post('/admin/update_frontend')
    },

    async uploadEventsDataCsv() {
      const data = new FormData()
      data.append('file', this.events_data_csv_input)

      await this.$axios
        .$post('/api/support/events', data, {
          headers: { 'content-type': 'multipart/form-data' },
        })
        .then(() => {
          this.$store.commit('ShowSuccessTextSnackbar', {
            message: '適用に成功しました！',
          })
        })
        .catch((e) => {
          const error_message = e.response.data.detail
          this.$store.commit('ShowErrorTextSnackbar', {
            message: error_message,
          })
        })
    },

    // Docker使用時の接続確認
    check() {
      this.$axios.$get('/api/tags')
    },
  },
})
</script>
