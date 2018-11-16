const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const spawn = require('child_process').spawn
const path = require('path')
const firebaseAdmin = require('firebase-admin')
const db = firebaseAdmin.firestore()

router.get('/all', (req, res) => {
  productController.getAllProducts().then(products => res.json(products))
})

router.get('/getPremiumProduct', (req, res) => {
  productController.getPremiumProducts().then(products => res.json(products))
})

router.get('/recommend/:name', (req, res) => {
  // const { body: product } = req
  const {
    params: { name }
  } = req
  var process = spawn('python', [
    path.resolve(__dirname, '../', 'recommendation', 'main.py'),
    'apoorv',
    name
  ])

  // Takes stdout data from script which executed
  // with arguments and send this data to res object
  process.stdout.on('data', async function(data) {
    const parsedData = JSON.parse(data.toString('utf8')).product
    const productNames = []
    for (var key in parsedData) {
      productNames.push(parsedData[key])
    }
    const products = []
    for (let i = 0; i < 5; i++) {
      const name = productNames[i]
      await db
        .collection('products')
        .where('name', '==', name)
        .get()
        .then(snap => {
          snap.docs.forEach(doc => {
            if (doc.data()) {
              products.push(doc.data())
            }
          })
        })
    }
    res.send(products)
  })
})

module.exports = router
