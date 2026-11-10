import {
  obterCategorias,
  adicionarCategoria,
  atualizarCategoria,
  removerCategoria,
} from "./dados-categorias.js";

const formulario = document.getElementById("formulario-categoria");
const campoNome = document.getElementById("nome-categoria");
const campoCor = document.getElementById("cor-categoria");
const botaoAbrir = document.getElementById("abrir-formulario-categoria");
const botaoCancelar = document.getElementById("cancelar-categoria");
const tituloFormulario = document.getElementById("titulo-formulario-categoria");

const primeiroCartao = document.querySelector(".card-categoria");

if (!primeiroCartao) {
  console.error("Não foi encontrado nenhum cartão de categoria no HTML.");
}

const listaCategorias = primeiroCartao?.parentElement;

let categoriaEditando = null;

function contarTarefas(idCategoria) {
  const tarefasSalvas = localStorage.getItem("nexo-v2-tarefas");

  if (!tarefasSalvas) {
    return 0;
  }

  try {
    const tarefas = JSON.parse(tarefasSalvas);

    return tarefas.filter(function (tarefa) {
      return tarefa.categoria === idCategoria;
    }).length;
  } catch {
    return 0;
  }
}

function renderizarCategorias() {
  if (!listaCategorias) {
    return;
  }

  listaCategorias
    .querySelectorAll(".card-categoria")
    .forEach(function (cartao) {
      cartao.remove();
    });

  obterCategorias().forEach(function (categoria) {
    const cartao = document.createElement("div");
    cartao.classList.add("card-categoria");

    const cor = document.createElement("div");
    cor.classList.add("cor-categoria");
    cor.style.backgroundColor = categoria.cor;

    const informacoes = document.createElement("div");
    informacoes.classList.add("informacoes-categoria");

    const nome = document.createElement("h3");
    nome.textContent = categoria.nome;

    const quantidade = document.createElement("p");
    const total = contarTarefas(categoria.id);
    quantidade.textContent = total === 1 ? "1 tarefa" : `${total} tarefas`;

    informacoes.append(nome, quantidade);

    const acoes = document.createElement("div");
    acoes.classList.add("acoes-categoria");

    const botaoEditar = document.createElement("button");
    botaoEditar.type = "button";
    botaoEditar.classList.add("botao-acao", "botao-editar");
    botaoEditar.setAttribute(
      "aria-label",
      `Editar categoria ${categoria.nome}`,
    );
    botaoEditar.title = "Editar";
    botaoEditar.dataset.id = categoria.id;

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
    botaoExcluir.setAttribute(
      "aria-label",
      `Excluir categoria ${categoria.nome}`,
    );
    botaoExcluir.title = "Excluir";
    botaoExcluir.dataset.id = categoria.id;

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

    acoes.append(botaoEditar, botaoExcluir);
    cartao.append(cor, informacoes, acoes);

    listaCategorias.appendChild(cartao);
  });
}

function abrirFormularioNovo() {
  categoriaEditando = null;
  formulario.reset();

  tituloFormulario.textContent = "Nova categoria";
  campoCor.value = "#7059d9";

  formulario.hidden = false;
  campoNome.focus();
}

function editarCategoria(id) {
  const categoria = obterCategorias().find(function (item) {
    return item.id === id;
  });

  if (!categoria) {
    return;
  }

  categoriaEditando = id;

  campoNome.value = categoria.nome;
  campoCor.value = categoria.cor;
  tituloFormulario.textContent = "Editar categoria";

  formulario.hidden = false;
  campoNome.focus();
}

function fecharFormulario() {
  formulario.reset();
  formulario.hidden = true;
  categoriaEditando = null;
}

function salvarCategoria(event) {
  event.preventDefault();

  const nome = campoNome.value.trim();
  const cor = campoCor.value;

  if (!nome) {
    alert("Digite um nome para a categoria.");
    return;
  }

  let sucesso;

  if (categoriaEditando) {
    sucesso = atualizarCategoria(categoriaEditando, nome, cor);
  } else {
    sucesso = adicionarCategoria(nome, cor);
  }

  if (!sucesso) {
    alert("Já existe uma categoria com esse nome.");
    return;
  }

  fecharFormulario();
  renderizarCategorias();
}

function excluirCategoria(id) {
  const categoria = obterCategorias().find(function (item) {
    return item.id === id;
  });

  if (!categoria) {
    return;
  }

  const total = contarTarefas(id);

  const mensagem =
    total > 0
      ? `A categoria "${categoria.nome}" possui ${total} tarefa(s).\n\nSe continuar, essas tarefas ficarão sem categoria.\n\nDeseja excluir?`
      : `Deseja excluir a categoria "${categoria.nome}"?`;

  if (!confirm(mensagem)) {
    return;
  }

  removerCategoria(id);
  renderizarCategorias();
}

botaoAbrir.addEventListener("click", abrirFormularioNovo);
botaoCancelar.addEventListener("click", fecharFormulario);
formulario.addEventListener("submit", salvarCategoria);

listaCategorias?.addEventListener("click", function (event) {
  const botao = event.target.closest("button");

  if (!botao) {
    return;
  }

  if (botao.classList.contains("botao-editar")) {
    editarCategoria(botao.dataset.id);
  }

  if (botao.classList.contains("botao-excluir")) {
    excluirCategoria(botao.dataset.id);
  }
});

renderizarCategorias();
