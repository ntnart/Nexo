import { obterTarefas } from "./tarefas.js";
import { filtrarTarefas } from "./filtros.js";
import { obterCategorias, buscarCategoria } from "./dados-categorias.js";
import { obterPreferencias } from "./preferencias.js";

export const listaTarefas = document.querySelector(".lista-tarefas");
export const formularioTarefa = document.getElementById("formulario-tarefa");
export const botaoAbrirFormulario = document.getElementById("abrir-formulario");
export const botaoCancelarFormulario = document.getElementById(
  "cancelar-formulario",
);

const tarefasPendentes = document.getElementById("tarefas-pendentes");
const tarefasConcluidas = document.getElementById("tarefas-concluidas");

const campoTitulo = document.getElementById("titulo-tarefa");
const campoCategoria = document.getElementById("categoria-tarefa");
const campoPrioridade = document.getElementById("prioridade-tarefa");
const tituloFormulario = document.getElementById("titulo-formulario");
const botaoEnviarTarefa = document.getElementById("botao-enviar-tarefa");

function ordenarTarefas(tarefas, ordenacao) {
  const copiaTarefas = [...tarefas];

  if (ordenacao === "criacao") {
    copiaTarefas.sort((a, b) => a.id - b.id);
  }

  if (ordenacao === "alfabetica") {
    copiaTarefas.sort((a, b) =>
      a.titulo.localeCompare(b.titulo, "pt-BR", {
        sensitivity: "base",
      }),
    );
  }

  if (ordenacao === "prioridade") {
    const ordemPrioridade = {
      alta: 1,
      media: 2,
      baixa: 3,
    };

    copiaTarefas.sort(
      (a, b) => ordemPrioridade[a.prioridade] - ordemPrioridade[b.prioridade],
    );
  }

  return copiaTarefas;
}

function obterNomeGrupo(chave, agrupamento) {
  if (agrupamento === "categoria") {
    if (chave === "sem-categoria") return "Sem categoria";

    const categoria = buscarCategoria(chave);
    return categoria ? categoria.nome : "Sem categoria";
  }

  const nomesPrioridade = {
    alta: "Alta prioridade",
    media: "Média prioridade",
    baixa: "Baixa prioridade",
  };

  return nomesPrioridade[chave];
}

function agruparTarefas(tarefas, agrupamento) {
  const grupos = new Map();

  tarefas.forEach(function (tarefa) {
    const chave =
      agrupamento === "categoria"
        ? tarefa.categoria || "sem-categoria"
        : tarefa.prioridade;

    if (!grupos.has(chave)) {
      grupos.set(chave, []);
    }

    grupos.get(chave).push(tarefa);
  });

  return grupos;
}

function atualizarOpcoesCategorias(categoriaSelecionada = "") {
  campoCategoria.innerHTML = "";

  const opcaoSemCategoria = document.createElement("option");
  opcaoSemCategoria.value = "";
  opcaoSemCategoria.textContent = "Sem categoria";

  campoCategoria.appendChild(opcaoSemCategoria);

  obterCategorias().forEach(function (categoria) {
    const opcao = document.createElement("option");

    opcao.value = categoria.id;
    opcao.textContent = categoria.nome;

    campoCategoria.appendChild(opcao);
  });

  campoCategoria.value = categoriaSelecionada || "";
}

function criarTarefa(dadosTarefa) {
  const tarefa = document.createElement("div");
  tarefa.dataset.id = dadosTarefa.id;
  tarefa.dataset.categoriaId = dadosTarefa.categoria || "";
  tarefa.classList.add("item-tarefa");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = dadosTarefa.concluida;

  checkbox.setAttribute("aria-label", "Concluir tarefa: " + dadosTarefa.titulo);

  const informacoes = document.createElement("div");
  informacoes.classList.add("info-tarefa");

  const nomeTarefa = document.createElement("h3");
  nomeTarefa.textContent = dadosTarefa.titulo;

  const categoriaTarefa = document.createElement("p");
  const categoria = buscarCategoria(dadosTarefa.categoria);

  categoriaTarefa.classList.add("etiqueta-categoria");

  if (categoria) {
    categoriaTarefa.textContent = categoria.nome;
    categoriaTarefa.style.setProperty("--cor-categoria", categoria.cor);
  } else {
    categoriaTarefa.textContent = "Sem categoria";
  }
  const etiquetaPrioridade = document.createElement("span");
  etiquetaPrioridade.classList.add("prioridade-tarefa");
  etiquetaPrioridade.classList.add("prioridade-" + dadosTarefa.prioridade);

  etiquetaPrioridade.textContent =
    dadosTarefa.prioridade === "alta"
      ? "Alta"
      : dadosTarefa.prioridade === "media"
        ? "Média"
        : "Baixa";

  informacoes.appendChild(nomeTarefa);
  informacoes.appendChild(categoriaTarefa);

  tarefa.appendChild(checkbox);
  tarefa.appendChild(informacoes);
  tarefa.appendChild(etiquetaPrioridade);

  const botoesAcoes = document.createElement("div");
  botoesAcoes.classList.add("acoes-tarefa");

  const botaoEditar = document.createElement("button");
  botaoEditar.type = "button";
  botaoEditar.classList.add("botao-acao", "botao-editar");
  botaoEditar.setAttribute("aria-label", "Editar tarefa");
  botaoEditar.title = "Editar";

  botaoEditar.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 20h9"/>
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z"/>
    </svg>
  `;

  const botaoExcluir = document.createElement("button");
  botaoExcluir.type = "button";
  botaoExcluir.classList.add("botao-acao", "botao-excluir");
  botaoExcluir.setAttribute("aria-label", "Excluir tarefa");
  botaoExcluir.title = "Excluir";

  botaoExcluir.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 6h18"/>
      <path d="M8 6V4h8v2"/>
      <path d="m19 6-1 14H6L5 6"/>
      <path d="M10 11v5"/>
      <path d="M14 11v5"/>
    </svg>
  `;

  botoesAcoes.appendChild(botaoEditar);
  botoesAcoes.appendChild(botaoExcluir);

  tarefa.appendChild(botoesAcoes);

  return tarefa;
}

