import { geraSeriePeneiras } from "./CalculosGerais";
const calculoKu = (Pt) => {
  return Math.pow(Math.log(1 / (1 - Pt)), -0.67);
};

const calculoKl = (Pb) => {
  return Math.pow(Math.log(1 / (1 - Pb)), -1.18);
};

const calculoPb = (Ku) => {
  return 1 - Math.exp(-Math.pow(0.5 / Ku, 1.5));
};

const calculoPDiMaior = (ri, Ku) => {
  return 1 - Math.exp(-Math.pow(ri / Ku, 1.5));
};

const calculoPDiMenor = (ri, Kl) => {
  return 1 - Math.exp(-Math.pow(ri / Kl, 0.85));
};

const calculoPDi = (ri) => {
  return -Math.pow(ri / 1.25, 0.843);
};

export function calculaRetidaAndPassante(Pt, OSS, massa) {
  let ku = calculoKu(Pt);
  let Pb = calculoPb(ku);
  let kl = calculoKl(Pb);
  let seriePeneiras = geraSeriePeneiras().sort((a, b) => b - a);
  let tabela = {
    mm: seriePeneiras,
    ri: [],
    passantemm: [],
    passanteMassa: [],
    retidamm: [],
    retidaMassa: [],
  };
  let i = 0;
  for (let tamanhoPeneira of seriePeneiras) {
    let ri = tamanhoPeneira / OSS;
    tabela["ri"].push(ri);
    let passante;
    if (ri > 0.5) {
      passante = calculoPDiMaior(ri, ku);
      tabela["passantemm"].push(passante);
      tabela["passanteMassa"].push(passante * massa);
    } else {
      passante = calculoPDiMenor(ri, kl);
      tabela["passantemm"].push(passante);
      tabela["passanteMassa"].push(passante * massa);
    }
    if (i === 0) {
      tabela["retidamm"].push(0);
    } else {
      let retida = tabela["passantemm"][i - 1] - passante;
      tabela["retidamm"].push(retida);
      tabela["retidaMassa"].push(retida*massa);
    }
    i = i + 1;
  }
  return { tabela: tabela, ku: ku, Pb: Pb, kl: kl };
}
