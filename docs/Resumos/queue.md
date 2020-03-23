# Queues
Filas são FIFO (First in First out).

## Propriedades
* **Durable**: quando reiniciar o broker, a fila continua lá.
* **Auto Delete**: quando o consumer se desconecta, a fila é apagada.
* **Expiry**: Tempo de espera de inatividade.
* **Message TTL**: tempo de vida de mensagem.
* **Exclusive**: somente o channel que criou a fila pode acessá-la.
* **Max length ou bytes**: quantidade máxima de mensagens ou de bytes.
* **Overflow**: limite de mensagens ou bytes.

## Bindings
Processo que relaciona a fila com a exchange. A fila que tiver **bind** possui uma conexão com a exchange. No caso da exchange Fanout, todas as que possuem blind irão receber a mensagem.
<br>
Para ver a lista de bindings:  ***rabbitmqctl list_bindings***

## Dead Letter Queue
Algumas mensagens não conseguem ser entregues por algum motivo. Elas são encaminhadas para uma exchange que manda para uma fila dead letter. Outro sistema buscará o motivo para ela não ter sido lida.

## * Task Queue
Fila de tarefas. Encapsulamento de uma tarefa como uma mensagem. 
* Enviamos a mensagem para uma fila, criando uma fila de tarefas. 
* A ideia é evitar executar uma tarefa que consome muitos recursos imediatamente e outra tarefa ter que esperar a coonclusão. Então se faz o agendamento dessa tarefa para ser executada mais tarde.
* Uma das vantagens de se utilizar uma lista de tarefas é o trabalho paralelo **(Round-robin)**. 

**Round-robin**: Se tiver mais de um consumidor, a mensagem será enviada para o próximo consumidor, em sequência. 

## Automatic Acknowledgment Mode
Modo de reconhecimento automático (ack).
* Impede que uma mensagem se perca caso um consumidor falhar(canal fechado, conxeão fechada, TCP perdido).
Como funciona: 
1. uma confirmação é enviada pelo consumidor quando uma mensagem foi recebida, processada e que pode ser excluída.
2. Se um consumidor morre sem enviar essa confirmação, o RabbitMQ entenderá que a mensagem não foi processada e a enfileirará novamente.
3. Se já houver outros consumidores online, esta será entregue para ele.
4. Não há nenhum tempo limite da mensagem. O rabbitMQ retornará a mensagem quando o consumidor morrer.
Obs: A confirmação deve ser enviada no mesmo canal que recebeu a entrega!!!!!!!
Para printar mensagens que não foram confirmadas(caso esqueça do ack):<br>
 ***sudo rabbitmqctl list_queues name messages_ready messages_unacknowledged***

## Prefetch(x)
Método de pré-busca. Indica ao RabbitMQ para não transmitit mais de x mensagens para um worker por vez.
<br>
(não despache uma nova mensagem para um worker até que ele tenha terminado a anterior, em vez disso, será enviado para o próximo worker que não estiver ocupado)