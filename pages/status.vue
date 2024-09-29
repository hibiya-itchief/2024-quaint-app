<template>
  <v-app>
    <v-container>
      <!--データ読み込みが終わっているか-->
      <div v-if="!nowloading">
        <v-row>
          <v-col>
            <v-card
              class="justify-center"
              cols="10"
              style="background-color: var(--theme-color)"
            >
              <v-row justify="center">
                <v-col cols="12">
                  <v-card-title class="card-title">配布状況一覧</v-card-title>
                </v-col>
              </v-row>

              <!--学年で分けるか、階で分けるかのタブ-->
              <v-tabs
                v-model="mode"
                center-active
                dark
                centered
                background-color="theme_color"
              >
                <v-row justify="center">
                  <v-tab href="#mode-1">階別</v-tab>
                  <v-tab href="#mode-2">学年別</v-tab>
                </v-row>

                <v-tabs-items v-model="mode">
                  <!--階別表示-->
                  <v-tab-item :value="'mode-1'">
                    <v-tabs
                      v-model="tab1"
                      center-active
                      dark
                      centered
                      background-color="theme_color"
                      next-icon="mdi-chevron-right"
                      prev-icon="mdi-chevron-left"
                      show-arrows
                    >
                      <v-tabs-slider></v-tabs-slider>

                      <v-tab href="#tab-1"> 1階 </v-tab>
                      <v-tab href="#tab-2"> 2階 </v-tab>
                      <v-tab href="#tab-3"> 3階 </v-tab>
                      <v-tab href="#tab-4"> 4階 </v-tab>
                      <v-tab href="#tab-0">その他</v-tab>
                    </v-tabs>

                    <v-tabs-items v-model="tab1">
                      <v-tab-item
                        v-for="i in [0, 1, 2, 3, 4]"
                        :key="i"
                        :value="'tab-' + i"
                      >
                        <div v-if="floor_filtered_groups[i].length !== 0">
                          <div
                            v-for="group of floor_filtered_groups[i]"
                            :key="group.id"
                          >
                            <StatusCard
                              :group="group"
                              :all_events="events[group.id]"
                            />
                          </div>
                        </div>
                        <div
                          v-else
                          style="
                            margin-top: 5%;
                            margin-bottom: 5%;
                            margin-left: 2%;
                          "
                        >
                          該当する団体は存在しません
                        </div>
                      </v-tab-item>
                    </v-tabs-items>
                  </v-tab-item>
                  <!--学年別表示-->
                  <v-tab-item :value="'mode-2'">
                    <v-tabs
                      v-model="tab2"
                      center-active
                      dark
                      centered
                      background-color="theme_color"
                      next-icon="mdi-chevron-right"
                      prev-icon="mdi-chevron-left"
                      show-arrows
                    >
                      <v-tabs-slider></v-tabs-slider>

                      <v-tab href="#tab-1"> 第一学年 </v-tab>
                      <v-tab href="#tab-2"> 第二学年 </v-tab>
                      <v-tab href="#tab-3"> 第三学年 </v-tab>
                      <v-tab href="#tab-0">その他</v-tab>
                    </v-tabs>

                    <v-tabs-items v-model="tab2">
                      <v-tab-item
                        v-for="i in [0, 1, 2, 3]"
                        :key="i"
                        :value="'tab-' + i"
                      >
                        <div
                          v-for="group of grade_filtered_groups[i]"
                          :key="group.id"
                        >
                          <StatusCard
                            :group="group"
                            :all_events="events[group.id]"
                          />
                        </div>
                      </v-tab-item>
                    </v-tabs-items>
                  </v-tab-item>
                </v-tabs-items>
              </v-tabs>
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
import { Group, Tag, Event } from 'types/quaint'
import Vue from 'vue'

type Data = {
  tags: Tag[]
  groups: Group[]
  events: { [key: string]: Event[] }
  floor_filtered_groups: [Group[], Group[], Group[], Group[], Group[]]
  grade_filtered_groups: [Group[], Group[], Group[], Group[]]

  tab1: boolean | null
  tab2: boolean | null
  mode: boolean | null
  nowloading: boolean
}

export default Vue.extend({
  name: 'TicketsStatusPage',
  auth: false,

  async asyncData({ $axios }) {
    const groups = await $axios.$get('/groups')
    const tags = await $axios.$get('/tags')

    // eventsを作成(key: group name, object: event)
    const events: { [key: string]: Event[] } = { '': [] }

    for (const group of groups as Group[]) {
      events[group.id] = await $axios.$get('/groups/' + group.id + '/events')
    }

    return { groups, tags, events }
  },

  data(): Data {
    return {
      tags: [],
      groups: [],
      events: { '': [] },
      floor_filtered_groups: [[], [], [], [], []],
      grade_filtered_groups: [[], [], [], []],
      tab1: null,
      tab2: null,
      mode: null,
      nowloading: true,
    }
  },

  created() {
    // 劇の団体を抽出
    // 団体を並び替える
    this.groups = this.groups
      .filter((group) => group.type === 'play' || group.type === 'test')
      .sort((a: Group, b: Group) => {
        // 団体のタイプがクラス劇ではないものは一番うしろに配置
        if (a.type !== 'play') {
          return 1
        }
        if (b.type !== 'play') {
          return -1
        }

        // もしAPIのほうでtype=playの団体に対する命名規則を変更したならこの部分のコードはうまく動かなくなる可能性が高いから注意
        return parseInt(a.id.split('r')[0]) - parseInt(b.id.split('r')[0])
      })

    // 階、学年ごとに分けた配列を作成
    for (const group of this.groups) {
      if (
        group.floor === 1 ||
        group.floor === 2 ||
        group.floor === 3 ||
        group.floor === 4
      ) {
        this.floor_filtered_groups[group.floor].push(group)
      } else {
        this.floor_filtered_groups[0].push(group)
      }

      switch (group.id.slice(0, 1)) {
        case '1':
          this.grade_filtered_groups[1].push(group)
          break
        case '2':
          this.grade_filtered_groups[2].push(group)
          break
        case '3':
          this.grade_filtered_groups[3].push(group)
          break
        default:
          this.grade_filtered_groups[0].push(group)
          break
      }
    }

    this.nowloading = false
  },
})
</script>

<style>
.card-title {
  font-family: serif;
  font-weight: bold;
  font-size: x-large;
  color: #fff;
}
</style>
