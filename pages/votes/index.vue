<template>
  <v-app>
    <div v-if="!now_loading">
      <v-row justify="center">
        <v-col cols="10">
          <ToolsBackButton></ToolsBackButton>
          <h1 class="info-title">投票</h1>
          <p>
            整理券を取得した2つの団体まで投票できます。取得した整理券の公演が終わってからのみ投票可能です。三年生の演劇については投票は行なっておりません。投票は取り消すことができません。慎重に行なってください。
          </p>

          <v-card>
            <v-list v-if="saw_groups.length">
              <v-list-item v-for="group of saw_groups" :key="group.id" two-line>
                <v-list-item-content>
                  <div v-if="$vuetify.breakpoint.xs">
                    <v-row>
                      <v-col cols="8">
                        <v-list-item-title>{{ group.title }}</v-list-item-title>
                        <v-list-item-subtitle>{{
                          group.groupname
                        }}</v-list-item-subtitle>
                      </v-col>
                      <v-col cols="4">
                        <div v-if="votable[group.id]">
                          <v-btn
                            depressed
                            color="primary"
                            outlined
                            @click="createVote(group.id)"
                            >投票</v-btn
                          >
                        </div>
                        <div v-else>
                          <v-btn depressed color="primary" outlined disabled
                            >不可</v-btn
                          >
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                  <div v-else>
                    <v-row>
                      <v-col cols="9">
                        <v-list-item-title>{{ group.title }}</v-list-item-title>
                        <v-list-item-subtitle>{{
                          group.groupname
                        }}</v-list-item-subtitle>
                      </v-col>
                      <v-col cols="3">
                        <div v-if="votable[group.id] && vote_count < 2">
                          <v-btn
                            depressed
                            color="primary"
                            outlined
                            @click="createVote(group.id)"
                            >投票</v-btn
                          >
                        </div>
                        <div v-else>
                          <v-btn depressed color="primary" outlined disabled
                            >投票不可</v-btn
                          >
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <div v-else>
              <p>投票可能な団体がありません</p>
            </div>
          </v-card>
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
import { Group, Ticket } from '~/types/quaint'

type Data = {
  groups: Group[]
  saw_groups: Group[]
  taken_tickets: Ticket[]
  now_loading: boolean
  votable: { [group_id: string]: boolean } // {"group_id":"votable"}の形で投票可能かを保存する
  vote_count: number // ユーザーが投票した数 -> まだ投票できるかの判定に利用
  user_groups: {
    admin: string
    parents: string
    guest: string
    students: string
  }
}

export default Vue.extend({
  async asyncData({ $axios, payload }): Promise<Partial<Data>> {
    if (payload !== undefined) {
      // nuxt generate時の操作という意味
      return { groups: payload.groups }
    }
    const res = await $axios.$get('/groups')
    return { groups: res }
  },

  data(): Data {
    return {
      groups: [],
      saw_groups: [],
      taken_tickets: [],
      now_loading: true,
      votable: {},
      vote_count: 0,
      user_groups: {
        admin: process.env.AZURE_AD_GROUPS_QUAINT_ADMIN as string,
        parents: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS as string,
        guest: process.env.AZURE_AD_GROUPS_QUAINT_GUEST as string,
        students: process.env.AZURE_AD_GROUPS_QUAINT_STUDENTS as string,
      },
    }
  },

  async created() {
    // 権限確認
    // 9/12日のテストのためstudentsも許可
    if (
      !(
        (this.$auth.user?.groups as string[]).includes(
          this.user_groups.admin
        ) ||
        (this.$auth.user?.groups as string[]).includes(
          this.user_groups.parents
        ) ||
        (this.$auth.user?.groups as string[]).includes(
          this.user_groups.guest
        ) ||
        (this.$auth.user?.groups as string[]).includes(
          this.user_groups.students
        )
      )
    ) {
      this.$nuxt.error({ statusCode: 403, message: 'Forbidden' })
    }

    this.vote_count = await this.$axios.$get('/users/me/count/votes')
    this.taken_tickets = await this.$axios.$get('/users/me/tickets') // ←used状態のものも使えるようにする

    for (const ticket of this.taken_tickets as Ticket[]) {
      if (ticket.status === 'active' || ticket.status === 'used') {
        const group = this.groups.find((group) => group.id === ticket.group_id)
        if (group) {
          // 投票可能な団体 ^ saw_groupsの中にその団体がまだ格納されていないなら
          if (group.enable_vote && !this.saw_groups.includes(group)) {
            this.saw_groups.push(group)

            // ユーザーが二回投票していないかつその団体に投票可能 -> 団体に投票できる
            if (
              this.vote_count < 2 &&
              (await this.$axios.$get('/users/me/votes/' + group.id)) === true
            ) {
              this.votable[group.id] = true
            } else {
              this.votable[group.id] = false
            }
          }
        }
      }
    }

    this.now_loading = false
  },

  methods: {
    createVote(id: string) {
      this.$axios
        .$post('/votes?group_id=' + id)
        .then(() => {
          this.$store.commit('ShowInternetSuccessSnackbar', {
            message:
              this.groups.find((group) => group.id === id)?.groupname +
              'に投票しました',
          })
          this.votable[id] = false
          this.vote_count += 1

          // ページを再描画する
          this.now_loading = true
          this.now_loading = false
        })
        .catch((e) => {
          if (e.response) {
            this.$store.commit('ShowInternetErrorSnackbar', {
              message: e.response.data.detail,
            })
          } else {
            this.$store.commit('ShowInternetErrorSnackbar', {
              message:
                '予期せぬエラーが発生しました。IT委員にお声がけください🙇‍♂️',
            })
          }
        })
    },
  },
})
</script>
