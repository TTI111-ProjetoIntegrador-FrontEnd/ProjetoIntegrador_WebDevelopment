const express = require('express')
const cors = require('cors')
const mongoose =  require('mongoose')
const uniqueValidator = require('mongoose-unique-validator') // import do mongoose-unique-validator para cadastro de usuario unico
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()
app.use(express.json())
app.use(cors())

// VALIDAÇÃO ÚNICA
const ususarioSchema = mongoose.Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})
ususarioSchema.plugin(uniqueValidator)

// Modelo a ser aplicado no banco de dados (faz uso da validação única)
const ADMIN = mongoose.model(`ADMIN`, ususarioSchema)

const CONTATO = mongoose.model(`CONTATO`, mongoose.Schema({
    nome: {type: String},
    email: {type: String},
    mensagem: {type: String}
}))

// banco de dados do jogo
// const JOGO = mongoose.model(`JOGO`, mongoose.Schema({
//     pergunta: {type: String},
//     opcoes: {type: String},
//     resposta: {type: Number}
// }))

async function contatarAoMongoDB() {
    try{
        await mongoose.connect(`mongodb+srv://matmetromauapi:12345@cluster0.6b7ba.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        console.log('bd connected')
    }
    catch (error) {
        console.error('erro ao tentar conectar ao banco de dados', error)
    }
}

app.post('/signup', async (req, res) => {
    // usando 'try/ catch' definimos uma mensagem no console do servidor, o resultado sendo enviado ao cliente representa que tudo deu certo ou não
    try {
        const login = req.body.login
        const password = req.body.password
        const criptografada = await bcrypt.hash(password, 10)
        const usuario = new ADMIN({
            login: login,
            password: criptografada
        })
        const respMongo = await usuario.save()
        console.log(respMongo)
        res.status(201).end()
    }
    catch (error) {
        console.log(error)
        res.status(409).end()
    }
})

app.post('/login', async (req, res) => {
    //login/senha que o usuário enviou
    const login = req.body.login
    const password = req.body.password
    //tentamos encontrar no MongoDB
    const u = await ADMIN.findOne({ login: req.body.login })
    if (!u) {
        //se não foi encontrado, encerra por aqui com código 401
        return res.status(401).json({ mensagem: "login inválido" })
    }
    //se foi encontrado, comparamos a senha, após descriptográ-la
    const senhaValida = await bcrypt.compare(password, u.password)
    if (!senhaValida) {
        return res.status(401).json({ mensagem: "senha inválida" })
    }
    //aqui vamos gerar o token e devolver para o cliente
    const token = jwt.sign(
        { login: login },
        //depois vamos mudar para uma chave secreta de verdade
        "chave-secreta",
        { expiresIn: "1h" }
    )
    res.status(200).json({ token: token })
})

app.get('/contato', async (req, res) => {
    const dados = await CONTATO.find()
    res.json(dados)
})

app.post('/contato', async (req, res) => {
    //obtém os dados enviados pelo cliente
    const nome = req.body.nome
    const email = req.body.email
    const mensagem  = req.body.mensagem
    
    const dado = new CONTATO({nome, email, mensagem}) // Cria uma instância de Mensagem

    //save salva o novo filme na base gerenciada pelo MongoDB
    await dado.save()
    const dados = await CONTATO.find()
    res.json(dados)
    })

app.listen(3000, () => {
    try{
        contatarAoMongoDB();
        console.log("servidor up and running");
    }
    catch (e) {
        console.log("erro ao conectar ao servidor", e)
    }
})