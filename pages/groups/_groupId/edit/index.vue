<template>
  <v-app>
    <div v-if="!nowloading">
      <v-container>
        <v-row justify="center" class="ma-0 pa-0">
          <v-col cols="12" sm="8" md="6" class="ma-0 pa-0">
            <v-btn icon fab small @click="$router.go(-1)">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <h2 class="mx-1 px-0">
              <v-icon color="blue-grey">mdi-pencil</v-icon>{{ group.groupname }}
              <span class="grey--text text-subtitle-1">団体情報の編集</span>
            </h2>
            <p class="pa-2">
              <span class="red--text">編集内容は毎日0:00に反映されます。</span>
              <span>緊急で変更する必要がある場合はIT委員会に伝えて下さい</span>
            </p>
            <p style="text-align: right">
              <a
                href="https://hibiya-itchief.github.io/quaint-docs/owner/manage_group/"
                ><v-icon>mdi-help-circle-outline</v-icon>
                詳しい編集方法や注意点はこちら
              </a>
            </p>
            <v-card class="mx-1 my-1 px-2 py-2" elevation="1">
              <v-card-title class="ma-0 pa-0">
                <p
                  class="mx-0 my-1 pa-0 grey--text text--darken-2 text-subtitle-2"
                >
                  <v-icon color="light-blue" class="mr-2">mdi-pound</v-icon
                  >団体名
                </p>
                <v-spacer></v-spacer>
                <a class="mx-0 my-2 pa-0 text-body-2">編集できません</a>
              </v-card-title>
              <v-card-text class="ma-0 pa-0">
                <span class="mx-0 my-2 pa-0 text-body-1">{{
                  group?.groupname
                }}</span>
              </v-card-text>
            </v-card>

            <v-card class="mx-1 my-1 px-2 py-2" elevation="1">
              <v-card-title class="ma-0 pa-0">
                <p
                  class="mx-0 my-1 pa-0 grey--text text--darken-2 text-subtitle-2"
                >
                  <v-icon color="light-blue" class="mr-2">mdi-link</v-icon>
                  団体ID(ページのURL)
                </p>
                <v-spacer></v-spacer>
                <a class="mx-0 my-2 pa-0 text-body-2">編集できません</a>
              </v-card-title>
              <v-card-text class="ma-0 pa-0">
                <NuxtLink
                  class="grey--text text--darken-2 mx-0 my-2 pa-0 text-body-1"
                  :to="`/groups/${group?.id}`"
                  ><span class="grey--text text--darken-2"
                    >https://{{ hostname }}/groups/</span
                  >{{ group?.id }}</NuxtLink
                >
              </v-card-text>
            </v-card>

            <v-card class="mx-1 my-1 px-2 py-2" elevation="1">
              <v-card-title class="ma-0 pa-0">
                <p
                  class="mx-0 my-1 pa-0 grey--text text--darken-2 text-subtitle-2"
                >
                  <v-icon color="light-blue" class="mr-2">mdi-link</v-icon>
                  来場者からの投票
                </p>
                <v-spacer></v-spacer>
                <a class="mx-0 my-2 pa-0 text-body-2">編集できません</a>
              </v-card-title>
              <v-card-text class="ma-0 pa-0">
                <span
                  v-if="group?.enable_vote"
                  class="mx-0 my-2 pa-0 text-body-1"
                  >有効</span
                >
                <span v-else class="mx-0 my-2 pa-0 text-body-1">無効</span>
              </v-card-text>
            </v-card>

            <v-card class="mx-1 my-1 px-2 py-2" elevation="1">
              <v-card-title class="ma-0 pa-0">
                <p
                  class="mx-0 my-1 pa-0 grey--text text--darken-2 text-subtitle-2"
                >
                  <v-icon color="light-blue" class="mr-2">mdi-filmstrip</v-icon>
                  演目名
                </p>
                <v-spacer></v-spacer>
                <a
                  v-show="!change_title_form"
                  class="mx-0 my-2 pa-0 text-body-2"
                  @click="change_title_form = !change_title_form"
                  >編集</a
                >
                <a
                  v-show="change_title_form"
                  class="mx-0 my-2 pa-0 text-body-2"
                  @click="change_title_form = !change_title_form"
                  >キャンセル</a
                >
              </v-card-title>
              <v-card-text class="ma-0 pa-0">
                <span class="mx-0 my-2 pa-0 text-body-1">{{
                  group?.title
                }}</span>
              </v-card-text>
              <div v-show="change_title_form">
                <v-card-text class="mx-0 px-0 py-2">
                  <v-text-field
                    v-model="change_title_input"
                    label="演目名"
                    counter
                    maxlength="50"
                    filled
                    class="ma-0 pt-1 pb-0"
                  >
                  </v-text-field>
                </v-card-text>
                <v-card-actions class="ma-0 px-0 py-0">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    @click="
                      group_edit.title = change_title_input
                      updateGroup()
                    "
                  >
                    適用
                  </v-btn>
                </v-card-actions>
              </div>
            </v-card>

            <v-card class="mx-1 my-1 px-2 py-2" elevation="1">
              <v-card-title class="ma-0 pa-0">
                <p
                  class="mx-0 my-1 pa-0 grey--text text--darken-2 text-subtitle-2"
                >
                  <v-icon color="light-blue" class="mr-2">mdi-text-box</v-icon>
                  説明文
                </p>
                <v-spacer></v-spacer>
                <a
                  v-show="!change_description_form"
                  class="mx-0 my-2 pa-0 text-body-2"
                  @click="change_description_form = !change_description_form"
                  >編集</a
                >
                <a
                  v-show="change_description_form"
                  class="mx-0 my-2 pa-0 text-body-2"
                  @click="change_description_form = !change_description_form"
                  >キャンセル</a
                >
              </v-card-title>
              <v-card-text class="ma-0 pa-0">
                <span class="mx-0 my-2 pa-0 text-body-1">{{
                  group?.description
                }}</span>
              </v-card-text>
              <div v-show="change_description_form">
                <v-card-text class="mx-0 px-0 py-2">
                  <v-textarea
                    v-model="change_description_input"
                    label="説明文"
                    filled
                    counter
                    maxlength="200"
                    class="ma-0 pt-1 pb-0"
                  >
                  </v-textarea>
                </v-card-text>
                <v-card-actions class="ma-0 px-0 py-0">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    @click="
                      group_edit.description = change_description_input
                      updateGroup()
                    "
                  >
                    適用
                  </v-btn>
                </v-card-actions>
              </div>
            </v-card>

            <v-card class="mx-1 my-1 px-2 py-2" elevation="1">
              <v-card-title class="ma-0 pa-0">
                <p
                  class="mx-0 my-1 pa-0 grey--text text--darken-2 text-subtitle-2"
                >
                  <v-icon color="light-blue" class="mr-2">mdi-twitter</v-icon>
                  Twitter URL
                </p>
                <v-spacer></v-spacer>
                <a
                  v-show="!change_twitter_url_form"
                  class="mx-0 my-2 pa-0 text-body-2"
                  @click="change_twitter_url_form = !change_twitter_url_form"
                  >編集</a
                >
                <a
                  v-show="change_twitter_url_form"
                  class="mx-0 my-2 pa-0 text-body-2"
                  @click="change_twitter_url_form = !change_twitter_url_form"
                  >キャンセル</a
                >
              </v-card-title>
              <v-card-text class="ma-0 pa-0">
                <span class="mx-0 my-2 pa-0 text-body-1">{{
                  group?.twitter_url
                }}</span>
              </v-card-text>
              <div v-show="change_twitter_url_form">
                <v-card-text class="mx-0 px-0 py-2">
                  <v-text-field
                    v-model="change_twitter_url_input"
                    prefix="https://x.com/"
                    filled
                    class="ma-0 pt-1 pb-0"
                  >
                  </v-text-field>
                </v-card-text>
                <v-card-actions class="ma-0 px-0 py-0">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    outlined
                    @click="
                      group_edit.twitter_url = null
                      updateGroup()
                    "
                  >
                    URLを削除
                  </v-btn>
                  <v-btn
                    color="primary"
                    @click="
                      group_edit.twitter_url =
                        'https://x.com/' + change_twitter_url_input
                      updateGroup()
                    "
                  >
                    適用
                  </v-btn>
                </v-card-actions>
              </div>
            </v-card>

            <v-card class="mx-1 my-1 px-2 py-2" elevation="1">
              <v-card-title class="ma-0 pa-0">
                <p
                  class="mx-0 my-1 pa-0 grey--text text--darken-2 text-subtitle-2"
                >
                  <v-icon color="light-blue" class="mr-2">mdi-instagram</v-icon>
                  Instagram URL
                </p>
                <v-spacer></v-spacer>
                <a
                  v-show="!change_instagram_url_form"
                  class="mx-0 my-2 pa-0 text-body-2"
                  @click="
                    change_instagram_url_form = !change_instagram_url_form
                  "
                  >編集</a
                >
                <a
                  v-show="change_instagram_url_form"
                  class="mx-0 my-2 pa-0 text-body-2"
                  @click="
                    change_instagram_url_form = !change_instagram_url_form
                  "
                  >キャンセル</a
                >
              </v-card-title>
              <v-card-text class="ma-0 pa-0">
                <span class="mx-0 my-2 pa-0 text-body-1">{{
                  group?.instagram_url
                }}</span>
              </v-card-text>
              <div v-show="change_instagram_url_form">
                <v-card-text class="mx-0 px-0 py-2">
                  <v-text-field
                    v-model="change_instagram_url_input"
                    prefix="https://instagram.com/"
                    filled
                    class="ma-0 pt-1 pb-0"
                  >
                  </v-text-field>
                </v-card-text>
                <v-card-actions class="ma-0 px-0 py-0">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    outlined
                    @click="
                      group_edit.instagram_url = null
                      updateGroup()
                    "
                  >
                    URLを削除
                  </v-btn>
                  <v-btn
                    color="primary"
                    @click="
                      group_edit.instagram_url =
                        'https://instagram.com/' + change_instagram_url_input
                      updateGroup()
                    "
                  >
                    適用
                  </v-btn>
                </v-card-actions>
              </div>
            </v-card>

            <v-card class="mx-1 my-1 px-2 py-2" elevation="1">
              <v-card-title class="ma-0 pa-0">
                <p
                  class="mx-0 my-1 pa-0 grey--text text--darken-2 text-subtitle-2"
                >
                  <v-icon color="light-blue" class="mr-2">mdi-link</v-icon>
                  その他のリンク(Streamでの映像配信へのリンクもこちらへ)
                </p>
                <v-spacer></v-spacer>
                <a
                  v-show="!change_url_form"
                  class="mx-0 my-2 pa-0 text-body-2"
                  @click="change_url_form = !change_url_form"
                  >編集</a
                >
                <a
                  v-show="change_url_form"
                  class="mx-0 my-2 pa-0 text-body-2"
                  @click="change_url_form = !change_url_form"
                  >キャンセル</a
                >
              </v-card-title>
              <v-card-text class="ma-0 pa-0">
                <span v-if="links.length == 0" class="mx-0 my-2 pa-0"
                  >リンクがありません</span
                >
                <v-list-item v-for="url in links" :key="url.id">
                  <v-list-item-icon>
                    <v-icon>mdi-link</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ url.name }}</v-list-item-title>
                    <span>{{ url.linktext }}</span>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-icon v-show="change_url_form" @click="deleteLink(url)"
                      >mdi-close-circle</v-icon
                    >
                  </v-list-item-action>
                </v-list-item>
              </v-card-text>
              <div v-show="change_url_form" class="mt-2">
                <v-card-text class="mx-0 px-0 py-2">
                  <p class="ma-0 pa-0 text-subtitle-1">リンクの追加</p>
                  <v-text-field
                    v-model="change_url_name_input"
                    label="表示されるリンクの名前"
                  ></v-text-field>
                  <v-text-field
                    v-model="change_url_input"
                    label="リンクのURL"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions class="ma-0 px-0 py-0">
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="addLink()"> 追加 </v-btn>
                </v-card-actions>
              </div>
            </v-card>

            <v-card class="mx-1 my-1 px-2 py-2" elevation="1">
              <v-card-title class="ma-0 pa-0">
                <p
                  class="mx-0 my-1 pa-0 grey--text text--darken-2 text-subtitle-2"
                >
                  <v-icon color="light-blue" class="mr-2">mdi-image</v-icon>
                  サムネイル画像
                </p>
                <v-spacer></v-spacer>
                <a
                  v-show="!change_thumbnail_image_form"
                  class="mx-0 my-2 pa-0 text-body-2"
                  @click="
                    change_thumbnail_image_form = !change_thumbnail_image_form
                  "
                  >編集</a
                >
                <a
                  v-show="change_thumbnail_image_form"
                  class="mx-0 my-2 pa-0 text-body-2"
                  @click="
                    change_thumbnail_image_form = !change_thumbnail_image_form
                  "
                  >キャンセル</a
                >
              </v-card-title>
              <v-card-text class="ma-0 pa-0">
                <p class="ma-0 pa-0 text-caption grey--text text--darken-3">
                  インターネット上の誰でも表示できることに注意してください。
                </p>
                <p class="ma-0 pa-0 text-caption grey--text text--darken-3">
                  顔が写っている写真などはアップロードしないでください
                </p>
                <p class="ma-0 pa-0 text-caption grey--text text--darken-3">
                  画像は縦横比が縦:横=4:3のもの（なるべくそれに近しいもの）を設定してください。サイズが合わず小さく表示されてしまう場合があります。
                </p>
                <v-img
                  :src="group?.public_thumbnail_image_url"
                  contain
                  max-height="300px"
                ></v-img>
              </v-card-text>
              <div v-show="change_thumbnail_image_form">
                <v-card-text class="mx-0 px-0 py-2">
                  <v-file-input
                    v-model="change_thumbnail_image_input"
                    label="画像をアップロード"
                    filled
                    prepend-icon="mdi-image"
                  ></v-file-input>
                </v-card-text>
                <v-card-actions class="ma-0 px-0 py-0">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    outlined
                    @click="
                      group_edit.public_thumbnail_image_url = null
                      updateGroup()
                    "
                  >
                    画像を削除
                  </v-btn>
                  <v-btn color="primary" @click="changeThumbnailImage()">
                    適用
                  </v-btn>
                </v-card-actions>
              </div>
            </v-card>

            <!--何階かの情報の編集-->
            <v-card class="mx-1 my-1 px-2 py-2" elevation="1">
              <v-card-title class="ma-0 pa-0">
                <p
                  class="mx-0 my-1 pa-0 grey--text text--darken-2 text-subtitle-2"
                >
                  <v-icon color="light-blue" class="mr-2">mdi-stairs</v-icon>
                  階
                </p>
                <v-spacer></v-spacer>
                <a
                  v-show="!change_floor_form"
                  class="mx-0 my-2 pa-0 text-body-2"
                  @click="change_floor_form = !change_floor_form"
                  >編集</a
                >
                <a
                  v-show="change_floor_form"
                  class="mx-0 my-2 pa-0 text-body-2"
                  @click="change_floor_form = !change_floor_form"
                  >キャンセル</a
                >
              </v-card-title>
              <v-card-text class="ma-0 pa-0">
                <span class="mx-0 my-2 pa-0 text-body-1">{{
                  group?.floor
                }}</span>
              </v-card-text>
              <div v-show="change_floor_form">
                <v-card-text class="mx-0 px-0 py-2">
                  <v-text-field
                    v-model="change_floor_input"
                    label="階"
                    counter
                    maxlength="1"
                    filled
                    class="ma-0 pt-1 pb-0"
                  >
                  </v-text-field>
                </v-card-text>
                <v-card-actions class="ma-0 px-0 py-0">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    @click="
                      group_edit.floor = change_floor_input
                      updateGroup()
                    "
                  >
                    適用
                  </v-btn>
                </v-card-actions>
              </div>
            </v-card>

            <!--場所の編集-->
            <v-card class="mx-1 my-1 px-2 py-2" elevation="1">
              <v-card-title class="ma-0 pa-0">
                <p
                  class="mx-0 my-1 pa-0 grey--text text--darken-2 text-subtitle-2"
                >
                  <v-icon color="light-blue" class="mr-2">mdi-map</v-icon>
                  場所
                </p>
                <v-spacer></v-spacer>
                <a
                  v-show="!change_place_form"
                  class="mx-0 my-2 pa-0 text-body-2"
                  @click="change_place_form = !change_place_form"
                  >編集</a
                >
                <a
                  v-show="change_place_form"
                  class="mx-0 my-2 pa-0 text-body-2"
                  @click="change_place_form = !change_place_form"
                  >キャンセル</a
                >
              </v-card-title>
              <v-card-text class="ma-0 pa-0">
                <span class="mx-0 my-2 pa-0 text-body-1">{{
                  group?.place
                }}</span>
              </v-card-text>
              <div v-show="change_place_form">
                <v-card-text class="mx-0 px-0 py-2">
                  <v-text-field
                    v-model="change_place_input"
                    label="場所"
                    counter
                    maxlength="50"
                    filled
                    class="ma-0 pt-1 pb-0"
                  >
                  </v-text-field>
                </v-card-text>
                <v-card-actions class="ma-0 px-0 py-0">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    @click="
                      group_edit.place = change_place_input
                      updateGroup()
                    "
                  >
                    適用
                  </v-btn>
                </v-card-actions>
              </div>
            </v-card>

            <v-card
              v-show="$auth.user?.groups?.includes(user_groups.admin)"
              class="mx-1 my-1 px-2 py-2"
              elevation="1"
            >
              <v-card-title class="ma-0 pa-0">
                <p
                  class="mx-0 my-1 pa-0 grey--text text--darken-2 text-subtitle-2"
                >
                  <v-icon color="light-blue" class="mr-2">mdi-tag</v-icon>
                  タグ
                </p>
                <v-spacer></v-spacer>
                <a
                  v-show="!change_tags_form"
                  class="mx-0 my-2 pa-0 text-body-2"
                  @click="change_tags_form = !change_tags_form"
                  >編集</a
                >
                <a
                  v-show="change_tags_form"
                  class="mx-0 my-2 pa-0 text-body-2"
                  @click="change_tags_form = !change_tags_form"
                  >キャンセル</a
                >
              </v-card-title>
              <v-card-text class="ma-0 pa-0">
                <p class="ma-0 pa-0 text-caption grey--text text--darken-3">
                  団体を見つけやすくするためにタグをつけます
                </p>
                <p
                  v-if="group?.tags.length == 0"
                  class="ma-0 pa-0 text-caption grey--text text--darken-3"
                >
                  タグがありません
                </p>
                <v-chip-group column>
                  <v-chip v-for="tag in group?.tags" :key="tag.id">
                    {{ tag.tagname }}
                  </v-chip>
                </v-chip-group>
              </v-card-text>
              <div v-show="change_tags_form">
                <v-card-text class="mx-0 px-0 py-2">
                  <v-chip-group column>
                    <v-chip
                      v-for="tag in group?.tags"
                      :key="tag.id"
                      close
                      @click:close="deleteTag(tag)"
                    >
                      {{ tag.tagname }}
                    </v-chip>
                  </v-chip-group>
                </v-card-text>
                <v-card-actions class="ma-0 px-0 py-0">
                  <v-select
                    v-model="tag_selector"
                    :items="tags"
                    item-text="tagname"
                    label="タグを追加"
                    filled
                    return-object
                  >
                  </v-select>
                  <v-btn color="primary" @click="addTag()"> 追加 </v-btn>
                </v-card-actions>
              </div>
            </v-card>

            <v-card
              v-show="$auth.user?.groups?.includes(user_groups.admin)"
              class="mx-1 my-1 px-2 py-2"
              elevation="1"
            >
              <v-card-title class="ma-0 pa-0">
                <p
                  class="mx-0 my-1 pa-0 grey--text text--darken-2 text-subtitle-2"
                >
                  <v-icon color="light-blue" class="mr-2"
                    >mdi-wrench-cog-outline</v-icon
                  >
                  タイプ
                </p>
                <v-spacer></v-spacer>
                <a
                  v-show="!change_type_form"
                  class="mx-0 my-2 pa-0 text-body-2"
                  @click="change_type_form = !change_type_form"
                  >編集</a
                >
                <a
                  v-show="change_type_form"
                  class="mx-0 my-2 pa-0 text-body-2"
                  @click="change_type_form = !change_type_form"
                  >キャンセル</a
                >
              </v-card-title>
              <v-card-text class="ma-0 pa-0">
                <p class="ma-0 pa-0 text-caption grey--text text--darken-3">
                  団体のタイプを変更します。
                </p>
                <p>現在この団体は{{ group.type }}に設定されています。</p>
              </v-card-text>
              <div v-show="change_type_form">
                <v-card-text class="mx-0 px-0 py-2"> </v-card-text>
                <v-card-actions class="ma-0 px-0 py-0">
                  <v-select
                    v-model="group_edit.type"
                    :items="types"
                    item-text="typename"
                    label="タイプを変更"
                    filled
                    return-object
                  >
                  </v-select>
                  <v-btn color="primary" @click="updateGroup()"> 変更 </v-btn>
                </v-card-actions>
              </div>
            </v-card>

            <v-card
              v-if="!isNotClassroom(group)"
              class="mx-1 my-1 px-2 py-2"
              elevation="1"
            >
              <v-card-title class="ma-0 pa-0">
                <p
                  class="mx-0 my-1 pa-0 grey--text text--darken-2 text-subtitle-2"
                >
                  <v-icon color="light-blue" class="mr-2">mdi-calendar</v-icon>
                  公演
                </p>
                <v-spacer></v-spacer>
                <a
                  v-show="!change_events_form"
                  class="mx-0 my-2 pa-0 text-body-2"
                  @click="change_events_form = !change_events_form"
                  >編集</a
                >
                <a
                  v-show="change_events_form"
                  class="mx-0 my-2 pa-0 text-body-2"
                  @click="change_events_form = !change_events_form"
                  >キャンセル</a
                >
              </v-card-title>
              <v-card-text class="ma-0 pa-0">
                <v-card
                  v-for="event in events"
                  :key="event.id"
                  class="mx-0 my-1 px-0"
                  elevation="1"
                >
                  <v-card-title class="text-subtitle-1 py-2 px-1">
                    {{ event.eventname }}
                    <v-spacer></v-spacer>
                    <v-dialog
                      v-if="selected_event"
                      v-model="delete_event_dialog"
                      max-width="300"
                    >
                      <v-card>
                        <v-card-title>この公演を削除しますか?</v-card-title>
                        <v-card-text>この操作は取り消せません</v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="primary"
                            text
                            @click="delete_event_dialog = false"
                            >キャンセル</v-btn
                          >
                          <v-btn
                            color="primary"
                            @click="deleteEvent(selected_event)"
                            >削除</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-icon
                      v-show="change_events_form"
                      @click="selectDeleteEvent(event)"
                      >mdi-close-circle</v-icon
                    >
                  </v-card-title>
                  <v-card-text class="pb-2 px-1">
                    <p class="ma-0 pa-0">座席：{{ event.ticket_stock }}</p>
                    <p class="ma-0 pa-0">
                      配布時間：{{ dateFormatter(event.sell_starts) }} ~
                      {{ dateFormatter(event.sell_ends) }}
                    </p>
                    <p class="ma-0 pa-0">
                      公演時間：{{ dateFormatter(event.starts_at) }} ~
                      {{ dateFormatter(event.ends_at) }}
                    </p>
                  </v-card-text>
                </v-card>
              </v-card-text>
              <div v-show="change_events_form" class="mt-2">
                <v-card-text class="mx-0 px-0 py-2">
                  <p class="ma-0 pa-0 text-subtitle-1">公演の追加</p>
                  <v-text-field v-model="add_eventname" label="公演名">
                  </v-text-field>
                  <v-select
                    v-model="add_event_target"
                    :items="add_event_target_list"
                    item-text="text"
                    label="公演の対象者を選択"
                    filled
                    return-object
                  >
                  </v-select>
                  <v-text-field
                    v-model="add_event_starts_at"
                    label="公演開始時刻"
                    type="datetime-local"
                    suffix="JST"
                  ></v-text-field>
                  <v-text-field
                    v-model="add_event_ends_at"
                    label="公演終了時刻"
                    type="datetime-local"
                    suffix="JST"
                  ></v-text-field>
                  <v-text-field
                    v-model="add_event_sell_starts"
                    label="配布開始時刻"
                    type="datetime-local"
                    suffix="JST"
                  ></v-text-field>
                  <v-text-field
                    v-model="add_event_sell_ends"
                    label="配布終了時刻"
                    type="datetime-local"
                    suffix="JST"
                  ></v-text-field>
                  <v-text-field
                    v-model="add_event_ticket_stock"
                    label="座席数を入力"
                    filled
                    class="ma-0 pt-1 pb-0"
                  >
                  </v-text-field>
                </v-card-text>
                <v-card-actions class="ma-0 px-0 py-0">
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="createEvent()"> 追加 </v-btn>
                </v-card-actions>
              </div>
            </v-card>
            <v-dialog v-model="delete_group_dialog" max-width="500">
              <v-card>
                <v-card-title>本当にこの団体を削除しますか?</v-card-title>
                <v-card-text>この操作は取り消せません</v-card-text>
                <v-card-actions>
                  <v-btn
                    color="primary"
                    outlined
                    @click="delete_group_dialog = false"
                    >キャンセル</v-btn
                  >
                  <v-btn color="red" @click="deleteGroup()">削除</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn
              v-show="$auth.user?.groups?.includes(user_groups.admin)"
              color="red"
              outlined
              class="ma-4 font-weight-bold"
              @click="delete_group_dialog = true"
            >
              <v-icon color="red">mdi-alert</v-icon>この団体を削除
            </v-btn>
          </v-col>
        </v-row>
        <v-snackbar v-model="success_alert" color="success" elevation="2">
          {{ success_message }}
          <template #action="{ attrs }">
            <v-btn
              color="white"
              icon
              v-bind="attrs"
              @click="success_alert = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-snackbar>
        <v-snackbar v-model="error_alert" color="red" elevation="2">
          {{ error_message }}
          <template #action="{ attrs }">
            <v-btn
              color="white"
              icon
              v-bind="attrs"
              @click="error_alert = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-snackbar>
      </v-container>
    </div>
    <div v-else>
      <LoadingPage />
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { Event, Group, GroupEdit, GroupLink, Tag } from '~/types/quaint'
type Data = {
  nowloading: boolean
  tags: Tag[]
  group: Group | undefined
  events: Event[]
  links: GroupLink[]

  group_edit: GroupEdit

  user_groups: { admin: string; owner: string; chief: string }
  hostname: string

  success_alert: boolean
  error_alert: boolean
  success_message: string
  error_message: string
  change_title_form: boolean
  change_title_input: string
  change_description_form: boolean
  change_description_input: string
  change_twitter_url_form: boolean
  change_twitter_url_input: string
  change_instagram_url_form: boolean
  change_instagram_url_input: string
  change_stream_url_form: boolean
  change_stream_url_input: string
  change_url_form: boolean
  change_url_input: string
  change_url_name_input: string
  change_thumbnail_image_form: boolean
  change_thumbnail_image_input: any
  change_floor_form: boolean
  change_floor_input: number
  change_place_form: boolean
  change_place_input: string
  change_tags_form: boolean
  change_type_form: boolean
  tag_selector: Tag
  types: string[]
  change_events_form: boolean
  add_eventname: string
  add_event_target_list: { text: string; target: string }[]
  add_event_target: { text: string; target: string }
  add_event_ticket_stock: number
  add_event_starts_at: string
  add_event_ends_at: string
  add_event_sell_starts: string
  add_event_sell_ends: string
  delete_group_dialog: boolean
  selected_event: Event | null
  delete_event_dialog: boolean
}

