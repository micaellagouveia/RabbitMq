try:
    import pika
except Exception as e:
    print("Some Modules are missing{}".format_map())

class RabbitMQ(object):
    def __init__(self, queue='hello'):
        self._connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
        self._channel = self._connection.channel()
        self.queue = queue
        self._channel.queue_declare(queue = self.queue)
    
    def publish(self, payload = {}):
        self._channel.basic_publish(exchange='',
                      routing_key='hello',
                      body=str(payload))
        print("Published ...")
        self._connection.close()

if __name__ == '__main__':
    server = RabbitMQ(queue='hello')
    server.publish(payload ={"Data": "Hello"}) 