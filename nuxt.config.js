import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  router:{
    base:'/',
    middleware:['auth']
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '星陵祭2022',
    title: '星陵祭2022',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {rel:'stylesheet',href:'https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://auth.nuxtjs.org
    '@nuxtjs/auth-next',
    // https://google-analytics.nuxtjs.org
    '@nuxtjs/google-analytics'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://seiryofes2022api.azurewebsites.net/',
    common:{
      'Accept':'application/json, text/plain, */*'
    },
    post:{
      'Content-Type':'application/json;charset=utf-8',
      'Access-Control-Allow-Origin':'*'
    },
    retry: true
  },

  //Authorization
  auth: {
    redirect:{
      login:"/login",
      logout:"/login?logout",
      home:"/"
    },
    watchLoggedIn:true,
    localStorage:false,
    strategies:{
      local:{
        token:{
          type:'Bearer',
          property:'access_token',
          global:true
        },
        user:{
          property:false
        },
        endpoints:{
          login:{url:"/users/me/login",method:'post',headers: { 'Content-Type': 'application/x-www-form-urlencoded' }},
          logout:false,
          user:false
        }
      }
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ja'
    },
    meta:{
      nativeUI:true
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake:true,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  googleAnalytics:{
    id:'G-7WQEH2NRMJ'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  generate: {
    dir: 'docs'
  },
  loading: {
    color: 'yellow',
    height: '5px'
  }
}
