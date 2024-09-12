<template>
  <v-app>
    <v-container>
      <ToolsBackButton />
      <h1 class="title">校内マップ</h1>
      <v-row justify="center">
        <v-btn-toggle
          v-model="selected_floor"
          mandatory
          color="theme_color"
          group
        >
          <v-btn value="1F">1F</v-btn>
          <v-btn value="2F">2F</v-btn>
          <v-btn value="3F">3F</v-btn>
          <v-btn value="4F">4F</v-btn>
        </v-btn-toggle>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-img
            class="img"
            :src="`/images/map${selected_floor}.png`"
            alt="1階の地図"
          />
        </v-col>
      </v-row>
      <h1 class="title" style="margin-top: 10%; margin-bottom: 5%">
        星陵会館へ
      </h1>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-img
            class="img"
            :src="`/images/to_seiryo_kaikan.jpg`"
            alt="星陵会館への行き方"
          >
          </v-img>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'MapPage',
  auth: false,
  data() {
    return {
      selected_floor: '2F',
    }
  },
  head: {
    title: '校内マップ',
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

.title {
  display: inline-block;
  padding: 0.5rem 3rem 0.5rem 0;
  margin-bottom: 5rem;
  border-bottom: 3px solid var(--theme-color);
  font-family: serif;
  font-weight: bold;
}
</style>
