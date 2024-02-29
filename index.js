const express =  require('express'); // comando que  permite utilizar o framework do Express
const bodyParser = require('body-parser') // comanda que  permite analisys das requisições em  formato JSON
const app = express(); // o express é chamado para criar a aplicação


app.use(bodyParser.json())// isso  é usado para que o corpo da requisição seja interpretado como json

let cadastros = [
     { nome: 'Joao', idade: 25 },
    { nome: 'Maria', idade: 30 },
    { nome: 'Pedro', idade: 18 },
    { nome: 'Ana', idade: 25 },
    { nome: 'Carlos', idade: 30 },
    { nome: 'Julia', idade: 18 },
    { nome: 'Mariana', idade: 25 },
    { nome: 'Lucas', idade: 18 },
    { nome: 'Beatriz', idade: 30 },
    { nome: 'Rodrigo', idade: 25 },
    { nome: 'Fernanda', idade: 30 },
    { nome: 'Gustavo', idade: 18 },
    { nome: 'Amanda', idade: 25 },
    { nome: 'Rafael', idade: 18 },
    { nome: 'Larissa', idade: 30 },
    { nome: 'Diego', idade: 25 },
    { nome: 'Camila', idade: 18 },
    { nome: 'Guilherme', idade: 30 },
    { nome: 'Isabela', idade: 25 },
    { nome: 'Vinicius', idade: 18 }

]

// criado a rota  para o metodo get e passando como parametro a funcao callback que vai retornar os dados da variavel 
app.get('/cadastros/todos', (req,res) =>{
    console.log(req)
    res.json(cadastros)
    })

// get  - buscar informações do recurso.
app.get('/cadastro/:id', (req, res) =>{// :id  é um parametro dinamico que vai ser substituido pelo valor da urlapp.use(express.json()); 
    let id = req.params.id;//  isso faz  com que o parametro seja passado na url e possa ser usado no codigo
    
   if(isNaN(id)){ // verifica se é um numero Ex: se  a variavel id for uma string vazia ou null
       return res.send("Id invalido"); // ploca a resposta com innvalido
   }

   let indice = parseInt(id); // isso transforma o paramentro em int para poder usar como index do array

   if(indice < 0 || indice >= cadastros.length){ // caso  o indice for menor ou maior que zero ou maior q o tamanho do array
       return res.send("Indice invalido")
   }

   return res.json(cadastros[indice]);
});

//post  - adicionar uma informação ao recurso.
app.post('/cadastro', (req,res)=>{
    console.log(req.body)
    let novoCadastro = req.body; // o let pega  os dados vindo da requisição , o body pega todos os dados que estão sendo enviados por meio dele

    cadastros.push(novoCadastro);// add o novo cadastro ao final do vetor
    return res.json(cadastros); // retornando o array  de todos os cadastros
})

// Rota que filtro por idade

app.get('/cadastros/idade/:idade', (req, res)=>{
    const parametroIdade = parseInt(req.params.idade);  // converte para inteiro
    
    const filtradosPorIdade = cadastros.filter((dado)=>{
        return dado.idade === parametroIdade
    })
    return res.json(filtradosPorIdade)
})


//rota para buscar por nome

app.get('/cadastros/nome/:nome', (req, res)=>{
    const {nome} = req.params;
    const filtrandoPorNome = cadastros.filter((NomePessoa)=>{
        return NomePessoa.nome === nome
    })
    return res.json(filtrandoPorNome)
})
//http://localhost:3000/cadastro/1
app.listen(3000 , ()=> console.log("Servidor iniciado"));
