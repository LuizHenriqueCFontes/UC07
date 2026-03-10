let catalogo = [];

function adicionarProduto(){
    let nomeProduto = document.querySelector("#produto").value;

    if(nomeProduto === ""){
        window.alert("Digite um produto")
        return;
    }

    catalogo.push(nomeProduto);

    window.document.querySelector("#produto").value = "";

    window.document.querySelector("#resultado").innerHTML = "<p class='mensagem'>Produto adicionado com sucesso!</p>"
}

function mostrarProdutos(){
    let saida = "<h3>Lista de Produtos</h3>"

    if(catalogo.length === 0){
        saida = "Nenhum produto cadastrado";

    }

    for(let i = 0; i < catalogo.length; i++){
        saida += "<div class='item'>" + (i+1) + " - " + catalogo[i] + "</div>"

    }

    window.document.querySelector("#resultado").innerHTML = saida;

}

function contarProdutos(){
    let total = catalogo.length;

    window.document.querySelector("#resultado").innerHTML = "<p class='total'>Total de produtos: " + total + "</p>"
}