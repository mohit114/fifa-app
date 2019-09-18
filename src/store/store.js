import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import shared from './shared'
import match from './match'
import snackbar from './shared/snackbar'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    user: user,
    shared: shared,
    match: match,
    snackbar: snackbar
  }
})