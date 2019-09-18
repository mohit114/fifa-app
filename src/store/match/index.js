import axios from 'axios';
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
	state: {
		allMatches: []
	},
	mutations: {
		setMatches (state, payload) {
			state.allMatches = payload.map((match, index) => {
				match.MatchNo = index + 1
				return match
			})
		},
		setUnupdatable (state, matchid){
			const matchValue = state.allMatches.filter(match => {
				return match._id === matchid
			})
			matchValue[0].IsUpdatable = false
		},
		updateScores (state, payload){
			const matchValue = state.allMatches.filter(match => {
				return match._id === payload.matchid
			})
			matchValue[0].LeftCountryScore = payload.leftscore
			matchValue[0].RightCountryScore = payload.rightscore
			matchValue[0].IsOver = true
		}
	},
	actions : {
		getMatches ({commit}) {
		  	axios.get(process.env.ROOT_API + '/matches/' + firebase.auth().currentUser.uid)
            .then(response => {
                 commit('setMatches', response.data)
            })
            .catch(err => {
                 console.log(err.message);
            })
		},
		addPrediction ({commit}, payload) {
			payload.userid = firebase.auth().currentUser.uid
            axios.post(process.env.ROOT_API + '/add/prediction',
            payload
            ).then(response => {
             console.log(response.status)
             commit('setSnackBar', {"color": "success", "text": "Successfully saved your prediction for match " + payload.index + "."})
            }).catch(err => {
               console.log(err.message)
                commit('setSnackBar', {"color": "error", "text": err.response.data})
            })
		},
		clearMatches ({commit}) {
			commit('setMatches', [])
		},
		markUnupdatable ({commit}, matchid) {
			axios.put(process.env.ROOT_API + '/endprediction/' + matchid + '/' + firebase.auth().currentUser.uid).then(response => {
				commit('setUnupdatable', matchid)
				commit('setSnackBar', {"color": "success", "text": "Prediction time over for selected match."})
			}).catch(err => {
				commit('setSnackBar', {"color": "error", "text": err.response.data})
			})
		},
		updateFinalScore ({commit}, payload) {
            const scores = {
              leftscore: payload.leftscore,
              rightscore: payload.rightscore
            }
            axios.put(process.env.ROOT_API + '/upatescore/' + payload.matchid + '/' + firebase.auth().currentUser.uid, scores).then(response => {
				commit('updateScores', payload)
				commit('setSnackBar', {"color": "success", "text": "Final score successfully updated for selected match."})
			}).catch(err => {
				commit('setSnackBar', {"color": "error", "text": err.response.data})
			})
		},
		sendEmails ({commit}, payload) {
			axios.get(process.env.ROOT_API + '/sendemail/' + payload.LeftCountry + '/' + payload.RightCountry + '/' + payload.MatchNumber + '/' + payload.MatchId + '/' + firebase.auth().currentUser.uid)
			.then(response => {
				 commit('setSnackBar', {"color": "success", "text": "Successfully sent email for match " + payload.MatchNumber + "."})
			})
			.catch(err => {
				commit('setSnackBar', {"color": "error", "text": err.response.data})
			})
		}
	},
	getters : {
		matches (state) {
			return state.allMatches
		}
	}
}