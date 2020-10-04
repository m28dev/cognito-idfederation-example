const express = require('express')
const app = express()
const port = 3000

const auth = require('./routes/auth.js')

// Routes
app.use('/auth', auth)

app.listen(port, () => {
  console.log(`BFF listening at http://localhost:${port}`)
})
