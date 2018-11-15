const firebase = require('firebase-admin')
const db = firebase.database()

const getAllProducts = () => {
  return db
    .collection('products')
    .get()
    .then(snap => {
      const products = []
      snap.forEach(doc => products.push(doc.data()))
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
  addProduct
}
