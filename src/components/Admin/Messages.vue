<template>
	<v-container>
		<v-layout row wrap>
		<v-flex xs12 sm8 offset-sm2>
		  <v-card>
	        <v-toolbar color="cyan" dark>
	          <v-toolbar-side-icon></v-toolbar-side-icon>
	          <v-toolbar-title>Messages</v-toolbar-title>
	        </v-toolbar>
	        <v-list three-line>
	          <template v-for="(message, index) in messages">
	            <v-subheader><h2 style="color: #DC4C46">{{ message.Issue }}</h2></v-subheader>
	            <v-list-tile>
	              <v-list-tile-content>
	                <v-list-tile-title>{{message.UserEmail}}</v-list-tile-title>
	                <v-list-tile-sub-title>{{message.Description}}</v-list-tile-sub-title>
	              </v-list-tile-content>
	            </v-list-tile>
	            <v-divider></v-divider>
	          </template>
	        </v-list>
	      </v-card>
		</v-flex>
	</v-layout>
	</v-container>
</template>
<script>
import axios from 'axios'
	export default {
		data () {
			return {
				messages: []	
			}
		},
		created () {
			axios.get(process.env.ROOT_API + '/messages').then(response => {
				this.messages = response.data
			}).catch(err => {
				console.log(err)
			})
		}	
	}
</script>