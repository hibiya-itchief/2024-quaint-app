<template>
  <v-app>
    <h1>設定ページ</h1>
    <v-row justify="center">
      <v-col cols="10">
        <v-card>
          <v-card-title>公演の一括追加</v-card-title>
          <v-card-text class="mx-0 px-0 py-2">
            <v-file-input
              v-model="events_data_csv_input"
              label="csvファイルをアップロード"
              filled
              prepend-icon="mdi-image"
            ></v-file-input>
          </v-card-text>
          <v-card-actions class="ma-0 px-0 py-0">
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="uploadEventsDataCsv()"> 適用 </v-btn>
          </v-card-actions>
        </v-card>
        <v-card>
          <v-card-title> ログ </v-card-title>
          <v-card-subtitle>{{ status }}</v-card-subtitle>
          <v-card-text>
            {{ log }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

type Data = {
  events_data_csv_form: boolean
  events_data_csv_input: any
  log: string
  status: string
}

export default Vue.extend({
  data(): Data {
    return {
      events_data_csv_form: false,
      events_data_csv_input: null,
      log: '',
      status: '入力なし',
    }
  },

  methods: {
    async uploadEventsDataCsv() {
      const data = new FormData()
      data.append('file', this.events_data_csv_input)

      await this.$axios
        .$post('/support/events', data, {
          headers: { 'content-type': 'multipart/form-data' },
        })
        .then((res) => {
          this.log = res.message
          this.status = '成功'
        })
        .catch((e) => {
          this.log = e.response.data.detail
          this.status = 'エラー'
        })
    },
  },
})
</script>