export default Vue.extend({
  name: 'IndivisualGroupPageEditer',
  async asyncData({ params, $axios, payload }): Promise<Partial<Data>> {
    let group
    let tags
    let events
    let links
    if (payload !== undefined) {
      group = payload.group
      tags = payload.tags
      events = await $axios.$get('/groups/' + params.groupId + '/events')
    } else {
      const res = await Promise.all([
        $axios.$get('/tags'),
        $axios.$get('/groups/' + params.groupId),
        $axios.$get('/groups/' + params.groupId + '/events'),
        $axios.$get('groups/' + params.groupId + '/links'),
      ])
      tags = res[0]
      group = res[1]
      events = res[2]
      links = res[3]
    }
    const group_edit = { ...(group as Group) }
    return {
      tags,
      group,
      events,
      group_edit,
      links,
      tag_selector: tags[0],
    }
  },
  data(): Data {
    return {
      nowloading: true,
      tags: [],
      group: undefined,
      events: [],
      links: [],
      tag_selector: { id: '', tagname: '' },
      types: ['play', 'club', 'hebe', 'test', 'other'],
      group_edit: {
        floor: null,
        place: null,
        type: null,
      },
      user_groups: {
        admin: process.env.AZURE_AD_GROUPS_QUAINT_ADMIN as string,
        owner: process.env.AZURE_AD_GROUPS_QUAINT_OWNER as string,
        chief: process.env.AZURE_AD_GROUPS_QUAINT_CHIEF as string,
      },
      hostname: '',
      success_alert: false,
      error_alert: false,
      success_message: '',
      error_message: '',

      change_title_form: false,
      change_title_input: '',
      change_description_form: false,
      change_description_input: '',
      change_twitter_url_form: false,
      change_twitter_url_input: '',
      change_instagram_url_form: false,
      change_instagram_url_input: '',
      change_stream_url_form: false,
      change_stream_url_input: '',
      change_url_form: false,
      change_url_input: '',
      change_url_name_input: '',
      change_thumbnail_image_form: false,
      change_thumbnail_image_input: null,
      change_floor_form: false,
      change_floor_input: 0,
      change_place_form: false,
      change_place_input: '',
      change_tags_form: false,
      change_type_form: false,
      change_events_form: false,
      add_eventname: '例)第1公演',
      add_event_target_list: [
        { target: 'school_parents', text: '生徒・保護者・先生' },
        { target: 'school', text: '生徒・先生' },
        { target: 'parents', text: '保護者のみ' },
        { target: 'student', text: '生徒のみ' },
        { target: 'paper', text: '紙整理券' },
        { target: 'everyone', text: '全員' },
        { target: 'guest', text: '一般客' },
      ],
      add_event_target: {
        target: 'school_parents',
        text: '生徒・保護者・先生',
      },
      add_event_ticket_stock: 24,
      add_event_starts_at: '2024-09-14T09:30',
      add_event_ends_at: '2024-09-14T10:30',
      add_event_sell_starts: '2024-09-14T08:30',
      add_event_sell_ends: '2024-09-14T09:30',
      delete_group_dialog: false,
      delete_event_dialog: false,
      selected_event: null,
    }
  },
  head() {
    return {
      title: this.group?.groupname + ' - 団体情報の編集',
    }
  },
  async created() {
    // 入力フォームに現在の内容を提示
    this.change_title_input = this.group?.title ?? ''
    this.change_description_input = this.group?.description ?? ''
    this.change_twitter_url_input = this.group?.twitter_url ?? ''
    this.change_instagram_url_input = this.group?.instagram_url ?? ''
    this.change_stream_url_input = this.group?.stream_url ?? ''

    this.hostname = location.host // data()のreturn()内で使うとエラーになるのでここで代入
    if (
      !(this.$auth.user?.groups as string[]).includes(this.user_groups.admin) &&
      !(this.$auth.user?.groups as string[]).includes(this.user_groups.chief)
    ) {
      if (
        (this.$auth.user?.groups as string[]).includes(this.user_groups.owner)
      ) {
        if (
          !(
            (await this.$axios.$get('/users/me/owner_of')) as string[]
          ).includes(this.$route.params.groupId)
        ) {
          this.$nuxt.error({ statusCode: 403, message: 'Forbidden' })
        }
      } else {
        this.$nuxt.error({ statusCode: 403, message: 'Forbidden' })
      }
    }
  },

  mounted() {
    // ロードの終了
    this.nowloading = false
  },

  methods: {
    isNotClassroom(group: Group) {
      if (group.type === 'play' || group.type === 'test') {
        return false
      } else {
        return true
      }
    },
    dateFormatter(input_date: string) {
      const d = new Date(input_date)
      return (
        d.getMonth() +
        1 +
        '月' +
        d.getDate() +
        '日 ' +
        d.getHours().toString().padStart(2, '0') +
        ':' +
        d.getMinutes().toString().padStart(2, '0')
      )
    },
    updateGroup() {
      this.$axios
        .$put('/groups/' + this.group?.id, this.group_edit)
        .then((res) => {
          this.group = res
          this.success_message = '団体情報が更新されました'
          this.success_alert = true
        })
        .catch((e) => {
          if (e.response) {
            this.error_message = e.response.data.detail
            if (e.response.status === 422) {
              this.error_message = '入力された値の形式が不適切です'
            }
          } else {
            this.error_message =
              '予期しないエラーが発生しました。IT委員にお声がけください🙇‍♂️'
          }
          this.error_alert = true
        })
    },
    changeThumbnailImage() {
      if (this.change_thumbnail_image_input === null) {
        this.error_message = '画像が選択されていません'
        this.error_alert = true
        return
      }
      const params = new FormData()
      params.append('file', this.change_thumbnail_image_input)
      this.$axios
        .put('/groups/' + this.group?.id + '/public_thumbnail_image', params, {
          headers: { 'content-type': 'multipart/form-data' },
        })
        .then((res) => {
          this.group = res.data
          this.success_message = 'サムネイル画像が変更されました'
          this.success_alert = true
          this.$nuxt.refresh()
        })
        .catch((e) => {
          if (e.response) {
            this.error_message = e.response.data.detail
            if (e.response.status === 422) {
              this.error_message = '入力された値の形式が不適切です'
            }
          } else {
            this.error_message =
              '予期しないエラーが発生しました。IT委員にお声がけください🙇‍♂️'
          }
          this.error_alert = true
          this.$nuxt.refresh()
        })
    },
    addLink() {
      if (this.change_url_name_input === '' || this.change_url_input === '') {
        this.error_message = 'リンクが入力されていません'
        this.error_alert = true
        return
      }
      this.$axios
        .post('/groups/' + this.group?.id + '/links', {
          name: this.change_url_name_input,
          linktext: this.change_url_input,
        })
        .then(() => {
          this.success_message = 'リンクが追加されました'
          this.success_alert = true
          this.$nuxt.refresh()
        })
        .catch((e) => {
          if (e.response) {
            this.error_message = e.response.data.detail
            if (e.response.status === 422) {
              this.error_message = '入力された値の形式が不適切です'
            }
          } else {
            this.error_message =
              '予期しないエラーが発生しました。IT委員にお声がけください🙇‍♂️'
          }
          this.error_alert = true
          this.$nuxt.refresh()
        })
    },
    deleteLink(link: GroupLink) {
      this.$axios
        .delete('/groups/' + this.group?.id + '/links/' + link.id)
        .then(() => {
          this.success_message = 'リンクが削除されました'
          this.success_alert = true
          this.$nuxt.refresh()
        })
        .catch((e) => {
          if (e.response) {
            this.error_message = e.response.data.detail
            if (e.response.status === 422) {
              this.error_message = '入力された値の形式が不適切です'
            }
          } else {
            this.error_message =
              '予期しないエラーが発生しました。IT委員にお声がけください🙇‍♂️'
          }
          this.error_alert = true
          this.$nuxt.refresh()
        })
    },
    deleteTag(tag: Tag) {
      this.$axios
        .delete('/groups/' + this.group?.id + '/tags/' + tag.id)
        .then(() => {
          this.success_message = 'タグが削除されました'
          this.success_alert = true
          this.$nuxt.refresh()
        })
        .catch((e) => {
          if (e.response) {
            this.error_message = e.response.data.detail
            if (e.response.status === 422) {
              this.error_message = '入力された値の形式が不適切です'
            }
          } else {
            this.error_message =
              '予期しないエラーが発生しました。IT委員にお声がけください🙇‍♂️'
          }
          this.error_alert = true
        })
    },
    addTag() {
      if (this.tag_selector != null) {
        this.$axios
          .put('/groups/' + this.group?.id + '/tags', {
            tag_id: this.tag_selector.id,
          })
          .then(() => {
            this.success_message = 'タグが追加されました'
            this.success_alert = true
            this.$nuxt.refresh()
          })
          .catch((e) => {
            if (e.response) {
              this.error_message = e.response.data.detail
              if (e.response.status === 422) {
                this.error_message = '入力された値の形式が不適切です'
              }
            } else {
              this.error_message =
                '予期しないエラーが発生しました。IT委員にお声がけください🙇‍♂️'
            }
            this.error_alert = true
          })
      }
    },
    selectDeleteEvent(event: Event) {
      this.selected_event = event
      this.delete_event_dialog = true
    },
    deleteEvent(event: Event) {
      this.$axios
        .delete('/groups/' + this.group?.id + '/events/' + event.id)
        .then(() => {
          this.success_message = '公演が削除されました'
          this.success_alert = true
          this.$nuxt.refresh()
        })
        .catch((e) => {
          if (e.response) {
            this.error_message = e.response.data.detail
            if (e.response.status === 422) {
              this.error_message = '入力された値の形式が不適切です'
            }
          } else {
            this.error_message =
              '予期しないエラーが発生しました。IT委員にお声がけください🙇‍♂️'
          }
          this.error_alert = true
          this.$nuxt.refresh()
        })
    },
    createEvent() {
      if (Number.isInteger(Number(this.add_event_ticket_stock))) {
        this.$axios
          .post('/groups/' + this.group?.id + '/events', {
            eventname: this.add_eventname,
            lottery: false,
            target: this.add_event_target.target,
            ticket_stock: Number(this.add_event_ticket_stock),
            starts_at: this.add_event_starts_at + '+09:00',
            ends_at: this.add_event_ends_at + '+09:00',
            sell_starts: this.add_event_sell_starts + '+09:00',
            sell_ends: this.add_event_sell_ends + '+09:00',
          })
          .then(() => {
            this.success_message = '公演が追加されました'
            this.success_alert = true
            this.$nuxt.refresh()
          })
          .catch((e) => {
            if (e.response) {
              this.error_message = e.response.data.detail
              if (e.response.status === 422) {
                this.error_message = '入力された値の形式が不適切です'
              }
            } else {
              this.error_message =
                '予期しないエラーが発生しました。IT委員にお声がけください🙇‍♂️'
            }
            this.error_alert = true
            this.$nuxt.refresh()
          })
      } else if (!Number.isInteger(Number(this.ticket_stock_input))) {
        this.error_message = '座席数には整数を入力してください'
        this.error_alert = true
      }
    },
    deleteGroup() {
      this.$axios
        .delete('/groups/' + this.group?.id)
        .then(() => {
          this.success_message = '団体が削除されました'
          this.success_alert = true
          this.$router.push('/groups')
        })
        .catch((e) => {
          if (e.response) {
            this.error_message = e.response.data.detail
            if (e.response.status === 422) {
              this.error_message = '入力された値の形式が不適切です'
            }
          } else {
            this.error_message =
              '予期しないエラーが発生しました。IT委員にお声がけください🙇‍♂️'
          }
          this.error_alert = true
          this.$nuxt.refresh()
        })

      this.delete_event_dialog = false
    },
  },
})
</script>
