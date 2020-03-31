var amqp = require("amqplib/callback_api")
//var atob = require("atob")
var cfenv = require("cfenv")
/*
if (process.env.VCAP_SERVICES) {
    var appEnv = cfenv.getAppEnv()
    rabbitmq_url = appEnv.getService('guestbook-messages').credentials.uri
    cert_string = atob(appEnv.getService('guest-messages').credentials.ca_certificate_base64)
    ca = new Buffer(cert_string)
    opts = { ca: [ca] }
} else {*/
    rabbitmq_url = 'amqp:localhost'
    opts = {}
//}
var hooks = []

amqp.connect(rabbitmq_url, opts, function (err, connection) {
    if (err) {
        throw err
    }
    connection.createChannel(function (err1, channel) {
        if (err1) {
            throw err1
        }

        var queue1 = 'comments'
        channel.assertQueue(queue1, { durable: true, noAck: false })
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue1)

        channel.consume(queue1, function (msg) {
            console.log("[x] Receive: %s", String(msg.content))

            var data = JSON.parse(msg.content)
            var comment = data.comment

            var queue2 = 'notifications'
            channel.assertQueue(queue2, { durable: true, noAck: false })

            data.webhooks.forEach(function (url) {
                single_msg = {comment: comment, url: url}
                channel.sendToQueue(queue2, new Buffer(JSON.stringify(single_msg)), {persistent: true})
            });
            channel.ack(msg)
        })
    })
})
