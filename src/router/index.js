import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Profile from '@/components/User/Profile'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import Support from '@/components/User/Support'
import Leaderboard from '@/components/User/Leaderboard'
import Rules from '@/components/Rules/Rules'
import Admin from '@/components/Admin/Admin'
import Messages from '@/components/Admin/Messages'
import MatchUpdate from '@/components/Admin/MatchUpdate'
import AuthGuard from './auth-guard'
import AuthAdminGuard from './auth-admin-guard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/rules',
      name: 'Rules',
      component: Rules,
      beforeEnter: AuthGuard
    },
    {
      path: '/support',
      name: 'Support',
      component: Support,
      beforeEnter: AuthGuard
    },
    {
      path: '/leaderboard',
      name: 'Leaderboard',
      component: Leaderboard,
      beforeEnter: AuthGuard
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      beforeEnter: AuthAdminGuard
    },
    {
      path: '/admin/messages',
      name: 'Messages',
      component: Messages,
      beforeEnter: AuthAdminGuard
    },
    {
      path: '/admin/update/match',
      name: 'MatchUpdate',
      component: MatchUpdate,
      beforeEnter: AuthAdminGuard
    }
  ]
})
