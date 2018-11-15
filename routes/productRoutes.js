const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.get('/all', (req, res) => {
  productController.getAllProducts().then(products => res.json(products))
})

module.exports = router
