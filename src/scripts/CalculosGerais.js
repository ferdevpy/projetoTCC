export function geraSeriePeneiras() {
  let serie = [];
  let tamanho = 0.038;
  while (tamanho <= 1715) {
    serie.push(tamanho);
    tamanho = tamanho * Math.SQRT2;
  }
  return serie;
}

