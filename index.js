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

app.get('/', (req, res) => {
    res.send('Node JS Express server [JWT Token + CORS + JSON Parser]')
})

app.post('/data', jsonParser, (req, res) => {
    otp === req.body.otp ? res.send({token: token}) : res.send('Incorrect OTP. Please insert the correct data')
})

app.get('/otp', (req, res) => {
    res.send({OTP: otp})
})

app.post('/otp', jsonParser, (req, res)=> {
    username === req.body.username & password === req.body.password ? res.send({OTP: otp}) : res.send('Incorrect login or password. Please insert the correct data.')
})

app.listen(port, function () {
    console.log('CORS-enabled web server listening on port 80')
})
