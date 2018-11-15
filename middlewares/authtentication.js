const firebase = require('firebase')

// whether the user is logged in or not
module.exports = (req, res, next) => {
  if (!firebase.auth().currentUser) {
    return
  }
  next()
}
