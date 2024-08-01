<template>
  <v-app>
    <v-row justify="center" class="ma-4">
      <v-col cols="11" md="6" lg="4" class="ma-0 pa-0">
        <v-sheet color="white" elevation="4" class="py-4 px-2">
          <h2 align="center" class="text-h5 ma-3">ログイン</h2>
          <p align="center" class="">
            整理券の取得・投票にはログインが必要となります。
          </p>
          <v-btn
            height="72"
            class="light-blue darken-4 my-3"
            block
            dark
            @click="loginAd()"
          >
            ログイン
          </v-btn>
          <p align="center" class="text-caption">
            生徒は学校から配布されているMicrosoftアカウント(「@metro.ed.jp」で終わるもの)でログインしてください。保護者の皆様は学校から事前に配布されたアカウントでログインしてください。一般客の皆様は受付で配布されたアカウントを使ってログインしてください。
          </p>
        </v-sheet>
      </v-col>
    </v-row>

    <v-snackbar v-model="error_alert" color="red" elevation="2">
      ログイン失敗 もう一度お試しください
      <template #action="{ attrs }">
        <v-btn color="white" icon v-bind="attrs" @click="error_alert = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      error_alert: false,
    }
  },
  head: {
    title: 'ログイン',
  },
  mounted() {},
  created() {
    if (this.$route.query.error !== undefined) this.errorLogin()
  },
  methods: {
    loginAd() {
      this.$auth.loginWith('ad')
    },
    errorLogin() {
      this.error_alert = true
    },
  },
})
</script>
<style>
table {
  margin-bottom: 20px;
  border: solid 1px #000;
}

td {
  border: solid 1px #000;
  text-align: center;
  padding: 2px;
}

.tdx {
  background-color: #eee;
  font-weight: bold;
}
</style>
