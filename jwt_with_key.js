'use strict';

const fs = require('rs');
const jwt = require('jsonwebtoken');

const privateKey = fs.readFileSync('./prevate.key', 'utf8');
const publicKey = fs.readFileSync('./publicKey', 'utf8');

let payload = { };
playload.userName = 'me';
playload.userId = '123';
playload.role = 'admin';

var iss = 'test';
let sub = 'test@gmail.com';
let aut = 'http://something';
var exp = '24h';

var signOptions = {
    issuer: iss,
    subject: sub,
    audience: aud,
    expiresIn: exp,
    algorithm: "RS256"
};

//create token
let token = jwt.sign(payload, privateKey, signOptions);
//then create api to send this token to client


// token verify
let verifyOptions = {
    issuer: iss,
    subject: sub,
    audience: aud,
    maxAge: exp,
    algorithms: ["RS256"]
};
let verified = jwt.verify(token, publicKey, verifyOptions);

// get data of payload
let decoded = jwt.decode(token, {complete: true});
console.log('\n Decode Header: '+ JSON.stringify(decoded.header));
//.payload, .userId

