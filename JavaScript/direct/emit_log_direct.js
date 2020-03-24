#!/usr/bin/env node
var amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1
        }
        //criando exchange
        var exchange = 'direct_logs'
        var args = process.argv.slice(2)
        var msg = args.slice(1).join(' ') || 'Hello World!'

        //gravidade do log como chave de roteamento: error, info, warning
        var severity = (args.length > 0) ? args[0] : 'info'

        //setando exchange do tipo direct, sem ser durável
        channel.assertExchange(exchange, 'direct', { durable: false })

        //a exchange vai publicar para o tipo da fila que tiver na severity
        channel.publish(exchange, severity, Buffer.from(msg))
        console.log(" [x] Sent %s: '%s'", severity, msg)
    })
    setTimeout(function () {
        connection.close()
        process.exit(0)
    }, 500)
})