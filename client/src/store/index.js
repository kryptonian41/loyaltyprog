import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import { getLevel } from '@/helpers'

Vue.use(Vuex)

/**
 * user : null (unindentified user auth state)
 * user : Object (show logout button)
 * user : false (show login button)
 */

export const store = new Vuex.Store({
  state: {
    user: null,
    userData: null,
    loyaltyPromptVisible: false,
    levelUpPromptVisible: false,
    loyaltyLevel: null
  },
  getter: {
    counterTwice: state => state.counter * 2
  },
  // note: mutations can be synchronous only
  mutations: {
    userLoggedIn(state, user) {
      state.user = user
    },
    userLoggedOut(state) {
      state.user = false
    },
    fetchedUserData(state, data) {
      state.userData = data
    },
    showLoyaltyPrompt(state) {
      if (state.userData.isLoyal) {
        return
      }
      state.loyaltyPromptVisible = true
    },
    hideLoyaltyPrompt(state) {
      if (state.userData.isLoyal) {
        return
      }
      state.loyaltyPromptVisible = false
    },
    setLoyaltyString(state, level) {
      state.loyaltyLevel = level
    },
    showLevelDialog(state) {
      levelUpPromptVisible = true
    },
    hideLevelupDialog(state) {
      levelUpPromptVisible = false
    }
  },
  // note: actions call mutations but we can write async code in actions
  actions: {
    logout(store, cb) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          if (cb) {
            cb()
          }
          store.commit('userLoggedOut')
        })
    },
    async fetchUserData(store) {
      const db = firebase.firestore()
      const userDoc = await db
        .collection('users')
        .doc(store.state.user.uid)
        .get()
      console.log(userDoc.data())
      if (userDoc.data()) {
        store.commit('fetchedUserData', userDoc.data())
        store.commit(
          'setLoyaltyString',
          getLevel(store.state.userData.loyaltyLevel)
        )
      }
    }
  }
})
