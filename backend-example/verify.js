// https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html
// サンプル通りに実装しようと思ったがJWKから鍵を生成するライブラリもAuth0にあったので、そっちにした
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
require('dotenv').config();

// Cognito settings
const cognitoRegion = process.env.COGNITO_REGION;
const cognitoUserPoolID = process.env.COGNITO_USER_POOL_ID;
const issuer = `https://cognito-idp.${cognitoRegion}.amazonaws.com/${cognitoUserPoolID}`;

// JWK defines
const client = jwksClient({
    jwksUri: `${issuer}/.well-known/jwks.json`
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
// 署名検証、issの検証、および有効期限チェックを実施
const options = {
    algorithm: ['RS256'],
    issuer,
    ignoreExpiration: false
};
jwt.verify(token, getKey, options, (err, decoded) => {
    if (err) {
        console.error(err);
        return;
    }
    // バックエンドではアクセストークンで認可制御する
    if(decoded.token_use != 'access') {
        console.error('Only accept access tokens.');
        return;
    }
    console.log(decoded);
});
