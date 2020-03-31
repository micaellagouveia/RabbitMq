## Exemplo de Webhook escalonável

A pasta JavaScript/webhook possui um exemplo de uma webhook escalonável. <br>
* Trata-se de uma agenda de convidados, que recebe um nome de usuário, um comentário, uma data e hora.<br>
Esses dados são tratados como um JSON, e podem possuir vários URLs que deverão ser enviadas. Então, eles primeiramente são enviados para uma Worker Comment, que vai separar cada mensagem para apenas uma URL.

Como por exemplo:

>{ 
>  "comment": {
>   
>    "name": "Helen",
>
>    "comment": "The whole experience was magical.  Thank you to everyone who was part of it!",
>
>    "time": 1482512023
>  },
>
>  "webhooks": [
>
>    {
>      "url": "http:\/\/requestb.in\/wq2ue6wq"
>    },
>
>    {
>      "url": "http:\/\/requestb.in\/yflr9zyf"
>    }
>  ]
>
>}

Aqui há duas URLs, então o Comment Worker vai separá-las:

>{
>  "comment": {
>
>    "name": "Helen",
>
>    "comment": "The whole experience was magical.  Thank you to everyone who was part of it!",
>
>    "time": 1482512023
  },
>  
>  "url": {
>
>    "url": "http:\/\/requestb.in\/wq2ue6wq"
>  }
>
>}


E

>{
>  "comment": {
>
>    "name": "Helen",
>
>    "comment": "The whole experience was magical.  Thank you to everyone who was part of it!",
>
>    "time": 1482512023
>  },
>
>  "url": {
>
>    "url": "http:\/\/requestb.in\/yflr9zyf"
>  }
>
>}

Essas mensagens serão enviadas para uma Notification Worker, que terá o papel de enviá-las para as URLs designadas.
<br>

* As URLs nesses exemplos são exemplos de RequestBin. O RequestBin permite criar uma endpoint para o qual você pode enviar dados e, em seguida, visitá-lo em um navegador da web para inspecionar o que foi enviado.

* Exemplo do projeto: https://github.com/ibm-watson-data-lab/guestbook