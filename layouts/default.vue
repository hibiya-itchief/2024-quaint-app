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
                  <v-chip
                    v-show="$auth.user?.groups?.includes(user_groups.admin)"
                    outlined
                  >
                    👑Admin
                  </v-chip>
                  <v-chip
                    v-show="$auth.user?.groups?.includes(user_groups.owner)"
                    outlined
                  >
                    団体代表者
                  </v-chip>
                  <v-chip
                    v-show="$auth.user?.groups?.includes(user_groups.parents)"
                    outlined
                  >
                    保護者用アカウント
                  </v-chip>
                  <v-chip
                    v-show="$auth.user?.groups?.includes(user_groups.students)"
                    outlined
                  >
                    生徒用アカウント
                  </v-chip>
                  <v-chip
                    v-show="$auth.user?.groups?.includes(user_groups.teachers)"
                    outlined
                  >
                    先生用アカウント
                  </v-chip>
                  <v-chip
                    v-show="$auth.user?.groups?.includes(user_groups.chief)"
                    outlined
                  >
                    チーフ会
                  </v-chip>
                  <v-chip
                    v-show="$auth.user?.groups?.includes(user_groups.guest)"
                    outlined
                  >
                    ゲスト
                  </v-chip>
                  <!--(
                  user_groups.entry)で同様の処理が可能？
                <v-chip
                  v-show="$auth.user?.jobTitle?.includes('Visited')"
                  outlined
                >
                  校内入場処理済み
                </v-chip>-->
                </v-chip-group>
                <p class="ma-0 pa-0 text-caption grey--text">
                  ユーザーID：{{ $auth.user?.oid ?? $auth.user?.sub }}
                  <!--ADの場合ユーザーオブジェクトIDはoidに入ってる-->
                </p>
                <p
                  v-show="$auth.user?.groups?.includes(user_groups.admin)"
                  class="ma-0 pa-0 text-caption grey--text"
                >
                  <a @click="revealToken()">APIトークンを表示</a>
                </p>
              </v-card-text>
              <v-card-actions>
                <v-row>
                  <v-col cols="10">
                    <v-btn
                      v-show="$auth.user?.groups?.includes(user_groups.admin)"
                      outlined
                      color="primary"
                      to="/admin"
                    >
                      管理者用画面
                    </v-btn>
                    <v-spacer></v-spacer>

                    <v-btn
                      v-show="
                        $auth.user?.groups?.includes(user_groups.admin) ||
                        $auth.user?.groups?.includes(user_groups.chief)
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
                      href="https://forms.gle/aRv81UtSCSgS2gHq8"
                      >フィードバック</a
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

export default Vue.extend({
  name: 'DefaultLayout',
  data() {
    return {
      drawer_menu: false,
      user_groups: {
        admin: process.env.AZURE_AD_GROUPS_QUAINT_ADMIN as string,
        entry: process.env.AZURE_AD_GROUPS_QUAINT_ENTRY as string,
        owner: process.env.AZURE_AD_GROUPS_QUAINT_OWNER as string,
        parents: process.env.AZURE_AD_GROUPS_QUAINT_PARENTS as string,
        students: process.env.AZURE_AD_GROUPS_QUAINT_STUDENTS as string,
        teachers: process.env.AZURE_AD_GROUPS_QUAINT_TEACHERS as string,
        chief: process.env.AZURE_AD_GROUPS_QUAINT_CHIEF as string,
        guest: process.env.AZURE_AD_GROUPS_QUAINT_GUEST as string,
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
        {
          icon: 'mdi-vote',
          text: '投票',
          link: '/votes',
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
  },
  methods: {
    revealToken() {
      window.open(
        'https://jwt.io/?token=' +
          (this.$auth.strategy as any).token.get().split(' ').slice(-1)[0]
      )
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
