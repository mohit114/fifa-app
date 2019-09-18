<template>
  <v-app>
    <v-navigation-drawer 
    temporary 
    v-model="sideNav"
    fixed
    persistent
    app>
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="userIsAuthenticated"
          @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="secondary"
    fixed
    >
      <v-toolbar-side-icon
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up "></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">{{currentUser}}</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}

        </v-btn>
        <v-btn
          v-if="userIsAuthenticated"
          flat
          @click="onLogout">
          <v-icon left dark>exit_to_app</v-icon>
          Logout

        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main style="margin-top: 64px">
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false
    }
  },
  name: 'App',
    computed: {
    menuItems () {
      let menuItems = [
        {icon: 'face', title: 'Sign up', link: '/signup'},
        {icon: 'lock_open', title: 'Sign in', link: '/signin'}
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          {icon: 'supervisor_account', title: 'Leaderboard', link: '/leaderboard'},
          {icon: 'home', title: 'Matches', link: '/'},
          {icon: 'subject', title: 'Rules', link: '/rules'},
          {icon: 'contact_support', title: 'Support', link: '/support'}
        ]
      }
      if (this.isUserAdmin) {
        menuItems = [
          {icon: 'verified_user', title: 'Admin', link: '/admin'},
          {icon: 'supervisor_account', title: 'Leaderboard', link: '/leaderboard'},
          {icon: 'home', title: 'Matches', link: '/'},
          {icon: 'subject', title: 'Rules', link: '/rules'},
          {icon: 'contact_support', title: 'Support', link: '/support'}
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    isUserAdmin () {
      if(this.$store.getters.user !== null && this.$store.getters.user !== undefined){
        if(this.$store.getters.user.id == process.env.ADMIN_ID){
          return true
        }
        else
          return false
      }
      else
        return false
    },
    currentUser: function(){
      if(this.$store.getters.user !== null && this.$store.getters.user !== undefined)
          return 'Welcome, ' + this.$store.getters.user.email
      else
          return 'FIFA WORLD CUP 2018 @RUSSIA'
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
      this.$store.dispatch('clearMatches')
      this.$store.dispatch('clearLeaderBoard')
      this.$router.push('/signin')
    }
  }
}
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
