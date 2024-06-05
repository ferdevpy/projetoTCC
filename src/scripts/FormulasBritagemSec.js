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
const calculoBij = (phi, gM, beta, xj, serie) => {
  return serie.mm.map((abertura) => {
    return phi * (abertura / xj) ** gM + (1 - phi) * (abertura / xj) ** beta;
  });
};
