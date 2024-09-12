<template>
  <v-app>
    <h1 class="info-title" style="margin-left: 5%; width: 80vw">
      整理券スキャナーについて
    </h1>
    <v-row justify="center">
      <v-col cols="11">
        <p>
          スキャナーを利用するためにカメラへのアクセスを許可してください。<br />
          Microsoft Edgeは対応していません。<br />
          カメラがすでに使用中の場合やカメラに問題がある場合は動作しません。<br />
          <br />

          <span style="color: var(--theme-color)">＜使い方＞</span><br />
          お客さんに整理券ページに写ってもらいQRコードを表示してもらってください。スキャナーでQRコードを読み取ります。読み取りが終わると下から読み取り結果が表示されます。表示された指示に従って対応してください。
          <br />

          <br />
          <span style="color: red"
            >＜注意＞<br />
            QRコードで遊ばないでください。受付前にQRコードをスキャンすると入場済みの状態となり、受付で無効な整理券だと判定されてしまいます。</span
          >
        </p>
      </v-col>
      <v-col style="text-align: center"
        ><v-btn color="theme_color" to="/tickets/scanner"
          ><span style="color: white">スキャナーを起動</span></v-btn
        ></v-col
      >
    </v-row>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      user_groups: {
        students: process.env.AZURE_AD_GROUPS_QUAINT_STUDENTS as string,
      },
    }
  },

  created() {
    if (
      !(this.$auth.user?.groups as string[]).includes(this.user_groups.students)
    ) {
      this.$nuxt.error({ statusCode: 403, message: 'Forbidden' })
    }
  },
})
</script>
