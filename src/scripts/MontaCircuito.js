import {
  Alimentacao,
  BritagemPrimaria,
  BritagemSecundaria,
  Peneiramento,
  Moagem,
  Pilha,
} from "./Equipamentos";
import dayjs from "dayjs";

export class Circuito {
  constructor() {
    this.equipamentos = {};
    this.conexoes = [];
    this.historico = [];
  }
  adicionarEquipamento(id, equipamento) {
    this.equipamentos[id] = equipamento;
  }

  adicionarConexao(sourceId, targetId, saida = "default") {
    this.conexoes.push({ sourceId, targetId, saida });
  }
  obterConexoesPorEquipamento(equipamentoId) {
    return this.conexoes.filter(
      (conexao) => conexao.sourceId === equipamentoId
    );
  }

  agrupaConexoesPorSourceId() {
    let objetoFinal = {};
    for (let conexao in this.conexoes) {
      objetoFinal[this.conexoes[conexao].sourceId] =
        this.obterConexoesPorEquipamento(this.conexoes[conexao].sourceId);
    }
    return objetoFinal;
  }

  executar(setPlay, setIsRunning) {
    let settingsSimulacao =
      JSON.parse(localStorage.getItem("propertiesSimulacao")) !== null
        ? JSON.parse(localStorage.getItem("propertiesSimulacao"))
        : {};

    let horaSimulacao = settingsSimulacao.horas ? settingsSimulacao.horas : 0;
    let minutos = settingsSimulacao.minutos
      ? settingsSimulacao.minutos / 60
      : 0;
    let dias = settingsSimulacao.dias ? settingsSimulacao.dias * 24 : 24;
    let intervaloExibicao = settingsSimulacao.intervalo
      ? dayjs(settingsSimulacao.intervalo).hour() +
        dayjs(settingsSimulacao.intervalo).minute() / 60
      : 1;
    let horas = horaSimulacao + minutos + dias;

    for (
      let hora = intervaloExibicao;
      hora <= horas;
      hora += intervaloExibicao
    ) {
      let massaRestante =
        this.equipamentos["Alimentacao0"].taxaAlimentacao * intervaloExibicao;
      const equipamentoInicial = this.equipamentos["Alimentacao0"];
      equipamentoInicial.receberMassa(massaRestante);
      const sources = this.agrupaConexoesPorSourceId();

      for (let source of Object.keys(sources)) {
        const sourceEquipamento = this.equipamentos[source];
        const massasProcessadas =
          sourceEquipamento.processarMassa(intervaloExibicao);
        let targets = sources[source];

        if (massasProcessadas && typeof massasProcessadas === "object") {
          for (let conexao of targets) {
            if (conexao.saida === "underflow") {
              this.equipamentos[conexao.targetId].receberMassa(
                massasProcessadas["underflow"]
              );
            } else if (conexao.saida === "overflow") {
              this.equipamentos[conexao.targetId].receberMassa(
                massasProcessadas["overflow"]
              );
            } else {
              this.equipamentos[conexao.targetId].receberMassa(
                massasProcessadas
              );
            }
          }
        } else if (massasProcessadas !== undefined) {
          for (let conexao of targets) {
            this.equipamentos[conexao.targetId].receberMassa(massasProcessadas);
          }
        }
      }

      this.historico.push(this.gerarHistorico(hora));

      if (hora % intervaloExibicao === 0) {
        this.exibirEstado(hora);
      }
    }

    setPlay(false);
    setIsRunning(false);
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

  gerarHistorico(hora) {
    return Object.values(this.equipamentos).map((equip) => {
      equip.registrarHistorico(hora);
      return {
        nome: equip.nome,
        hora: hora,
        massaRecebidaAtual: equip.massaRecebidaAtual,
        massaRecebidaTotal: equip.massaRecebidaTotal,
        massaSaidaAtual: equip.massaSaidaAtual,
        massaSaidaTotal: equip.massaSaidaTotal,
        massaNaoProcessada: equip.massaNaoProcessada,
        P80: equip.historico[equip.historico.length - 1].P80,
      };
    });
  }

  obterHistorico() {
    return this.historico;
  }
}

export function configurarCircuito(properties, nodes, edges) {
  const circuito = new Circuito();

  for (let node of nodes) {
    const { id } = node;

    let equipamento;
    if (id.startsWith("Alimentacao")) {
      equipamento = new Alimentacao(
        id,
        properties[id].taxaAlimentacao,
        properties[id].variabilidade,
        properties[id].densidade,
        properties[id].porcentagemSolidos
      );
    } else if (id.startsWith("BritagemPrimaria")) {
      equipamento = new BritagemPrimaria(
        id,
        properties[id].eficiencia,
        properties[id].capacidadeMaxima,
        properties[id].oss,
        properties[id].Pt,
        properties[id].workIndex
      );
    } else if (id.startsWith("Peneiramento")) {
      equipamento = new Peneiramento(
        id,
        properties[id].abertura,
        properties[id].eficiencia,
        properties[id].capacidadeMaxima
      );
    } else if (id.startsWith("BritagemSecundaria")) {
      equipamento = new BritagemSecundaria(id, 0.89, 100);
    } else if (id.startsWith("Moagem")) {
      equipamento = new Moagem(id, 0.8, 30, 20);
    } else if (id.startsWith("Pilha")) {
      equipamento = new Pilha(id, 1, 5000, 20);
    }

    circuito.adicionarEquipamento(id, equipamento);
  }

  for (let edge of edges) {
    const { source, target, sourceHandle } = edge;
    circuito.adicionarConexao(source, target, sourceHandle);
  }

  return circuito;
}
