const firebase = require('firebase-admin')

const getUserData = async () => {
  const uid = firebase.auth().currentUser.uid
  const data = await firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .get()
    .then(doc => doc.data())
  return data
}

const isLoyal = async () => {
  const data = await getUserData()
  if (!data.isLoyal) {
    return {}
  }
  return { loyaltyLevel: data.loyaltyLevel }
}

const orderCount = async () => {
  const data = await getUserData()
}

module.exports = {
  isLoyal
}
