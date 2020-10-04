const express = require('express')
const fetch = require('node-fetch')

const router = express.Router()
require('dotenv').config()

// Cognito settings
const cognitoDomain = process.env.COGNITO_DOMAIN
const cognitoRegion = process.env.COGNITO_REGION
const cognitoApiEndpoint = `https://${cognitoDomain}.auth.${cognitoRegion}.amazoncognito.com`

const clientId = process.env.COGNITO_CLIENT_ID
const clientSecret = process.env.COGNITO_CLIENT_SECRET

const redirectUri = 'http://localhost:3000/auth/cb'

/* Endpoints */
// get authorization code
router.get('/login', function (req, res) {
    res.send('TODO: redirect...')
})

// get access token
router.get('/cb', function (req, res) {
    // TODO: state check
    // TODO: code verifier ?

    const params = new URLSearchParams()
    params.append('grant_type', 'authorization_code')
    params.append('code', req.query.code)
    params.append('redirect_uri', redirectUri)

    fetch(`${cognitoApiEndpoint}/oauth2/token`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
        },
        body: params
    }).then(response => {
        if (!response.ok) {
            //response.json().then(errObj => { console.error('Token Request Error:', errObj) })
            throw new Error('Token Request Error')
        } else {
            //return response.json()
            response.json().then(json => {
                console.log(json)
                res.send('get token')
            })
        }
    })

})

module.exports = router
