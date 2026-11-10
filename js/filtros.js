import { obterTarefas } from "./tarefas.js";
import { obterCategorias } from "./dados-categorias.js";

const campoPesquisa = document.getElementById("pesquisa-tarefas");
const botoesFiltros = document.getElementById("botoes-filtros");
const mensagemLista = document.getElementById("mensagem-lista");

let categoriaSelecionada = "todas";

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function criarBotaoFiltro(nome, id, cor = null) {
  const botao = document.createElement("button");

  botao.type = "button";
  botao.textContent = nome;
  botao.dataset.categoria = id;

  if (id === categoriaSelecionada) {
    botao.classList.add("ativo");
  }

  if (cor) {
    botao.classList.add("filtro-categoria");
    botao.style.setProperty("--cor-categoria", cor);
  }

  return botao;
}

function renderizarBotoesFiltros() {
  botoesFiltros.innerHTML = "";

  botoesFiltros.appendChild(criarBotaoFiltro("Todas", "todas"));

  obterCategorias().forEach((categoria) => {
    botoesFiltros.appendChild(
      criarBotaoFiltro(categoria.nome, categoria.id, categoria.cor),
    );
  });

  const botaoSemCategoria = criarBotaoFiltro("Sem categoria", "sem-categoria");

  botaoSemCategoria.classList.add("filtro-sem-categoria");

  botoesFiltros.appendChild(botaoSemCategoria);
}

export function filtrarTarefas() {
  const textoPesquisa = normalizarTexto(campoPesquisa.value.trim());

  const elementosTarefas = document.querySelectorAll(".item-tarefa");

  elementosTarefas.forEach(function (tarefa) {
    const titulo = normalizarTexto(
      tarefa.querySelector(".info-tarefa h3").textContent,
    );

    const idCategoria = tarefa.dataset.categoriaId;

    const correspondeTexto = titulo.includes(textoPesquisa);

    const correspondeCategoria =
      categoriaSelecionada === "todas" ||
      (categoriaSelecionada === "sem-categoria" && !idCategoria) ||
      idCategoria === categoriaSelecionada;

    tarefa.style.display =
      correspondeTexto && correspondeCategoria ? "flex" : "none";
  });

  const tarefasVisiveis = Array.from(elementosTarefas).filter(
    function (tarefa) {
      return tarefa.style.display !== "none";
    },
  );

  if (tarefasVisiveis.length === 0) {
    mensagemLista.hidden = false;

    if (obterTarefas().length === 0) {
      mensagemLista.textContent = "Você ainda não tem tarefas cadastradas.";
    } else {
      mensagemLista.textContent =
        "Nenhuma tarefa encontrada com os filtros selecionados.";
    }
  } else {
    mensagemLista.hidden = true;
  }
}

export function configurarFiltros() {
  renderizarBotoesFiltros();

  campoPesquisa.addEventListener("input", filtrarTarefas);

  botoesFiltros.addEventListener("click", function (event) {
    const botao = event.target.closest("button");

    if (!botao || !botoesFiltros.contains(botao)) {
      return;
    }

    categoriaSelecionada = botao.dataset.categoria;

    botoesFiltros.querySelectorAll("button").forEach(function (botaoFiltro) {
      botaoFiltro.classList.remove("ativo");
    });

    botao.classList.add("ativo");

    filtrarTarefas();
  });
}
