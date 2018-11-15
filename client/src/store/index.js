import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

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
    loyaltyPromptVisible: false
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
      store.commit('fetchedUserData', userDoc.data())
    }
  }
})
