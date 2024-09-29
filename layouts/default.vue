<template>
  <v-app>
    <client-only>
      <div v-if="app_env !== 'production'" class="app-env">
        <span>@{{ app_env }} </span>
        <span style="font-size: 0.5em">API:{{ api_url }} </span>
      </div>
      <div v-if="$route.path !== '/board'" class="hamburger-box">
        <div
          class="hamburgermenu"
          :class="{ active: drawer_menu }"
          @click="drawer_menu = !drawer_menu"
        >
          <div class="hamburger-btn">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>

      <v-navigation-drawer
        v-model="drawer_menu"
        class="drawer-menu"
        temporary
        fixed
        style="position: fixed"
      >
        <v-list nav dense>
          <v-list-item-group active-class="light-blue--text text--accent-4">
            <v-card v-show="$auth.loggedIn" elevation="0">
              <v-card-title class="px-2 py-1"
                ><v-icon class="mr-4">mdi-account-circle</v-icon
                >{{ $auth.user?.name }}</v-card-title
              >
              <v-card-text class="px-2 py-1">
                <v-chip-group column>
                  <div v-for="user_group in user_groups" :key="user_group.id">
                    <v-chip
                      v-show="$auth.user?.groups?.includes(user_group.id)"
                      outlined
                    >
                      {{ user_group.name }}
                    </v-chip>
                  </div>
                  <!--(
                  user_groups.entry)で同様の処理が可能？
                <v-chip
                  v-show="$auth.user?.jobTitle?.includes('Visited')"
                  outlined
                >
                  校内入場処理済み
                </v-chip>-->
                </v-chip-group>
                <p
                  v-show="$auth.user?.groups?.includes(user_groups.parents.id)"
                  class="ma-0 pa-0 text-caption green--text"
                >
                  登録クラス :
                  <span
                    v-show="
                      $auth.user?.groups?.includes(user_groups.parents_11r.id)
                    "
                    >{{ user_groups.parents_11r.name }}</span
                  >
                  <span
                    v-show="
                      $auth.user?.groups?.includes(user_groups.parents_12r.id)
                    "
                    >{{ user_groups.parents_12r.name }}</span
                  >
                  <span
                    v-show="
                      $auth.user?.groups?.includes(user_groups.parents_13r.id)
                    "
                    >{{ user_groups.parents_13r.name }}</span
                  >
                  <span
                    v-show="
                      $auth.user?.groups?.includes(user_groups.parents_14r.id)
                    "
                    >{{ user_groups.parents_14r.name }}</span
                  >
                  <span
                    v-show="
                      $auth.user?.groups?.includes(user_groups.parents_15r.id)
                    "
                    >{{ user_groups.parents_15r.name }}</span
                  >
                  <span
                    v-show="
                      $auth.user?.groups?.includes(user_groups.parents_16r.id)
                    "
                    >{{ user_groups.parents_16r.name }}</span
                  >
                  <span
                    v-show="
                      $auth.user?.groups?.includes(user_groups.parents_17r.id)
                    "
                    >{{ user_groups.parents_17r.name }}</span
                  >
                  <span
                    v-show="
                      $auth.user?.groups?.includes(user_groups.parents_18r.id)
                    "
                    >{{ user_groups.parents_18r.name }}</span
                  >
                  <span
                    v-show="
                      $auth.user?.groups?.includes(user_groups.parents_21r.id)
                    "
                    >{{ user_groups.parents_21r.name }}</span
                  >
                  <span
                    v-show="
                      $auth.user?.groups?.includes(user_groups.parents_22r.id)
                    "
                    >{{ user_groups.parents_22r.name }}</span
                  >
                  <span
                    v-show="
                      $auth.user?.groups?.includes(user_groups.parents_23r.id)
                    "
                    >{{ user_groups.parents_23r.name }}</span
                  >
                  <span
                    v-show="
                      $auth.user?.groups?.includes(user_groups.parents_24r.id)
                    "
                    >{{ user_groups.parents_24r.name }}</span
                  >
                  <span
                    v-show="
                      $auth.user?.groups?.includes(user_groups.parents_25r.id)
                    "
                    >{{ user_groups.parents_25r.name }}</span
                  >
                  <span
                    v-show="
                      $auth.user?.groups?.includes(user_groups.parents_26r.id)
                    "
                    >{{ user_groups.parents_26r.name }}</span
                  >
                  <span
                    v-show="
                      $auth.user?.groups?.includes(user_groups.parents_27r.id)
                    "
                    >{{ user_groups.parents_27r.name }}</span
                  >
                  <span
                    v-show="
                      $auth.user?.groups?.includes(user_groups.parents_28r.id)
                    "
                    >{{ user_groups.parents_28r.name }}</span
                  >
                  <span
                    v-show="
                      $auth.user?.groups?.includes(user_groups.parents_31r.id)
                    "
                    >{{ user_groups.parents_31r.name }}</span
                  >
                  <span
                    v-show="
                      $auth.user?.groups?.includes(user_groups.parents_32r.id)
                    "
                    >{{ user_groups.parents_32r.name }}</span
                  >
                  <span
                    v-show="
                      $auth.user?.groups?.includes(user_groups.parents_33r.id)
                    "
                    >{{ user_groups.parents_33r.name }}</span
                  >
                  <span
                    v-show="
                      $auth.user?.groups?.includes(user_groups.parents_34r.id)
                    "
                    >{{ user_groups.parents_34r.name }}</span
                  >
                  <span
                    v-show="
                      $auth.user?.groups?.includes(user_groups.parents_35r.id)
                    "
                    >{{ user_groups.parents_35r.name }}</span
                  >
                  <span
                    v-show="
                      $auth.user?.groups?.includes(user_groups.parents_36r.id)
                    "
                    >{{ user_groups.parents_36r.name }}</span
                  >
                  <span
                    v-show="
                      $auth.user?.groups?.includes(user_groups.parents_37r.id)
                    "
                    >{{ user_groups.parents_37r.name }}</span
                  >
                  <span
                    v-show="
                      $auth.user?.groups?.includes(user_groups.parents_38r.id)
                    "
                    >{{ user_groups.parents_38r.name }}</span
                  >
                  <!--ADの場合ユーザーオブジェクトIDはoidに入ってる-->
                </p>
                <!-- 以下の部分は保護者が正常に登録されているか -->
                <!--
                <p
                  v-show="registered_class_synchronization"
                  class="ma-0 pa-0 text-caption green--text"
                >
                  クラス登録状況 : 正常
                </p>
                <p
                  v-show="
                    !registered_class_synchronization &&
                    $auth.user?.groups?.includes(user_groups.parents.id)
                  "
                  class="ma-0 pa-0 text-caption red--text"
                >
                  クラスの登録状況に異常があります。IT委員会にお声がけください。
                </p>
                -->
                <p class="ma-0 pa-0 text-caption grey--text">
                  ユーザーID：{{ $auth.user?.oid ?? $auth.user?.sub }}
                  <!--ADの場合ユーザーオブジェクトIDはoidに入ってる-->
                </p>
                <p
                  v-show="$auth.user?.groups?.includes(user_groups.admin.id)"
                  class="ma-0 pa-0 text-caption grey--text"
                >
                  <a @click="revealToken()">APIトークンを表示</a>
                </p>
              </v-card-text>
              <v-card-actions>
                <v-row>
                  <v-col cols="10">
                    <v-btn
                      v-show="
                        $auth.user?.groups?.includes(user_groups.admin.id)
                      "
                      outlined
                      color="primary"
                      to="/admin"
                    >
                      管理者用画面
                    </v-btn>
                    <v-spacer></v-spacer>

                    <v-btn
                      v-show="
                        $auth.user?.groups?.includes(user_groups.admin.id) ||
                        $auth.user?.groups?.includes(user_groups.chief.id)
                      "
                      outlined
                      color="primary"
                      to="/manage"
                    >
                      サイト管理
                    </v-btn>
                    <v-spacer></v-spacer>

                    <v-btn outlined color="primary" @click="logout()">
                      ログアウト
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>

            <v-card v-show="!$auth.loggedIn" elevation="0">
              <v-card-title class="px-2 py-1"
                ><v-icon class="mr-4">mdi-account-circle</v-icon
                ><span class="grey--text text-caption"
                  >ログインしていません</span
                ></v-card-title
              >
              <v-card-text class="px-2 py-1"> </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn outlined color="primary" to="/login"> ログイン </v-btn>
              </v-card-actions>
            </v-card>

            <v-divider></v-divider>
            <v-list-item v-for="page in pages" :key="page.icon" :to="page.link">
              <v-list-item-icon>
                <v-icon color="theme_color">{{ page.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title
                style="font-family: serif; font-weight: bold"
                >{{ page.text }}</v-list-item-title
              >
            </v-list-item>
            <!-- 9/12のテストに向けて生徒も投票可能に -->
            <v-list-item
              v-show="
                $auth.user?.groups?.includes(user_groups.parents.id) ||
                $auth.user?.groups?.includes(user_groups.guest.id)
              "
              to="/votes"
            >
              <v-list-item-icon>
                <v-icon color="theme_color">mdi-vote</v-icon>
              </v-list-item-icon>
              <v-list-item-title style="font-family: serif; font-weight: bold">
                投票
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              v-show="$auth.user?.groups?.includes(user_groups.students.id)"
              to="/tickets/intoScanner"
            >
              <v-list-item-icon>
                <v-icon color="theme_color">mdi-qrcode-scan</v-icon>
              </v-list-item-icon>
              <v-list-item-title style="font-family: serif; font-weight: bold">
                QRコード
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <template #append>
          <div class="pa-0">
            <v-list nav dense>
              <v-list-item-group active-class="light-blue--text text--accent-4">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-clipboard-text</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title
                    ><a
                      style="text-decoration: none; color: inherit"
                      href="https://forms.gle/QuoXv1eyiPiuHMnm9"
                      >フィードバック</a
                    ></v-list-item-title
                  >
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-chat-question-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title
                    ><a
                      style="text-decoration: none; color: inherit"
                      href="https://forms.gle/2Hhbt91csiwk5Rdi9"
                      >お問い合わせ</a
                    ></v-list-item-title
                  >
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>mdi-github</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title
                    ><a
                      style="text-decoration: none; color: inherit"
                      href="https://github.com/hibiya-itchief"
                      >GitHub</a
                    ></v-list-item-title
                  >
                </v-list-item>

                <v-divider></v-divider>
                <p class="ma-0 pa-0 text-caption grey--text">
                  © 2024 東京都立日比谷高等学校 IT委員会 | IT Chief | Tokyo
                  Metropolitan Hibiya High School
                </p>
              </v-list-item-group>
            </v-list>
          </div>
        </template>
      </v-navigation-drawer>

      <v-main>
        <Nuxt class="main-content" />
      </v-main>

      <v-bottom-navigation
        v-if="$route.path !== '/board'"
        color="theme_color"
        fixed
        app
      >
        <v-btn to="/">
          <span>ホーム</span>
          <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn to="/groups">
          <span>探す</span>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn to="/tickets">
          <span>整理券</span>
          <v-icon>mdi-ticket</v-icon>
        </v-btn>

        <v-btn to="/status">
          <span>配布状況</span>
          <v-icon>mdi-list-status</v-icon>
        </v-btn>
      </v-bottom-navigation>

      <LayoutSnackBar />
    </client-only>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { User } from '~/types/quaint'

export default Vue.extend({
  name: 'DefaultLayout',
  data() {
    return {
      drawer_menu: false,
      registered_class_synchronization: false,
      user_groups: {
        admin: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_ADMIN as string,
          name: '管理者',
        },
        entry: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_ENTRY as string,
          name: 'entry',
        },
        owner: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_OWNER as string,
          name: '団体代表',
        },
        parents: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS as string,
          name: '保護者',
        },
        students: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_STUDENTS as string,
          name: '生徒',
        },
        teachers: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_TEACHERS as string,
          name: '教師',
        },
        chief: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_CHIEF as string,
          name: 'チーフ',
        },
        guest: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_GUEST as string,
          name: 'ゲスト',
        },
        // 各クラス保護者登録
        // 一年
        parents_11r: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS_11R as string,
          name: '11r',
        },
        parents_12r: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS_12R as string,
          name: '12r',
        },
        parents_13r: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS_13R as string,
          name: '13r',
        },
        parents_14r: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS_14R as string,
          name: '14r',
        },
        parents_15r: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS_15R as string,
          name: '15r',
        },
        parents_16r: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS_16R as string,
          name: '16r',
        },
        parents_17r: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS_17R as string,
          name: '17r',
        },
        parents_18r: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS_18R as string,
          name: '18r',
        },
        // 二年
        parents_21r: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS_21R as string,
          name: '21r',
        },
        parents_22r: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS_22R as string,
          name: '22r',
        },
        parents_23r: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS_23R as string,
          name: '23r',
        },
        parents_24r: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS_24R as string,
          name: '24r',
        },
        parents_25r: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS_25R as string,
          name: '25r',
        },
        parents_26r: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS_26R as string,
          name: '26r',
        },
        parents_27r: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS_27R as string,
          name: '27r',
        },
        parents_28r: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS_28R as string,
          name: '28r',
        },
        // 三年
        parents_31r: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS_31R as string,
          name: '31r',
        },
        parents_32r: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS_32R as string,
          name: '32r',
        },
        parents_33r: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS_33R as string,
          name: '33r',
        },
        parents_34r: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS_34R as string,
          name: '34r',
        },
        parents_35r: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS_35R as string,
          name: '35r',
        },
        parents_36r: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS_36R as string,
          name: '36r',
        },
        parents_37r: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS_37R as string,
          name: '37r',
        },
        parents_38r: {
          id: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS_38R as string,
          name: '38r',
        },
      },
      app_env: process.env.QUAINT_ENV,
      api_url: process.env.BASEURL,
      pages: [
        { icon: 'mdi-hexagon-outline', text: '星陵祭とは', link: '/about' },
        {
          icon: 'mdi-ticket-confirmation',
          text: '整理券制度',
          link: '/system',
        },
        { icon: 'mdi-train', text: 'アクセス', link: '/access' },
        { icon: 'mdi-map', text: '校内マップ', link: '/map' },
        { icon: 'mdi-clock', text: 'スケジュール', link: '/schedule' },
        {
          icon: 'mdi-tooltip-question-outline',
          text: 'ヘルプ',
          link: '/help',
        },
      ],
    }
  },
  head() {
    return {
      meta: [
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://2024.seiryofes.com' + this.$route.fullPath,
        },
      ],
    }
  },
  mounted() {
    if (this.$auth.loggedIn && this.$auth.user?.sub === undefined) {
      const base64_url = (this.$auth.strategy as any).token.get().split('.')[1] // https://auth.nuxtjs.org/api/auth/#:~:text=Token%20and%20Refresh%20Token%20are%20available%20on%20%24auth.strategy.token
      const base64 = base64_url.replace(/-/g, '+').replace(/_/g, '/')
      this.$auth.setUser(JSON.parse(decodeURIComponent(window.atob(base64))))
    }

    // $axios.user.groupsのtypeがunknownになってしまうため無理やり型を当てはめる
    /*
    const user = this.$auth.user as User
    if (user) {
      if (user.groups.includes(this.user_groups.parents.id)) {
        this.checkSynchronization(user)
      }
    }
    */
  },
  methods: {
    revealToken() {
      window.open(
        'https://jwt.io/?token=' +
          (this.$auth.strategy as any).token.get().split(' ').slice(-1)[0]
      )
    },

    async checkSynchronization(user: User) {
      /*
      バックエンドとの保護者のクラス登録状況が一致しているかを確認する
      一致していない場合、フロントとバックエンドのどちらかで保護者のクラスグループのオブジェクトIDで間違ったものを使っていると考えられる
       */
      if (user.groups.includes(this.user_groups.parents_11r.id)) {
        await this.$axios
          .$get('/users/me/family/belong/11r')
          .then((res) => {
            this.registered_class_synchronization = res
          })
          .catch(() => {
            this.registered_class_synchronization = false
          })
      } else if (user.groups.includes(this.user_groups.parents_12r.id)) {
        await this.$axios
          .$get('/users/me/family/belong/12r')
          .then((res) => {
            this.registered_class_synchronization = res
          })
          .catch(() => {
            this.registered_class_synchronization = false
          })
      } else if (user.groups.includes(this.user_groups.parents_13r.id)) {
        await this.$axios
          .$get('/users/me/family/belong/13r')
          .then((res) => {
            this.registered_class_synchronization = res
          })
          .catch(() => {
            this.registered_class_synchronization = false
          })
      } else if (user.groups.includes(this.user_groups.parents_14r.id)) {
        await this.$axios
          .$get('/users/me/family/belong/14r')
          .then((res) => {
            this.registered_class_synchronization = res
          })
          .catch(() => {
            this.registered_class_synchronization = false
          })
      } else if (user.groups.includes(this.user_groups.parents_15r.id)) {
        await this.$axios
          .$get('/users/me/family/belong/15r')
          .then((res) => {
            this.registered_class_synchronization = res
          })
          .catch(() => {
            this.registered_class_synchronization = false
          })
      } else if (user.groups.includes(this.user_groups.parents_16r.id)) {
        await this.$axios
          .$get('/users/me/family/belong/16r')
          .then((res) => {
            this.registered_class_synchronization = res
          })
          .catch(() => {
            this.registered_class_synchronization = false
          })
      } else if (user.groups.includes(this.user_groups.parents_17r.id)) {
        await this.$axios
          .$get('/users/me/family/belong/17r')
          .then((res) => {
            this.registered_class_synchronization = res
          })
          .catch(() => {
            this.registered_class_synchronization = false
          })
      } else if (user.groups.includes(this.user_groups.parents_18r.id)) {
        await this.$axios
          .$get('/users/me/family/belong/18r')
          .then((res) => {
            this.registered_class_synchronization = res
          })
          .catch(() => {
            this.registered_class_synchronization = false
          })
      } else if (user.groups.includes(this.user_groups.parents_21r.id)) {
        await this.$axios
          .$get('/users/me/family/belong/21r')
          .then((res) => {
            this.registered_class_synchronization = res
          })
          .catch(() => {
            this.registered_class_synchronization = false
          })
      } else if (user.groups.includes(this.user_groups.parents_22r.id)) {
        await this.$axios
          .$get('/users/me/family/belong/22r')
          .then((res) => {
            this.registered_class_synchronization = res
          })
          .catch(() => {
            this.registered_class_synchronization = false
          })
      } else if (user.groups.includes(this.user_groups.parents_23r.id)) {
        await this.$axios
          .$get('/users/me/family/belong/23r')
          .then((res) => {
            this.registered_class_synchronization = res
          })
          .catch(() => {
            this.registered_class_synchronization = false
          })
      } else if (user.groups.includes(this.user_groups.parents_24r.id)) {
        await this.$axios
          .$get('/users/me/family/belong/24r')
          .then((res) => {
            this.registered_class_synchronization = res
          })
          .catch(() => {
            this.registered_class_synchronization = false
          })
      } else if (user.groups.includes(this.user_groups.parents_25r.id)) {
        await this.$axios
          .$get('/users/me/family/belong/25r')
          .then((res) => {
            this.registered_class_synchronization = res
          })
          .catch(() => {
            this.registered_class_synchronization = false
          })
      } else if (user.groups.includes(this.user_groups.parents_26r.id)) {
        await this.$axios
          .$get('/users/me/family/belong/26r')
          .then((res) => {
            this.registered_class_synchronization = res
          })
          .catch(() => {
            this.registered_class_synchronization = false
          })
      } else if (user.groups.includes(this.user_groups.parents_27r.id)) {
        await this.$axios
          .$get('/users/me/family/belong/27r')
          .then((res) => {
            this.registered_class_synchronization = res
          })
          .catch(() => {
            this.registered_class_synchronization = false
          })
      } else if (user.groups.includes(this.user_groups.parents_28r.id)) {
        await this.$axios
          .$get('/users/me/family/belong/28r')
          .then((res) => {
            this.registered_class_synchronization = res
          })
          .catch(() => {
            this.registered_class_synchronization = false
          })
      } else if (user.groups.includes(this.user_groups.parents_31r.id)) {
        await this.$axios
          .$get('/users/me/family/belong/31r')
          .then((res) => {
            this.registered_class_synchronization = res
          })
          .catch(() => {
            this.registered_class_synchronization = false
          })
      } else if (user.groups.includes(this.user_groups.parents_32r.id)) {
        await this.$axios
          .$get('/users/me/family/belong/32r')
          .then((res) => {
            this.registered_class_synchronization = res
          })
          .catch(() => {
            this.registered_class_synchronization = false
          })
      } else if (user.groups.includes(this.user_groups.parents_33r.id)) {
        await this.$axios
          .$get('/users/me/family/belong/33r')
          .then((res) => {
            this.registered_class_synchronization = res
          })
          .catch(() => {
            this.registered_class_synchronization = false
          })
      } else if (user.groups.includes(this.user_groups.parents_34r.id)) {
        await this.$axios
          .$get('/users/me/family/belong/34r')
          .then((res) => {
            this.registered_class_synchronization = res
          })
          .catch(() => {
            this.registered_class_synchronization = false
          })
      } else if (user.groups.includes(this.user_groups.parents_35r.id)) {
        await this.$axios
          .$get('/users/me/family/belong/35r')
          .then((res) => {
            this.registered_class_synchronization = res
          })
          .catch(() => {
            this.registered_class_synchronization = false
          })
      } else if (user.groups.includes(this.user_groups.parents_36r.id)) {
        await this.$axios
          .$get('/users/me/family/belong/36r')
          .then((res) => {
            this.registered_class_synchronization = res
          })
          .catch(() => {
            this.registered_class_synchronization = false
          })
      } else if (user.groups.includes(this.user_groups.parents_37r.id)) {
        await this.$axios
          .$get('/users/me/family/belong/37r')
          .then((res) => {
            this.registered_class_synchronization = res
          })
          .catch(() => {
            this.registered_class_synchronization = false
          })
      } else if (user.groups.includes(this.user_groups.parents_38r.id)) {
        await this.$axios
          .$get('/users/me/family/belong/38r')
          .then((res) => {
            this.registered_class_synchronization = res
          })
          .catch(() => {
            this.registered_class_synchronization = false
          })
      }
    },

    async logout() {
      await this.$auth.logout()
    },
  },
})
</script>

