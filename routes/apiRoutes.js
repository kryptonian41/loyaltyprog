const express = require('express')
const router = express.Router()
const apiController = require('../controllers/apemedic')

router.get('/symptoms', (req, res) => {
  apiController
    .getSymptoms(req)
    .then(data => {
      res.json(data)
    })
    .catch(err => res.send('err'))
})

router.post('/diagnosis', (req, res) => {
  apiController.getDiagnosis(req).then(data => {
    res.send(data)
  })
})

router.get('/test', (req, res) => {
  res.send('heyy')
})

router.get('/test/:name', (req, res) => {
  const {
    params: { name }
  } = req
  apiController.scrapeDiseaseData(name)
  res.send('heyy')
})

router.get('/disease/:id', (req, res) => {
  apiController.getDiseaseData(req).then(data => res.send(data))
})

module.exports = router
