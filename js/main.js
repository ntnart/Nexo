import {
  buscarTarefa,
  adicionarTarefa,
  atualizarTarefa,
  definirConclusao,
  removerTarefa,
} from "./tarefas.js";

import { configurarFiltros } from "./filtros.js";

import {
  listaTarefas,
  formularioTarefa,
  botaoAbrirFormulario,
  botaoCancelarFormulario,
  renderizarTarefas,
  moverTarefaParaLista,
  abrirFormularioNovo,
  abrirFormularioEdicao,
  fecharFormulario,
  lerFormulario,
  confirmarExclusao,
} from "./interface.js";

let idTarefaEditando = null;

listaTarefas.addEventListener("change", function (event) {
  if (!event.target.matches('input[type="checkbox"]')) {
    return;
  }

  const tarefaElemento = event.target.closest(".item-tarefa");
  const id = Number(tarefaElemento.dataset.id);

  definirConclusao(id, event.target.checked);
  moverTarefaParaLista(tarefaElemento, event.target.checked);

  const novaCheckbox = listaTarefas.querySelector(
    `.item-tarefa[data-id="${id}"] input[type="checkbox"]`,
  );

  if (novaCheckbox) {
    novaCheckbox.focus();
  }
});

listaTarefas.addEventListener("click", function (event) {
  const tarefaElemento = event.target.closest(".item-tarefa");

  if (!tarefaElemento) {
    return;
  }

  const id = Number(tarefaElemento.dataset.id);
  const botao = event.target.closest("button");

  if (botao) {
    if (botao.classList.contains("botao-editar")) {
      const tarefa = buscarTarefa(id);

      if (tarefa) {
        idTarefaEditando = tarefa.id;
        abrirFormularioEdicao(tarefa);
      }
    }

    if (botao.classList.contains("botao-excluir")) {
      if (confirmarExclusao()) {
        removerTarefa(id);
        renderizarTarefas();
      }
    }

    return;
  }

  if (event.target.matches("input")) {
    return;
  }

  const checkbox = tarefaElemento.querySelector('input[type="checkbox"]');

  checkbox.checked = !checkbox.checked;
  checkbox.dispatchEvent(new Event("change", { bubbles: true }));
});

botaoAbrirFormulario.addEventListener("click", function () {
  idTarefaEditando = null;
  abrirFormularioNovo();
});

botaoCancelarFormulario.addEventListener("click", function () {
  idTarefaEditando = null;
  fecharFormulario();
});

formularioTarefa.addEventListener("submit", function (event) {
  event.preventDefault();

  const dados = lerFormulario();

  if (dados.titulo === "") {
    return;
  }

  if (idTarefaEditando !== null) {
    atualizarTarefa(idTarefaEditando, dados);
  } else {
    adicionarTarefa(dados);
  }

  idTarefaEditando = null;
  fecharFormulario();
  renderizarTarefas();
});

configurarFiltros();
renderizarTarefas();
