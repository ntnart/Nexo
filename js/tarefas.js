import { carregarTarefas, salvarTarefas } from "./storage.js";

let tarefas = carregarTarefas();

export function obterTarefas() {
  return tarefas;
}

export function buscarTarefa(id) {
  return tarefas.find(function (tarefa) {
    return tarefa.id === id;
  });
}

export function adicionarTarefa(dados) {
  const novaTarefa = {
    id: Date.now(),
    titulo: dados.titulo,
    categoria: dados.categoria,
    prioridade: dados.prioridade,
    concluida: false,
  };

  tarefas.push(novaTarefa);
  salvarTarefas(tarefas);
}

export function atualizarTarefa(id, dados) {
  const tarefa = buscarTarefa(id);

  if (!tarefa) {
    return;
  }

  tarefa.titulo = dados.titulo;
  tarefa.categoria = dados.categoria;
  tarefa.prioridade = dados.prioridade;

  salvarTarefas(tarefas);
}

export function definirConclusao(id, concluida) {
  const tarefa = buscarTarefa(id);

  if (!tarefa) {
    return;
  }

  tarefa.concluida = concluida;
  salvarTarefas(tarefas);
}

export function removerTarefa(id) {
  tarefas = tarefas.filter(function (tarefa) {
    return tarefa.id !== id;
  });

  salvarTarefas(tarefas);
}
