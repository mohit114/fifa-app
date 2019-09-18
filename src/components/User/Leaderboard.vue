<template>
	<v-container>
		<v-flex xs12 text-xs-center>
			<h1 style="color:#DC4C46">LeaderBoard</h1>
		</v-flex>
		<v-layout>
		<v-flex xs12 sm10 offset-sm1 mt-3>
		    <v-data-table
		      :headers="standingTable.headings"
		      :items="allScores"
		      hide-actions
		      class="elevation-1"
		    >
		      <template slot="items" slot-scope="props">
		      <tr>
		        <td v-bind:style="{
		      		color: props.item.UserEmail == getuseremail ? '#DC4C46' : 'black'
		      	}" style="width: 50px">{{ props.item.Rank }}</td>
		        <td v-bind:style="{
		      		color: props.item.UserEmail == getuseremail ? '#DC4C46' : 'black'
		      	}">{{ props.item.UserName }}</td>
		        <td class="text-xs-center" v-bind:style="{
		      		color: props.item.UserEmail == getuseremail ? '#DC4C46' : 'black'
		      	}">{{ props.item.Score }}</td>
		    </tr>
		      </template>
		    </v-data-table>
		</v-flex>
		</v-layout>
	</v-container>
</template>
<script>
import axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/auth'
	export default {
	data () {
			return {	
	  		standingTable: {
	          	headings: [
	          		{text: 'Rank', align: 'left', sortable:false, value: 'Rank'},
	          		{text: 'PlayerName', align: 'left', sortable:false, value: 'UserName'},
	          		{text: 'Score', align: 'center', sortable:false, value: 'Score'}
	          	]
	         },
	      }
	   },
	   computed: {
	   		allScores: function(){
	   			var leaderBoard = this.$store.getters.leaderBoard.map((currentEle, index) => {
	   				currentEle.Rank = index + 1;
	   				return currentEle;
	   			})
	   			return leaderBoard
	   		},
	   		getuseremail: function(){
	   			return firebase.auth().currentUser.email
	   		}
	   },
	   created() {
	   		if(this.$store.getters.leaderBoard.length === 0){
   	        	axios.get(process.env.ROOT_API + '/leaderboard/' + firebase.auth().currentUser.uid)
		        .then(response => {
		             this.$store.dispatch('getLeaderboard', response.data)
		        })
		        .catch(err => {
		          console.log(err.message);
		      })
   	       }
	   }
	}
</script>
<style scoped>
	.hidden{
		visibility: hidden
	}
</style>