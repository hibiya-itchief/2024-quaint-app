<template>
  <v-app>
    <!-- 次にvideoを追加するときのサンプルとするために2023年度版のものを取っておきます-->
    <!--
    <div v-if="show_video" class="splash-video">
      <video
        src="/images/sairai_short2.mp4"
        webkit-playsinline
        playsinline
        autoplay
        muted
      ></video>
    </div>
  -->
    <v-row justify="center">
      <v-col cols="12">
        <!-- 2023年度版の画像が使われているので2024年度版のものができたら変更 -->
        <v-parallax src="/images/topBackground2.jpg" height="600">
          <v-row align="center" justify="center">
            <v-col cols="10" md="5" sm="10">
              <v-card class="text-center">
                <v-card-title class="justify-center"
                  >日比谷高校文化祭</v-card-title
                >
                <!-- 2023年度のものをサンプルとして取っておきます
                <v-img src="/images/Sairai.jpeg"></v-img>
                -->
                <v-card-title class="justify-center">星陵祭2024</v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-parallax>
      </v-col>

      <v-col cols="10">
        <h1 class="info-title" style="margin-bottom: 20px">News</h1>
        <!--最大10コのnewsを表示する-->
        <div v-for="i in shown_news" :key="i.id">
          <div v-if="$vuetify.breakpoint.xs">
            <v-divider></v-divider>
            <v-row style="margin-top: 5px; margin-bottom: 5px">
              <v-col cols="4">
                {{ dateFormatter(i.timestamp) }}

                {{ timeFormatter(i.timestamp) }}
              </v-col>
              <v-col cols="8">
                <NuxtLink :to="'/news/' + i.id">{{ i.title }}</NuxtLink>
              </v-col>
            </v-row>
          </div>
          <div v-else>
            <v-divider></v-divider>
            <v-row style="margin-top: 5px; margin-bottom: 5px">
              <v-col cols="2">
                {{ dateFormatter(i.timestamp) }}

                {{ timeFormatter(i.timestamp) }}
              </v-col>
              <v-col cols="3">{{ i.author }}</v-col>
              <v-col cols="7">
                <NuxtLink :to="'/news/' + i.id">{{ i.title }}</NuxtLink>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col>

      <v-col cols="10">
        <h1 class="info-title">開催概要</h1>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <h2 class="info-subtitle">令和6年度</h2>
            <h2 class="info-subtitle">
              9月14日(<span style="color: blue">土</span>)ー15日(<span
                style="color: red"
                >日</span
              >)
            </h2>
            <br />
            <h2 class="info-subtitle">
              第49回 <ruby>星陵<rt>せいりょう</rt></ruby
              >祭
            </h2>
            <h1
              class="info-subtitle"
              style="
                font-family: serif;
                font-weight: bold;
                color: var(--theme-color);
              "
            >
              <!-- テーマが決まったら変更してください -->
              「<ruby>未定<rt>みてい</rt></ruby
              >」
            </h1>
            <br />
            <h2 class="info-subtitle">東京都立日比谷高等学校</h2>
            <p class="info-caption">〒100-0014 東京都千代田区永田町2-16-1</p>
            <br />
            <h2 class="info-subtitle">すべての方に</h2>
            <h2 class="info-subtitle">ご入場いただけます。</h2>
            <!-- 日比谷公式からこの記述が消えたので一旦消去
              <p class="info-caption">感染症の流行状況により変更の可能性があります。</p>
              -->
            <br />
            <br />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <h2 class="info-subtitle">9月14日</h2>
            <br />
            <h3 class="info-subtitle">8時30分 受付開始</h3>
            <h3 class="info-subtitle">16時00分 公開終了</h3>
            <br />
            <br />
            <h2 class="info-subtitle">9月15日</h2>
            <br />
            <h3 class="info-subtitle">8時30分 受付開始</h3>
            <h3 class="info-subtitle">15時20分 公開終了</h3>
            <br />
            <br />
            <h3 class="info-subtitle">
              詳しくは<NuxtLink to="/schedule">スケジュール</NuxtLink
              >をご覧ください。
            </h3>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div
      style="
        margin-top: 30px;
        width: 100%;
        background-color: var(--theme-color);
      "
    >
      <v-row justify="center" class="pb-10">
        <v-col cols="10">
          <h1 class="pages-title">ご案内</h1>
          <v-row justify="center">
            <v-col
              v-for="page in pages"
              :key="page.icon"
              cols="6"
              sm="4"
              md="3"
              class="my-0 py-2"
            >
              <v-card
                class="pa-1"
                :class="$vuetify.breakpoint.xs ? 'pages-xs' : 'pages-else'"
                outlined
                :to="page.link"
              >
                <v-icon size="100" color="theme_color" style="display: flex">{{
                  page.icon
                }}</v-icon>
                <p class="pages-text">{{ page.text }}</p>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <v-row justify="center" class="pt-6">
      <v-col cols="10" md="5" sm="10"
        ><v-card class="my-auto" to="/groups">
          <div>
            <v-card-title><v-icon>mdi-magnify</v-icon>公演一覧</v-card-title>
          </div>
        </v-card></v-col
      >
      <v-col cols="10" md="5" sm="10"
        ><v-card class="my-auto" to="/tickets">
          <div>
            <v-card-title
              ><v-icon x-large color="theme_color">mdi-ticket</v-icon
              >あなたの整理券</v-card-title
            >
          </div>
        </v-card></v-col
      >
      <CountDown
        v-if="$vuetify.breakpoint.xs"
        class="ma-1 justify-center"
        style="width: 100vw"
      />
      <CountDown v-else class="ma-1 justify-center" style="height: 50vh" />

      <!--チーフ会のTwitter-->
      <!--
      <v-col cols="10">
        <v-card>
          <a
            class="twitter-timeline height:200px"
            data-tweet-limit="2"
            href="https://twitter.com/HibiyaSeiryoFes?ref_src=twsrc%5Etfw"
            >Tweets by HibiyaSeiryoFes</a
          >
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charset="utf-8"
          ></script>
        </v-card>
      </v-col>
      -->

      <!--コピーライトとか-->
    </v-row>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { Route } from 'vue-router'
