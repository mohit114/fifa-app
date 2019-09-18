<template>
	<v-container>
		<v-flex xs12 sm6 offset-sm3>
		  <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-list-tile-content style="color: #DC4C46">{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
  </v-flex>
	</v-container>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
  	 menuItems () {
      let menuItems = [
        {title: 'Update Match', link: '/admin/update/match'},
        {title: 'Messages', link: '/admin/messages'}
      ]
      return menuItems
    }
  }
}
</script>