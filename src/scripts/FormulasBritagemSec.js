const calculoK1Mais = (css, a1, a3) => {
  return css * a1 + a3;
};

const calculoK1Menos = (css, a1, a3) => {
  return css * a1 - a3;
};

const calculoK2 = (b1, b2, b3, b4, q, tx, css) => {
  return b1 * css + b2 * q + b3 * tx + b4;
};

//Descreve a proporção de partículas em cada intervalo
function calculoC(k1, k2, k3, serie) {
  // console.log("Serie (mm):", serie.mm);
  // console.log("k1:", k1, "k2:", k2, "k3:", k3);

  let c = [];
  for (let x of serie.mm) {
    let gran = x * 1000;
    if (gran < k1 && gran < k2) {
      c.push(0);
    } else if (gran > k1 && gran > k2) {
      c.push(1);
    } else {
      c.push(1 - ((k2 - gran) / (k2 - k1)) ** k3);
    }
  }

  // console.log("Vetor C calculado:", c);
  return c;
}

//Fração de distribuição dos fragmentos da quebra
export function calculoBij(phi, gM, beta, serie) {
  let xj = serie.mm[0];
  return serie.mm.map((abertura) => {
    return phi * (abertura / xj) ** gM + (1 - phi) * (abertura / xj) ** beta;
  });
}

export function calculobij(Bij) {
  let bij = [];
  for (let i = 0; i <= Bij.length - 1; i++) {
    if (i === 0) {
      bij.push(0);
    } else {
      bij.push(Bij[i - 1] - Bij[i]);
    }
  }
  return bij;
}

// function calcularDistribuicaoGranulometrica(A, b, t10, peneiras) {
//   let tamanhos = peneiras.mm;
//   const distribuicao = [];

//   tamanhos.forEach((tamanho) => {
//     const percentagemPassante = 1 - Math.exp(0 - (tamanho / A) ** b);
//     distribuicao.push({
//       tamanho: tamanho,
//       percentagemPassante: percentagemPassante, // Em percentual
//     });
//   });

//   return distribuicao;
// }

export function calculoResultadoBritagemSec(
  a1,
  a3,
  b1,
  b2,
  b3,
  b4,
  q,
  tx,
  serie,
  css,
  phi,
  gM,
  beta
) {
  // console.log("Entradas do cálculo:");
  // console.log("a1:", a1, "a3:", a3, "b1:", b1, "b2:", b2, "b3:", b3, "b4:", b4);
  // console.log(
  //   "q:",
  //   q,
  //   "tx:",
  //   tx,
  //   "css:",
  //   css,
  //   "phi:",
  //   phi,
  //   "gM:",
  //   gM,
  //   "beta:",
  //   beta
  // );
  // console.log("serie:", serie);

  let k2 = calculoK2(b1, b2, b3, b4, q, tx, css);
  // console.log("k2:", k2);

  let k3 = 2.3;
  let k1 = calculoK1Mais(css, a1, a3);
  // console.log("k1:", k1);
  let k1menos = calculoK1Menos(css, a1, a3);
  console.log("k1- :", k1menos);
  let C = calculoC(k1, k2, k3, serie);
  //console.log("C (fração):", C);

  let matrizC = gerarMatrizC(C);
  //console.log("Matriz C:", matrizC);

  let Bij = calculoBij(phi, gM, beta, serie);
  //console.log("Bij:", Bij);

  let bij = calculobij(Bij);
  //console.log("bij:", bij);

  let matrizbij = gerarMatrizbij(bij);
  //console.log("Matriz bij:", matrizbij);

  let resultado = calculoSaidaBritagemSec(matrizbij, matrizC, serie);
  //console.log("Resultado da britagem sec:", resultado);

  //console.log("Matriz bij:", matrizbij);
  //console.log("Matriz C:", matrizC);
  //console.log("Matriz Identidade:", matrizIdentidade(bij.length));

  return resultado;
}

function gerarMatrizbij(vetor) {
  const n = vetor.length; // Tamanho da matriz quadrada
  const matriz = Array.from({ length: n }, () => Array(n).fill(0));

  // Preenchendo a primeira coluna da matriz
  for (let i = 0; i < n; i++) {
    matriz[i][0] = vetor[i];
  }

  // Preenchendo as colunas subsequentes
  for (let col = 1; col < n; col++) {
    for (let row = col; row < n; row++) {
      matriz[row][col] = matriz[row - 1][col - 1];
    }
  }

  return matriz;
}
function gerarMatrizC(vetor) {
  if (!Array.isArray(vetor) || vetor.length === 0) {
    throw new Error("O vetor deve ser um array não vazio.");
  }

  // Validação: garantir que todos os elementos são números
  vetor.forEach((elemento, i) => {
    if (typeof elemento !== "number" || isNaN(elemento)) {
      throw new Error(
        `Elemento inválido no vetor na posição ${i}: ${elemento}`
      );
    }
  });

  const n = vetor.length; // Tamanho do vetor determina a dimensão da matriz quadrada
  const matriz = Array.from({ length: n }, () => Array(n).fill(0)); // Cria uma matriz nxn preenchida com zeros

  for (let i = 0; i < n; i++) {
    matriz[i][i] = vetor[i]; // Preenche a diagonal principal com os elementos do vetor
  }

  //console.log("Vetor de entrada:", vetor);
  //console.log("Matriz resultante (diagonal principal):", matriz);

  return matriz;
}

