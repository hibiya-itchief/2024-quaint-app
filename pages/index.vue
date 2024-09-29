<template>
  <v-app>
    <div v-if="show_video" class="splash-video">
      <video
        src="/animations/magic_animation.mp4"
        webkit-playsinline
        playsinline
        autoplay
        muted
      ></video>
    </div>

    <div class="top-logo-container">
      <div v-if="logo_size === 700" class="top-logo" style="width: 700px">
        <FesLogo :logo-size="logo_size" />
        <div class="top-logo-text">
          <span style="font-size: min(3vw, 20px)"
            >2024/<span style="font-size: min(1.33em, 25px)">9</span>/<span
              style="font-size: min(1.33em, 25px)"
              >14</span
            >
            Sat - <span style="font-size: min(1.33em, 25px)">9</span>/<span
              style="font-size: min(1.33em, 25px)"
              >15</span
            >
            Sun</span
          >
        </div>
      </div>
      <div v-else class="top-logo">
        <FesLogo :logo-size="logo_size" />
        <div class="top-logo-text">
          <span style="font-size: min(3vw, 20px)"
            >2024/<span style="font-size: min(1.33em, 25px)">9</span>/<span
              style="font-size: min(1.33em, 25px)"
              >14</span
            >
            Sat - <span style="font-size: min(1.33em, 25px)">9</span>/<span
              style="font-size: min(1.33em, 25px)"
              >15</span
            >
            Sun</span
          >
        </div>
      </div>
    </div>

    <div class="main-container">
      <!-- news -->
      <div class="news-container">
        <v-row justify="center" style="margin: 0 !important">
          <v-col v-if="!(news.length === 0)" cols="10">
            <h2 class="info-title" style="margin-bottom: 20px">News</h2>

            <!--権限がある人がnewsを編集する-->
            <div v-if="editable_news" style="margin-bottom: 10px">
              <v-btn depressed outlined small to="/news/">編集</v-btn>
            </div>

            <!--最大5コのnewsを表示する-->
            <div v-for="i in shown_news[shown_news_group]" :key="i.id">
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
            <div v-if="news.length > 5">
              <div
                style="
                  justify-content: center;
                  text-align: center;
                  margin-top: 20px;
                "
              >
                <v-row justify="center">
                  <v-col>
                    <div v-if="!(shown_news_group === 1)">
                      <v-btn
                        depressed
                        x-small
                        color="white"
                        @click="shown_news_group = shown_news_group - 1"
                      >
                        <v-icon color="theme_color">mdi-arrow-left</v-icon>
                      </v-btn>
                    </div>
                  </v-col>
                  <v-col>
                    <h4 style="color: var(--theme-color)">
                      {{ shown_news_group }}/{{ shown_news.length - 1 }}
                    </h4>
                  </v-col>
                  <v-col>
                    <div
                      v-if="!(shown_news_group === Math.ceil(news.length / 5))"
                    >
                      <v-btn
                        depressed
                        x-small
                        color="white"
                        @click="shown_news_group = shown_news_group + 1"
                      >
                        <v-icon color="theme_color">mdi-arrow-right</v-icon>
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
          <v-col v-else-if="editable_news" cols="10">
            <p style="margin-bottom: 20px">
              News（現在お知らせはありません。この表示は編集権限がついている人のみ表示されています。）
            </p>

            <v-btn depressed outlined small to="/news/">編集</v-btn>
          </v-col>
        </v-row>
      </div>

      <!-- 開催概要 -->
      <div class="schedule-container">
        <v-row justify="center" style="margin: 0 !important">
          <v-col cols="10">
            <h1 class="info-title">開催概要</h1>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <h2 class="info-subtitle">2024年</h2>
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
                  「<ruby>Magic</ruby>」
                </h1>
                <br />
                <h2 class="info-subtitle">東京都立日比谷高等学校</h2>
                <p class="info-caption">
                  〒100-0014 東京都千代田区永田町2-16-1
                </p>
                <br />
                <h2 class="info-subtitle">すべての方に</h2>
                <h2 class="info-subtitle">ご入場いただけます。</h2>
                <br />
                <br />
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <h2 class="info-subtitle">9月14日</h2>
                <br />
                <h3 class="info-subtitle">8時20分 受付開始</h3>
                <h3 class="info-subtitle">16時00分 公開終了</h3>
                <br />
                <br />
                <h2 class="info-subtitle">9月15日</h2>
                <br />
                <h3 class="info-subtitle">8時20分 受付開始</h3>
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
      </div>

      <div class="ex-container" style="margin-bottom: 5%">
        <v-row justify="center" style="margin: 0 !important">
          <v-col cols="10">
            <div class="ex-theme-container">
              <h2 class="info-title" style="margin-bottom: 5%">
                テーマ「Magic」
              </h2>
              <v-row justify="center">
                <v-col cols="10">
                  <div class="theme-image"></div>
                </v-col>
                <p>
                  今年度の星陵祭のテーマは「Magic」です。星陵祭では、普段は忙しい雰囲気に包まれた日比谷高校が魔法にかけられたように特別な姿に様変わりします。ご来場の皆様も是非、いつもとひと味違う日比谷高校をお楽しみください。
                </p>
              </v-row>
            </div>
          </v-col>
          <v-col cols="10">
            <div class="ex-festival-container">
              <h2 class="info-title" style="margin-bottom: 5%">星陵祭</h2>
              <v-row>
                <v-col cols="7">
                  <p>
                    日比谷高校の文化祭、「星陵祭」。今年のテーマは「Magic」です。
                    日比谷生が劇やパフォーマンス、校内に施された装飾物
                    によって、あなたを魔法にかけます。最高の夏を星陵祭で。来場お待ちしています！
                  </p>
                </v-col>
                <v-col cols="5">
                  <div class="circle-img-container" style="margin: 0 auto">
                    <div class="festival-image"></div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- ご案内 -->
      <div class="info-container">
        <v-row
          justify="center"
          class="pb-10"
          style="margin-left: 0 !important; margin-right: 0 !important"
        >
          <v-col cols="10">
            <h2 class="pages-title">ご案内</h2>
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
                  <v-icon
                    size="100"
                    color="theme_color"
                    style="display: flex"
                    >{{ page.icon }}</v-icon
                  >
                  <p class="pages-text">{{ page.text }}</p>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
      <v-row justify="center" class="pt-6" style="margin: 0 !important">
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
    </div>
    <CountDown />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { Route } from 'vue-router'
