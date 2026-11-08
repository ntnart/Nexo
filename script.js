const tarefasPendentes = document.getElementById("tarefas-pendentes");
const tarefasConcluidas = document.getElementById("tarefas-concluidas");
const campoPesquisa = document.getElementById("pesquisa-tarefas");
let categoriaSelecionada = "Todas";
const botoesFiltros = document.getElementById("botoes-filtros");
const formularioTarefa = document.getElementById("formulario-tarefa");
const botaoAbrirFormulario = document.getElementById("abrir-formulario");
const botaoCancelarFormulario = document.getElementById("cancelar-formulario");
const campoTitulo = document.getElementById("titulo-tarefa");
const campoCategoria = document.getElementById("categoria-tarefa");
const campoPrioridade = document.getElementById("prioridade-tarefa");
const tituloFormulario = document.getElementById("titulo-formulario");
const botaoEnviarTarefa = document.getElementById("botao-enviar-tarefa");

let idTarefaEditando = null;

const listaTarefas = document.querySelector(".lista-tarefas");

const tarefasIniciais = [
  {
    id: 1,
    titulo: "Estruturar HTML e CSS",
    categoria: "Programação",
    prioridade: "media",
    concluida: false,
  },
  {
    id: 2,
    titulo: "Finalizar atividade da faculdade",
    categoria: "Estudos",
    prioridade: "alta",
    concluida: false,
  },
  {
    id: 3,
    titulo: "Organizar arquivos do computador",
    categoria: "Pessoal",
    prioridade: "baixa",
    concluida: true,
  },
];

let tarefas;

try {
  const tarefasSalvas = localStorage.getItem("nexo-tarefas");

  if (tarefasSalvas !== null) {
    const dadosSalvos = JSON.parse(tarefasSalvas);

    if (Array.isArray(dadosSalvos)) {
      tarefas = dadosSalvos;
    } else {
      tarefas = [...tarefasIniciais];
    }
  } else {
    tarefas = [...tarefasIniciais];
  }
} catch (erro) {
  console.error("Erro ao carregar as tarefas:", erro);
  tarefas = [...tarefasIniciais];
}

function salvarTarefas() {
  localStorage.setItem("nexo-tarefas", JSON.stringify(tarefas));
}

listaTarefas.addEventListener("change", function (event) {
  if (!event.target.matches('input[type="checkbox"]')) {
    return;
  }

  const tarefaElemento = event.target.closest(".item-tarefa");
  const id = Number(tarefaElemento.dataset.id);

  const tarefaEncontrada = tarefas.find(function (tarefa) {
    return tarefa.id === id;
  });

  if (tarefaEncontrada) {
    tarefaEncontrada.concluida = event.target.checked;
    salvarTarefas();
  }

  if (event.target.checked) {
    tarefasConcluidas.appendChild(tarefaElemento);
  } else {
    tarefasPendentes.appendChild(tarefaElemento);
  }

  event.target.focus();
});

listaTarefas.addEventListener("click", function (event) {
  const tarefaElemento = event.target.closest(".item-tarefa");

  if (!tarefaElemento) {
    return;
  }

  if (event.target.closest("button") || event.target.matches("input")) {
    return;
  }

  const checkbox = tarefaElemento.querySelector('input[type="checkbox"]');

  checkbox.checked = !checkbox.checked;

  checkbox.dispatchEvent(new Event("change", { bubbles: true }));
});

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function filtrarTarefas() {
  const textoPesquisa = normalizarTexto(campoPesquisa.value.trim());

  const elementosTarefas = document.querySelectorAll(".item-tarefa");

  elementosTarefas.forEach(function (tarefa) {
    const titulo = normalizarTexto(
      tarefa.querySelector(".info-tarefa h3").textContent,
    );

    const categoria = tarefa.querySelector(".info-tarefa p").textContent;

    const correspondeTexto = titulo.includes(textoPesquisa);

    const correspondeCategoria =
      categoriaSelecionada === "Todas" || categoria === categoriaSelecionada;

    if (correspondeTexto && correspondeCategoria) {
      tarefa.style.display = "flex";
    } else {
      tarefa.style.display = "none";
    }
  });
  const tarefasVisiveis = Array.from(elementosTarefas).filter(
    function (tarefa) {
      return tarefa.style.display !== "none";
    },
  );

  const mensagemLista = document.getElementById("mensagem-lista");

  if (tarefasVisiveis.length === 0) {
    mensagemLista.hidden = false;

    if (tarefas.length === 0) {
      mensagemLista.textContent = "Você ainda não tem tarefas cadastradas.";
    } else {
      mensagemLista.textContent =
        "Nenhuma tarefa encontrada com os filtros selecionados.";
    }
  } else {
    mensagemLista.hidden = true;
  }
}

