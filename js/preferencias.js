const CHAVE_AGRUPAMENTO = "nexo-v2-agrupamento";
const CHAVE_ORDENACAO = "nexo-v2-ordenacao";

const preferenciasPadrao = {
  agrupamento: "nenhum",
  ordenacao: "criacao",
};

export function obterPreferencias() {
  return {
    agrupamento:
      localStorage.getItem(CHAVE_AGRUPAMENTO) || preferenciasPadrao.agrupamento,

    ordenacao:
      localStorage.getItem(CHAVE_ORDENACAO) || preferenciasPadrao.ordenacao,
  };
}

export function salvarAgrupamento(valor) {
  localStorage.setItem(CHAVE_AGRUPAMENTO, valor);
}

export function salvarOrdenacao(valor) {
  localStorage.setItem(CHAVE_ORDENACAO, valor);
}
