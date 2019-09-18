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
    <v-dialog v-model="dialog" width="800px">
		  <v-card v-if="show">

		    <v-card-title>	  
		    <h3 style="color:red">{{favouriteCount}} favourites</h3>  	
		      <v-spacer></v-spacer>

		      <v-text-field
		        v-model="predictionTable.search"
		        append-icon="search"
		        label="Search"
		        single-line
		        hide-details
		      ></v-text-field>
		    </v-card-title>
		    <v-data-table
		      :headers="predictionTable.headings"
		      :items="predictionTable.predictions"
		      :search="predictionTable.search"
  		      hide-actions
		      class="elevation-1"
		    >
		      <template slot="items" slot-scope="props">
		      <tr v-bind:style="{
		 backgroundColor: props.item.countryLScore == leftActualScore && props.item.countryRScore == rightActualScore ? '#4CAF50': '#E1E1E1'
		      	}">
		        <td v-bind:style="{
		      		color: props.item.email == getuseremail ? '#DC4C46' : 'black'
		      	}">{{ props.item.username }}</td>
		        <td class="text-xs-center">{{ props.item.countryLScore }}</td>
		        <td class="text-xs-center">{{ props.item.countryRScore }}</td>
		        <td class="text-xs-center">{{ props.item.isBetting }}</td>
		    </tr>
		      </template>
		      <v-alert slot="no-results" :value="true" color="error" icon="warning">
		        Your search for "{{ predictionTable.search }}" found no results.
		      </v-alert>
		    </v-data-table>
		      <v-card-actions>
		          <v-spacer></v-spacer>
		          <v-btn color="primary" flat="flat" @click="dialog = false">Close</v-btn>
		        </v-card-actions>
		  </v-card>
		  <v-card v-else>
		    <v-card-title>
		        <h1>{{predictionTable.Ltext}}</h1>
		    </v-card-title>
		  </v-card>
    </v-dialog>
  		<v-flex xs12 text-xs-center>
			<h1 style="color: #DC4C46">FIFA WORLD CUP 2018 ALL MATCHES</h1>			
  		</v-flex>
  		<v-flex xs12 text-xs-center>
			<h3 style="color: red">Note*: Nepal Time</h3>			
  		</v-flex>
  		<v-layout row wrap>
		  	<v-flex xs12 sm4 offset-sm4>
		  			 <v-select
			          :items="match_select_items"
			          v-model="selectedFilter"
			          label="Select"
			          single-line
			          auto
			          hide-details
		    		></v-select>	
		  	</v-flex>
		  	</v-layout>
	  	<v-layout row wrap style="margin-top: 50px;" text-xs-center>

	  		<template v-for="(match, index) in allMatches">
	  			<v-layout row wrap v-show="matchFilter(match.IsOver)">
		  		<v-flex xs12 sm3>		  			
		  			<h2>{{match.LeftCountry}}</h2> <img v-bind:src="match.LeftFlagUrl" style="width: 64px">
		  		</v-flex>
		  		<v-flex xs12 sm1>
		  			 <v-text-field
				          id="scoreleft"
				          name="input-1"
				          label=""
  				          v-model="match.LeftCountryPredictedScore"
  				          :disabled="!match.IsUpdatable"
				        ></v-text-field>
		  		</v-flex>
		  		<v-flex xs12 sm1>
		  		</v-flex>
		  		<v-flex xs12 sm2>
		  			 <h2 v-if="!match.LeftCountryScore" style="color: #424242">Match {{match.MatchNo}}<br/>{{match.MatchUIDate}}</h2>
		  			 <h2 v-else style="color: #424242">Match {{match.MatchNo}} <br/> {{match.MatchUIDate}} 
		  			 	<br/>({{match.LeftCountryScore}} - {{match.RightCountryScore}})
		  			   <br/><h5 style="color: #DC4C46">*leaderboard updated!</h5></h2>
		  		</v-flex>
		  		<v-flex xs12 sm1>
		  		</v-flex>
		  		<v-flex xs12 sm1>
		  			 <v-text-field
				          id="scoreright"
				          name="input-2"
				          label=""
				          v-model="match.RightCountryPredictedScore"
				          :disabled="!match.IsUpdatable"
				        ></v-text-field>
		  		</v-flex>
		  		<v-flex xs12 sm3>
		  			<h2>{{match.RightCountry}}</h2>
		  			<img v-bind:src="match.RightFlagUrl" style="width: 64px">				
		  		</v-flex>
		  		<v-flex xs12 sm3 md3 offset-sm5 offset-md5 offset-xs2 style="margin-top: 20px">
		  			 <v-checkbox style="margin-left: 25px"
		              v-model="match.JoinBet"
		              label="Mark As Favourite"
		              color="red darken-3"
		              value=""
		              :disabled="!match.IsUpdatable"
		              hide-details
		            ></v-checkbox>
		  		</v-flex>
		  			<v-flex xs12 style="margin-bottom: 30px; margin-top: 20px">
		  			<v-btn 
	  					flat 
		  				color="primary"
		  				@click="viewPredictions(match._id, match.LeftCountry, match.RightCountry)"
		  			>Predictions</v-btn>
		  			<v-btn 
		  				flat 
		  				color="primary"
		  				:disabled="!match.IsUpdatable"
		  				@click="addPrediction(match._id, match.LeftCountryPredictedScore, match.RightCountryPredictedScore, match.JoinBet, match.MatchNo)"
		  			>Save</v-btn>
		  		</v-flex>
		  		<v-flex xs12 sm10 offset-sm1 style="background-color: black; opacity: 0.1; height: 40px; margin-bottom: 40px">
		  			<v-card>
		  			</v-card>
		  		</v-flex>
		  	</v-layout>
		  	</template>
		  	<div style="margin: auto; color: #1976D2; font-size: 25px; font-weight: 500; background-color: #00000008; padding: 30px" v-show="selectedFilter === 'Upcoming Matches'">
		  		All matches are completed. Thank you for your participation.
		  	</div>
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
			match_select_items: ['All Matches', 'Upcoming Matches', 'Completed Matches'],
			selectedFilter: 'Upcoming Matches',	
	          predictionTable: {
	          	headings: [],
	          	predictions: [],
	          	search: '',
	          	Ltext: 'Loading predictions.. Please wait...'
	          },
              dialog: false,
         	  show: false,
         	  leftActualScore: null,
         	  rightActualScore: null,
         	  favouriteCount: 0		
			}
		},
		computed: {
			allMatches: function() {
				var matches = this.$store.getters.matches
				if(this.selectedFilter === "Completed Matches")
					return [...this.$store.getters.matches].reverse()
				else
					return this.$store.getters.matches
				//return this.$store.getters.matches.filter(match => match.MatchType === 'GROUP_STAGE')
			},
			snackbarOps () {
				return this.$store.getters.snackBar
			},
			getuseremail: function(){
	   			return firebase.auth().currentUser.email
	   		}
		},
		methods: {
			addPrediction: function(matchId, leftScore, rightScore, isbetting, matchindex) {
				if(leftScore == null || rightScore == null){
					this.$store.dispatch('setSnackBar', {"color": "error", "text": "Please provide a valid number."})
					return
				}
				var leftCountryScore = leftScore.trim()
				var rightCountryScore = rightScore.trim()
				if(this.isValidInteger(leftCountryScore) && this.isValidInteger(rightCountryScore)){
					let payload = {
						userid: '',
						matchid: matchId,
						leftscore: leftCountryScore,
						rightscore: rightCountryScore,
						joinbet: isbetting,
						index: matchindex
					}
					this.$store.dispatch('addPrediction', payload)
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
			viewPredictions: function(matchid, leftCountry, rightCountry){
				this.favouriteCount = 0
				var _match = this.$store.getters.matches.filter(match => {
					return match._id == matchid
				})
				this.leftActualScore = _match[0].LeftCountryScore
         	    this.rightActualScore =  _match[0].RightCountryScore
				this.predictionTable.search = ''
				this.predictionTable.Ltext = 'Loading predictions.. Please wait...'
				this.show = false
				this.dialog = true
				this.predictionTable.headings = []
				this.predictionTable.predictions = []
				this.predictionTable.headings.push({text: 'Players', align: 'left', value: 'username'})
				this.predictionTable.headings.push({text: leftCountry, align: 'center', value: 'countryLScore'})
				this.predictionTable.headings.push({text: rightCountry, align: 'center', value: 'countryRScore'})
				this.predictionTable.headings.push({text: 'Favourite', align: 'center', value: 'isBetting'})

				let currentUserId = firebase.auth().currentUser.uid
				/*axios.get(process.env.ROOT_API + '/predictions/all/' + currentUserId + '/' + matchid)
				.then(response => {
					var allPredictions = response.data
					if(allPredictions != null && allPredictions.length > 0){
						for (var i = 0; i < allPredictions.length; i++) {
							this.predictionTable.predictions.push(
				  				{
				  					value: false, 
				  					username: allPredictions[i].UserName, 
				  					countryLScore: allPredictions[i].predictions.LeftCountryPredictedScore,
				  					countryRScore: allPredictions[i].predictions.RightCountryPredictedScore,
				  					isBetting: allPredictions[i].predictions.IsBetting ? "Yes" : "No",
				  					email: allPredictions[i].UserEmail
				  				}
			  			    )
						}
						this.show = true
					}
					else{
						this.predictionTable.Ltext = 'No any predictions made for selected match.'
					}
				})
				.catch(err => {
	                 console.log(err.message);
	                 this.predictionTable.Ltext = 'Some error has occurred when getting predictions for selected match. Please try again.'
	            })*/
				axios.get(process.env.ROOT_API + '/predictions/' + currentUserId + '/' + matchid)
			  	.then(response => {
			  		var allPredictions = response.data
			  		if(allPredictions != null && allPredictions.length > 0){
			  			axios.get(process.env.ROOT_API + '/predictions/single/' + currentUserId + '/' + matchid)
			  			.then(response => {			  				
			  				for (var i = 0; i < allPredictions.length; i++) {
			  				if(response.data != null && response.data.length > 0){
				  				if(response.data[0].UserId != null && allPredictions[i].UserEmail === firebase.auth().currentUser.email)
				  				{
				  					this.predictionTable.predictions.push(
						  				{
						  					value: false, 
						  					username: allPredictions[i].UserName, 
						  					countryLScore: response.data[0].LeftCountryPredictedScore, 
						  					countryRScore: response.data[0].RightCountryPredictedScore,
						  					isBetting: allPredictions[i].predictions.IsBetting ? "Yes" : "No",
						  					email: allPredictions[i].UserEmail
						  				}
					  			    )
				  				}
				  				else{
					  				this.predictionTable.predictions.push(
						  				{
						  					value: false, 
						  					username: allPredictions[i].UserName, 
						  					countryLScore: allPredictions[i].predictions.LeftCountryPredictedScore ? allPredictions[i].predictions.LeftCountryPredictedScore : "**", 
						  					countryRScore: allPredictions[i].predictions.RightCountryPredictedScore ? allPredictions[i].predictions.RightCountryPredictedScore : "**",
						  					isBetting: allPredictions[i].predictions.IsBetting ? "Yes" : "No",
						  					email: allPredictions[i].UserEmail
						  				}
					  			    )
				  				}
			  				}
			  				else{
				  				this.predictionTable.predictions.push(
					  				{
					  					value: false, 
					  					username: allPredictions[i].UserName, 
					  					countryLScore: allPredictions[i].predictions.LeftCountryPredictedScore ? allPredictions[i].predictions.LeftCountryPredictedScore : "**", 
					  					countryRScore: allPredictions[i].predictions.RightCountryPredictedScore ? allPredictions[i].predictions.RightCountryPredictedScore : "**",
					  					isBetting: allPredictions[i].predictions.IsBetting ? "Yes" : "No",
					  					email: allPredictions[i].UserEmail
					  				}
				  			    )
			  				}
			  			}
			  			const favourite = this.predictionTable.predictions.filter(prediction => prediction.isBetting === "Yes")
			  			this.favouriteCount = favourite.length
			  			this.show = true
			  			})
			  			
			  		}
			  		else{
			  			this.predictionTable.Ltext = 'No any predictions made for selected match.'
			  		}
	            })
	            .catch(err => {
	                 console.log(err.message);
	                 this.predictionTable.Ltext = 'Some error has occurred when getting predictions for selected match. Please try again.'
	            })
			},
			dismissSnackBar: function(){
				this.$store.dispatch('clearSnackBar')
			},
	   		matchFilter: function(isMatchOver) {
	   			if(this.selectedFilter === 'All Matches')
	   				return true
	   			else if (this.selectedFilter === 'Upcoming Matches')
	   				return !isMatchOver
	   			else
	   				return isMatchOver
	   		}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
