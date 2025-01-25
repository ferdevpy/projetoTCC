import { calculaRetidaAndPassante } from "./FormulasBritagem";
import { calcularP80 } from "./CalculosGerais";
import {
  calculoE,
  calculoRR,
  calculoIUP,
  produtorio,
} from "./FormulasPeneiramento";
import { calculoResultadoBritagemSec } from "./FormulasBritagemSec";

export class Equipamento {
  constructor(nome, eficiencia, capacidadeMaxima) {
    this.nome = nome;
    this.eficiencia = eficiencia; // A fração da massa processada e passada adiante
    this.capacidadeMaxima = capacidadeMaxima; // Capacidade máxima de processamento por hora
    this.massaRecebidaAtual = 0; // Massa atual recebida
    this.massaRecebidaTotal = 0; // Massa cumulativa recebida
    this.massaSaidaAtual = 0; // Massa atual processada e enviada adiante
    this.massaSaidaTotal = 0; // Massa cumulativa processada e enviada adiante
    this.massaNaoProcessada = 0;
    this.historico = [];
    this.p80 = null;
    this.massaPorGranulometria = {};
    this.distribuicaoGranulometrica = {};
  }

  receberMassa(massa) {
    if (typeof massa === "object") {
      this.distribuicaoGranulometrica = massa.peneiras || {};
      const massaRecebida = parseFloat(massa.massa) || 0;
      this.massaRecebidaAtual += massaRecebida;
      this.massaRecebidaTotal += massaRecebida;
    } else {
      const massaRecebida = parseFloat(massa) || 0;
      this.massaRecebidaAtual += massaRecebida;
      this.massaRecebidaTotal += massaRecebida;
    }
  }

  processarMassa(intervaloHoras) {
    const massaProcessada =
      this.massaRecebidaAtual * this.eficiencia * intervaloHoras;
    this.massaSaidaAtual = massaProcessada;
    this.massaSaidaTotal += massaProcessada;
    this.massaRecebidaAtual -= massaProcessada;

    return massaProcessada;
  }

  registrarHistorico(hora) {
    this.historico.push({
      hora,
      massaRecebidaAtual: this.massaRecebidaAtual,
      massaRecebidaTotal: this.massaRecebidaTotal,
      massaSaidaAtual: this.massaSaidaAtual,
      massaSaidaTotal: this.massaSaidaTotal,
      massaNaoProcessada: this.massaNaoProcessada,
      P80: this.p80,
    });
  }

  toString() {
    return `${this.nome}: Recebida Atual: ${this.massaRecebidaAtual.toFixed(
      2
    )} t, Recebida Total: ${this.massaRecebidaTotal.toFixed(
      2
    )} t, Saída Atual: ${this.massaSaidaAtual.toFixed(
      2
    )} t, Saída Total: ${this.massaSaidaTotal.toFixed(
      2
    )} t, Não Processada: ${this.massaNaoProcessada.toFixed(2)} t, P80: ${
      this.historico.length > 0
        ? this.historico[this.historico.length - 1].P80
        : "N/A"
    } mm`;
  }
}
export class Alimentacao extends Equipamento {
  constructor(
    nome,
    taxaAlimentacao,
    variabilidade,
    densidade,
    porcentagemSolidos
  ) {
    super(nome, 1, Infinity); // 100% de eficiência, capacidade infinita para alimentação inicial
    this.taxaAlimentacao = taxaAlimentacao;
    this.variabilidade = variabilidade;
    this.densidade = densidade;
    this.porcentagemSolidos = porcentagemSolidos;
    this.horasPassadas = 0;
  }

  processarMassa(intervaloHoras) {
    this.horasPassadas += intervaloHoras;
    if (this.horasPassadas >= 1) {
      const variacao =
        (((Math.random() * 2 - 1) * this.variabilidade) / 100) *
        this.taxaAlimentacao;
      this.taxaAlimentacao += variacao;
      this.horasPassadas = 0;
    }

    const massaProcessada =
      this.taxaAlimentacao * this.eficiencia * intervaloHoras;
    this.massaRecebidaAtual = 0; // Alimentação sempre "recomeça"
    this.massaSaidaAtual = massaProcessada;
    this.massaSaidaTotal += massaProcessada;

    return massaProcessada;
  }
}

export class BritagemPrimaria extends Equipamento {
  constructor(nome, eficiencia, capacidadeMaxima, oss, pt, workIndex) {
    super(nome, eficiencia, capacidadeMaxima); // 80% de eficiência, 100 t/h capacidade máxima
    this.oss = oss;
    this.pt = pt;
    this.workIndex = workIndex;
    this.objetoBritagem = {};
  }
  processarMassa(intervaloHoras) {
    const massaProcessada =
      this.massaRecebidaAtual * this.eficiencia * intervaloHoras;
    this.massaSaidaAtual = massaProcessada;
    this.massaSaidaTotal += massaProcessada;

    // Calcula a série de peneiras
    const serieDePeneiras = calculaRetidaAndPassante(
      this.pt,
      this.oss,
      massaProcessada
    ).tabela;
    this.objetoBritagem = serieDePeneiras;
    this.p80 = calcularP80(serieDePeneiras);
    let resultado = calculaRetidaAndPassante(
      this.pt,
      this.oss,
      massaProcessada
    );
    delete resultado.tabela;
    resultado["p80"] = calcularP80(serieDePeneiras);
    resultado["pt"] = this.pt;
    localStorage.setItem(this.nome, JSON.stringify(resultado));
    return serieDePeneiras;
  }
}

