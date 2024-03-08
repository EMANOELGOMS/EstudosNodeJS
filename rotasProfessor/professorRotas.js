
const express = require('express')
const bodyParser = require('body-parser')
const profRotas = express();


profRotas.use(express.json())
profRotas.use(bodyParser.urlencoded({extended:true}))

// profRotas.use(bodyParser.json())
// profRotas.use()


const professores = [
    {nome: 'Marcos', area: 'Banco de dados'},
    {nome: 'Ana', area: 'UX Design'},
    {nome: 'Hugo', area: 'Programação'},
    {nome: 'Diego', area: 'Inteligência artificial'},
    {nome: 'Maria', area: 'Programação'},
    {nome: 'Hugo', area: 'Engenharia de software'},
    {nome: 'Danilo', area: 'Programação web e mobile'},
    {nome: 'Yolanda', area: 'Engenharia de software'},
]

// essa rota trás todos os professos que estão no array
profRotas.get('/professor/todos', (req,res)=> {
    try {
        res.json(professores)
    } catch (error) {
        res.json({error:"Erro ao buscar os professores"})
    }    
})


// pesquisa um novo professor

profRotas.get('/professor/:nome', (req, res) => {

    try {
        let {nome} = req.params; // pegando o nome da url para fazer a comparação com o nome do professor
        let professorEncontrado = professores.filter(nomeprof => nomeprof.nome.toLowerCase() === nome.toLowerCase());
        
        if (professorEncontrado.length === 0) {
            res.status(404).json({ message: `O professor ${nome} não foi encontrado` }) 
        } else {
            res.json(professorEncontrado[0])// essa parte  vai retornar um json com o professor encontrado
        }

        // if(!professorEncontrado) return res.status(404).json({message:'Professor não encontrado'});
        
        // // verifique sem o return
        // return res.json(professorEncontrado[0])  
        
    } catch (error) {
        res.json({error:"Erro ao buscar os professor"})
    } 
})

// add um novo professor
profRotas.post('/professor', (req,res)=> {
    try {
        let novaProfessor = req.body; // pega as informações enviadas pelo body na requisição
        // adicionar um id único para cada professor
        // const ultimoRegistro = professores [professores.length -1];
        // novaProfessor.id = ultimoRegistro.id + 1;
        console.log(novaProfessor);

        let professorExistente = professores.some((prof)=> 
            
             prof.nome.toLowerCase() == novaProfessor.nome.toLowerCase()
         )


        if (professorExistente){
            res.status(404).json ({
                error: "O usuário já existe"
            });
            
        };

    professores.push(novaProfessor);
    res.status(201).send({message: "O professor foi criado"});//mandar uma mensagem de sucesso
    
    }catch(error){
        console.log(error);
         res.status(400).json({ error: 'Não foi possível cadastrar o Professor.' });
    } 
   



})

module.exports = profRotas;
