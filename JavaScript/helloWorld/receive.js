#!/usr/bin/env node
var amqp = require('amqplib/callback_api')

//Abrir conexão e um canal, declarar fila que vamos consumir.

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0
    }

    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1
        }

        var queue = 'hello'
        //Também declaramos a fila aqui, pois podemos iniciar o consumer antes do editor.
        // Então queremos garantir que a fila exista antes de tentarmos consumir mensagens.
        channel.assertQueue(queue, {
            durable: false
        })

        //Vamos dizer ao sevidor para nos entregar as mensagens da fila.Como ele enviará mensagens de forma assíncrona,
        //fornecemos um retorno de chamada que será executado quando o RabbitMQ enviar mensagens para o consumidor.

        console.log(' [x] Waiting for messages in %s.To exit press CTRL+C', queue)

        channel.consume(queue, function (msg) {
            console.log(' [x] Received %s', String(msg.content))
        }, {
            noAck: true
        })
    })
})

// Para ver lista de filas criadas com o número de mensagens: sudo rabbitmqctl list_queues