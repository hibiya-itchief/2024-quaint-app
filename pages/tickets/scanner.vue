<template>
  <div>
    <h2>整理券スキャナー</h2>
    <p>
      カメラへのアクセスを許可してください。一部のブラウザで使えない場合があります。
    </p>
    <qrcode-stream
      :key="_uid"
      :track="selected.value"
      @init="onInit"
      @decode="onDetect"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type Option = {
  text: string
  value: any
}

export default Vue.extend({
  data() {
    const selected: Option = { text: 'outline', value: this.paintOutline }

    return {
      selected,
      result: null,
      user_groups: {
        students: process.env.AZURE_AD_GROUPS_QUAINT_STUDENTS as string,
      },
    }
  },

  created() {
    if (
      !(this.$auth.user?.groups as string[]).includes(this.user_groups.students)
    ) {
      this.$nuxt.error({ statusCode: 403, message: 'Forbidden' })
    }
  },

  methods: {
    paintOutline(detected_codes: any, ctx: any) {
      for (const detected_code of detected_codes) {
        const [first_point, ...other_points] = detected_code.cornerPoints

        ctx.strokeStyle = 'red'

        ctx.beginPath()
        ctx.moveTo(first_point.x, first_point.y)
        for (const { x, y } of other_points) {
          ctx.lineTo(x, y)
        }
        ctx.lineTo(first_point.x, first_point.y)
        ctx.closePath()
        ctx.stroke()
      }
    },

    onDetect(code: any) {
      this.result = code
    },

    async onInit(promise: any) {
      try {
        await promise
      } catch (error: any) {
        if (error.name === 'NotAllowedError') {
          // user denied camera access permission
          this.$store.commit('ShowInternetErrorSnackbar', {
            message: 'カメラへのアクセスが拒否されました',
          })
        } else if (error.name === 'NotFoundError') {
          // no suitable camera device installed
          this.$store.commit('ShowInternetErrorSnackbar', {
            message: '使用可能なカメラがデバイスに搭載されていません',
          })
        } else if (error.name === 'NotSupportedError') {
          // page is not served over HTTPS (or localhost)
          this.$store.commit('ShowInternetErrorSnackbar', {
            message: 'httpsまたはlocalhost環境で使用してください',
          })
        } else if (error.name === 'NotReadableError') {
          // maybe camera is already in use
          this.$store.commit('ShowInternetErrorSnackbar', {
            message: 'カメラがすでに使用中です',
          })
        } else if (error.name === 'OverconstrainedError') {
          // did you request the front camera although there is none?
          this.$store.commit('ShowInternetErrorSnackbar', {
            message: 'フロントカメラに問題があります',
          })
        } else if (error.name === 'StreamApiNotSupportedError') {
          // browser seems to be lacking features
          this.$store.commit('ShowInternetErrorSnackbar', {
            message: 'ブラウザが対応していません',
          })
        }
      }
    },
  },
})
</script>
