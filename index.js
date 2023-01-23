const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator')
const dotEnv = require('dotenv').config()
const token = jwt.sign({ foo: 'bar' }, 'shhhhh');
const port = 3000
app.use(cors())

const username = '1';
const password = '1';
const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
let requestUsername;
let requestPassword;
let tokenProvidedByFE;

app.get('/', (req, res) => {
    res.send('Node JS Express server [JWT Token + CORS + JSON Parser]')
})

app.post('/get-otp', jsonParser, (req, res) => {
    console.log("REQUEST", req.body)
    requestUsername = req.body.username;
    requestPassword = req.body.password;
    res.send({OTP: otp})
})

app.post('/confirm-otp', jsonParser, (req, res)=> {
    console.log("OTP VALUE", req.body.otp)
    otp === req.body.otp && (username === requestUsername && password === requestPassword) ? res.send({token: token}) : res.send('Incorrect data. Please insert the correct data')
})

app.post('/terms-and-conditions', jsonParser, (req, res)=> {
    tokenProvidedByFE = req.header('authorization').split(' ')[1];
    var jwtVerificedToken = jwt.verify(tokenProvidedByFE, 'shhhhh');
    if(jwtVerificedToken) {
        res.send({ok: 'verified'})
    } else {
        res.send('fail')
    }
})

app.listen(port, function () {
    console.log("process", process.env.S3_BUCKET) // remove this after you've confirmed it is working
    console.log('CORS-enabled web server listening on port 80')
})
