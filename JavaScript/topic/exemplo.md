# O que vamos fazer neste exemplo

Neste exemplo, enviaremos mensagens que descrevem todos os animais. As mensagens serão enviadas com uma chave de roteamento que consiste em três palavras (dois pontos).<br>
A primeira palavra na chave de roteamento descreverá a velocidade, a segunda cor e a terceira espécie: "Velocidade.Cor.Espécies".

<br>
Criamos três ligações:<br>

* Q1 é ligado com a chave de ligação "* .orange. *"
* Q2 com "*. *. Rabbit" e "lazy. #"

<br>
Essas ligações podem ser resumidas como:

* Q1 está interessado em todos os animais alaranjados.
* O Q2 quer ouvir tudo sobre coelhos e tudo sobre animais preguiçosos.


O que acontece se quebrarmos o contrato e enviarmos uma mensagem com uma ou quatro palavras, como "orange" ou "quick.orange.male.rabbit"? Bem, essas mensagens não corresponderão a nenhuma ligação e serão perdidas.
<br>
Por outro lado, "lazy.orange.male.rabbit", mesmo que tenha quatro palavras, corresponderá à última ligação e será entregue na segunda fila. Pois:

* '#' : recebe todas as mensagens, independente da routing key (como uma fanout)
* '*' : se comporta como um direct.