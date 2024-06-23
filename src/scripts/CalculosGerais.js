export function geraSeriePeneiras() {
  let serie = [];
  let tamanho = 0.038;
  while (tamanho <= 1715) {
    serie.push(tamanho);
    tamanho = tamanho * Math.SQRT2;
  }
  return serie;
}

export function calcularP80(dados) {
  console.log(dados);
  const granulometria = dados.mm;
  const porcentagemPassante = dados.passantemm;

  if (
    !granulometria ||
    !porcentagemPassante ||
    granulometria.length !== porcentagemPassante.length ||
    granulometria.length === 0
  ) {
    console.log("entrou");
    return null;
  }
  // Faça a interpolação linear
  for (let i = 0; i < porcentagemPassante.length - 1; i++) {
    if (
      porcentagemPassante[i + 1] * 100 <= 80 &&
      porcentagemPassante[i] * 100 >= 80
    ) {
      // Interpolação linear
      const x1 = granulometria[i + 1];
      const x2 = granulometria[i];
      const y1 = porcentagemPassante[i + 1] * 100;
      const y2 = porcentagemPassante[i] * 100;
      console.log("entrou for");
      console.log(i);
      const P80 = x1 + ((80 - y1) * (x2 - x1)) / (y2 - y1);
      return P80;
    }
  }

  return null; // Retorna null se não encontrar um intervalo adequado
}

export function processarDados(simulacao) {
  const resultado = {};

  simulacao.forEach((horaDados) => {
    horaDados.forEach((dado) => {
      const nome = dado.nome;
      const hora = dado.hora;

      if (!resultado[nome]) {
        resultado[nome] = {
          hora: [0],
          massaRecebidaAtual: [0],
          massaSaidaAtual: [0],
          P80: [],
          massaRecebidaTotal: [0],
          massaSaidaTotal: [0],
        };
      }
      resultado[nome].hora.push(hora);
      resultado[nome].massaRecebidaAtual.push(dado.massaRecebidaAtual);
      resultado[nome].massaSaidaTotal.push(dado.massaSaidaTotal);
      resultado[nome].massaSaidaAtual.push(dado.massaSaidaAtual);
      resultado[nome].massaRecebidaTotal.push(dado.massaRecebidaTotal);
      resultado[nome].P80.push(dado.P80);
    });
  });

  return resultado;
}

export function getItemsFromLocalStorage(id) {
  const items = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(id)) {
      const item = localStorage.getItem(key);
      try {
        const parsedItem = JSON.parse(item);
        return parsedItem;
      } catch (error) {
        console.error(`Erro ao parsear o item do localStorage: ${key}`, error);
      }
    }
  }
  return {};
}