export function renderizarTarefas() {
  const { agrupamento, ordenacao } = obterPreferencias();

  tarefasPendentes
    .querySelectorAll(".item-tarefa, .subgrupo-tarefas")
    .forEach((elemento) => elemento.remove());

  tarefasConcluidas
    .querySelectorAll(".item-tarefa, .subgrupo-tarefas")
    .forEach((elemento) => elemento.remove());

  const tarefasOrdenadas = ordenarTarefas(obterTarefas(), ordenacao);

  const listas = [
    {
      elemento: tarefasPendentes,
      tarefas: tarefasOrdenadas.filter((tarefa) => !tarefa.concluida),
    },
    {
      elemento: tarefasConcluidas,
      tarefas: tarefasOrdenadas.filter((tarefa) => tarefa.concluida),
    },
  ];

  listas.forEach(function (lista) {
    if (agrupamento === "nenhum") {
      lista.tarefas.forEach(function (dadosTarefa) {
        lista.elemento.appendChild(criarTarefa(dadosTarefa));
      });

      return;
    }

    const grupos = agruparTarefas(lista.tarefas, agrupamento);

    grupos.forEach(function (tarefasDoGrupo, chave) {
      const grupo = document.createElement("div");
      grupo.classList.add("subgrupo-tarefas");

      const tituloGrupo = document.createElement("h4");
      tituloGrupo.textContent = obterNomeGrupo(chave, agrupamento);

      if (agrupamento === "categoria" && chave !== "sem-categoria") {
        const categoria = buscarCategoria(chave);

        if (categoria) {
          tituloGrupo.style.setProperty("--cor-categoria", categoria.cor);
        }
      }

      grupo.appendChild(tituloGrupo);

      tarefasDoGrupo.forEach(function (dadosTarefa) {
        grupo.appendChild(criarTarefa(dadosTarefa));
      });

      lista.elemento.appendChild(grupo);
    });
  });

  filtrarTarefas();
}

export function moverTarefaParaLista(tarefaElemento, concluida) {
  renderizarTarefas();
}

export function abrirFormularioNovo() {
  formularioTarefa.reset();

  atualizarOpcoesCategorias();

  tituloFormulario.textContent = "Adicionar tarefa";
  botaoEnviarTarefa.textContent = "Adicionar tarefa";

  formularioTarefa.hidden = false;
  campoTitulo.focus();
}

export function abrirFormularioEdicao(tarefa) {
  atualizarOpcoesCategorias(tarefa.categoria);

  campoTitulo.value = tarefa.titulo;
  campoPrioridade.value = tarefa.prioridade;

  tituloFormulario.textContent = "Editar tarefa";
  botaoEnviarTarefa.textContent = "Salvar alterações";

  formularioTarefa.hidden = false;
  campoTitulo.focus();
}

export function fecharFormulario() {
  tituloFormulario.textContent = "Adicionar tarefa";
  botaoEnviarTarefa.textContent = "Adicionar tarefa";

  formularioTarefa.reset();
  formularioTarefa.hidden = true;
}

export function lerFormulario() {
  return {
    titulo: campoTitulo.value.trim(),
    categoria: campoCategoria.value || null,
    prioridade: campoPrioridade.value,
  };
}

export function confirmarExclusao() {
  return confirm("Tem certeza que deseja excluir esta tarefa?");
}
