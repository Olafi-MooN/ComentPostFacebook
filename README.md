# Automatizando comentários no facebook
> Esse projeto envia mensagens automáticas em um post do facebook

## Instalação
### Abra o terminal e navegue ate o diretório do projeto

```
cd C:\Users\{seu nome de usuário}\Desktop\Automatizando

node install
```

## Travando um alvo
### Abra o arquivo alvo.js em seu editor de texto favorito e adicione o link da postagens alvo

```
module.exports = "https://www.facebook.com/photo.php?fbid=3276575145763796&set=a.343775012377172&type=3&theater";
```

## Adicionando contas, que realizara comentários na postagem
### Abra o arquivo config.js em seu editor de texto favorito e adicione o login e password dentro da lista de objetos 

```
module.exports = [
    {login: 'usuario111@gmail.com', password: '1234567'},
    {login: 'usuario222@gmail.com', password: '1234567'},
    {login: 'usuario333@gmail.com', password: '1234567'},
]
```

## Executando o projeto
### Abra o terminal e navegue ate o diretório do projeto

```
cd C:\Users\{seu nome de usuário}\Desktop\Automatizando

node src/automatizando.js
```