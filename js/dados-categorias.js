import {
  carregarCategorias,
  salvarCategorias,
  carregarTarefas,
  salvarTarefas,
} from "./storage.js";
const categoriasIniciais = [
  { id: "programacao", nome: "Programação", cor: "#7059d9" },
  { id: "trabalho", nome: "Trabalho", cor: "#4389e8" },
  { id: "estudos", nome: "Estudos", cor: "#2eaa83" },
  { id: "pessoal", nome: "Pessoal", cor: "#d68a36" },
];

let categorias = carregarCategorias();

if (!categorias) {
  categorias = categoriasIniciais;
  salvarCategorias(categorias);
}

export function obterCategorias() {
  return categorias;
}

export function buscarCategoria(id) {
  return categorias.find(function (categoria) {
    return categoria.id === id;
  });
}

export function adicionarCategoria(nome, cor) {
  const nomeExiste = categorias.some(function (categoria) {
    return categoria.nome.toLowerCase() === nome.toLowerCase();
  });

  if (nomeExiste) {
    return false;
  }

  categorias.push({
    id: crypto.randomUUID(),
    nome: nome,
    cor: cor,
  });

  salvarCategorias(categorias);
  return true;
}

export function atualizarCategoria(id, nome, cor) {
  const categoria = buscarCategoria(id);

  if (!categoria) {
    return false;
  }

  const nomeExiste = categorias.some(function (item) {
    return item.nome.toLowerCase() === nome.toLowerCase() && item.id !== id;
  });

  if (nomeExiste) {
    return false;
  }

  categoria.nome = nome;
  categoria.cor = cor;

  salvarCategorias(categorias);
  return true;
}

export function removerCategoria(id) {
  const categoria = buscarCategoria(id);

  if (!categoria) {
    return false;
  }

  const tarefas = carregarTarefas();

  tarefas.forEach(function (tarefa) {
    if (tarefa.categoria === id) {
      tarefa.categoria = null;
    }
  });

  salvarTarefas(tarefas);

  categorias = categorias.filter(function (item) {
    return item.id !== id;
  });

  salvarCategorias(categorias);
  return true;
}
