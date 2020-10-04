const express = require('express')
const router = express.Router()

// get authorization code
router.get('/login', function (req, res) {
  res.send('TODO: redirect...')
})

// get access token
router.get('/cb', function (req, res) {
  res.send('TODO: exchange token')
})

module.exports = router
