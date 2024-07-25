<template>
  <v-app>
    <LoadingPage />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  created() {
    if (this.$route.query.error !== undefined) {
      this.$router.push(`/login?error=loginerror`)
    }
  },
})
</script>
