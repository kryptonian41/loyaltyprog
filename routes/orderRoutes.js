const express = require('express')
const router = express.Router()
const firebaseAdmin = require('firebase-admin')
const db = firebaseAdmin.firestore()
const pointGradient = 205

const calPointsUsingOrderCount = count =>
  Math.floor((count * (count + 1) * (count + 2)) / 6)

router.post('/place', async (req, res) => {
  const {
    body: { product, userid, amount }
  } = req
  try {
    const userData = await db
      .collection('users')
      .doc(userid)
      .get()
      .then(doc => doc.data())
    const order = {
      productId: product.id,
      date: Date.now()
    }
    const orderDoc = await db.collection('orders').add(order)
    userData.amount_spent += amount
    userData.orders.push(order)
    userData.orderCount++
    userData.loyaltyPoints =
      calPointsUsingOrderCount(userData.orderCount) +
      userData.amount_spent / pointGradient
    await db
      .collection('users')
      .doc(userid)
      .set(userData)
    res.send({ success: true, user: userData, id: orderDoc.id })
  } catch {
    res.send({ success: false })
  }
})

module.exports = router
