//Dados fixo para simulacao
const usuarioCorreto = "admin";
const senhaCorreta = "1234";

// Capturando formulário
const form = document.getElementById("formLogin");

form.addEventListener("submit", function(event){
    event.preventDefault(); // Evita recarregar a página

    let usuarioDigitado = document.getElementById("usuario").value;
    let senhaDigitada = document.getElementById("senha").value;

    let mensagem = document.getElementById("mensagem");

    console.log("Usuario digitado: ", usuarioDigitado);
    console.log("Senha digitada: ", senhaDigitada);

    if(usuarioDigitado === usuarioCorreto && senhaDigitada === senhaCorreta){
        mensagem.textContent = "Acesso permitdo!";
        mensagem.className = "mensagem sucesso";
        console.log("Login realizado com sucesso");

    }else{
        mensagem.textContent = "Acesso negado!";
        mensagem.className = "mensagem erro";
        console.log("Falha no login.");

    }

});