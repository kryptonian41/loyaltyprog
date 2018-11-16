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
    // authentication mutations
    userLoggedIn(state, user) {
      state.user = user
    },
    userLoggedOut(state) {
      state.user = false
    },
    // fetching userdata
    fetchedUserData(state, data) {
      state.userData = data
    },
    // loyalty prompts
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
    // levelup prompt
    showLevelDialog(state) {
      state.levelUpPromptVisible = true
    },
    hideLevelupDialog(state) {
      state.levelUpPromptVisible = false
    },
    // setting loyalty level
    setLoyaltyString(state, points) {
      state.loyaltyLevel = getLevel(points)
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
      if (userDoc.data()) {
        store.commit('fetchedUserData', userDoc.data())
        store.commit('setLoyaltyString', store.state.userData.loyaltyPoints)
      }
    },
    checkLevelUpgrade(store, data) {
      var upgrade = false
      if (store.state.loyaltyLevel != getLevel(data.user.loyaltyPoints)) {
        upgrade = true
      }
      store.commit('fetchedUserData', data.user)
      store.commit('setLoyaltyString', data.user.loyaltyPoints)
      if (upgrade) {
        store.commit('showLevelDialog')
      }
    }
  }
})

export default store