<style>
/* v-app-barを削除すると、v-bottom-navigationのボタンが上にずれ、背景の色が正しくならないので不本意ながらカスタムcssを追加 */
.v-item-group.v-bottom-navigation .v-btn {
  background-color: transparent;
  border-radius: 0;
  box-shadow: none;
  flex: 0 1 auto;
  font-size: 0.75rem;
  height: inherit;
  max-width: 168px;
  min-width: 80px;
  position: relative;
  text-transform: none;
  font-weight: bold;
}

.app-env {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1500;
  padding: 0.5rem;
  background-color: #ffd900;
  border-radius: 0 0 0 5px;
  font-size: 0.8rem;
  font-weight: bold;
  color: #f00;
  animation: blinking 1s ease-in-out infinite alternate;
}

@keyframes blinking {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.hamburger-box {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.hamburgermenu {
  position: relative; /* ボタン内側の基点となるためrelativeを指定 */
  background: #fff;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 0 0 20px;
}

/* ボタン内側 */
.hamburgermenu .hamburger-btn {
  transition: all 0.6s; /* アニメーションの設定 */
  width: 50px;
  height: 50px;
}

.hamburgermenu span {
  display: inline-block;
  transition: all 0.4s;
  position: absolute;
  left: 14px;
  height: 3px;
  border-radius: 2px;
  background: #335594;
  width: 45%;
}

.hamburgermenu span:nth-of-type(1) {
  top: 15px;
}

.hamburgermenu span:nth-of-type(2) {
  top: 23px;
}

.hamburgermenu span:nth-of-type(3) {
  top: 31px;
}

/* activeクラスが付与されると .openbtn-areaが360度回転し、その中の線が回転して×に */
.hamburgermenu.active .hamburger-btn {
  transform: rotate(360deg);
}

.hamburgermenu.active span:nth-of-type(1) {
  top: 18px;
  left: 18px;
  transform: translateY(6px) rotate(-45deg);
  width: 30%;
}

.hamburgermenu.active span:nth-of-type(2) {
  opacity: 0;
}

.hamburgermenu.active span:nth-of-type(3) {
  top: 30px;
  left: 18px;
  transform: translateY(-6px) rotate(45deg);
  width: 30%;
}

/* ハンバーガーメニューを開くボタンのためのスペース */
.drawer-menu {
  padding-top: 40px;
}

.main-content {
  padding-top: 40px;
}
</style>
