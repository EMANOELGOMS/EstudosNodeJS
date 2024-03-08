

const profRotas = require('./rotasProfessor/professorRotas')
const routerCadastro = require('./rotasCadastros/cadastroRotas')

const express =  require('express'); // comando que  permite utilizar o framework do Express
//const bodyParser = require('body-parser') // comanda que  permite analisys das requisições em  formato JSON

const app = express(); // o express é chamado para criar a aplicação
app.use(express.json()) //comandos que dizem ao express como vamos trabalhar com as informações recebidas nas requisi, e o método "get" é respons, e "app" é um objeto que, e "app" é uma variável global
app.use(express.urlencoded({extended: true})) //comando que permite que os dados sejam enviados por meio de formulários, ou se, e "app" é um objeto que

//app.use(bodyParser.json())// isso  é usado para que o corpo da requisição seja interpretado como json

// chamando as duas rotas 
app.use(profRotas)
app.use(routerCadastro)

app.listen(3001, () => console.log("Servidor iniciado"));
