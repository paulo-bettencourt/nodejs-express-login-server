const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const jwt = require('jsonwebtoken');
const token = jwt.sign({ foo: 'bar' }, 'shhhhh');
const port = 3000
app.use(cors())

app.get('/', (req, res) => {
    res.send('Node JS Express server [JWT Token + CORS + JSON Parser]')
})

app.post('/data', jsonParser, (req, res) => {
    const username = req.body.username
    const password = req.body.password
    username === 'username' & password === 'password' ? res.send({token: token}) : res.send('Incorrect data')
})

app.listen(port, function () {
    console.log('CORS-enabled web server listening on port 80')
})
