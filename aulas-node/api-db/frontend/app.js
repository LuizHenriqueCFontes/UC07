const API = "http://localhost:3001/usuarios";

const lista = document.querySelector("#lista");
const form = document.querySelector("#form");
const msg = document.querySelector("#msg");

//listar
async function carregar() {
    try{
        const res = await fetch(API);
        const json = await res.json();

        lista.innerHTML = "";

        json.data.forEach(u => {
            lista.innerHTML += `
                <tr>
                    <td>${u.id}</td>
                    <td>${u.nome}</td>
                    <td>${u.email}</td>

                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editar(${u.id}, '${u.nome}', '${u.email}')">Editar</button>

                        <button class="btn btn-danger btn-sm" onclick="excluir(${u.id})">Excluir</button>
                    </td>
                </tr>
            `;
        }); 

    }catch(error){
        mostrarMensagem("Erro ao carregar usuários", false);
    }
}

//salvar
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.querySelector("#id").value;
    const nome = document.querySelector("#nome").value;
    const email = document.querySelector("#email").value;

    if(!nome || !email){
        return mostrarMensagem("Preencha todos os campos", false);
    }

    const metodo = id ? "PUT" : "POST";
    const url = id ? `${API}/${id}` : API;

    try{
        const res = await fetch(url, {
            method: metodo,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({nome, email})    
        });

        const data = await res.json();

        mostrarMensagem(data.mensagem, !data.error);

        form.reset();
        carregar();

    }catch{
        mostrarMensagem("Erro ao salvar", false);
    }
});

//editar
function editar(id, nome, email){
    document.querySelector("#id").value = id;
    document.querySelector("#nome").value = nome;
    document.querySelector("#email").value = email;
}

//excluir
async function excluir(id) {
    if(!confirm("Deseja excluir este usuário")) return;

    try{
        const res = await fetch(`${API}/${id}`, {
            method: "DELETE"
        });

        const data = await res.json();

        mostrarMensagem(data.mensagem, true);
        carregar();

    }catch {
        mostrarMensagem("Erro ao excluir", false);
    }
}

//UX (mensagens)
function mostrarMensagem(texto, sucesso){
    msg.innerHTML = `
        <div class="alert ${sucesso ? 'alert-success' : 'alert-danger'}">
            ${texto}
        </div>
    `;
}

//init
carregar();