require('dotenv').config();
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
const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

app.get('/', (req, res) => {
    res.send('Node JS Express server [JWT Token + CORS + JSON Parser]')
})

app.post('/get-otp', jsonParser, (req, res) => {
    process.env['USER_REQUEST'] = req.body.username
    process.env['USER_PASSWORD'] = req.body.username
    res.send({OTP: otp})
})

app.post('/confirm-otp', jsonParser, (req, res)=> {
    otp === req.body.otp && (process.env.USER_REQUEST === process.env.DB_USER && process.env.USER_PASSWORD === process.env.DB_PASSWORD) ? res.send({token: token}) : res.send('Incorrect data. Please insert the correct data')
})

app.post('/terms-and-conditions', jsonParser, (req, res)=> {
    process.env['TOKEN'] = req.header('authorization').split(' ')[1];
    const jwtToken = jwt.verify(process.env.TOKEN, 'shhhhh');
    jwtToken ? res.send({ok: 'verified'}) : res.send('fail');
})

app.listen(port, function () {
    console.log('CORS-enabled web server listening on port 80')
})
