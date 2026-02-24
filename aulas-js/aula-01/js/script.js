function executarScript(){
  // =============================
  // VARIÁVEIS
  // =============================  

  let nome = "Hudson";
  let idade = 30;
  const curso = "Desenvolvimento Web";

  // =============================
  // TIPOS PRIMITIVOS
  // =============================

  let ativo = true;
  let saldo = 1500.75;
  let valorNul = null;
  let indefinido;

  console.log("Tipo de nome: ", typeof nome);
  console.log("Tipo de idade: ", typeof idade);
  console.log("Tipo de ativo: ", typeof ativo);
  console.log("Tipo de valorNulo: ", typeof valorNulo);
  console.log("Tipo de indefinido: ", typeof indefinido);

  // =============================
  // OPERAÇÕES MATEMÁTICAS
  // =============================
   
  let numero1 = 10;
  let numero2 = 5;

  let soma = numero1 + numero2;
  let subtracao = numero1 - numero2;
  let multiplicacao = numero1 * numero2
  let divisao = numero1 / numero2;

  console.log("Soma: ", soma);
  console.log("Subtração: ", subtracao);
  console.log("Multiplicação", multiplicacao);
  console.log("Divisão: ", divisao);

  // =============================
  // CONCATENAÇÃO
  // =============================

  let mensagem = "Olá " + nome + ", você tem " + idade + " anos e está matriculado no curso de " + curso + ".";

  console.log(mensagem);

  // =============================
  // EXIBIR NA TELA
  // =============================

  document.getElementById("resultado").innerHTML = `${mensagem} <br><br>
                          Resultado da soma: ${soma}<br>
                          Resultado da multiplicação: ${multiplicacao}`;
}