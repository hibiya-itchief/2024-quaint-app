<!--時間外のチケットの数を表示する-->
<template>
  <v-alert type="info" border="top" colored-border color="primary"
    >{{ number }}つの配布時間外チケット</v-alert
  >
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    number: {
      type: Number,
      required: true,
    },
  },
})
</script>
