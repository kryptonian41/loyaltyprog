import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/authentication/Login'
import SignUp from '@/components/authentication/SignUp'
import Profile from '@/components/user/ProfilePage'
import LoyaltyBroucher from '@/components/loyalty/broucher'
import Products from '@/components/products/productList'
import SurveyList from '@/components/surveys/surveyList'
import SampleSurvey from '@/components/surveys/survey'
import PremiumCatalogue from '@/components/catalogue/premium'
import CatalogueList from '@/components/catalogue/catalogueList'
import RecommendedProducts from '@/components/recommended/products'

// import VUEX store
import store from '@/store'
// import helpers
import { levels } from '@/helpers'

Vue.use(Router)

export const router = new Router({
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
      component: Profile,
      meta: { requiresAuth: true }
    },
    {
      path: '/loyalStatus',
      name: 'loyaltyStatus',
      component: LoyaltyBroucher
    },
    {
      path: '/surveys',
      name: 'surveyList',
      component: SurveyList,
      beforeEnter: (to, from, next) => {
        if (store.state.loyaltyLevel === levels.NONE) {
          store.commit('showLoyaltyPrompt')
          // about the route navigation
          next(false)
          return
        }
        next()
      }
    },
    {
      path: '/surveys/sample',
      name: 'sampleSurvey',
      component: SampleSurvey
    },
    {
      path: '/catalogue/premium',
      name: 'premiumCat',
      component: PremiumCatalogue,
      beforeEnter: (to, from, next) => {
        if (
          store.state.loyaltyLevel === levels.SILVER ||
          store.state.loyaltyLevel === levels.NONE
        ) {
          store.commit('showLoyaltyPrompt')
          // about the route navigation
          next(false)
          return
        }
        next()
      }
    },
    {
      path: '/catalogue/list',
      name: 'catList',
      component: CatalogueList
    },
    {
      path: '/recommended',
      name: 'recommended',
      component: RecommendedProducts,
      props: true
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.user) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
