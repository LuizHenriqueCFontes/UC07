const API = "http://localhost:3301/usuarios";

const lista = window.document.querySelector("#lista");
const form = window.document.querySelector("#form");
const msg = window.document.querySelector("#msg");

//Listar
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
                        <button class="btn btn-warning btn-sm" onclick="editar(${u.id}, '${u.email}')">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="excluir(${u.id})">Excluir</button>

                    </td>
                </tr>
            `;
        });
        
    }catch(error){
        mostrarMensagem("Erro ao carregar usuarios", false);

    }
}

//Salvar
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = window.document.querySelector("#id").value;
    const nome = window.document.querySelector("#nome").value;
    const email = window.document.querySelector("email").value;

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

    }catch {
        mostrarMensagem("Erro ao salvar", false);

    }
});

//Editar
function editar(id, nome, email){
    window.document.querySelector("#id").value = id;
    window.document.querySelector("#nome").value = nome;
    window.document.querySelector("#email").value = email;
}

//Excluir
async function excluir(id) {
    if(!confirm("Deseja excluir este usuário?")){
        return;
    }

    try{
        const res = await fetch(`${API}/${id}`, {
            method: "DELETE"
        });

        const data = await res.json();

        mostrarMensagem(data.mensagem, true);
        carregar();;

    }catch {
        mostrarMensagem("Erro ao excluir", false);

    }
}

//UX (mensagens)
function mostrarMensagem(texto, sucesso){
    msg.innerHTML = `
        <div class="alert ${sucesso ? 'alert-sucess' : 'alert-danger'}">
            ${texto}
        </div
    `;
}

//Init
carregar();
