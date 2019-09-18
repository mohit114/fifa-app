import firebase from 'firebase/app'
import 'firebase/auth'
import axios from 'axios'

export default {
  state: {
    user: null,
    leaderboard: []
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setBoard (state, payload) {
      state.leaderboard = payload
    }
  },
   actions: {
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      if(payload.groupname.trim() !== process.env.GROUP_1 
        && payload.groupname.trim() !== process.env.GROUP_2 
        && payload.groupname.trim() !== process.env.GROUP_3 
        && payload.groupname.trim() !== process.env.GROUP_4
        && payload.groupname.trim() !== process.env.GROUP_5
        && payload.groupname.trim() !== process.env.GROUP_6){
         commit('setLoading', false)
         let error = new Object()
         error.message = 'Invalid group code.'
         commit('setError', error)
         return
      }
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              email: user.email
            }
            commit('setUser', newUser)
            const userModel = {
              userid: firebase.auth().currentUser.uid,
              email: payload.email,
              username: payload.username,
              groupname: payload.groupname
            }
            axios.post(process.env.ROOT_API + '/add/user',
            userModel
            ).then(response => {
             
            }).catch(err => {
               console.log(err)
            })
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              email: user.email
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {
        id: payload.uid,
        email: payload.email
      })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    getLeaderboard ({commit}, payload) {
     commit('setBoard', payload)
    },
    clearLeaderBoard ({commit}) {
      commit('setBoard', [])
    }
  },
    getters: {
    user (state) {
      return state.user
    },
    leaderBoard (state) {
      return state.leaderboard
    }
  }
}