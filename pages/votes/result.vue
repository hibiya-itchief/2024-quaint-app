<template>
  <v-app>
    <div v-if="!now_loading">
      <v-row justify="center">
        <v-col cols="10">
          <h1>投票結果(管理者・チーフ会のみ閲覧可能)</h1>
        </v-col>
        <v-col cols="12">
          <v-list>
            <div v-if="$vuetify.breakpoint.xs">
              <v-list-item v-for="group of groups" :key="group.id" three-line>
                <v-list-item-content>
                  <v-list-item-title>{{ group.groupname }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    result[group.id]
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </div>
            <div v-else>
              <v-list-item v-for="group of groups" :key="group.id">
                <v-list-item-title>{{ group.groupname }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  result[group.id]
                }}</v-list-item-subtitle>
              </v-list-item>
            </div>
          </v-list>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <LoadingPage />
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { Group } from '~/types/quaint'

type Data = {
  groups: Group[]
  result: { [group_id: string]: number } // 投票結果を格納するdictionary
  user_groups: { admin: string; chief: string }
  now_loading: boolean
}

export default Vue.extend({
  async asyncData({ $axios, payload }): Promise<Partial<Data>> {
    if (payload !== undefined) {
      // nuxt generate時の操作という意味
      return { groups: payload.groups }
    }
    const groups = await $axios.$get('/groups')

    const result: { [group_id: string]: number } = {}
    // resultを作成する
    for (const group of groups) {
      result[group.id] = await $axios.$get('/votes/' + group.id)
    }

    return { groups, result }
  },

  data(): Data {
    return {
      groups: [],
      result: {},
      user_groups: {
        admin: process.env.AZURE_AD_GROUPS_QUAINT_ADMIN as string,
        chief: process.env.AZURE_AD_GROUPS_QUAINT_CHIEF as string,
      },
      now_loading: true,
    }
  },

  created() {
    if (
      !(this.$auth.user?.groups as string[]).includes(this.user_groups.admin) &&
      !(this.$auth.user?.groups as string[]).includes(this.user_groups.chief)
    ) {
      this.$nuxt.error({ statusCode: 403, message: 'Forbidden' })
    }

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

    this.now_loading = false
  },
})
</script>
