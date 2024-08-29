export type Tag = {
  id: string
  tagname: string
}
export type Group = {
  id: string
  enable_vote: boolean
  groupname: string
  title: string | null
  description: string | null
  twitter_url: string | null
  instagram_url: string | null
  stream_url: string | null
  public_thumbnail_image_url: string | null
  public_page_content_url: string | null
  private_page_content_url: string | null

  floor: number | null // 何階か
  place: string | null // どこでやるか
  tags: Tag[]

  type: string // 団体のタイプ情報
}
export type GroupLink = {
  id: string
  name: string
  group_id: string
  linktext: string
}
export type GroupEdit = {
  title?: string | null
  description?: string | null
  twitter_url?: string | null
  instagram_url?: string | null
  stream_url?: string | null
  public_thumbnail_image_url?: string | null
  public_page_content_url?: string | null
  private_page_content_url?: string | null

  floor: number | null // 何階か
  place: string | null // 場所

  type: string | null // 団体のタイプ情報
}
export type Event = {
  id: string
  group_id: string
  eventname: string
  starts_at: string
  ends_at: string
  sell_starts: string
  sell_ends: string
  target: string
  ticket_stock: number
  lottery: boolean
}

export type Ticket = {
  group_id: string
  event_id: string
  owner_id: string
  is_family_ticket: boolean
  person: number
  id: string
  created_at: string
  status: string
}

export type OwnerOf = {
  group_id: string
  user_id: string
  note: string
}

export type News = {
  title: string
  author: string
  detail: string
  timestamp: string
  id: string
}

export type EditNews = {
  title: string
  author: string
  detail: string
}

/*
default.vueのmethods内で this.$auth.user.groupsを参照するとオブジェクトタイプがunknownになってしまいif文の中で使えない
https://github.com/nuxt-community/auth-module/issues/1097
↑おそらくこれが同じ問題にぶち当たっているissue
応急処置としてuser型として使えるようにする
とても昔から開かれているissueだし解決策がすでにあるのかも
それか普通に知識不足
*/
export type User = {
  aio: string
  aud: string
  exp: number
  groups: Array<string>
  iat: number
  iss: string
  name: string
  nbf: number
  oid: string
  preferred_username: string
  rh: string
  sub: string
  tid: string
  uti: string
  ver: string
  wids: Array<string>
}
