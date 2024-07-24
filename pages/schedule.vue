<template>
  <v-app>
    <v-container>
      <ToolsBackButton />
      <h1 id="title">スケジュール</h1>
      <p>現在開発中</p>
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
