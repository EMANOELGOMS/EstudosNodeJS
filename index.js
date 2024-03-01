const express =  require('express'); // comando que  permite utilizar o framework do Express
const bodyParser = require('body-parser') // comanda que  permite analisys das requisições em  formato JSON
const app = express(); // o express é chamado para criar a aplicação


app.use(bodyParser.json())// isso  é usado para que o corpo da requisição seja interpretado como json

let cadastros = [
    { nome: 'Joao', idade: 25, cidade: "Juazeiro do Norte" },
    { nome: 'Maria', idade: 30, cidade: "Crato" },
    { nome: 'Pedro', idade: 18, cidade: "Barbalha" },
    { nome: 'Ana', idade: 25 , cidade: "Juazeiro do Norte"},
    { nome: 'Carlos', idade: 30 , cidade: "Iguatu"},
    { nome: 'Julia', idade: 18 , cidade: "Pau dos ferros"},
    { nome: 'Mariana', idade: 25 , cidade: "Barbalha"},
    { nome: 'Lucas', idade: 18 , cidade: "Missão Velha"},
    { nome: 'Beatriz', idade: 30 , cidade: "Crato"},
    { nome: 'Rodrigo', idade: 25 , cidade: "Iguatu"},
    { nome: 'Fernanda', idade: 30 , cidade: "Barbalha"},
    { nome: 'Gustavo', idade: 18 , cidade: "Juazeiro do Norte"},
    { nome: 'Amanda', idade: 25 , cidade: "Natal"},
    { nome: 'Rafael', idade: 18 , cidade: "Missão Velha"},
    { nome: 'Larissa', idade: 30 , cidade: "Juazeiro do Norte"},
    { nome: 'Diego', idade: 25 , cidade: "Barbalha"},
    { nome: 'Camila', idade: 18 , cidade: "Natal"},
    { nome: 'Guilherme', idade: 30 , cidade: "Juazeiro do Norte"},
    { nome: 'Isabela', idade: 25 , cidade: "Natal"},
    { nome: 'Vinicius', idade: 18 , cidade: "Crato"}

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
       return res.send({message:("Id invalido")}); // ploca a resposta com innvalido
   }

   let indice = parseInt(id); // isso transforma o paramentro em int para poder usar como index do array

   if(indice < 0 || indice >= cadastros.length){ // caso  o indice for menor ou maior que zero ou maior q o tamanho do array
       return res.send({message:"Indice invalido"})
   }

   return res.json(cadastros[indice]);

});



//post  - adicionar uma informação ao recurso.
app.post('/cadastro', (req,res)=>{
    console.log(req.body)
    let novoCadastro = req.body; // o let pega  os dados vindo da requisição , o body pega todos os dados que estão sendo enviados por meio dele
    
    const existeUsuario = cadastros.some((usuario)=> usuario.nome.toLowerCase() === novoCadastro.nome.toLowerCase())

    if (existeUsuario) {
        return res.status(404).send({message:"Usuário já existe na base de dados"})
        
    }

    cadastros.push(novoCadastro);// add o novo cadastro ao final do vetor
    console.log(cadastros)
    return res.json(cadastros); // retornando o array  de todos os cadastros

    //Lembrar de vaildar quando o cadastro que for  passada já exista no array
})

// Rota que filtro por idade

app.get('/cadastros/idade/:idade', (req, res)=>{
    const parametroIdade = parseInt(req.params.idade);  // converte para inteiro
    
    const filtradosPorIdade = cadastros.filter((dado)=> dado.idade === parametroIdade) // retorna um vetor com as pessoas que a mesma idade

    if (filtradosPorIdade.length === 0) { //Validar se a idade pesquisada esta no array
        return res.status(404).json({message:"Nenhum cadastro encontrado"}) // retorna o erro 
    }

    return res.json(filtradosPorIdade) // retorna  um json com os cadastros daquela idade


})


//rota para buscar por nome

app.get('/cadastros/nome/:nome', (req, res)=>{
    const {nome} = req.params;

    const filtrandoPorNome = cadastros.filter((NomePessoa)=> NomePessoa.nome === nome) // retorna um vetor com as pessoas que existe

    if(filtrandoPorNome.length === 0){  // caso o nome pesquisado não exita  no array ele retorna esse erro
        return res.status(404).send({message:"Nome não encontrado"})
    }

    return res.json(filtrandoPorNome)
})

// rota de filtrar por cidades
app.get('/cadastros/cidades/:cidade', (req,res)=> {
    
    const {cidade} = req.params;

    const filtroCidades = cadastros.filter((NomeCidade)=> NomeCidade.cidade === cidade) // trazendo as informações das cidades que são iguais a que foi pesquisadas

    if (filtroCidades.length === 0) { // quando a cidade  não for encontrada retorna mensagem de erro a busca é feito pelo tamanho de array
        return res.status(404).send({message:"Cidade não encotrada"});
    }
    res.json(filtroCidades);

 })


//http://localhost:3000/cadastro/1
app.listen(3001 , ()=> console.log("Servidor iniciado"));
