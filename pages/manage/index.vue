<template>
  <v-app>
    <v-row justify="center">
      <v-col cols="10">
        <h1>サイト管理</h1>
        <p>権限のあるチーフおよび管理者が閲覧可能</p>

        <div>
          <NuxtLink to="/votes/result">投票結果確認</NuxtLink>
        </div>
        <div>
          <NuxtLink to="/news">お知らせ管理</NuxtLink>
        </div>
      </v-col>
    </v-row>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

type Data = {
  user_groups: { admin: string; chief: string }
}

export default Vue.extend({
  data(): Data {
    return {
      user_groups: {
        admin: process.env.AZURE_AD_GROUPS_QUAINT_ADMIN as string,
        chief: process.env.AZURE_AD_GROUPS_QUAINT_CHIEF as string,
      },
    }
  },

  created() {
    if (
      !(this.$auth.user?.groups as string[]).includes(this.user_groups.admin) &&
      !(this.$auth.user?.groups as string[]).includes(this.user_groups.chief)
    ) {
      this.$nuxt.error({ statusCode: 403, message: 'Forbidden' })
    }
  },
})
</script>