function matrizIdentidade(n) {
  const matriz = Array.from({ length: n }, () => Array(n).fill(0)); // Cria uma matriz nxn preenchida com zeros

  for (let i = 0; i < n; i++) {
    matriz[i][i] = 1; // Define os elementos da diagonal principal como 1
  }

  return matriz;
}

function multiplicarMatrizes(matrizA, matrizB) {
  // Validação básica: verificar se ambas as entradas não estão vazias
  if (!matrizA || !matrizB || matrizA.length === 0 || matrizB.length === 0) {
    throw new Error("As entradas não podem ser vazias.");
  }

  // Verificar se a segunda entrada é um vetor
  const isVector = !Array.isArray(matrizB[0]);
  if (isVector) {
    // Converte o vetor em uma matriz coluna (n x 1)
    matrizB = matrizB.map((valor) => [valor]);
  }

  // Validação de dimensões
  const linhasA = matrizA.length;
  const colunasA = matrizA[0].length;
  const linhasB = matrizB.length;
  const colunasB = matrizB[0].length;

  // Verificar consistência das matrizes e substituir valores undefined por 0
  matrizA.forEach((linha, i) => {
    if (linha.length !== colunasA) {
      throw new Error(`Matriz A está malformada na linha ${i}.`);
    }
    matrizA[i] = linha.map((valor) => (valor === undefined ? 0 : valor));
  });

  matrizB.forEach((linha, i) => {
    if (linha.length !== colunasB) {
      throw new Error(`Matriz B está malformada na linha ${i}.`);
    }
    matrizB[i] = linha.map((valor) => (valor === undefined ? 0 : valor));
  });

  // Verificar se as dimensões permitem a multiplicação
  if (colunasA !== linhasB) {
    throw new Error(
      "O número de colunas da matriz A deve ser igual ao número de linhas da matriz B."
    );
  }

  // Inicializar a matriz resultado
  const matrizResultado = Array.from({ length: linhasA }, () =>
    Array(colunasB).fill(0)
  );

  // Multiplicação de matrizes
  for (let i = 0; i < linhasA; i++) {
    for (let j = 0; j < colunasB; j++) {
      for (let k = 0; k < colunasA; k++) {
        matrizResultado[i][j] += matrizA[i][k] * matrizB[k][j];
      }
    }
  }

  // Se a segunda entrada era um vetor, converte o resultado em um vetor
  if (isVector) {
    return matrizResultado.map((linha) => linha[0]);
  }

  return matrizResultado;
}

function inversaMatriz(matriz) {
  const n = matriz.length;
  const identidade = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  );

  // Cria uma cópia da matriz original
  const matrizAmpliada = matriz.map((fila, i) => [...fila, ...identidade[i]]);

  // Aplica o método de eliminação de Gauss-Jordan
  for (let i = 0; i < n; i++) {
    let max = i;
    for (let j = i + 1; j < n; j++) {
      if (Math.abs(matrizAmpliada[j][i]) > Math.abs(matrizAmpliada[max][i])) {
        max = j;
      }
    }

    // Troca as linhas se necessário
    if (i !== max) {
      [matrizAmpliada[i], matrizAmpliada[max]] = [
        matrizAmpliada[max],
        matrizAmpliada[i],
      ];
    }

    // Normaliza a linha atual
    for (let k = i + 1; k < 2 * n; k++) {
      matrizAmpliada[i][k] /= matrizAmpliada[i][i];
    }
    matrizAmpliada[i][i] = 1;

    // Zera os elementos abaixo da diagonal principal
    for (let j = 0; j < n; j++) {
      if (j !== i) {
        for (let k = i + 1; k < 2 * n; k++) {
          matrizAmpliada[j][k] -= matrizAmpliada[j][i] * matrizAmpliada[i][k];
        }
        matrizAmpliada[j][i] = 0;
      }
    }
  }

  // Extrai a matriz inversa da matriz ampliada
  const inversa = matrizAmpliada.map((row) => row.slice(n, 2 * n));
  return inversa;
}

function subtrairMatrizes(matrizA, matrizB) {
  const linhasA = matrizA.length;
  const colunasA = matrizA[0].length;
  const linhasB = matrizB.length;
  const colunasB = matrizB[0].length;

  if (linhasA !== linhasB || colunasA !== colunasB) {
    throw new Error("As matrizes devem ter as mesmas dimensões.");
  }

  const matrizResultado = Array.from({ length: linhasA }, (_, i) =>
    Array.from({ length: colunasA }, (_, j) => matrizA[i][j] - matrizB[i][j])
  );

  //console.log("Resultado da Subtração:", matrizResultado);
  return matrizResultado;
}

function calculoSaidaBritagemSec(bij, C, serie) {
  //console.log("Matriz Identidade:", matrizIdentidade(bij.length));
  //console.log("Matriz C:", C);
  //console.log("Matriz bij:", bij);
  //console.log("Serie (massa):", serie.massa);

  let matrizId = matrizIdentidade(bij.length);
  let fracao1 = subtrairMatrizes(matrizId, C);
  //console.log("Fracao 1 (Id - C):", fracao1);

  let fracao2 = inversaMatriz(
    subtrairMatrizes(matrizId, multiplicarMatrizes(bij, C))
  );
  //console.log("Fracao 2 (Inversa):", fracao2);

  let resultado1 = multiplicarMatrizes(fracao1, fracao2);
  let resultado = multiplicarMatrizes(resultado1, serie.massa);
  //console.log("resultado parcial: ", resultado1);
  // let resultado = multiplicarMatrizes(
  //   multiplicarMatrizes(fracao1, fracao2),
  //   serie.massa
  // );
  //console.log("Resultado Final:", resultado);

  return resultado;
}
