const form = document.getElementById("formDesconto");

form.addEventListener("submit", (event) =>{
    event.preventDefault();

    let nome = document.getElementById("nome").value.trim();

    let valor = parseFloat(document.getElementById("valor").value);

    let tipo = document.getElementById("tipoCliente").value;

    let resultado = document.getElementById("resultado");

    resultado.style.display = "block";

    if(nome === "" || isNaN(valor) || tipo === ""){
        resultado.className = "resultado erro";
        resultado.innerHTML = "⚠️ Preencha todos os campos corretamente.";
        return;
    }

    let desconto = 0;

    if(tipo === "comum"){
        desconto = 0;

    }else if(tipo === "vip"){
        desconto = 10;

    }else if(tipo == "premium"){
        desconto = 20;
    }

    if(valor > 1000){
        desconto += 5;
    }

    let valorFinal = valor - (valor * desconto / 100);

    resultado.className = "resultado sucesso";

    resultado.innerHTML = `
        👤 <strong>Cliente:</strong> ${nome}<br><br>

        💰 <strong>Valor Original:</strong> R$ ${valor.toFixed(2)}<br>

        🎯 <span class="desconto-destaque">Desconto Aplicado: ${desconto}%</span> <br>

        🏷️ <strong>Valor Final:</strong> R$ ${valorFinal.toFixed(2)}   
    `;

});