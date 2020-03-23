#!/usr/bin/env node;

// Example of a producer that sends a single message, and a consumer that receives messages and prints them out
// The publisher will connect to RabbitMQ, send a single message, then exit.


var amqp = require('amqplib/callback_api') //importanto livraria

//conectando com servidor 
amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }

    //criar channel, onde reside a maior parte da API para realizar as tarefas.   
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        // criando fila e uma mensagem para publicar na fila
        var queue = 'hello'
        var msg = 'Hello World'

        //a fila será criada apenas se ainda não existir.
        channel.assertQueue(queue, {
            durable: false
        })

        //colocando mensagem na fila
        channel.sendToQueue(queue, Buffer.from(msg))

        console.log(" [x] Sent %s", msg)
    })

    //fechando conexão com servidor e saindo
    setTimeout(function () {
        connection.close()
        process.exit(0)
    }, 500)
})



