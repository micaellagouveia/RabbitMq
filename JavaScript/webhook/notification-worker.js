var amqp = require('amqplib/callback_api')
//var atob = require("atob")
//var cfenv = require("cfenv")
var request = require("request")

/*if (process.env.VCAP_SERVICES) {
    var appEnv = cfenv = cfenv.getAppEnv()
    rabbitmq_url = appEnv.getService('guestbook-messages').credentials.uri
    cert_string = atob(appEnv.getService('gestbook-messages').credentials.ca_certificate_base64)
    ca = new Buffer(cert_string)
    opts = { ca: [ca] }
} else {*/
    rabbitmq_url= 'amqp://localhost'
    opts = {}
//}

amqp.connect(rabbitmq_url, opts, function(err, connection){
    if(err){
        throw err
    }
    connection.createChannel(function(err1, channel){
        if(err1){
            throw err1
        }
        var queue = 'notifications'
        channel.assertQueue(queue, {durable:true, noAck: false})
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue)
        channel.consume(queue, function(msg){
            data = JSON.parse(msg.content)
            body = JSON.stringify(data.comment)

            request({
                url: data.url.url,
                method: "post",
                json: body
            }, function(error, response, body){
                if(!error){
                    console.log(" [x] Complete: %s", String(msg.content))
                    channel.ack(msg)
                }
            })
        })
    })
})