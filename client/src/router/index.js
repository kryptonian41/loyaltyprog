import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/authentication/Login'
import SignUp from '@/components/authentication/SignUp'
import Profile from '@/components/user/ProfilePage'
import LoyaltyBroucher from '@/components/loyalty/broucher'
import Products from '@/components/products/productList'
import SurveyList from '@/components/surveys/surveyList'
import SampleSurvey from '@/components/surveys/survey'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Products
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
      component: LoyaltyBroucher
    },
    {
      path: '/surveys',
      name: 'surveyList',
      component: SurveyList
    },
    {
      path: '/surveys/sample',
      name: 'sampleSurvey',
      component: SampleSurvey
    }
  ]
})
