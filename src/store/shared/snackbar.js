export default {
    state: {
      snackOption: {
        snackbar: false,
        color: '',
        timeout: 8000,
        text: ''
       }
    },
    mutations: {
      setSnackBar (state, payload) {
        state.snackOption.snackbar = true
        state.snackOption.color = payload.color
        state.snackOption.text = payload.text
      },
      clearSnackBar (state) {
        state.snackOption.snackbar = false
        state.snackOption.color = ''
        state.snackOption.text = ''
      }
    },
    actions: {
      clearSnackBar ({commit}) {
        commit('clearSnackBar')
      },
      setSnackBar ({commit}, payload) {
        commit('setSnackBar', payload)
      }
    },
    getters: {
      snackBar (state) {
        return state.snackOption
      }
    }
  }