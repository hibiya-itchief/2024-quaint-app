import Vue from 'vue'

// quaint-apiで定義されているUserRoleとの連携
// https://github.com/hibiya-itchief/quaint-api/issues/118

// Vueインスタンスに型を追加する
declare module 'vue/types/vue' {
  interface Vue {
    $quaintUserRole(
      target: string,
      user: Record<string, unknown> | null
    ): boolean
  }
}

// Vueインスタンスにメソッドを追加する
Vue.prototype.$quaintUserRole = (
  target: string,
  user: Record<string, unknown> | null
): boolean => {
  if (user === undefined || user === null) {
    return false
  }

  const b2c_issuer =
    'https://seiryofesb2c.b2clogin.com/450b2222-dcb5-471d-9657-bb4ee50acd97/v2.0' // trailing slashなしで統一してstring.includes()で判定する
  const ad_issuer =
    'https://login.microsoftonline.com/158e6d17-f3d5-4365-8428-26dfc74a9d27/v2.0' // trailing slashなしで統一してstring.includes()で判定する
  const admin = '5c091517-25de-44bc-9e42-ffcb8539435c'
  const entry = '63a40184-8dab-43b4-8367-54e84ace6e2a'
  const owner = 'a577d858-64bf-4815-aaf6-d893c654e92e'
  const parents = 'ecd46dae-d84b-42d8-9357-ac24d480a168'
  const students = '865bb05d-cb7d-4919-b18d-8b977ec0499b'
  const teachers = '0a8ee476-cd37-4c31-bd6e-c34e750574f4'
  const chief = '67e48f08-22e0-4ec4-9674-1428aaa5c055'
  const guest = '94c45b57-680c-4b5b-a98b-d78f1fd90d71'

  if (!(user.iss !== undefined && typeof user.iss === 'string')) {
    return false
  }
  switch (target) {
    case 'admin':
      return (
        user.iss.includes(ad_issuer) &&
        user.groups !== undefined &&
        Array.isArray(user.groups) &&
        user.groups.includes(admin)
      )
    case 'owner':
      return (
        user.iss.includes(ad_issuer) &&
        user.groups !== undefined &&
        Array.isArray(user.groups) &&
        user.groups.includes(owner)
      )
    case 'chief':
      return (
        user.iss.includes(ad_issuer) &&
        user.groups !== undefined &&
        Array.isArray(user.groups) &&
        user.groups.includes(chief)
      )
    case 'entry':
      return (
        user.iss.includes(ad_issuer) &&
        user.groups !== undefined &&
        Array.isArray(user.groups) &&
        user.groups.includes(entry)
      )
    case 'everyone':
      return true
    case 'paper':
      return false
    case 'b2c':
      return user.iss.includes(b2c_issuer)
    case 'b2c_visited':
      return (
        user.iss.includes(b2c_issuer) &&
        user.jobTitle !== undefined &&
        typeof user.jobTitle === 'string' &&
        (user.jobTitle.includes('Visited') || user.jobTitle.includes('visited'))
      )
    case 'ad':
      return user.iss.includes(ad_issuer)
    case 'parents':
      return (
        user.iss.includes(ad_issuer) &&
        user.groups !== undefined &&
        Array.isArray(user.groups) &&
        user.groups.includes(parents)
      )
    case 'student':
      return (
        user.iss.includes(ad_issuer) &&
        user.groups !== undefined &&
        Array.isArray(user.groups) &&
        user.groups.includes(students)
      )
    case 'school':
      return (
        user.iss.includes(ad_issuer) &&
        user.groups !== undefined &&
        Array.isArray(user.groups) &&
        (user.groups.includes(students) || user.groups.includes(teachers))
      )
    case 'guest':
      return (
        user.iss.includes(ad_issuer) &&
        user.groups !== undefined &&
        Array.isArray(user.groups) &&
        user.groups.includes(guest)
      )
    case 'visited':
      return (
        (user.iss.includes(b2c_issuer) &&
          user.jobTitle !== undefined &&
          typeof user.jobTitle === 'string' &&
          (user.jobTitle.includes('Visited') ||
            user.jobTitle.includes('visited'))) ||
        user.iss.includes(ad_issuer)
      )
    case 'visited_parents':
      return (
        (user.iss.includes(b2c_issuer) &&
          user.jobTitle !== undefined &&
          typeof user.jobTitle === 'string' &&
          (user.jobTitle.includes('Visited') ||
            user.jobTitle.includes('visited'))) ||
        (user.iss.includes(ad_issuer) &&
          user.groups !== undefined &&
          Array.isArray(user.groups) &&
          user.groups.includes(parents))
      )
    case 'visited_school':
      return (
        (user.iss.includes(b2c_issuer) &&
          user.jobTitle !== undefined &&
          typeof user.jobTitle === 'string' &&
          (user.jobTitle.includes('Visited') ||
            user.jobTitle.includes('visited'))) ||
        (user.iss.includes(ad_issuer) &&
          user.groups !== undefined &&
          Array.isArray(user.groups) &&
          (user.groups.includes(students) || user.groups.includes(teachers)))
      )
    case 'school_parents':
      return (
        user.iss.includes(ad_issuer) &&
        user.groups !== undefined &&
        Array.isArray(user.groups) &&
        (user.groups.includes(students) ||
          user.groups.includes(teachers) ||
          user.groups.includes(parents))
      )

    default:
      return false
  }
}
