#!/usr/bin/env node;

// Task Queue sender
// Em cada string, será executado uma tarefa
// No exemplo, cada . será a qt de segundos que a tarefa demora para ser realizada

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
        // o que muda do send.js
        var queue = 'task_queue'
        var msg = process.argv.slice(2).join('') || 'Hello World'

        channel.assertQueue(queue, {
            durable: true
        })

        channel.sendToQueue(queue, Buffer.from(msg), {
            persistent: true
        })

        console.log(" [x] Sent %s", msg)
    })

    //fechando conexão com servidor e saindo
    setTimeout(function () {
        connection.close()
        process.exit(0)
    }, 500)
})



