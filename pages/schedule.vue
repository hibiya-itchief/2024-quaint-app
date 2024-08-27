<template>
  <v-app>
    <v-container>
      <h1 id="title">スケジュール</h1>
      <v-row class="mb-10" justify="center">
        <v-col cols="12" sm="6" md="6">
          <h2 class="mb-3">9月14日</h2>
          <h3 style="text-align: center; font-weight: normal">
            8時20分 受付開始<br />
            16時00分 公開終了
          </h3>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <h2 class="mb-3">9月15日</h2>
          <h3 style="text-align: center; font-weight: normal">
            8時20分 受付開始<br />
            15時20分 公開終了
          </h3>
        </v-col>
      </v-row>
      <v-row class="my-10" justify="center">
        <v-col cols="12">
          <h2>整理券の配布スケジュール</h2>
          <p class="my-5">
            ※ 画像中の文字が非常に細かくなっていますので、拡大してご覧ください。
          </p>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <h4>14日</h4>
          <v-img
            class="img"
            src="/images/event_schedule_1.png"
            alt="1日目整理券配布スケジュール"
          />
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <h4 :class="$vuetify.breakpoint.xs ? 'mt-5' : ''">15日</h4>
          <v-img
            class="img"
            src="/images/event_schedule_2.png"
            alt="2日目整理券配布スケジュール"
          />
        </v-col>
      </v-row>
      <v-row class="mt-10" justify="center">
        <v-col cols="12">
          <h2>有志団体</h2>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <h4>14日</h4>
          <v-img
            class="img"
            src="/images/schedule_yushi_1.png"
            alt="1日目有志団体スケジュール"
          />
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <h4>15日</h4>
          <v-img
            class="img"
            src="/images/schedule_yushi_2.png"
            alt="2日目有志団体スケジュール"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'SchedulePage',
  auth: false,
  head: {
    title: 'スケジュール',
  },
})
</script>

<style scoped>
h2 {
  text-align: center;
  font-weight: normal;
}

.img {
  border: 9px solid var(--theme-color);
}

#title {
  display: inline-block;
  padding: 0.5rem 3rem 0.5rem 0;
  margin-bottom: 5rem;
  border-bottom: 3px solid var(--theme-color);
  font-family: serif;
  font-weight: bold;
}
</style>
