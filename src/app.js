const express = require('express')
const bodyParser= require('body-parser')
const mqttHandler = require('./MqttHandler')

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

var mqttClient = new mqttHandler()
mqttClient.connect()

app.post("/send-mqtt", (req, res) => {
    mqttClient.sendMessage(req.body.message)
    res.status(200).send('Message sent to mqtt')
})

var server = app.listen(3000, () => {
console.log(`app running on port ${server.address().port}`)
})
