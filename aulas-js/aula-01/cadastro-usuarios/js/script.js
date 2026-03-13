let usuarios = [];

const cadastrar = window.document.querySelector(".btn-cadastrar");

const listar = window.document.querySelector(".btn-listar")

cadastrar.addEventListener("click", cadastrarUsuario);

listar.addEventListener("click", listarUsuarios);

function cadastrarUsuario(){
    let nome = window.document.querySelector("#nome").value;
    let email = window.document.querySelector("#email").value;
    let perfil = window.document.querySelector("#perfil").value;

    console.log(nome)
    console.log(email)
    console.log(perfil)

    if(nome === "" || email === "" || perfil === ""){
        window.document.querySelector("#mensagem").innerHTML = "Preencha todos os campos";

        return;
    }

    let usuario = {
        nome:nome,
        email:email,
        perfil:perfil
    }

    usuarios.push(usuario);

    window.document.querySelector("#mensagem").innerHTML = "Usuario Cadastrado com Sucesso!";

    window.document.querySelector("#nome").value;
    window.document.querySelector("#email").value;
    window.document.querySelector("#perfil").value;
}

function listarUsuarios(){
    let saida = "";

    if(usuarios.length === 0){
        "Nenhum usuario cadastrado";

        return;
    }

    for(let i = 0; i < usuarios.length; i++){

        saida += `
                <div class="usuario">
                    <strong>${usuarios[i].nome}</strong><br>
                    Email: ${usuarios[i].email}<br>
                    Perfil: ${usuarios[i].perfil}
                </div>
                `
    }

    window.document.querySelector("#listarUsuarios").innerHTML = saida;

    document.querySelector("#totalUsuarios").innerHTML = "<p class='total'>Total de usuários:" + usuarios.length + "</p>"
}
