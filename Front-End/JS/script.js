const protocolo = 'http://'
const baseURL = 'localhost:3000'
const contatoEndpoint = '/contato'

const fazerLogin = async () => {
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
        }
        catch {

        }
    }
    else {
        let alert = document.querySelector('.formLogin')
        alert.innerHTML = "Preencha todos os campos"
        alert.classList.add('show', 'alert-danger')
        alert.classList.remove('d-none')
        setTimeout(() => {
            alert.classList.remove('show')
            alert.classList.add('d-none')
        }, 4000);
    }
}

async function obterDados() {
    const URLCompleta = `${protocolo}${baseURL}${contatoEndpoint}`;
    const dados = (await axios.get(URLCompleta)).data
    console.log(dados);

    let principal = document.querySelector('#principal');
    for (let dado of dados) {
        let paragrafo = document.createElement('p');
        paragrafo.innerHTML = `Nome: ${dado.nome}`;

        principal.appendChild(paragrafo);
    }

    let secundario = document.querySelector('#secundario');
    for (let dado of dados) {
        let paragrafo = document.createElement('p');
        paragrafo.innerHTML = `Email: ${dado.email}`;

        secundario.appendChild(paragrafo);
    }

    let terciario = document.querySelector('#terciario');
    for (let dado of dados) {
        let paragrafo = document.createElement('p');
        paragrafo.innerHTML = `Mensagem de ${dado.nome}: ${dado.mensagem}`;

        terciario.appendChild(paragrafo);
    }
}

async function cadastrarDados() {
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
        paragrafo.innerHTML = `Mensagem de ${dado.nome}: ${dado.mensagem} \n`;

        terciario.appendChild(paragrafo);
    }
}