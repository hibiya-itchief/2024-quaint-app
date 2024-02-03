<template>
  <div>
    <v-snackbar
      v-model="$store.state.success_alert"
      color="success"
      elevation="2"
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
          @click="$store.commit('closeSuccessSnackbar')"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="$store.state.error_alert" color="red" elevation="2">
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
          @click="$store.commit('closeErrorSnackbar')"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
