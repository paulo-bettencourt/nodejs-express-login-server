const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator')
const token = jwt.sign({ foo: 'bar' }, 'shhhhh');
const port = 3000
app.use(cors())

const username = '1';
const password = '1';
const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
let requestUsername;
let requestPassword;

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
    console.log("OTP DO NODE JS", token)
    console.log("OTP DO REQUEST", req.body.token)
    token === req.body.token ? res.send({data: 'accepted'}) : res.send({data: 'wrong otp'});
})

app.listen(port, function () {
    console.log('CORS-enabled web server listening on port 80')
})
