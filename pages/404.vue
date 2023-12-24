<template>
  <v-app dark>
    <div id="error-page">
      <div v-if="$vuetify.breakpoint.xs">
        <h1 class="status-code-xs">404</h1>
        <h1 class="error-message-xs">Not Found</h1>
      </div>
      <div v-else>
        <h1 class="status-code">404</h1>
        <h1 class="error-message">Not Found</h1>
      </div>
      <p>お探しのページは見つかりません。</p>
      <p>指定したURLが正しいかご確認の上、再読み込みをお試しください。</p>
      <v-btn
        nuxt-link
        outlined
        to="/help"
        color="theme_color"
        style="font-weight: bold"
        >ヘルプページ</v-btn
      >
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'EmptyLayout',
  auth: false,
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  head: {
    title: 'エラー',
  },
})
</script>

<style>
#error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: auto;
  padding: auto;
  width: 75%;
  height: 50%;
}
</style>
