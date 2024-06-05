import { calculaRetidaAndPassante } from "./FormulasBritagem";

export class Equipamento {
  constructor(nome, eficiencia, capacidadeMaxima) {
    this.nome = nome;
    this.eficiencia = eficiencia; // A fração da massa processada e passada adiante
    this.capacidadeMaxima = capacidadeMaxima; // Capacidade máxima de processamento por hora
    this.massaRecebida = 0;
    this.massaSaida = 0;
    this.massaNaoProcessada = 0;
  }

  receberMassa(massa) {
    const massaTotal = this.massaRecebida + massa;
    if (massaTotal > this.capacidadeMaxima) {
      this.massaRecebida = this.capacidadeMaxima;
      this.massaNaoProcessada = massaTotal - this.capacidadeMaxima;
    } else {
      this.massaRecebida = massaTotal;
    }
  }

  processarMassa() {
    const massaProcessada = this.massaRecebida * this.eficiencia;
    this.massaSaida += massaProcessada;
    this.massaRecebida -= massaProcessada;
    return massaProcessada;
  }

  toString() {
    return `${this.nome}: Recebida: ${this.massaRecebida.toFixed(
      2
    )} t, Saída: ${this.massaSaida.toFixed(
      2
    )} t, Não Processada: ${this.massaNaoProcessada.toFixed(2)} t`;
  }
}

export class Alimentacao extends Equipamento {
  constructor() {
    super("Alimentação", 1, Infinity); // 100% de eficiência, capacidade infinita para alimentação inicial
  }
}

export class BritagemPrimaria extends Equipamento {
  constructor() {
    super("Britagem Primária", 1, 100); // 80% de eficiência, 100 t/h capacidade máxima
  }
}

export class BritagemSecundaria extends Equipamento {
  constructor() {
    super("Britagem Secundária", 1, 100); // 85% de eficiência, 80 t/h capacidade máxima
  }
}

export class Peneiramento extends Equipamento {
  constructor(abertura) {
    super("Peneiramento", 0.8, 100);
    this.abertura = abertura; // Tamanho da abertura da peneira
  }

  processarMassa() {
    const massaProcessada = this.massaRecebida * this.eficiencia;
    const tabelaPeneira = calculaRetidaAndPassante(
      0.8,
      this.abertura,
      massaProcessada
    ).tabela;

    let massaOverFlow = 0;
    let massaUnderflow = 0;

    for (let i = 0; i < tabelaPeneira.mm.length; i++) {
      if (tabelaPeneira.mm[i] >= 50) {
        massaOverFlow =
          massaOverFlow +
          parseFloat(
            tabelaPeneira.retidaMassa[i] === undefined
              ? 0
              : tabelaPeneira.retidaMassa[i]
          );
      } else {
        massaUnderflow =
          massaUnderflow +
          parseFloat(
            tabelaPeneira.retidaMassa[i] === undefined
              ? 0
              : tabelaPeneira.retidaMassa[i]
          );
      }
    }

    this.massaRecebida -= massaOverFlow - massaUnderflow;
    this.massaSaida += massaOverFlow + massaUnderflow;
   
    return {
      overflow: massaOverFlow ? massaOverFlow : 0,
      underflow: massaUnderflow ? massaUnderflow : 0,
    };
  }
}

export class Pilha extends Equipamento {
  constructor() {
    super("Pilha", 1, 5000); // 80% de eficiência, 100 t/h capacidade máxima
  }
}

export class Moagem extends Equipamento {
  constructor() {
    super("Moagem", 0.9, 70); // 90% de eficiência, 70 t/h capacidade máxima
    this.adicaoAgua = 0.2; // Adição de 20% de água na moagem
  }

  processarMassa() {
    const massaProcessada = this.massaRecebida * this.eficiencia;
    const aguaAdicionada = massaProcessada * this.adicaoAgua;
    this.massaSaida += massaProcessada + aguaAdicionada;
    this.massaRecebida -= massaProcessada;
    return massaProcessada + aguaAdicionada;
  }
}
