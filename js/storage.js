const CHAVE_TAREFAS = "nexo-v2-tarefas";
const CHAVE_CATEGORIAS = "nexo-v2-categorias";

export function carregarTarefas() {
  try {
    const tarefasSalvas = localStorage.getItem(CHAVE_TAREFAS);

    if (tarefasSalvas === null) {
      return [];
    }

    const dadosSalvos = JSON.parse(tarefasSalvas);

    if (Array.isArray(dadosSalvos)) {
      return dadosSalvos;
    }

    return [];
  } catch (erro) {
    console.error("Erro ao carregar as tarefas:", erro);
    return [];
  }
}

export function salvarTarefas(tarefas) {
  try {
    localStorage.setItem(CHAVE_TAREFAS, JSON.stringify(tarefas));
  } catch (erro) {
    console.error("Erro ao salvar as tarefas:", erro);
  }
}
export function carregarCategorias() {
  const dados = localStorage.getItem(CHAVE_CATEGORIAS);

  if (!dados) {
    return null;
  }

  try {
    const categorias = JSON.parse(dados);

    return Array.isArray(categorias) ? categorias : null;
  } catch {
    return null;
  }
}

export function salvarCategorias(categorias) {
  localStorage.setItem(CHAVE_CATEGORIAS, JSON.stringify(categorias));
}
