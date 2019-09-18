<template>
  <v-container fluid>
  	 <v-snackbar
	    :timeout="snackbarOps.timeout"
	    :color="snackbarOps.color"
	    :top="true"
	    :vertical="true"
	    v-model="snackbarOps.snackbar"
	    >
	    {{ snackbarOps.text }}
	    <v-btn dark flat @click="dismissSnackBar()">Close</v-btn>
    </v-snackbar>
  		<v-flex xs12 text-xs-center>
			<h1 style="color: red">FIFA WORLD CUP 2018 ALL MATCHES</h1>			
  		</v-flex>
	  	<v-layout row wrap style="margin-top: 50px;" text-xs-center>
	  		<template v-for="(match, index) in allMatches">
		  		<v-flex xs12 sm3>		  			
		  			<h2>{{match.LeftCountry}}</h2> <img v-bind:src="match.LeftFlagUrl" style="width: 64px">
		  		</v-flex>
		  		<v-flex xs12 sm1>
		  			 <v-text-field
				          id="scoreleft"
				          name="input-1"
				          label=""
  				          v-model="match.LeftCountryScore"
  				          :disabled="match.IsOver"
				        ></v-text-field>
		  		</v-flex>
		  		<v-flex xs12 sm1>
		  		</v-flex>
		  		<v-flex xs12 sm2>
		  			 <h2 v-if="!match.LeftCountryScore" style="color: #424242">Match {{index + 1}} <br/>{{match.MatchUIDate}}</h2>
		  			 <h2 v-else style="color: #424242">Match {{index + 1}} <br/> {{match.MatchUIDate}} </h2>
		  		</v-flex>
		  		<v-flex xs12 sm1>
		  		</v-flex>
		  		<v-flex xs12 sm1>
		  			 <v-text-field
				          id="scoreright"
				          name="input-2"
				          label=""
				          v-model="match.RightCountryScore"
				          :disabled="match.IsOver"
				        ></v-text-field>
		  		</v-flex>
		  		<v-flex xs12 sm3>
		  			<h2>{{match.RightCountry}}</h2>
		  			<img v-bind:src="match.RightFlagUrl" style="width: 64px">				
		  		</v-flex>
		  			<v-flex xs12 style="margin-bottom: 30px; margin-top: 25px">
		  			<v-btn 
	  					flat 
		  				color="primary"
		  				@click="EndPrediction(match._id)"
		  				:disabled="!match.IsUpdatable"
		  			>End Prediction</v-btn>
		  			<v-btn 
	  					flat 
		  				color="primary"
		  				@click="SendEmail(match.LeftCountry, match.RightCountry, index + 1,  match._id)"
		  				:disabled="match.IsUpdatable"
		  			>Send Email</v-btn>
		  			<v-btn 
		  				flat 
		  				color="primary"
		  				:disabled="match.IsOver"
		  				@click="saveScore(match._id, match.LeftCountryScore, match.RightCountryScore, index + 1)"
		  			>Save Score</v-btn>
		  		</v-flex>
		  		<v-flex xs12 sm10 offset-sm1 style="background-color: black; opacity: 0.1; height: 40px; margin-bottom: 40px">
		  			<v-card>
		  			</v-card>
		  		</v-flex>
		  	</template>
		</v-layout>
  </v-container>
</template>

<script>
	import parseInt from 'parse-int'
	import axios from 'axios'
	import firebase from 'firebase/app'
	import 'firebase/auth'

	export default {
		data () {
			return {	
			  snackBarProp:{
	              snackbar: false,
	              color: '',
	              timeout: 8000,
	              text: ''
	          }	
			}
		},
		computed: {
			allMatches: function() {
				return this.$store.getters.matches
			},
			snackbarOps () {
				return this.$store.getters.snackBar
			}
		},
		methods: {
			saveScore: function(matchId, leftScore, rightScore, matchindex) {
				if(leftScore == null || rightScore == null){
					this.$store.dispatch('setSnackBar', {"color": "error", "text": "Please provide a valid number."})
					return
				}
				var leftCountryScore = leftScore.trim()
				var rightCountryScore = rightScore.trim()
				if(this.isValidInteger(leftCountryScore) && this.isValidInteger(rightCountryScore)){
					let payload = {
						matchid: matchId,
						leftscore: leftCountryScore,
						rightscore: rightCountryScore
					}
					this.$store.dispatch('updateFinalScore', payload)
				}
				else{
					this.$store.dispatch('setSnackBar', {"color": "error", "text": "Please provide a valid number."})
				}
			},
			isValidInteger: function(value){
				if(value == "0")
					return true
				else{
					if(parseInt(value)){
						if(parseInt(value) < 0){
							return false
						}
						else
							return true
					}
					else{
						return false
					}
				}
			},
			EndPrediction: function(matchid){
				this.$store.dispatch('markUnupdatable', matchid)
			},
			SendEmail: function(LeftCountry, RightCountry, matchnumber, matchid){
				this.$store.dispatch('sendEmails', {"LeftCountry": LeftCountry, "RightCountry": RightCountry, "MatchNumber": matchnumber, 
					"MatchId": matchid})
			},
			dismissSnackBar: function(){
				this.$store.dispatch('clearSnackBar')
			}
		}
	}
</script>