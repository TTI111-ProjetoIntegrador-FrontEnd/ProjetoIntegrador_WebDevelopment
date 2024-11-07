async function cadastrarUsuario(){
    let usuarioCadastroInput = document.querySelector('#usuarioCadastroInput')
    let passwordCadastroInput = document.querySelector('#passwordCadastroInput')
    let usuarioCadastro = usuarioCadastroInput.value
    let passwordCadastro = passwordCadastroInput.value
    if (usuarioCadastro && passwordCadastroInput){
        //vamos cadastrar
        try{
            const cadastroEndpoint = '/signup'
            const URLcompleta = `${protocolo}${baseURL}${cadastroEndpoint}`
            await axios.post(
                URLcompleta,
                {login:usuarioCadastro, password: passwordCadastro}
            )
            usuarioCadastroInput.value = ""
            passwordCadastroInput.value = ""
            let alert = document.querySelector('.alert-modal-cadastro')
            alert.innerHTML = "Usuário cadastro com sucesso"
            alert.classList.add('show','alert-success')
            alert.classList.remove('d-none')
            setTimeout(() =>{
                alert.classList.remove('show', 'alert-success')
                alert.classList.add('d-none')
                let modalCadastro = bootstrap.Modal.getInstance(document.querySelector('#modalCadastro'))
                modalCadastro.hide()
            }, 2000)
            
        }
        catch(e){
            usuarioCadastroInput.value = ""
            passwordCadastroInput.value = ""
            let alert = document.querySelector('.alert-modal-cadastro')
            alert.innerHTML = "Não foi possível realizar o cadastro"
            alert.classList.add('show','alert-danger')
            alert.classList.remove('d-none')
            setTimeout(() =>{
                alert.classList.remove('show', 'alert-danger')
                alert.classList.add('d-none')
                let modalCadastro = bootstrap.Modal.getInstance(document.querySelector('#modalCadastro'))
                modalCadastro.hide()
            }, 2000)
        }
    }
    else{
        let alert = document.querySelector('.alert-modal-cadastro')
        alert.innerHTML = "Preencha todos os cantos!"
        alert.classList.add('show','alert-danger')
        alert.classList.remove('d-none')
        setTimeout(() =>{
            alert.classList.remove('show', 'alert-danger')
            alert.classList.add('d-none')
        }, 2000)
    }

}