const express = require("express");

const app = express();

const PORT = 3000;

let clientes = [
    {id:1, nome:"Luiz Henrique"},
    {id:2, nome:"Alanis"},
    {id:3, nome:"Vanderli"},
    {id:4, nome:"Larissy"}
]

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API funcionando");

});

app.get("/clientes", (req, res) => {
    res.json(clientes);

});

app.post("/clientes", (req, res) => {
    const novoCliente = {
        id: clientes.length + 1,
        nome: req.body.nome
    }

    clientes.push(novoCliente);
    res.status(201).json(novoCliente);
});

app.delete("/clientes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    clientes = clientes.filter(c => c.id !== id);

    res.status(204).send();
});



app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});