export class BritagemSecundaria extends Equipamento {
  constructor(
    nome,
    eficiencia,
    capacidadeMaxima,
    css,
    a1,
    a3,
    b1,
    b2,
    b3,
    b4,
    phi,
    gM,
    beta,
    tx,
    q
  ) {
    super(nome, eficiencia, capacidadeMaxima);
    this.css = css;
    this.a1 = a1;
    this.a3 = a3;
    this.b1 = b1;
    this.b2 = b2;
    this.b3 = b3;
    this.b4 = b4;
    this.phi = phi;
    this.gM = gM;
    this.beta = beta;
    this.tx = tx;
    this.q = q;
  }

  processarMassa(intervaloHoras) {
    const massaProcessada =
      this.massaRecebidaAtual * this.eficiencia * intervaloHoras;
    this.massaSaidaAtual = massaProcessada;
    this.massaSaidaTotal += massaProcessada;
    console.log("massa recebida brit sec: ", this.massaRecebidaAtual);
    console.log("distribuição sec: ", this.distribuicaoGranulometrica);

    // Calcula a série de peneiras
    const serieDePeneiras = this.distribuicaoGranulometrica;

    let resultadoBritagem = calculoResultadoBritagemSec(
      this.a1,
      this.a3,
      this.b1,
      this.b2,
      this.b3,
      this.b4,
      this.q,
      this.tx,
      serieDePeneiras,
      this.css,
      this.phi,
      this.gM,
      this.beta
    );

    console.log("resultado britagem sec:", resultadoBritagem);

    resultadoBritagem["p80"] = calcularP80(serieDePeneiras);
    resultadoBritagem["pt"] = this.pt;
    localStorage.setItem(this.nome, JSON.stringify(resultadoBritagem));
    return serieDePeneiras;
  }
}

export class Peneiramento extends Equipamento {
  constructor(nome, abertura, eficiencia, capacidadeMaxima) {
    super(nome, eficiencia, capacidadeMaxima);
    this.abertura = abertura; // Tamanho da abertura da peneira
  }
  receberMassa(massa) {
    let propertiesPeneiramento = JSON.parse(localStorage.getItem("properties"))[
      this.nome
    ];
    let sNb = propertiesPeneiramento.sNb;
    let sP = propertiesPeneiramento.sP;
    let resultado = produtorio(massa, this.abertura, sNb, sP);
    resultado["IUP"] = calculoIUP(massa, this.abertura, sNb, sP);
    resultado["RR"] = calculoRR(massa, this.abertura, sNb, sP);
    let e = calculoE(massa, this.abertura, sNb, sP);
    resultado["e"] = e;
    resultado["1menose"] = 1 - e;

    localStorage.setItem(this.nome, JSON.stringify(resultado));

    let massaPeneiras = 0;
    for (let row of massa["retidaMassa"]) {
      massaPeneiras += row;
    }
    this.massaRecebidaAtual = massaPeneiras;
    this.massaRecebidaTotal += massaPeneiras;
    this.massaPorGranulometria = massa;
  }
  processarMassa(intervaloHoras) {
    const tabelaPeneira = this.massaPorGranulometria;

    let massaOverSize = 0;
    let massaUnderSize = 0;

    let distribuicaoGranulometrica = { mm: [], massa: [] };

    for (let i = 0; i < tabelaPeneira.mm.length; i++) {
      if (tabelaPeneira.mm[i] >= this.abertura) {
        massaOverSize =
          massaOverSize +
          parseFloat(
            tabelaPeneira.retidaMassa[i] === undefined
              ? 0
              : tabelaPeneira.retidaMassa[i] * intervaloHoras
          ) *
            this.eficiencia;
      } else {
        distribuicaoGranulometrica["mm"].push(tabelaPeneira.mm[i]);
        distribuicaoGranulometrica["massa"].push(tabelaPeneira.retidaMassa[i]);
        massaUnderSize =
          massaUnderSize +
          parseFloat(
            tabelaPeneira.retidaMassa[i] === undefined
              ? 0
              : tabelaPeneira.retidaMassa[i] * intervaloHoras
          ) *
            this.eficiencia;
      }
    }

    this.massaRecebidaAtual -= massaOverSize - massaUnderSize;
    this.massaSaidaTotal += massaOverSize + massaUnderSize;
    this.massaSaidaAtual = massaUnderSize;

    return {
      overflow: massaOverSize ? massaOverSize : 0,
      underflow: {
        massa: massaUnderSize ? massaOverSize : 0,
        peneiras: distribuicaoGranulometrica,
      },
    };
  }
}

export class Pilha extends Equipamento {
  constructor(nome) {
    super(nome, 1, Infinity); // 80% de eficiência, 100 t/h capacidade máxima
  }
}

export class Moagem extends Equipamento {
  constructor(nome) {
    super(nome, 0.9, 70); // 90% de eficiência, 70 t/h capacidade máxima
    this.adicaoAgua = 0.2; // Adição de 20% de água na moagem
  }

  processarMassa(intervaloHoras) {
    const massaProcessada =
      this.massaRecebida * this.eficiencia * intervaloHoras;
    const aguaAdicionada = massaProcessada * this.adicaoAgua;
    this.massaSaida += massaProcessada + aguaAdicionada;
    this.massaRecebida -= massaProcessada;

    return massaProcessada + aguaAdicionada;
  }
}
