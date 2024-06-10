<template>
  <v-app>
    <v-row justify="center">
      <v-col cols="10">
        <ToolsBackButton></ToolsBackButton>

        <h1 class="info-title">お知らせ編集</h1>

        <v-card class="mx-1 my-1 px-2 py-2" elevation="1">
          <v-card-title class="ma-0 pa-0">
            <h3 class="mx-0 my-1 pa-0 grey--text text--darken-2">
              <v-icon color="light-blue" class="mr-2">mdi-hammer</v-icon>
              作成
            </h3>
          </v-card-title>
          <v-card-text class="mx-0 px-0 py-2">
            <v-text-field
              v-model="create_news.title"
              label="タイトル"
              counter
              maxlength="50"
              filled
              class="ma-0 pt-1 pb-0"
            >
            </v-text-field>
            <v-text-field
              v-model="create_news.author"
              label="作成者・作成団体"
              counter
              maxlength="50"
              filled
              class="ma-0 pt-1 pb-0"
            >
            </v-text-field>
            <v-text-field
              v-model="create_news.detail"
              label="詳細情報"
              counter
              maxlength="500"
              filled
              class="ma-0 pt-1 pb-0"
            >
            </v-text-field>
          </v-card-text>
          <v-card-actions class="ma-0 px-0 py-0">
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="createNews(create_news)">
              作成
            </v-btn>
          </v-card-actions>
        </v-card>

        <!--お知らせの変更-->
        <v-card class="mx-1 my-1 px-2 py-2" elevation="1">
          <v-card-title class="ma-0 pa-0">
            <h3 class="mx-0 my-1 pa-0 grey--text text--darken-2">
              <v-icon color="light-blue" class="mr-2">mdi-pencil</v-icon>
              変更
            </h3>
          </v-card-title>
          <v-card-text class="mx-0 px-0 py-2">
            <v-select
              v-model="change_selected_title"
              :items="news"
              item-text="title"
              label="変更するお知らせのタイトル"
            >
            </v-select>
            <div v-if="change_news">
              <v-text-field
                v-model="change_news.title"
                label="タイトル"
                counter
                maxlength="50"
                filled
                class="ma-0 pt-1 pb-0"
              >
              </v-text-field>
              <v-text-field
                v-model="change_news.author"
                label="作成者・作成団体"
                counter
                maxlength="50"
                filled
                class="ma-0 pt-1 pb-0"
              >
              </v-text-field>
              <v-text-field
                v-model="change_news.detail"
                label="詳細情報"
                counter
                maxlength="500"
                filled
                class="ma-0 pt-1 pb-0"
              >
              </v-text-field>
            </div>
          </v-card-text>
          <div v-if="change_news">
            <v-card-actions class="ma-0 px-0 py-0">
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="changeNews(change_news)">
                変更
              </v-btn>
            </v-card-actions>
          </div>
        </v-card>

        <!--お知らせの削除-->
        <v-card class="mx-1 my-1 px-2 py-2" elevation="1">
          <v-card-title class="ma-0 pa-0">
            <h3 class="mx-0 my-1 pa-0 grey--text text--darken-2">
              <v-icon color="light-blue" class="mr-2">mdi-delete</v-icon>
              削除
            </h3>
          </v-card-title>
          <v-card-text class="mx-0 px-0 py-2">
            <v-select
              v-model="delete_selected_title"
              :items="news"
              item-text="title"
              label="削除するお知らせのタイトル"
            >
            </v-select>
          </v-card-text>
          <div v-if="delete_selected_title">
            <v-card-actions class="ma-0 px-0 py-0">
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="deleteNews(delete_selected_title)">
                削除
              </v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { News, EditNews } from 'types/quaint'

type Data = {
  create_news: EditNews
  change_news: News | null
  change_selected_title: string | null
  delete_selected_title: string | null
  news: News[]
  user_groups: { admin: string; chief: string }
}

export default Vue.extend({
  data(): Data {
    return {
      create_news: {
        title: 'タイトル',
        author: '作者・作成団体',
        detail: '詳細情報',
      },
      change_news: null,
      change_selected_title: null,
      delete_selected_title: null,
      news: [],
      user_groups: {
        admin: process.env.AZURE_AD_GROUPS_QUAINT_ADMIN as string,
        chief: process.env.AZURE_AD_GROUPS_QUAINT_CHIEF as string,
      },
    }
  },

  watch: {
    change_selected_title: function (news_title: string) {
      const selected_news = this.news.find(
        (element) => element.title === news_title
      )
      if (selected_news) {
        this.change_news = selected_news
      }
    },
  },

  async created() {
    if (
      !(this.$auth.user?.groups as string[]).includes(this.user_groups.admin) &&
      !(this.$auth.user?.groups as string[]).includes(this.user_groups.chief)
    ) {
      this.$nuxt.error({ statusCode: 403, message: 'Forbidden' })
    }

    this.news = await this.$axios.$get('/news/').catch((e) => {
      if (e.response) {
        this.$store.commit('ShowInternetErrorSnackbar', {
          message: e.response.data.detail,
        })
      } else {
        this.$store.commit('ShowInternetErrorSnackbar', {
          message: '予期しないエラーが出ました。',
        })
      }
    })
  },

  methods: {
    createNews(news: EditNews) {
      this.$axios
        .$post('/news/create', news)
        .then(() => {
          this.$store.commit('ShowInternetSuccessSnackbar', {
            message: '作成に成功しました。',
          })
        })
        .catch((e) => {
          if (e.response) {
            this.$store.commit('ShowInternetErrorSnackbar', {
              message: e.response.data.detail,
            })
          } else {
            this.$store.commit('ShowInternetErrorSnackbar', {
              message: '予期しないエラーが出ました。',
            })
          }
        })
    },

    changeNews(news: News) {
      this.$axios
        .$put('/news/' + news.id, news)
        .then(() => {
          this.$store.commit('ShowInternetSuccessSnackbar', {
            message: '変更に成功しました。',
          })
        })
        .catch((e) => {
          if (e.response) {
            this.$store.commit('ShowInternetErrorSnackbar', {
              message: e.response.data.detail,
            })
          } else {
            this.$store.commit('ShowInternetErrorSnackbar', {
              message: '予期しないエラーが出ました。',
            })
          }
        })
    },

    deleteNews(title: string) {
      const selected_news = this.news.find((element) => element.title === title)
      if (selected_news) {
        this.$axios
          .$delete('/news/' + selected_news.id)
          .then(() => {
            this.$store.commit('ShowInternetSuccessSnackbar', {
              message: '削除に成功しました。',
            })
          })
          .catch((e) => {
            if (e.response) {
              this.$store.commit('ShowInternetErrorSnackbar', {
                message: e.response.data.detail,
              })
            } else {
              this.$store.commit('ShowInternetErrorSnackbar', {
                message: '予期しないエラーが出ました。',
              })
            }
          })
      } else {
        this.$store.commit('ShowInternetErrorSnackbar', {
          message: '選択されたタイトルを持つお知らせが存在しません。',
        })
      }
    },
  },
})
</script>
