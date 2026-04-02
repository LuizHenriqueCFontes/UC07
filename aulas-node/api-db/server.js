// app.js ou server.js

const express = require('express');
const pool = require('./db'); // Importa a conexão com o banco de dados

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());

// --- ROTAS DA API ---

// Rota GET - Listar todos os usuários
app.get('/usuarios', async (req, res) => {
    console.log('GET /usuarios - Buscando todos os usuários');
    try {
        const [results] = await pool.query('SELECT * FROM usuarios');
        
        res.json({
            mensagem: "Lista de usuários recuperada com sucesso",
            data: results,
            total: results.length
        });
    } catch (error) {
        console.error("Erro no GET /usuarios:", error);
        res.status(500).json({ mensagem: "Erro interno do servidor", error: true });
    }
});

// Rota GET - Buscar usuário por ID
app.get('/usuarios/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    console.log(`GET /usuarios/${id} - Buscando usuário específico`);
    
    try {
        // Usando '?' para evitar SQL Injection (Prepared Statement)
        const [results] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        
        const usuario = results[0]; 
        
        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado", error: true });
        }
        
        res.json({
            mensagem: "Usuário encontrado com sucesso",
            data: usuario
        });
    } catch (error) {
        console.error(`Erro no GET /usuarios/${id}:`, error);
        res.status(500).json({ mensagem: "Erro interno do servidor", error: true });
    }
});

// Rota POST - Criar novo usuário
app.post('/usuarios', async (req, res) => {
    console.log('POST /usuarios - Criando novo usuário');
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ mensagem: 'Nome e email são obrigatórios', error: true });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO usuarios (nome, email) VALUES (?, ?)', 
            [nome, email]
        );

        const novoUsuario = { id: result.insertId, nome, email };

        res.status(201).json({ 
            mensagem: 'Usuário criado com sucesso', 
            data: novoUsuario 
        });
    } catch (error) {
        // Erro 1062 é código de chave duplicada (e-mail já existe, se for UNIQUE)
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ mensagem: 'Email já cadastrado', error: true });
        }
        console.error("Erro no POST /usuarios:", error);
        res.status(500).json({ mensagem: "Erro interno do servidor", error: true });
    }
});

app.put("/usuarios/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    console.log("PUT / usuarios " + id + " - Atualizando usuário");

    const {nome, email} = req.body;

    if(!nome || !email){
        return res.status(400).json({
            menssagem: "Nome e email são obrigatórios", error:true
        });
    }

    try{
        const [result] = await pool.query("UPDATE usuarios SET nome = ?, email = ? WHERE id = ?", [nome, email, id]);

        if(result.affectedRows === 0){
            return res.status(404).json({
                mensagem: "Usuário não encontrado", error: true
            });
        }

        const usuarioAtualizado = {id, nome, email};

        res.json({
            mensagem: "Usuário atualizado com sucesso",
            data: usuarioAtualizado
        });

    }catch(error){
        console.error(`Erro no PUT /usuarios/${id}:`, error);
        
        res.status(500).json({
            mensagem: "Erro interno do servidor", error: true
        });
    }

});

app.delete("/usuarios/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    console.log(`DELETE /usuarios/${id} - Removendo usuário`);

    try{
        const [usuariosBuscado] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);

        if(usuariosBuscado.length === 0){
            return res.status(404).json({
                mensagem: "Usuário não encontrado", error: true
            });
        }

        const [result] = await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);

        res.json({
            mensagem: "Usuário removido com sucesso",
            data: usuariosBuscado[0]
        });

    }catch(error){
        console.error(`Erro no DELETE /isuarios/${id}`, error);
        res.status(500).json({
            mensagem: "Erro interno do servidor", error: true

        });
    }

});

app.get("/", (req, res) => {
    res.json({
        mensagem: "API RESTful de Usuários está funcionando com MySQL! 🚀",
        versao: "2.0.0",
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📚 Rotas de Usuários: /usuarios`);
});