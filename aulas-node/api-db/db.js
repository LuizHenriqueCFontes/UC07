// db.js

const mysql = require('mysql2/promise');

// ⚠️ CORREÇÃO: Adicionando a porta 3306, padrão do MySQL no XAMPP.
const dbConfig = {
    host: 'localhost',      
    user: 'root',           
    password: '1234',           
    database: 'api_usuarios', // Nome do banco de dados criado
    port: 3306, // <<< A porta do MySQL/XAMPP
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Cria o pool de conexões.
const pool = mysql.createPool(dbConfig);

// Testar a conexão ao iniciar
pool.getConnection()
    .then(connection => {
        console.log("Conexão com MySQL estabelecida com sucesso! 💾");
        connection.release(); 
    })
    .catch(err => {
        console.error("❌ ERRO: Falha ao conectar ao MySQL. Verifique o XAMPP e as credenciais.");
        console.error(err.message);
    });

module.exports = pool;