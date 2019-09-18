// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import firebase from 'firebase/app'
import 'firebase/auth'
import router from './router'
import {store} from './store/store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import AlertCmp from './components/Shared/Alert.vue'

Vue.use(Vuetify)

Vue.config.productionTip = false

Vue.component('app-alert', AlertCmp)
// Initialize Firebase
let config = {
apiKey: "AIzaSyCDo6N6VED2eXxBPouNrEHq2MDRYUn3ooc",
authDomain: "fifa-2018-205516.firebaseapp.com",
databaseURL: "https://fifa-2018-205516.firebaseio.com",
projectId: "fifa-2018-205516",
storageBucket: "fifa-2018-205516.appspot.com",
messagingSenderId: "71491611031"
};
firebase.initializeApp(config)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('getMatches')
      }
    })

  }
})
