<template>
  <v-app>
    <v-card
      height="100%"
      class="d-flex flex-column ma-0 pa-2"
      :to="'/groups/' + group.id"
    >
      <div v-if="!$vuetify.breakpoint.xs">
        <v-img
          v-if="group.public_thumbnail_image_url != null"
          height="180px"
          aspect-ratio="4/3"
          contain
          :src="group.public_thumbnail_image_url"
        ></v-img>
        <v-img
          v-else
          :class="HashColor(group.id)"
          height="180px"
          aspect-ratio="4/3"
          contain
        ></v-img>
      </div>
      <div class="d-flex flex-no-wrap">
        <div v-if="$vuetify.breakpoint.xs">
          <!--<v-avatar v-if="$vuetify.breakpoint.xs" size="100" rounded="0">-->
          <v-img
            v-if="group.public_thumbnail_image_url != null"
            height="120px"
            width="90px"
            contain
            :src="group.public_thumbnail_image_url"
          ></v-img>
          <v-img
            v-else
            :class="HashColor(group.id)"
            height="120px"
            width="90px"
          ></v-img>
          <!--</v-avatar>-->
        </div>
        <div class="px-1 text-truncate" style="width: 100%">
          <v-card-title class="pb-2 text-truncate">
            {{ group.title }}
          </v-card-title>
          <v-card-subtitle class="pb-0 text-truncate">
            {{ group.groupname }}
          </v-card-subtitle>
          <v-card-text class="my-0 py-0 text-caption grey--text text-truncate">
            {{ group.description }}
          </v-card-text>
          <v-card-actions class="py-0">
            <v-chip-group column>
              <v-chip v-for="tag in group.tags" :key="tag.id" disabled small>
                {{ tag.tagname }}
              </v-chip>
            </v-chip-group>
            <v-spacer />
            <v-icon v-if="FilterBookmarks(group.id)" color="sairai"
              >mdi-bookmark</v-icon
            >
          </v-card-actions>
        </div>
      </div>
    </v-card>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

type Data = {
  nowloading: boolean
  storage_bookmarks: (string | null)[]
}

export default Vue.extend({
  data(): Data {
    return {
      nowloading: true,
      storage_bookmarks: [],
    }
  },

  props: {
    group: {
      type: Object,
      required: true,
    },
  },

  methods: {
    // tag全体（{id:hogehoge, tagname:honyohonyo}の形）を用いると，tagが一致している判定がうまく行えなかったので，idを用いてtagの一致を判定している
    FilterBookmarks(id: string) {
      // お気に入りならtrue
      if (this.nowloading === true) {
        return false
      } else {
        return this.storage_bookmarks.includes(
          'seiryofes.groups.favorite.' + id
        )
      }
    },

    HashColor(text: string) {
      // group.idを色数で割った余りでデフォルトの色を決定
      const colors = [
        'blue-grey',
        'brown',
        'deep-orange',
        'amber',
        'lime',
        'light-green',
        'teal',
        'cyan',
        'light-blue',
        'indigo',
        'pink',
      ]
      let index = 0
      for (let i = 0; i < text.length; i++) {
        // 文字列をUnicodeの和に変換
        index += text.codePointAt(i) ?? 1
      }
      index = index % colors.length
      return colors[index]
    },
  },
})
</script>
