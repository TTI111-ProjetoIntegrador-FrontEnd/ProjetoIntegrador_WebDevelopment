const protocolo = 'http://'
const baseURL = 'localhost:3000'
// const contatoEndpoint = '/contato'

const fazerLogin = async () => {
    event.preventDefault(); // Previne o recarregamento da página

    let emailLoginInput = document.querySelector('#emailLoginInput')
    let senhaLoginInput = document.querySelector('#senhaLoginInput')
    let emailLogin = emailLoginInput.value
    let senhaLogin = senhaLoginInput.value

    if (emailLogin && senhaLogin){
        try {
            const loginEndpoint = '/login'
            const URLCompleta = `${protocolo}${baseURL}${loginEndpoint}`
            const response = await axios.post(
                URLCompleta,
                {login: emailLogin, password: senhaLogin}
            )
            console.log(response.data)
            emailLoginInput.value = ''
            senhaLoginInput.value = ''

            let alert = document.querySelector('#alerta')
            alert.innerHTML = 'Acesso autorizado!'
            // alerta verde de sucesso
            alert.classList.add('show', 'alert-success')
            // ignorar alerta vermelho de erro
            alert.classList.remove('d-none', 'alert-danger')
            setTimeout(() => {
                alert.classList.add('d-none')
                alert.classList.remove('show')
            }, 10000)

            // Redireciona para a página desejada
            window.location.assign('admin.html');
        }
        catch (error) {
            let alert = document.querySelector('#alerta')
            alert.innerHTML = "Não foi possível acessar!!"
            // alerta vermelho de fracasso
            alert.classList.add('show', 'alert-danger')
            // ignorar o alerta verde de sucesso
            alert.classList.remove('d-none', 'alert-success')
            setTimeout(() => {
                alert.classList.add('d-none')
                alert.classList.remove('show')
            }, 10000)
        }
    }
    else {
        let alert = document.querySelector('#alerta')
        alert.innerHTML = "Preencha todos os campos"
        alert.classList.add('show', 'alert-danger')
        alert.classList.remove('d-none')
        setTimeout(() => {
            alert.classList.add('d-none')
            alert.classList.remove('show')
        }, 10000)
    }
}

function listarDados (dados) {
    let tabela = document.querySelector('.dados')
    let corpoTabela = tabela.getElementsByTagName('tbody')[0]
    corpoTabela.innerHTML=""
    for (let dado of dados) {
        let linha = corpoTabela.insertRow(0)
        let celulaNome = linha.insertCell(0)
        let celulaEmail = linha.insertCell(1)
        let celulaMensagem = linha.insertCell(2)
        celulaNome.innerHTML = dado.nome
        celulaEmail.innerHTML = dado.email
        celulaMensagem.innerHTML = dado.mensagem
    }
}

async function obterDados() {
    const contatoEndpoint = '/contato'
    const URLCompleta = `${protocolo}${baseURL}${contatoEndpoint}`;
    const dados = (await axios.get(URLCompleta)).data
    // console.log(dados);
    listarDados(dados)

    // let principal = document.querySelector('#principal');
    // for (let dado of dados) {
    //     let paragrafo = document.createElement('p');
    //     paragrafo.innerHTML = `Nome: ${dado.nome}`;

    //     principal.appendChild(paragrafo);
    // }

    // let secundario = document.querySelector('#secundario');
    // for (let dado of dados) {
    //     let paragrafo = document.createElement('p');
    //     paragrafo.innerHTML = `Email: ${dado.email}`;

    //     secundario.appendChild(paragrafo);
    // }

    // let terciario = document.querySelector('#terciario');
    // for (let dado of dados) {
    //     let paragrafo = document.createElement('p');
    //     paragrafo.innerHTML = `Mensagem de ${dado.nome}: ${dado.mensagem}`;

    //     terciario.appendChild(paragrafo);
    // }
}

async function cadastrarDados() {
    const contatoEndpoint = '/contato'
    const URLCompleta = `${protocolo}${baseURL}${contatoEndpoint}`;

    //pega os inputs dos dados inseridos pelo usuário
    let nomeInput = document.querySelector('#nomeInput');
    let emailInput = document.querySelector('#emailInput');
    let mensagemInput = document.querySelector('#mensagemInput');
    //pega os valores digitados pelo usuário
    let nome = nomeInput.value;
    let email = emailInput.value;
    let mensagem = mensagemInput.value;
    //envia os dados coletador pro back
    const dados = (await axios.post(URLCompleta, {nome, email, mensagem})).data
    //limpa os campos que o usuário digitou
    nome = ''
    email = ''
    mensagem = ''

    let principal = document.querySelector('#principal');
    // principal.innerHTML = '';
    for (let dado of dados) {
        let paragrafo = document.createElement('p');
        paragrafo.innerHTML = `Nome: ${dado.nome}`;
        
        principal.appendChild(paragrafo);
    }

    let secundario = document.querySelector('#secundario');
    // secundario.innerHTML = '';
    for (let dado of dados) {
        let paragrafo = document.createElement('p');
        paragrafo.innerHTML = `Email: ${dado.email}`;

        secundario.appendChild(paragrafo);
    }

    let terciario = document.querySelector('#terciario');
    // terciario.innerHTML = '';
    for (let dado of dados) {
        let paragrafo = document.createElement('p');
        paragrafo.innerHTML = `Mensagem de ${dado.nome}: ${dado.mensagem}`;

        terciario.appendChild(paragrafo);
    }
}
