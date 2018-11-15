<template>
  <v-app>
    <v-navigation-drawer
      stateless
      :value="drawer"
      clipped
      fixed
      app
    >
    <v-list>
      <v-list-tile to="/profile">
        <v-list-tile-action>
          <v-icon>account_circle</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Profile</v-list-tile-title>
      </v-list-tile>
      <v-list-tile to="/surveys">
        <v-list-tile-action>
          <v-icon>done_all</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Surveys</v-list-tile-title>
      </v-list-tile>
      <v-list-group
        prepend-icon="assessment"
        value="true"
      >
          <v-list-tile slot="activator">
            <v-list-tile-title>Catalogues</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :to="'/catalogue/premium'">
            <v-list-tile-title>Premium Catalogue</v-list-tile-title>
            <v-list-tile-action>
              <v-icon>stars</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile :to="'/catalogue/liked'">
            <v-list-tile-title>Liked Catalogues</v-list-tile-title>
            <v-list-tile-action>
              <v-icon>favorite</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      clipped-left
      color="blue darken-4"
      dark
    >
      <v-toolbar-side-icon
      @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat icon color="white" to="/">
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn color="success" v-if="user" @click="logout(logoutRedirect)">Logout</v-btn>
      <v-btn color="success" v-else to="login">Login</v-btn>
    </v-toolbar>
    <v-content>
      <v-slide-y-reverse-transition mode="out-in">
        <router-view/>
      </v-slide-y-reverse-transition>
      <loyalty-prompt></loyalty-prompt>
      <level-prompt></level-prompt>
    </v-content>
  </v-app>
</template>

<script>
import { fbConfig } from '@/config/dev.js'
import firebase from 'firebase'
import { mapState, mapMutations, mapActions } from 'vuex'
import LoyaltyPrompt from '@/components/loyalty/prompt'
import LevelPrompt from '@/components/loyalty/levelUp'

export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      title: 'Dellcommerce'
    }
  },
  components: {
    LoyaltyPrompt,
    LevelPrompt
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    var store = this.$store
    const self = this
    //Initializing the firebase app
    firebase.initializeApp(fbConfig)

    // gotcha: Mandatory to prevent the firestore errors in the console
    const db = firebase.firestore()
    db.settings({ timestampsInSnapshots: true })

    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        self.userLoggedOut()
        return
      }
      // marking that the user is logged in and then fetching user date from firestore
      this.$router.push('/')
      self.userLoggedIn(user)
      self.fetchUserData()
    })
  },
  methods: {
    ...mapMutations(['userLoggedIn', 'userLoggedOut']),
    ...mapActions(['logout', 'fetchUserData']),
    logoutRedirect() {
      this.$router.push('/login')
    }
  }
}
</script>
