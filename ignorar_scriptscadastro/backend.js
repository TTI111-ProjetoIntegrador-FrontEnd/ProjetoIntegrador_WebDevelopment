const express = require('express')
const cors = require('cors')
const mongoose =  require('mongoose')
const app = express()
app.use(express.json())
app.use(cors())

const CONTATO = mongoose.model(`CONTATO`, mongoose.Schema({
    nome: {type: String},
    email: {type: String},
    mensagem: {type: String}
}))

async function contatarAoMongoDB() {
    await mongoose.connect(`mongodb+srv://matmetromauapi:12345@cluster0.6b7ba.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
}

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
        console.log("server up and running");
    }
    catch{
        console.log("erro ao conectar ao server")
    }
})

const usuarioSchema = mongoose.Schema ({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model("Usuario", usuarioSchema)

async function conectarAoMongo() {
    await mongoose.connect(`mongodb+srv://matmetromauapi:12345@cluster0.6b7ba.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
}

app.post("/signup", async (req, res) => {
    try {
        const login = req.body.login
        const password = req.body.password
        const senhacriptografada = await bcrypt.hash(password, 10)
        const usuario = new Usuario({login: login, password: senhacriptografada})
        const respMongo = await usuario.save()
        console.log(respMongo)
        res.status(201).end()
    }
    catch(e) {
        console.log(e)
        res.status(409).end()
    }
})

app.post('/login', async (req, res) => {
    const login = req.body.login
    const password = req.body.password
    const usuarioExiste = await Usuario.findOne({login: login})
    if (!usuarioExiste) {
        return res.status(401).json({mensagem: "login inválido"})
    }
    const senhaValida = await bcrypt.compare(password, usuarioExiste.password)
    if (!senhaValida) {
        return res.status(401).json({mensagem: "senha inválida"})
    }
    const token = jwt.sign(
        {login: login},
        "chave-secreta",
        {expiresIn: "1h"}
    )
    res.status(200).json({token: token})
})

app.listen(3000, () => {
    try {
        conectarAoMongo()
        console.log("server up and running e conexão ok");
    }
    catch (e) {
    console.log('erro na conexão', e)
    }}
)
