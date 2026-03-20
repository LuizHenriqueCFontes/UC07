const express = require("express");

const app = express();

app.use(express.json());

let produtos = [];
let idAtual = 1;

app.get("/produtos", (req, res) => {
    res.json(produtos);
});

app.get("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const produto = produtos.find(p => p.id === id);

    if(!produto){
        return res.status(404).json({mensagem: "Produto nao encontrado"});
    }

    res.json(produto);
});

app.post("/produtos", (req, res) => {
    const {nome, preco} = req.body;

    if(!nome || !preco){
        return res.status(400).json({
            mensagem: "Nome e preco sao obrigatorios"
        });
    }

    const novoProduto = {
        id : idAtual++,
        nome,
        preco
    };

    produtos.push(novoProduto);

    res.status(201).json(novoProduto);
});

app.put("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const{nome, preco} = req.body;

    const produto = produtos.find(p => p.id === id);

    if(!produto){
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        });
    }

    produto.nome = nome ?? produto.nome;
    produto.preco = preco ?? produto.preco;

    res.json(produto);
});

app.delete("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = produtos.findIndex(p => p.id === id);

    if(index === -1){
        return res.status(404).json({
            mensagem: "Produto não encontrado"
        });
    }

    produtos.splice(index, 1);

    res.json({
        mensagem: "Produto removido com sucesso"
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Servidor Rodando em http://localhost:" + PORT);
});