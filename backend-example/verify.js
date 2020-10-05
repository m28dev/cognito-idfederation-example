// https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html
// サンプル通りに実装しようと思ったがJWKから鍵を生成するライブラリもAuth0にあったので、そっちにした
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

// Cognito settings
const cognitoRegion = process.env.COGNITO_REGION;
const cognitoUserPoolID = process.env.COGNITO_USER_POOL_ID;

// JWK defines
const client = jwksClient({
    jwksUri: `https://cognito-idp.${cognitoRegion}.amazonaws.com/${cognitoUserPoolID}/.well-known/jwks.json`
});
const getKey = (header, callback) => {
    client.getSigningKey(header.kid, (err, key) => {
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
};

// TODO
let token = '';

// verify
jwt.verify(token, getKey, {}, (err, decoded) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(decoded);
});
