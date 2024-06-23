const calculoK1Mais = (css, a1, a3) => {
  return css * a1 + a3;
};

const calculoK1Menos = (css, a1, a3) => {
  return css * a1 - a3;
};

const calculoK2 = (b1, b2, b3, b4, q, tx) => {
  return b1 * css + b2 * q + b3 * tx + b4;
};

//Descreve a proporção de partículas em cada intervalo
const calculoC = (b1, b2, b3, b4, q, tx, k1, k3, serie) => {
  let aberturas = serie.mm;
  let k2 = calculoK2(b1, b2, b3, b4, q, tx);

  return aberturas.map((abertura) => {
    return 1 - ((k2 - abertura) / (k2 - k1)) ** k3;
  });
};

//Fração de distribuição dos fragmentos da quebra
export function calculoBij(phi, gM, beta, serie) {
  let xj = serie.mm[0];
  return serie.mm.map((abertura) => {
    return phi * (abertura / xj) ** gM + (1 - phi) * (abertura / xj) ** beta;
  });
}

export function calculobij(Bij) {
  let bij = [];
  for (i = 0; Bij.length - 1; i++) {
    if (i === 0) {
      bij.push(0);
    } else {
      bij.push(Bij[i - 1] - Bij[i]);
    }
  }
  return bij;
}

function calcularDistribuicaoGranulometrica(A, b, t10, peneiras) {
  let tamanhos = peneiras.mm;
  const distribuicao = [];

  tamanhos.forEach((tamanho) => {
    const percentagemPassante = 1 - Math.exp(0 - (tamanho / A) ** b);
    distribuicao.push({
      tamanho: tamanho,
      percentagemPassante: percentagemPassante, // Em percentual
    });
  });

  return distribuicao;
}
