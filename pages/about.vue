<template>
  <v-app>
    <v-container>
      <ToolsBackButton />
      <h1 id="title">星陵祭とは</h1>
      <p>現在開発中</p>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'AboutPage',
  auth: false,
  head: {
    title: '星陵祭とは',
  },
})
</script>

<style scoped>
h2 {
  text-align: center;
  font-weight: normal;
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
