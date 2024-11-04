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