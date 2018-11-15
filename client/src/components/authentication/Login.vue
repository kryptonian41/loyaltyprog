<template>
  <v-container grid-list-lg>
    <v-layout row wrap justify-center>
      <v-flex xs12 lg6>
        <v-card>
          <v-card-title primary-title class="headline blue white--text">
            Log In
          </v-card-title>
          <v-card-text>
            <v-form v-model="valid" lazy-validation ref="signup" @keyup.enter="login">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
              <v-text-field
                v-model="pass"
                :rules="passRules"
                label="Password"
                type="password"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" @click="login" :loading="loading">Submit</v-btn>
          </v-card-actions>
        </v-card>
        <v-flex d-flex justify-center>
          <v-btn color="error" to="signup">I Don't have a Account</v-btn>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      valid: true,
      email: '',
      pass: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passRules: [v => !!v || 'Password is required'],
      loading: false
    }
  },
  methods: {
    async login() {
      this.loading = true
      var self = this
      if (this.$refs.signup.validate()) {
        // login up process
        const auth = firebase.auth()
        try {
          const user = await auth.signInWithEmailAndPassword(
            this.email,
            this.pass
          )

          firebase
            .auth()
            .currentUser.getIdToken(/* forceRefresh */ true)
            .then(function(idToken) {
              // Send token to your backend via HTTPS
              // ...
            })
            .catch(function(error) {
              // Handle error
            })

          self.loading = false
          self.$router.push('/')
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
}
</script>

<style>
</style>
