export const state = () => ({
  success_alert: false, // 成功のSnackbarか
  error_alert: false, // 失敗のSnackbarか
  success_message: '', // 成功時のSnackbarに表示するメッセージ
  error_message: '', // 失敗時のSnackbarに表示するメッセージ
  success_snackbar_link: '', // 成功時のSnackbarに表示するメッセージのハイパーリンク
  error_snackbar_link: '', // 失敗時のSnackbarに表示するメッセージのハイパーリンク
})

export const mutations = {
  // 成功時のSnackbarを表示
  // 引数 message, link
  ShowSuccessSnackbar(state, payload) {
    state.success_alert = true
    state.success_message = payload.message
    state.success_snackbar_link = payload.link
  },

  // 成功時のSnackbarを閉じる
  CloseSuccessSnackbar(state) {
    state.success_alert = false
    state.success_message = ''
    state.success_snackbar_link = ''
  },

  // 失敗時のSnackbarを表示
  // 引数 message, link
  ShowErrorSnackbar(state, payload) {
    state.error_alert = true
    state.error_message = payload.message
    state.error_snackbar_link = payload.link
  },

  // 失敗時のSnackbarを閉じる
  CloseErrorSnackbar(state) {
    state.error_alert = false
    state.error_message = ''
    state.error_snackbar_link = ''
  },
}
