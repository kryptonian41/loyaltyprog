<template>
  <v-container grid-list-lg>
    <v-layout row wrap justify-center>
      <v-flex xs12 lg6>
        <v-card>
          <v-card-title primary-title class="headline blue white--text">
            Sign up
          </v-card-title>
          <v-card-text>
            <v-form v-model="valid" lazy-validation ref="signup">
              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
              <v-text-field
                v-model="pno"
                :rules="pnoRules"
                label="Contact No."
                type="number"
                required
              ></v-text-field>
              <v-text-field
                v-model="pass"
                :rules="passRules"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-text-field
                v-model="cpass"
                :rules="cpassRules"
                label="Confirm Password"
                type="password"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" @click="submit" :loading="loading" :disabled="loading">Submit</v-btn>
            <v-btn color="secondary" @click="clear">Clear</v-btn>
          </v-card-actions>
        </v-card>
        <v-flex d-flex>
          <v-btn color="error" to="login">I already Signed Up!</v-btn>
        </v-flex>
      </v-flex>
    </v-layout>
    <v-snackbar
      v-model="error"
      bottom
      right
    >
      {{errorMsg}}
      <v-btn flat color="primary" @click.native="error = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import firebase from 'firebase'
import uuid from 'uuid'
import { createNewUserSchema } from '@/helpers'

export default {
  data() {
    return {
      valid: true,
      name: '',
      email: '',
      pass: '',
      cpass: '',
      pno: null,
      pnoRules: [
        v => !!v || 'Contact Number is required',
        v => /^[0-9]{10}$/.test(v) || 'Contact Number must be valid'
      ],
      nameRules: [v => !!v || 'Name is required'],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passRules: [
        v => !!v || 'Password is required',
        v => /.{8,}/.test(v) || 'Password should be atleast 8 characters long.'
      ],
      cpassRules: [
        v => !!v || 'This field is required',
        v => v == this.pass || "Passwords don't match"
      ],
      loading: false,
      error: false,
      errorMsg: ''
    }
  },
  methods: {
    async submit() {
      this.loading = true
      var self = this
      if (this.$refs.signup.validate()) {
        // sign up process
        const db = firebase.firestore()
        const auth = firebase.auth()
        await auth.createUserWithEmailAndPassword(this.email, this.pass)
        const user = auth.currentUser
        await user.updateProfile({
          displayName: self.name
        })
        const { email, name, pno } = this
        const userData = createNewUserSchema({
          email,
          name,
          pno
        })
        await db
          .collection('users')
          .doc(user.uid)
          .set(userData)
        this.$store.dispatch('fetchUserData')
        this.loading = false
        this.$router.push('/')
      }
    },
    clear() {
      this.$refs.signup.reset()
    }
  }
}
</script>

<style>
</style>
