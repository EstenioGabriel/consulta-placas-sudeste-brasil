/*
ANÁLISE COMBINATÓRIA DO PROJETO

PERMUTAÇÃO SIMPLES: Ordem Importa (Tem que seguir a estrutura do Mercosul) e pode ter repetição de elementos

Possibilidades de letras: 26 (De A até Z)
Possibilidade de números: 10 (0 até 9)

Cálculo: 
L * L * L * N * L * N * N -> 26 * 26 * 26 * 10 * 26 * 10 * 10

26 ^ 4 * 10 ^3 = 456.976 * 1.000 

456.976.000 Possibilidadesa

Observação:
Este valor representa o universo total de placas possíveis com a estrutura LLLNLNN.
Nosso código filtra esse universo para identificar apenas as placas que pertencem
aos estados de São Paulo, Rio de Janeiro e Espírito Santo, conforme os intervalos definidos.

São Paulo:
placa 806 até 4324 --> 4324 - 806 + 1 = 3519
placa 11297 até 11311 --> 11311 - 11297 + 1 = 15

São Paulo tem 3.534 possibilidades


Rio de Janeiro:
placa 7077 até 7986 → 7986 - 7077 + 1 = 910
placa 11714 até 11773 → 11773 - 11714 + 1 = 60

Rio de Janeiro tem 970 possibilidades


Espírito Santo:

placa 8499 até 8631 → 8631 - 8499 + 1 = 133
placa 9926 até 9965 → 9965 - 9926 + 1 = 40
placa 9999 até 10000 → 10000 - 9999 + 1 = 2
placa 10002 até 10006 → 10006 - 10002 + 1 = 5
placa 10037 até 10043 → 10043 - 10037 + 1 = 7
placa 10129 até 10154 → 10154 - 10129 + 1 = 26
placa 10374 até 10384 → 10384 - 10374 + 1 = 11
placa 10584 até 10593 → 10593 - 10584 + 1 = 10
placa 10749 até 10764 → 10764 - 10749 + 1 = 16

Espírito Santo tem 270 possibilidades
 


*/

// Variáveis globais para armazenar o estado identificado e as letras da placa

let estado = "";

let letras = "";

// Função para checar se a estrutura da placa está correta conforme o padrão esperado:

// Letras nas posições 0, 1, 2 e 4; números nas posições 3, 5 e 6.

function checarEstrutura(placa) {
  if (
    !isLetra(placa[0]) ||
    !isLetra(placa[1]) ||
    !isLetra(placa[2]) ||
    !isNumero(placa[3]) ||
    !isLetra(placa[4]) ||
    !isNumero(placa[5]) ||
    !isNumero(placa[6])
  ) {
    alert("PLACA INVÁLIDA!"); // Alerta caso a placa não siga o formato correto

    return false;
  }

  return true; // Placa válida
}

// Função que verifica se o caractere informado é uma letra maiúscula (A-Z)

function isLetra(char) {
  return /^[A-Z]$/.test(char);
}

// Função que verifica se o caractere informado é um número (0-9)

function isNumero(char) {
  return /^[0-9]$/.test(char);
}

// Função que calcula o valor numérico correspondente às três letras iniciais da placa

// As letras são convertidas para um valor numérico baseado na posição no alfabeto e peso posicional

function valorLetrasPlaca(placa) {
  let valorLetras = 0;

  letras = placa.slice(0, 3).join(""); // Obtem as três primeiras letras da placa

  for (let i = 0; i < 3; i++) {
    valorLetras += (letras.charCodeAt(i) - 65) * 26 ** (2 - i); // Cálculo do valor baseado na posição da letra
  }

  return qualEstado(valorLetras); // Passa o valor calculado para identificar o estado
}

// Função que identifica a qual estado brasileiro a placa pertence, com base no valor numérico calculado

// Faz comparações com intervalos definidos para São Paulo, Rio de Janeiro e Espírito Santo

function qualEstado(placa) {
  if (
    (placa >= 806 && placa <= 4324) || // Intervalo para São Paulo (BFA a GKI)
    (placa >= 11297 && placa <= 11311) // Intervalo para São Paulo (QSN a QSZ)
  ) {
    estado = "Placa pertence ao Estado de São Paulo";

    return alert(`${estado}`);
  } else if (
    (placa >= 7077 && placa <= 7986) || // Intervalo para Rio de Janeiro (KMF a LVE)
    (placa >= 11714 && placa <= 11773) // Intervalo para Rio de Janeiro (RIO a RKV)
  ) {
    estado = "Placa pertence ao Estado do Rio de Janeiro";

    return alert(`${estado}`);
  } else if (
    (placa >= 8499 && placa <= 8631) || // Intervalos para Espírito Santo
    (placa >= 9926 && placa <= 9965) ||
    (placa >= 9999 && placa <= 10000) ||
    (placa >= 10002 && placa <= 10006) ||
    (placa >= 10037 && placa <= 10043) ||
    (placa >= 10129 && placa <= 10154) ||
    (placa >= 10374 && placa <= 10384) ||
    (placa >= 10584 && placa <= 10593) ||
    (placa >= 10749 && placa <= 10764)
  ) {
    estado = "Placa pertence ao Estado do Espírito Santo";

    return alert(`${estado}`);
  } else {
    // Caso o valor não esteja em nenhum intervalo definido

    return alert("Esta placa não pertence ao nosso departamento");
  }
}

// Função principal chamada ao clicar no botão "Consultar"

// Obtém o valor do input, checa a estrutura da placa e, se válida, verifica o estado

function consultar() {
  const placaParaConsultar = document.getElementById("inputPlaca").value;

  let placaArray = placaParaConsultar.split("");

  if (!checarEstrutura(placaArray)) {
    return; // Para execução se placa inválida
  }

  valorLetrasPlaca(placaArray);
}

// Função para gerar uma placa aleatória no formato LLLNLNN
function gerarPlacaAleatoria() {
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numeros = "0123456789";

  let placa = "";

  // LLL
  for (let i = 0; i < 3; i++) {
    placa += letras.charAt(Math.floor(Math.random() * letras.length));
  }

  // N
  placa += numeros.charAt(Math.floor(Math.random() * numeros.length));

  // L
  placa += letras.charAt(Math.floor(Math.random() * letras.length));

  // NN
  for (let i = 0; i < 2; i++) {
    placa += numeros.charAt(Math.floor(Math.random() * numeros.length));
  }

  // Atualiza o campo de input com a placa gerada
  document.getElementById("inputPlaca").value = placa;
}