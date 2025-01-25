export function calculoPassanteAbertura(dados, abertura) {
  let mm = dados.mm;
  let passantemm = dados.passantemm;
  for (let i = 0; i < mm.length; i++) {
    if (mm[i] === abertura) {
      return passantemm[i];
    } else if (mm[i] > abertura && i + 1 < mm.length && mm[i + 1] < abertura) {
      // Interpolação linear
      const x1 = mm[i];
      const x2 = mm[i + 1];
      const y1 = passantemm[i];
      const y2 = passantemm[i + 1];

      return y1 + ((abertura - x1) * (y2 - y1)) / (x2 - x1);
    }
  }
  // Se a abertura não for encontrada, retorne um valor que indique que não foi encontrada
  return null;
}

export function calculoIu(abertura) {
  return 0.783 * abertura + 37;
}

function calcularDiferencaPassanteUltimaMaior(abertura, dados) {
  let mm = dados.mm;
  let passantemm = dados.passantemm;
  let porcentagemAbertura = calculoPassanteAbertura(dados, abertura);

  let ultimaMaiommndex = -1;

  for (let i = 0; i < mm.length; i++) {
    if (mm[i] > abertura) {
      ultimaMaiommndex = i;
    }
  }

  if (ultimaMaiommndex !== -1) {
    const porcentagemUltimaMaior = passantemm[ultimaMaiommndex];
    return porcentagemUltimaMaior - porcentagemAbertura;
  } else {
    console.log(`Não há uma mm maior que a abertura ${abertura} nos dados.`);
    return 0;
  }
}

export function calculok2(dados, abertura) {
  let retidaMetadeAbertura = calcularDiferencaPassanteUltimaMaior(
    abertura / 2,
    dados
  );

  return retidaMetadeAbertura * 2 + 0.2;
}

export function calculok3(dados, abertura) {
  let retidaAbertura = calcularDiferencaPassanteUltimaMaior(abertura, dados);
  return 0.914 * Math.exp(Math.exp(4.22 * (1 - retidaAbertura) - 3.5));
}

export function calculok4(sNb, sP) {
  return sNb / sP;
}

export function calculok6() {
  return 1 - 0.01 * (18 - 15);
}

export function produtorio(dados, abertura, sNb, sP) {
  let k1 = 1;
  let k2 = calculok2(dados, abertura);
  let k3 = calculok3(dados, abertura);
  let k4 = calculok4(sNb, sP);
  let k5 = 1;
  let k6 = calculok6();
  let k7 = 1;
  let k8 = 1.15;
  let k9 = 0.9;
  let k10 = 0.9;
  let produtorio = k1 * k2 * k3 * k4 * k5 * k6 * k7 * k8 * k9 * k10;
  return {
    k1: k1,
    k2: k2,
    k3: k3,
    k4: k4,
    k5: k5,
    k6: k6,
    k7: k7,
    k8: k8,
    k9: k9,
    k10: k10,
    produtorio: produtorio,
  };
}

export function calculoIUP(dados, abertura, sNb, sP) {
  return produtorio(dados, abertura, sNb, sP).produtorio * calculoIu(abertura);
}

export function calculoRR(dados, abertura, sNb, sP) {
  return 1880 / (calculoIUP(dados, abertura, sNb, sP) * 14);
}

export function calculoE(dados, abertura, sNb, sP) {
  return 0.95 - 1.67 * Math.pow(0.8 - calculoRR(dados, abertura, sNb, sP), 2);
}
