#!/usr/bin/env node

// Task Queue receiver
// Em cada string, será executado uma tarefa
// No exemplo, cada . será a qt de segundos que a tarefa demora para ser realizada


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

        var queue = 'task_queue'

        channel.assertQueue(queue, {
            durable: true
        })

        channel.prefetch(1) //apenas 1 msg por vez para cada consumer

        console.log(' [x] Waiting for messages in %s.To exit press CTRL+C', queue)

        channel.consume(queue, function (msg) {
            var seconds = String(msg.content).split('.').length - 1

            console.log(' [x] Received %s', String(msg.content))

            setTimeout(function(){
                console.log(' [x] Done')
                channel.ack(msg);
            }, seconds * 1000)
        }, {
            //modo de reconhecimento automático
            noAck: false
        })
    })
})

// Para ver lista de filas criadas com o número de mensagens: sudo rabbitmqctl list_queues