import CountDown from '~/components/CountDown.vue'
import { News } from 'types/quaint'

type Data = {
  show_video: boolean
  prev_route: Route | null
  pages: any[]
  news: News[]
  shown_news: News[]
}
export default Vue.extend({
  name: 'IndexPage',
  auth: false,
  components: { CountDown },
  beforeRouteEnter(to, from, next) {
    // vue-routerの処理に割り込んで(?)リファラを取得する
    next((vm: any) => {
      vm.prev_route = from
    })
  },
  data(): Data {
    return {
      show_video: true,
      prev_route: null,
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
      news: [],
      shown_news: [],
    }
  },
  head: {
    meta: [
      { charset: 'utf-8' },
      {
        name: 'google-site-verification',
        content: 'kWJ2xUbgwAHnCg34_SgnJlN3oUPoUUpIlGf-9oEYFqA',
      },
      {
        name: 'viewport',
        content: 'width=device-width',
      },
      {
        name: 'description',
        content: 'Seiryofes 2023 official website',
      },
      {
        name: 'keywords',
        content:
          'Seiryofes,星陵祭,日比谷高校,文化祭,公式,星稜祭,日比谷,星陵祭公式,日比谷高校文化祭,IT委員会,日比谷IT,祭徠',
      },
    ],
    title: '日比谷高校星陵祭2023「祭徠」公式サイト',
    titleTemplate: '',
    link: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'true',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@1,100&display=swap',
      },
    ],
    script: [
      {
        type: 'module',
        src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js',
      },
      {
        src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js',
      },
    ],
  },

  async created() {
    this.news = await this.$axios.$get('/news')

    // newsの並び替え
    this.news.sort((x: News, y: News) => {
      // 講演開始が先なら前、後なら後ろ
      if (new Date(x.timestamp) < new Date(y.timestamp)) {
        return 1
      } else {
        return -1
      }
    })
    this.shown_news = this.news.slice(0, 10 - 1)
  },

  mounted() {
    // リファラが「/」なら(リンク直アクセスor他オリジンから)、最初のさいらいビデオを流す
    if (
      this.prev_route?.fullPath !== undefined &&
      this.prev_route?.fullPath !== null &&
      this.prev_route?.fullPath === '/'
    ) {
      this.show_video = true
    } else {
      this.show_video = false
    }
  },

  methods: {
    dateFormatter(input_date: string) {
      const d = new Date(input_date)
      return d.getMonth() + 1 + '/' + d.getDate()
    },

    timeFormatter(input_date: string) {
      const d = new Date(input_date)
      return (
        d.getHours().toString().padStart(2, '0') +
        ':' +
        d.getMinutes().toString().padStart(2, '0')
      )
    },
  },
})
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}

.splash-video {
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  animation: fade-out linear 5.5s forwards;

  /* keyframeに対応していないブラウザで見ると一生画面が真っ白になるので、 */
  width: 0;
  height: 0;
  overflow: hidden; /* スプラッシュ背景が消えた時に、videoがはみ出さないようにする */
}

.c-p {
  cursor: pointer;
}

video {
  max-width: 100%;
  max-height: 70vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes fade-out {
  0% {
    opacity: 1;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }

  90% {
    opacity: 1;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }

  99% {
    opacity: 0;
    display: none;
    width: 100%;
    height: 100%;
    z-index: -1000;
  }

  100% {
    opacity: 0;
    display: none;
    width: 0;
    height: 0;
    z-index: -1000;
  }
}
</style>
