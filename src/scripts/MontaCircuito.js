import {
  Alimentacao,
  BritagemPrimaria,
  BritagemSecundaria,
  Peneiramento,
  Moagem,
} from "./Equipamentos";

export class Circuito {
  constructor(taxaAlimentacao) {
    this.taxaAlimentacao = taxaAlimentacao;
    this.equipamentos = {};
    this.conexoes = [];
  }

  adicionarEquipamento(id, equipamento) {
    this.equipamentos[id] = equipamento;
  }

  adicionarConexao(sourceId, targetId) {
    this.conexoes.push({ sourceId, targetId });
  }

  distribuirMassa(horas) {
    const intervaloExibicao = 1;
    for (let hora = 0; hora < horas; hora += intervaloExibicao) {
      let massaRestante = this.taxaAlimentacao;
      // Envia a massa inicial para o primeiro equipamento (alimentação)
      const equipamentoInicial = this.equipamentos["Alimentacao0"];
      equipamentoInicial.receberMassa(massaRestante);

      // Processar massa através do circuito
      for (let conexao of this.conexoes) {
        const sourceEquipamento = this.equipamentos[conexao.sourceId];
        const massaProcessada = sourceEquipamento.processarMassa();
        const targetEquipamento = this.equipamentos[conexao.targetId];
        targetEquipamento.receberMassa(massaProcessada);
      }
      if (hora % intervaloExibicao === 0) {
        this.exibirEstado(hora);
      }
    }
  }
  exibirEstado(hora) {
    console.log(`Estado do circuito após ${hora} horas:`);
    console.log(this.toString());
  }

  toString() {
    return Object.values(this.equipamentos)
      .map((equip) => equip.toString())
      .join("\n");
  }
}

export function configurarCircuito(properties, nodes, edges) {
  const circuito = new Circuito(100);

  // Criando equipamentos baseados nas propriedades
  for (let node of nodes) {
    const { id } = node;
    // const { eficiencia, capacidadeMaxima, adicaoAgua } = properties[id];

    let equipamento;
    if (id.startsWith("Alimentacao")) {
      equipamento = new Alimentacao(0.98, 100);
    } else if (id.startsWith("BritagemPrimaria")) {
      equipamento = new BritagemPrimaria(0.9, 75);
    } else if (id.startsWith("BritadorCone")) {
      equipamento = new BritagemSecundaria(0.89, 80);
    } else if (id.startsWith("Moagem")) {
      equipamento = new Moagem(0.8, 30, 20);
    }

    circuito.adicionarEquipamento(id, equipamento);
  }

  // Configurando as conexões
  for (let edge of edges) {
    const { source, target } = edge;
    circuito.adicionarConexao(source, target);
  }

  return circuito;
}
// Criando o circuito e adicionando os equipamentos
