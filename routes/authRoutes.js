const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const firebaseAdmin = require('firebase-admin')

router.get('/verify', (req, res) => {
  const {
    body: { token }
  } = req
  firebaseAdmin
    .auth()
    .verifyIdToken(token)
    .then(function(decodedToken) {
      var uid = decodedToken.uid
      console.log(
        '​ firebaseAdmin.auth().currentUser',
        firebaseAdmin.auth().currentUser
      )
      // ...
    })
    .catch(function(error) {
      // Handle error
    })
})

router.post('/isLoyal', (req, res) => {
  userController.isLoyal().then(res => res.send(res))
})

router.post('/signup', (req, res) => {
  const { body: user } = req
  authController.signUpUser(user).then(user => res.send(user))
})

router.post('/logout', (req, res) => {
  authController.logout().then(() => res.send({}))
})

module.exports = router