campoPesquisa.addEventListener("input", filtrarTarefas);

botoesFiltros.addEventListener("click", function (event) {
  if (event.target.tagName !== "BUTTON") {
    return;
  }

  categoriaSelecionada = event.target.textContent;

  const botoes = botoesFiltros.querySelectorAll("button");

  botoes.forEach(function (botao) {
    botao.classList.remove("ativo");
  });

  event.target.classList.add("ativo");

  filtrarTarefas();
});

botaoAbrirFormulario.addEventListener("click", function () {
  formularioTarefa.reset();

  idTarefaEditando = null;

  tituloFormulario.textContent = "Adicionar tarefa";
  botaoEnviarTarefa.textContent = "Adicionar tarefa";

  formularioTarefa.hidden = false;
  campoTitulo.focus();
});

botaoCancelarFormulario.addEventListener("click", function () {
  formularioTarefa.reset();
  formularioTarefa.hidden = true;

  idTarefaEditando = null;

  tituloFormulario.textContent = "Adicionar tarefa";
  botaoEnviarTarefa.textContent = "Adicionar tarefa";
});

function criarTarefa(dadosTarefa) {
  const tarefa = document.createElement("div");
  tarefa.dataset.id = dadosTarefa.id;
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
  categoriaTarefa.textContent = dadosTarefa.categoria || "Sem categoria";

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

  // Botões de editar e excluir
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

function renderizarTarefas() {
  tarefasPendentes.querySelectorAll(".item-tarefa").forEach(function (tarefa) {
    tarefa.remove();
  });

  tarefasConcluidas.querySelectorAll(".item-tarefa").forEach(function (tarefa) {
    tarefa.remove();
  });

  tarefas.forEach(function (dadosTarefa) {
    const elementoTarefa = criarTarefa(dadosTarefa);

    if (dadosTarefa.concluida) {
      tarefasConcluidas.appendChild(elementoTarefa);
    } else {
      tarefasPendentes.appendChild(elementoTarefa);
    }
  });

  filtrarTarefas();
}

formularioTarefa.addEventListener("submit", function (event) {
  event.preventDefault();

  const titulo = campoTitulo.value.trim();
  const categoria = campoCategoria.value;
  const prioridade = campoPrioridade.value;

  if (titulo === "") {
    return;
  }

  if (idTarefaEditando !== null) {
    const tarefa = tarefas.find(function (tarefa) {
      return tarefa.id === idTarefaEditando;
    });

    if (tarefa) {
      tarefa.titulo = titulo;
      tarefa.categoria = categoria;
      tarefa.prioridade = prioridade;
    }
  } else {
    const novaTarefa = {
      id: Date.now(),
      titulo: titulo,
      categoria: categoria,
      prioridade: prioridade,
      concluida: false,
    };

    tarefas.push(novaTarefa);
  }

  salvarTarefas();

  idTarefaEditando = null;

  tituloFormulario.textContent = "Adicionar tarefa";
  botaoEnviarTarefa.textContent = "Adicionar tarefa";

  formularioTarefa.reset();
  formularioTarefa.hidden = true;

  renderizarTarefas();
});

function editarTarefa(id) {
  const tarefa = tarefas.find(function (tarefa) {
    return tarefa.id === id;
  });

  if (!tarefa) {
    return;
  }

  campoTitulo.value = tarefa.titulo;
  campoCategoria.value = tarefa.categoria;
  campoPrioridade.value = tarefa.prioridade;

  idTarefaEditando = tarefa.id;

  tituloFormulario.textContent = "Editar tarefa";
  botaoEnviarTarefa.textContent = "Salvar alterações";

  formularioTarefa.hidden = false;

  campoTitulo.focus();
}

function excluirTarefa(id) {
  const confirmar = confirm("Tem certeza que deseja excluir esta tarefa?");

  if (!confirmar) {
    return;
  }

  tarefas = tarefas.filter(function (tarefa) {
    return tarefa.id !== id;
  });

  salvarTarefas();
  renderizarTarefas();
}

listaTarefas.addEventListener("click", function (event) {
  const botao = event.target.closest("button");

  if (!botao) {
    return;
  }

  const tarefaElemento = botao.closest(".item-tarefa");
  const id = Number(tarefaElemento.dataset.id);

  if (botao.classList.contains("botao-editar")) {
    editarTarefa(id);
  }

  if (botao.classList.contains("botao-excluir")) {
    excluirTarefa(id);
  }
});

renderizarTarefas();
