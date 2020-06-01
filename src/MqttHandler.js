const mqtt = require('mqtt')
require('dotenv/config')

class MqttHandler {
    constructor() {
        this.mqttClient = null
        this.host = process.env.HOST
        this.username = process.env.USER
        this.password = process.env.PWD
    }

    connect() {
        this.mqttClient = mqtt.connect(this.host, {username: this.username, password: this.password})

        this.mqttClient.on('error', (err) => {
            console.log(err)
            this.mqttClient.end()
        })

        this.mqttClient.subscribe('mytopic', {qos: 0})

        this.mqttClient.on('message', function(topic, message) {
            console.log(message.toString())
        })

        this.mqttClient.on('close', () => {
            console.log('Mqtt client disconnected!')
        })
    }

    sendMessage(message) {
        this.mqttClient.publish('mytopic', message)
    }
}

module.exports = MqttHandler