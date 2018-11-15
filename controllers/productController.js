const firebase = require('firebase-admin')
const db = firebase.firestore()

const getAllProducts = () => {
  return db
    .collection('products')
    .get()
    .then(snap => {
      const products = []
      snap.forEach(doc => {
        if (!doc.data().exclusive) {
          products.push({ ...doc.data(), id: doc.id })
        }
      })
      return products
    })
}

const getPremiumProducts = () => {
  return db
    .collection('products')
    .where('exclusive', '==', true)
    .get()
    .then(snap => {
      const products = []
      snap.forEach(doc => products.push({ ...doc.data(), id: doc.id }))
      return products
    })
}
const getProductByKey = key => {}

const addProduct = product => {
  return db.collection('products').add(product)
}

module.exports = {
  getAllProducts,
  getProductByKey,
  addProduct,
  getPremiumProducts
}
