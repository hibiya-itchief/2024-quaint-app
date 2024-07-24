<template>
  <v-app>
    <v-container>
      <ToolsBackButton />
      <h1 id="title">ヘルプ</h1>
      <p>現在開発中</p>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'HelpPage',
  auth: false,
  data() {
    return {
      g1: false,
      g2: false,
      g3: false,
      g4: false,
      g5: false,
      q1: false,
      q2: false,
      q3: false,
      q4: false,
      q5: false,
      q6: false,
      q7: false,
      q8: false,
    }
  },
  head: {
    title: 'ヘルプ',
  },
})
</script>

<style scoped>
h2 {
  text-align: center;
  font-weight: normal;
}

h3 {
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
