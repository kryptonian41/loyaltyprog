import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/authentication/Login'
import SignUp from '@/components/authentication/SignUp'
import Profile from '@/components/user/ProfilePage'
import LoyaltyInfo from '@/components/loyalty/info'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Profile
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/loyalStatus',
      name: 'loyaltyStatus',
      component: LoyaltyInfo
    }
  ]
})
