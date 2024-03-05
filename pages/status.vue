<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <h1 class="pages-title" style="color: black">配布状況一覧</h1>
          <v-row>
            <v-col>
              <v-card class="justify-center" cols="10">
                <v-tabs
                  center-active
                  dark
                  centered
                  background-color="theme_color"
                >
                  <v-tabs-slider></v-tabs-slider>

                  <v-tab href="#tab-1"> 1階 </v-tab>
                  <v-tab href="#tab-2"> 2階 </v-tab>
                  <v-tab href="#tab-3"> 3階 </v-tab>
                  <v-tab href="#tab-4"> 4階 </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                  <v-tab-item v-for="i in 4" :key="i" :value="'tab-' + i">
                    <v-card flat>
                      <v-card-text>sample</v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs-items>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

type Data = {
  tab: boolean | null
}

export default Vue.extend({
  data(): Data {
    return {
      tab: null,
    }
  },
})
</script>
