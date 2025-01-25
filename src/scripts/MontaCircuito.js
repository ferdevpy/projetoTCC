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
    return this.conexoes.reduce((acc, conexao) => {
      const { sourceId } = conexao;
      acc[sourceId] = acc[sourceId] || [];
      acc[sourceId].push(conexao);
      return acc;
    }, {});
  }

  executar(setPlay, setIsRunning, setSimulationTime) {
    const settingsSimulacao =
      JSON.parse(localStorage.getItem("propertiesSimulacao")) || {};
    const horaSimulacao = settingsSimulacao.horas || 0;
    const minutos = (settingsSimulacao.minutos || 0) / 60;
    const dias = (settingsSimulacao.dias || 1) * 24; // Valor padrão: 1 dia
    const intervaloExibicao = settingsSimulacao.intervalo || 1; // Valor padrão: 1 hora
    const horas = horaSimulacao + minutos + dias;
    // console.log(horas);
    // console.log(horaSimulacao);
    // console.log(minutos);
    // console.log(dias);
    // console.log(intervaloExibicao);
    // console.log(dayjs.utc(intervaloExibicao).minute());

    for (let hora = 1; hora <= 60; hora++) {
      let massaRestante =
        (this.equipamentos["Alimentacao0"]?.taxaAlimentacao || 0) * hora;


      const equipamentoInicial = this.equipamentos["Alimentacao0"];
      if (equipamentoInicial) {
        equipamentoInicial.receberMassa(massaRestante);
      }

      const sources = this.agrupaConexoesPorSourceId();
      for (let source of Object.keys(sources)) {
        const sourceEquipamento = this.equipamentos[source];
        if (!sourceEquipamento) {
          console.warn(`Equipamento fonte não encontrado: ${source}`);
          continue;
        }

        const massasProcessadas = sourceEquipamento.processarMassa(hora);
        if (!massasProcessadas) {
          console.warn(`Nenhuma massa processada por ${source}.`);
          continue;
        }
        // console.log(`Massa processada por ${source}:`, massasProcessadas);

        const targets = sources[source];
        if (!targets || targets.length === 0) {
          console.warn(`Nenhum target encontrado para o source: ${source}`);
          continue;
        }

        for (let conexao of targets) {
          const targetEquipamento = this.equipamentos[conexao.targetId];
          if (!targetEquipamento) {
            console.warn(
              `Equipamento de destino não encontrado: ${conexao.targetId}`
            );
            continue;
          }

          // console.log(
          //   `Transferindo massa de ${source} para ${conexao.targetId}:`,
          //   massasProcessadas
          // );

          // Adapte a lógica de distribuição da massa, se necessário
          const massaParaTarget =
            massasProcessadas[conexao.saida] || massasProcessadas;
          targetEquipamento.receberMassa(massaParaTarget);
        }
      }

      this.historico.push(this.gerarHistorico(hora));

      if (hora % hora === 0) {
        this.exibirEstado(hora);
      }

      atualizarTempo(setSimulationTime, 1);
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
      console.log("equip: ", equip);
      equip.registrarHistorico(hora);
      return {
        nome: equip.nome,
        hora,
        massaRecebidaAtual: equip.massaRecebidaAtual || 0,
        massaRecebidaTotal: equip.massaRecebidaTotal || 0,
        massaSaidaAtual: equip.massaSaidaAtual || 0,
        massaSaidaTotal: equip.massaSaidaTotal || 0,
        massaNaoProcessada: equip.massaNaoProcessada || 0,
        P80: equip.historico?.[equip.historico.length - 1]?.P80 || 0,
      };
    });
  }

  obterHistorico() {
    return this.historico;
  }
}

export function configurarCircuito(properties, nodes, edges) {
  const circuito = new Circuito();

  nodes.forEach((node) => {
    const { id } = node;
    const equipamentoProps = properties[id] || {};
    let equipamento;

    if (id.startsWith("Alimentacao")) {
      equipamento = new Alimentacao(
        id,
        equipamentoProps.taxaAlimentacao || 0,
        equipamentoProps.variabilidade || 0,
        equipamentoProps.densidade || 0,
        equipamentoProps.porcentagemSolidos || 0
      );
    } else if (id.startsWith("BritagemPrimaria")) {
      equipamento = new BritagemPrimaria(
        id,
        equipamentoProps.eficiencia || 0,
        equipamentoProps.capacidadeMaxima || 0,
        equipamentoProps.oss || 0,
        equipamentoProps.Pt || 0,
        equipamentoProps.workIndex || 0
      );
    } else if (id.startsWith("Peneiramento")) {
      equipamento = new Peneiramento(
        id,
        equipamentoProps.abertura || 0,
        equipamentoProps.eficiencia || 0,
        equipamentoProps.capacidadeMaxima || 0
      );
    } else if (id.startsWith("BritagemSecundaria")) {
      equipamento = new BritagemSecundaria(
        id,
        equipamentoProps.eficiencia || 0,
        equipamentoProps.capacidadeMaxima || 0,
        equipamentoProps.css || 0,
        equipamentoProps.a1 || 0,
        equipamentoProps.a3 || 0,
        equipamentoProps.b1 || 0,
        equipamentoProps.b2 || 0,
        equipamentoProps.b3 || 0,
        equipamentoProps.b4 || 0,
        equipamentoProps.phi || 0,
        equipamentoProps.gM || 0,
        equipamentoProps.beta || 0,
        equipamentoProps.tx || 0,
        equipamentoProps.q || 0
      );
    } else if (id.startsWith("Moagem")) {
      equipamento = new Moagem(id, 0.8, 30, 20);
    } else if (id.startsWith("Pilha")) {
      equipamento = new Pilha(id, 1, 5000, 20);
    }

    if (equipamento) {
      circuito.adicionarEquipamento(id, equipamento);
    }
  });

  edges.forEach((edge) => {
    const { source, target, sourceHandle } = edge;
    circuito.adicionarConexao(source, target, sourceHandle);
  });

  return circuito;
}

export function atualizarTempo(setSimulationTime, intervaloExibicao) {
  setSimulationTime((prevTime) => prevTime + intervaloExibicao * 3600);
}
