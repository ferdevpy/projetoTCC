import {
  Alimentacao,
  BritagemPrimaria,
  BritagemSecundaria,
  Peneiramento,
  Moagem,
  Pilha,
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

  adicionarConexao(sourceId, targetId, saida = "default") {
    this.conexoes.push({ sourceId, targetId, saida });
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
        const massasProcessadas = sourceEquipamento.processarMassa();

        if (massasProcessadas && typeof massasProcessadas === "object") {
          const massaUnderflow = massasProcessadas["underflow"];
          const massaOverflow = massasProcessadas["overflow"];
          if (conexao.saida === "underflow") {
            this.equipamentos[conexao.targetId].receberMassa(massaUnderflow);
          } else {
            this.equipamentos[conexao.targetId].receberMassa(massaOverflow);
          }
        } else if (massasProcessadas !== undefined) {
          const targetId = conexao.targetId;
          const targetEquipamento = this.equipamentos[targetId];
          targetEquipamento.receberMassa(massasProcessadas);
        }
      }

      if (hora % intervaloExibicao === 0) {
        this.exibirEstado(hora);
      }
      // const massaPilha = Object.values(this.equipamentos).find(equipamento => equipamento instanceof Pilha).massaRecebida;
      
      // const massaAlimentacao = Object.values(this.equipamentos).find(equipamento => equipamento instanceof Alimentacao).massaSaida;
      // if (massaPilha >= massaAlimentacao) {
      //   console.log(
      //     "Simulação parada: Massa na pilha igual à massa de saída da alimentação."
      //   );
      //   return; // Encerra a função e, portanto, a simulação
      // }
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
      equipamento = new Alimentacao(1, 100);
    } else if (id.startsWith("BritagemPrimaria")) {
      equipamento = new BritagemPrimaria(1, 100);
    } else if (id.startsWith("Peneiramento")) {
      equipamento = new Peneiramento(150, 1, 100, 20);
    } else if (id.startsWith("BritagemSecundaria")) {
      equipamento = new BritagemSecundaria(0.89, 100);
    } else if (id.startsWith("Moagem")) {
      equipamento = new Moagem(0.8, 30, 20);
    } else if (id.startsWith("Pilha")) {
      equipamento = new Pilha(1, 5000, 20);
    }

    circuito.adicionarEquipamento(id, equipamento);
  }

  // Configurando as conexões
  for (let edge of edges) {
    const { source, target, sourceHandle } = edge;
    circuito.adicionarConexao(source, target, sourceHandle);
  }

  console.log(circuito);
  return circuito;
}
// Criando o circuito e adicionando os equipamentos
