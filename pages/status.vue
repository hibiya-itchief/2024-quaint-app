<template>
  <v-app>
    <v-container>
      <div v-if="!now_loading">
        <h1 class="pages-title" style="color: black">配布状況一覧</h1>
        <h2>情報には最大で一分間の遅れがあります。</h2>
        <v-row>
          <v-col>
            <v-card class="justify-center" cols="10">
              <v-tabs
                v-model="tab"
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
                <v-tab href="#tab-0">その他</v-tab>
              </v-tabs>

              <v-tabs-items v-model="tab">
                <v-tab-item
                  v-for="i in [0, 1, 2, 3, 4]"
                  :key="i"
                  :value="'tab-' + i"
                >
                  <div v-for="group of filtered_groups[i]" :key="group.id">
                    <StatusCard :group="group" :all-events="events[group.id]" />
                  </div>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <LoadingPage />
      </div>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Group, Tag, BoardEvent } from 'types/quaint'
import Vue from 'vue'

type Data = {
  tags: Tag[]
  groups: Group[]
  events: { [key: string]: BoardEvent[] }
  filtered_groups: [Group[], Group[], Group[], Group[], Group[]]

  tab: boolean | null
  now_loading: boolean
}

export default Vue.extend({
  data(): Data {
    return {
      tags: [],
      groups: [],
      events: { '': [] },
      filtered_groups: [[], [], [], [], []],
      tab: null,
      now_loading: true,
    }
  },

  async created() {
    // 最新の情報をredisが保持するようにAPIに要請
    await this.$axios.$post('/api/board/update')

    // URLを本番用に置き換える
    this.groups = await this.$axios.$get('/api/board/groups')
    this.tags = await this.$axios.$get('/api/tags')

    // eventsを作成(key:group name, object:event)
    for (const group of this.groups as Group[]) {
      // URLを本番用に置き換える
      this.events[group.id] = await this.$axios.$get(
        '/api/board/groups/' + group.id + '/events'
      )
    }

    // 階ごとに分けた辞書オブジェクトを作成
    for (const group of this.groups) {
      if (
        group.floor === 1 ||
        group.floor === 2 ||
        group.floor === 3 ||
        group.floor === 4
      ) {
        this.filtered_groups[group.floor].push(group)
      } else {
        this.filtered_groups[0].push(group)
      }
    }
    this.now_loading = false
  },
})
</script>
