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

    <div
      style="
        width: 100vw;
        height: 50vh;
        text-align: center;
        align-content: center;
        position: relative;
      "
    >
      <div class="animated-circle">
        <svg viewBox="0 0 100 100" style="background-color: #fff">
          <defs>
            <clipPath id="circleClipMask">
              <circle cx="50" cy="50" r="45" fill="black" />
            </clipPath>

            <clipPath id="customClipPath">
              <polygon
                id="customClipPathPolygon"
                points="0,60, 0,100, 100,100, 100,40, 90,60, 80,70, 60,50, 40,60, 30,60, 15,45"
                fill="none"
              />
            </clipPath>

            <pattern
              id="diagonalHatch"
              width="4"
              height="4"
              patternTransform="rotate(135 0 0)"
              patternUnits="userSpaceOnUse"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="10"
                style="stroke: white; stroke-width: 0.3"
              />
            </pattern>

            <pattern
              id="diagonalHatch2"
              width="4"
              height="4"
              patternTransform="rotate(45 0 0)"
              patternUnits="userSpaceOnUse"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="10"
                style="stroke: white; stroke-width: 0.3"
              />
            </pattern>
          </defs>

          <g clip-path="url(#circleClipMask)">
            <g>
              <circle cx="50" cy="50" r="50" fill="black" />
              <circle cx="50" cy="50" r="50" fill="url(#diagonalHatch2)" />
            </g>
            <g clip-path="url(#customClipPath)">
              <circle cx="50" cy="50" r="50" fill="black" />
              <circle cx="50" cy="50" r="50" fill="url(#diagonalHatch)" />
              <polygon
                id="polygon"
                points="0,60, 0,100, 100,100, 100,40, 90,60, 80,70, 60,50, 40,60, 30,60, 15,45"
                fill="none"
                stroke="#fff"
                stroke-width=".5"
              />
            </g>
          </g>

          <animate
            xlink:href="#customClipPathPolygon"
            attributeName="points"
            dur="8s"
            values="
                    0,60, 0,100, 100,100, 100,40, 90,60, 80,70, 60,50, 40,60, 30,60, 15,45;
                    0,65, 0,100, 100,100, 100,45, 90,50, 80,60, 60,45, 40,55, 30,65, 15,50;
                    0,70, 0,100, 100,100, 100,45, 90,40, 80,50, 60,40, 40,50, 30,70, 15,55;
                    0,65, 0,100, 100,100, 100,50, 90,30, 80,40, 60,35, 40,45, 30,65, 15,60;
                    0,60, 0,100, 100,100, 100,55, 90,40, 80,30, 60,30, 40,40, 30,60, 15,55;
                    0,55, 0,100, 100,100, 100,60, 90,50, 80,25, 60,35, 40,35, 30,55, 15,50;
                    0,50, 0,100, 100,100, 100,65, 90,60, 80,30, 60,40, 40,30, 30,50, 15,45;
                    0,45, 0,100, 100,100, 100,70, 90,50, 80,40, 60,45, 40,25, 30,45, 15,40;
                    0,40, 0,100, 100,100, 100,65, 90,45, 80,50, 60,50, 40,20, 30,40, 15,35;
                    0,45, 0,100, 100,100, 100,60, 90,45, 80,60, 60,55, 40,30, 30,45, 15,30;
                    0,40, 0,100, 100,100, 100,55, 90,40, 80,70, 60,60, 40,40, 30,40, 15,40;
                    0,35, 0,100, 100,100, 100,50, 90,35, 80,70, 60,65, 40,50, 30,35, 15,45;
                    0,30, 0,100, 100,100, 100,55, 90,30, 80,60, 60,70, 40,60, 30,30, 15,50;
                    0,35, 0,100, 100,100, 100,60, 90,40, 80,50, 60,60, 40,55, 30,25, 15,55;
                    0,40, 0,100, 100,100, 100,65, 90,50, 80,40, 60,50, 40,50, 30,30, 15,60;
                    0,45, 0,100, 100,100, 100,70, 90,55, 80,30, 60,45, 40,45, 30,40, 15,70;
                    0,50, 0,100, 100,100, 100,65, 90,60, 80,40, 60,45, 40,40, 30,45, 15,60;
                    0,55, 0,100, 100,100, 100,60, 90,65, 80,50, 60,50, 40,40, 30,50, 15,50;
                    0,50, 0,100, 100,100, 100,55, 90,70, 80,60, 60,60, 40,45, 30,55, 15,55;
                    0,55, 0,100, 100,100, 100,50, 90,65, 80,65, 60,55, 40,50, 30,60, 15,50;
                    0,60, 0,100, 100,100, 100,40, 90,60, 80,70, 60,50, 40,60, 30,60, 15,45;"
            keyTimes="
                    0;
                    0.05;
                    0.1;
                    0.15;
                    0.2;
                    0.25;
                    0.3;
                    0.35;
                    0.4;
                    0.45;
                    0.5;
                    0.55;
                    0.6;
                    0.65;
                    0.7;
                    0.75;
                    0.8;
                    0.85;
                    0.9;
                    0.95;
                    1"
            repeatCount="indefinite"
          />

          <animate
            xlink:href="#polygon"
            attributeName="points"
            dur="8s"
            values="
                    0,60, 0,100, 100,100, 100,40, 90,60, 80,70, 60,50, 40,60, 30,60, 15,45;
                    0,65, 0,100, 100,100, 100,45, 90,50, 80,60, 60,45, 40,55, 30,65, 15,50;
                    0,70, 0,100, 100,100, 100,45, 90,40, 80,50, 60,40, 40,50, 30,70, 15,55;
                    0,65, 0,100, 100,100, 100,50, 90,30, 80,40, 60,35, 40,45, 30,65, 15,60;
                    0,60, 0,100, 100,100, 100,55, 90,40, 80,30, 60,30, 40,40, 30,60, 15,55;
                    0,55, 0,100, 100,100, 100,60, 90,50, 80,25, 60,35, 40,35, 30,55, 15,50;
                    0,50, 0,100, 100,100, 100,65, 90,60, 80,30, 60,40, 40,30, 30,50, 15,45;
                    0,45, 0,100, 100,100, 100,70, 90,50, 80,40, 60,45, 40,25, 30,45, 15,40;
                    0,40, 0,100, 100,100, 100,65, 90,45, 80,50, 60,50, 40,20, 30,40, 15,35;
                    0,45, 0,100, 100,100, 100,60, 90,45, 80,60, 60,55, 40,30, 30,45, 15,30;
                    0,40, 0,100, 100,100, 100,55, 90,40, 80,70, 60,60, 40,40, 30,40, 15,40;
                    0,35, 0,100, 100,100, 100,50, 90,35, 80,70, 60,65, 40,50, 30,35, 15,45;
                    0,30, 0,100, 100,100, 100,55, 90,30, 80,60, 60,70, 40,60, 30,30, 15,50;
                    0,35, 0,100, 100,100, 100,60, 90,40, 80,50, 60,60, 40,55, 30,25, 15,55;
                    0,40, 0,100, 100,100, 100,65, 90,50, 80,40, 60,50, 40,50, 30,30, 15,60;
                    0,45, 0,100, 100,100, 100,70, 90,55, 80,30, 60,45, 40,45, 30,40, 15,70;
                    0,50, 0,100, 100,100, 100,65, 90,60, 80,40, 60,45, 40,40, 30,45, 15,60;
                    0,55, 0,100, 100,100, 100,60, 90,65, 80,50, 60,50, 40,40, 30,50, 15,50;
                    0,50, 0,100, 100,100, 100,55, 90,70, 80,60, 60,60, 40,45, 30,55, 15,55;
                    0,55, 0,100, 100,100, 100,50, 90,65, 80,65, 60,55, 40,50, 30,60, 15,50;
                    0,60, 0,100, 100,100, 100,40, 90,60, 80,70, 60,50, 40,60, 30,60, 15,45;"
            keyTimes="
                    0;
                    0.05;
                    0.1;
                    0.15;
                    0.2;
                    0.25;
                    0.3;
                    0.35;
                    0.4;
                    0.45;
                    0.5;
                    0.55;
                    0.6;
                    0.65;
                    0.7;
                    0.75;
                    0.8;
                    0.85;
                    0.9;
                    0.95;
                    1"
            repeatCount="indefinite"
          />
        </svg>
      </div>
      <header>
        <div class="header-container">
          <h1 id="title">Magic</h1>
        </div>
      </header>
    </div>

    <!-- developing -->
    <v-row v-if="is_developing">
      <v-col cols="10">
        <h1 class="info-title">星陵祭2024 「Magic」</h1>
        <h4>⚠︎現在このサイトは開発段階です。</h4>
      </v-col>

      <v-col v-if="!(news.length === 0)" cols="10">
        <h1 class="info-title" style="margin-bottom: 20px">News</h1>

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
                <div v-if="!(shown_news_group === Math.ceil(news.length / 5))">
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

    <!--開発段階につき情報非公開-->
    <div v-if="!is_developing">
      <v-row>
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
                「<ruby>Magic</ruby>」
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
        <v-row
          justify="center"
          class="pb-10"
          style="margin-left: 0 !important; margin-right: 0 !important"
        >
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
import gsap from 'gsap'
import ScrollTrigger from 'gsap'
import MotionPathPlugin from 'gsap'
import { Route } from 'vue-router'
import CountDown from '~/components/CountDown.vue'
import { News } from 'types/quaint'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

type Data = {
  is_developing: boolean

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
      is_developing: false,

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

  async created() {
    this.news = await this.$axios.$get('/news')

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

    const tl = gsap.timeline()

    tl.set('.animated-circle', {
      autoAlpha: 0,
    })

    tl.fromTo(
      '#title', // アニメーションさせる要素
      {
        autoAlpha: 0, // アニメーション開始前は透明
        y: -100, // 100px上に移動
      },
      {
        scrollTrigger: '#header-title',
        autoAlpha: 1, // アニメーション後は出現(透過率0)
        duration: 1,
        y: 0, // 100px下に移動
        ease: 'bounce.out', // イージング
      }
    )
      .to('.animated-circle', {
        autoAlpha: 0.8,
        duration: 2,
      })
      .to('#title', {
        color: '#57c4ff',
        duration: 1,
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
#title {
  color: #335594;
  font-size: min(15vw, 90px);
  font-family: 'Times New Roman', Times, serif;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  line-height: 1.5;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}

.header-container {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}

.char {
  transform: translateY(100px);
  transition: transfrom 0.5s;
}

body {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #fff;
}

.animated-circle {
  background-color: #fff;
  max-width: 500px;
  width: 100%;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}
</style>
