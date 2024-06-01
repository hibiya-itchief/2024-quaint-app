export const state = () => ({
  success_alert: false, // 成功のSnackbarか
  error_alert: false, // 失敗のSnackbarか
  internet_success_alert: false, // APIを使用した際に成功したか
  internet_error_alert: false, // APIを使用した情報取得に失敗したか
  success_message: '', // 成功時のSnackbarに表示するメッセージ
  error_message: '', // 失敗時のSnackbarに表示するメッセージ
  internet_success_message: '',
  internet_error_message: '', // API使用時の取得エラー時のメッセージ
  success_snackbar_link: '', // 成功時のSnackbarに表示するメッセージのハイパーリンク
  error_snackbar_link: '', // 失敗時のSnackbarに表示するメッセージのハイパーリンク
})

// 関数の命名があまりに適当でわかりにくいので変更した方がいい
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

  // 成功時のメッセージのみSnackbar
  // 引数 message
  ShowInternetSuccessSnackbar(state, payload) {
    state.internet_success_alert = true
    state.internet_success_message = payload.message
  },

  // 成功時のメッセージのみSnackbarを閉じる
  CloseInternetSuccessSnackbar(state) {
    state.internet_success_alert = false
    state.internet_success_message = ''
  },

  // 失敗時のメッセージのみSnackbar
  // 引数 message
  ShowInternetErrorSnackbar(state, payload) {
    state.internet_error_alert = true
    state.internet_error_message = payload.message
  },

  //
  CloseInternetErrorSnackbar(state) {
    state.internet_error_alert = false
    state.internet_error_message = ''
  },
}