import CountDown from '~/components/CountDown.vue'
import { News } from 'types/quaint'
import gsap from 'gsap'
import CustomEase from 'gsap/dist/CustomEase'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, CustomEase)

type Data = {
  user_groups: {
    admin: string
    chief: string
  }
  show_video: boolean
  prev_route: Route | null
  pages: any[]
  news: News[]
  shown_news_group: number
  shown_news: News[][]
  editable_news: boolean

  logo_size: number
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

  async asyncData({ $axios }) {
    const news = await $axios.$get('/news')
    return { news }
  },

  data(): Data {
    return {
      user_groups: {
        admin: process.env.AZURE_AD_GROUPS_QUAINT_ADMIN as string,
        chief: process.env.AZURE_AD_GROUPS_QUAINT_CHIEF as string,
      },
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
      shown_news_group: 1,
      shown_news: [[]],
      editable_news: false,

      logo_size: 0,
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
        content: 'Seiryofes 2024 official website',
      },
      {
        name: 'keywords',
        content:
          'Seiryofes,星陵祭,日比谷高校,文化祭,公式,星稜祭,日比谷,星陵祭公式,日比谷高校文化祭,IT委員会,日比谷IT,Magic,magic,MAGIC',
      },
    ],
    title: '日比谷高校星陵祭2024「Magic」公式サイト',
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

  created() {
    // ロゴの描写
    const size = Math.min(
      this.$vuetify.breakpoint.width,
      this.$vuetify.breakpoint.height
    )
    if (size < 700) {
      this.logo_size = size
    } else {
      this.logo_size = 700
    }

    // newsの並び替え
    this.news.sort((x: News, y: News) => {
      // newsの作成時刻が先なら前、後なら後ろ
      if (new Date(x.timestamp) < new Date(y.timestamp)) {
        return 1
      } else {
        return -1
      }
    })

    // お知らせを５つずつに区切っていく
    for (let i = 1; i <= Math.ceil(this.news.length / 5); i++) {
      this.shown_news[i] = this.news.slice(
        this.getFirstIndex(i),
        this.getEndIndex(i)
      )
    }

    // 権限がある人がnewsを編集可能にする
    if (this.$auth.user?.groups && Array.isArray(this.$auth.user?.groups)) {
      if (this.$auth.user?.groups.includes(this.user_groups.admin)) {
        this.editable_news = true
      } else if (this.$auth.user?.groups.includes(this.user_groups.chief)) {
        this.editable_news = true
      }
    }
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

    // animation
    // 初期設定
    gsap.set('.splach-video', {
      opacity: 1,
    })

    gsap.set(['.main-container'], {
      opacity: 0, // 透明に
      y: 100, // したから上にスライドさせるから下げておく
    })

    // 最初のムービー
    const tl = gsap.timeline()

    tl.to('.splash-video', {
      duration: 2.5,
      opacity: 0,
      ease: CustomEase.create(
        'custom',
        'M0,0 C0.099,0 0.406,0.016 0.689,0.017 0.883,0.017 0.962,0.79 1,1 '
      ),
    }).set('.splash-video', {
      zIndex: -1000,
    })

    // main content
    gsap.to('.main-container', {
      scrollTrigger: {
        trigger: '.news-container',
        start: 'top 75%',
      }, // 自身が画面の中に入ったら
      duration: 2,
      y: 0,
      opacity: 1,
      ease: 'power4.out',
    })
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

    // お知らせ機能関連
    // 第何群なのかを指定された時に、その群の最初のインデックスを返す
    getFirstIndex(i: number): number {
      return 5 * i - 5
    },

    // 第何群なのかを指定された時に、その群の末項のインデックスを返す
    getEndIndex(i: number): number {
      return 5 * i
    },
  },
})
</script>

<style scoped>
.top-logo-container {
  text-align: center;
  height: 100vh;
  width: 100vw;
}

.top-logo {
  position: relative;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.top-logo-text {
  position: relative;
  font-family: 'EB Garamond', 'Noto Serif JP', 'BIZ UDMincho', serif;
}

.info-container {
  background-color: var(--theme-color);
}

.circle-img-container {
  aspect-ratio: 1 / 1;
  background-image: linear-gradient(180deg, #b3e8e2, #b0dde8 50%, #b1d0f2);
  border-radius: 50%;
  transform: translate(3.75%, 3.75%);
  width: min(100%, 300px);
}

.theme-image {
  width: 100%;
  height: 30vh;
  background-image: url('../static/images/2024_logo.png');
  background-position: center;
  background-size: contain;
}

.festival-image {
  aspect-ratio: 1 / 1;
  background-image: url('../static/images/seiryofes_ex_image.jpg');
  background-position: bottom 0 right -2vw;
  background-size: cover;
  border-radius: 50%;
  transform: translate(-3.75%, -3.75%);
  width: 100%;
}

.main-container {
  z-index: 1;
}

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
  z-index: 1000;
  width: 100vw;
  height: 100%;
}

video {
  max-width: 100%;
  max-height: 70vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
