<template>
  <div>
    <v-list-item>
      <v-list-item-title
        >{{ DateFormatter(event.starts_at) }}
        {{ TimeFormatter(event.starts_at) }}</v-list-item-title
      >
      <v-list-item-icon>
        <div class="my-auto mx-2">
          <!--ここから配布ステータスの条件分岐-->
          <v-btn
            v-if="!IsAvailable(event)"
            color="grey"
            outlined
            style="font-weight: bold"
            ><v-icon>mdi-cancel</v-icon></v-btn
          >
          <v-btn
            v-else-if="taken_tickets / ticket_stock < 0.5"
            color="green"
            outlined
            style="font-weight: bold"
          >
            <v-icon>mdi-circle-double</v-icon></v-btn
          >
          <!--5割以上で黄色になる-->
          <v-btn
            v-else-if="
              taken_tickets / ticket_stock >= 0.5 &&
              taken_tickets < ticket_stock
            "
            color="orange"
            outlined
            style="font-size: 80%; font-weight: bold"
          >
            <v-icon>mdi-triangle-outline</v-icon></v-btn
          >
          <v-btn
            v-else-if="taken_tickets >= ticket_stock"
            color="red"
            outlined
            style="font-weight: bold"
          >
            <v-icon>mdi-close</v-icon></v-btn
          >
          <!--ここまで配布ステータスの条件分岐-->
        </div>
      </v-list-item-icon>
    </v-list-item>
  </div>
</template>

<script lang="ts">
import { Event } from 'types/quaint'
import Vue from 'vue'

type Data = {
  ticket_stock: number | undefined
  taken_tickets: number | undefined
}

export default Vue.extend({
  props: {
    group: {
      type: Object,
      required: true,
    },
    event: {
      type: Object,
      required: true,
    },
  },

  data(): Data {
    return {
      ticket_stock: undefined,
      taken_tickets: undefined,
    }
  },

  created() {
    this.ticket_stock = this.event.ticket_stock
    // 配布時間はすべて終了していて表示だけ変えられればいいから、取得されたチケット枚数を取得可能チケット枚数に合わせて無理やりやってる
    this.taken_tickets = this.ticket_stock
  },

  methods: {
    DateFormatter(input_date: string) {
      const d = new Date(input_date)
      return d.getMonth() + 1 + '月' + d.getDate() + '日 '
    },

    TimeFormatter(input_date: string) {
      const d = new Date(input_date)
      return (
        d.getHours().toString().padStart(2, '0') +
        ':' +
        d.getMinutes().toString().padStart(2, '0')
      )
    },

    // IsAvailable: 整理券が配布時間内であればtrue，それ以外はfalseを返すmethod
    IsAvailable(event: Event) {
      if (
        new Date() > new Date(event.sell_starts) &&
        new Date(event.sell_ends) > new Date()
      ) {
        return true
      } else {
        return false
      }
    },
  },
})
</script>
