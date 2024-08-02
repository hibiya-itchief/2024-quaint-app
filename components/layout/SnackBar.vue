<template>
  <div>
    <v-snackbar
      v-model="success_alert"
      color="success"
      elevation="2"
      timeout="-1"
    >
      {{ $store.state.success_message }}
      <a
        v-show="$store.state.success_snackbar_link"
        :href="$store.state.success_snackbar_link"
        class="link-snackbar"
      >
        取得した整理券を表示
      </a>
      <template #action="{ attrs }">
        <v-btn
          color="white"
          icon
          v-bind="attrs"
          @click="$store.commit('CloseSuccessSnackbar')"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="error_alert" color="red" elevation="2" timeout="-1">
      {{ $store.state.error_message }}
      <a
        v-show="$store.state.error_snackbar_link"
        :href="$store.state.error_snackbar_link"
        class="link-snackbar"
      >
        ログイン
      </a>
      <template #action="{ attrs }">
        <v-btn
          color="white"
          icon
          v-bind="attrs"
          @click="$store.commit('CloseErrorSnackbar')"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
      v-model="internet_success_alert"
      color="success"
      elevation="2"
      timeout="-1"
    >
      {{ $store.state.internet_success_message }}
      <template #action="{ attrs }">
        <v-btn
          color="white"
          icon
          v-bind="attrs"
          @click="$store.commit('CloseInternetSuccessSnackbar')"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
      v-model="internet_error_alert"
      color="orange"
      elevation="2"
      timeout="-1"
    >
      {{ $store.state.internet_error_message }}
      <template #action="{ attrs }">
        <v-btn
          color="white"
          icon
          v-bind="attrs"
          @click="$store.commit('CloseInternetErrorSnackbar')"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    success_alert: {
      get() {
        return this.$store.state.success_alert
      },
    },

    error_alert: {
      get() {
        return this.$store.state.error_alert
      },
    },

    internet_success_alert: {
      get() {
        return this.$store.state.internet_success_alert
      },
    },

    internet_error_alert: {
      get() {
        return this.$store.state.internet_error_alert
      },
    },
  },
})
</script>
