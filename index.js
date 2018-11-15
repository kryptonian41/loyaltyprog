const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const config = require('./config')

// Initializing firebase-admin SDK
var admin = require('firebase-admin')
var serviceAccount = require('./config/serviceacc.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://dellloyalty.firebaseio.com'
})

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Routing Configuration
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/products', require('./routes/productRoutes.js'))
app.use('/api/order', require('./routes/orderRoutes.js'))

// Serving the Front-End
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
}

// PORT configuration
app.listen(config.PORT, () => {
  console.log('Server started at', config.PORT)
})
