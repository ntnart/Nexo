import { salvarAgrupamento, salvarOrdenacao } from "./preferencias.js";

const CHAVE_TEMA = "nexo-v2-tema";

const seletorTema = document.getElementById("tema");
const seletorAgrupamento = document.getElementById("agrupamento");
const seletorOrdenacao = document.getElementById("ordenacao");
const botaoLimparDados = document.getElementById("limpar-dados");

function aplicarTema(tema) {
  document.documentElement.dataset.tema = tema;
}

function carregarTema() {
  const temaSalvo = localStorage.getItem(CHAVE_TEMA);
  const tema = temaSalvo === "claro" ? "claro" : "escuro";

  aplicarTema(tema);

  if (seletorTema) {
    seletorTema.value = tema;
  }
}

function configurarTema() {
  if (!seletorTema) return;

  seletorTema.addEventListener("change", function () {
    const temaEscolhido = seletorTema.value;

    localStorage.setItem(CHAVE_TEMA, temaEscolhido);
    aplicarTema(temaEscolhido);
  });
}

function configurarVisualizacao() {
  if (!seletorAgrupamento || !seletorOrdenacao) return;

  const agrupamentoSalvo =
    localStorage.getItem("nexo-v2-agrupamento") || "nenhum";

  const ordenacaoSalva = localStorage.getItem("nexo-v2-ordenacao") || "criacao";

  seletorAgrupamento.value = agrupamentoSalvo;
  seletorOrdenacao.value = ordenacaoSalva;

  seletorAgrupamento.addEventListener("change", function () {
    salvarAgrupamento(seletorAgrupamento.value);
  });

  seletorOrdenacao.addEventListener("change", function () {
    salvarOrdenacao(seletorOrdenacao.value);
  });
}

function configurarLimpezaDados() {
  if (!botaoLimparDados) return;

  botaoLimparDados.addEventListener("click", function () {
    const confirmou = confirm(
      "Tem certeza que deseja apagar todos os dados do Nexo? Essa ação não poderá ser desfeita.",
    );

    if (!confirmou) return;

    localStorage.removeItem("nexo-v2-tarefas");
    localStorage.removeItem("nexo-v2-categorias");
    localStorage.removeItem("nexo-v2-tema");
    localStorage.removeItem("nexo-v2-agrupamento");
    localStorage.removeItem("nexo-v2-ordenacao");

    alert("Dados apagados com sucesso!");

    window.location.href = "index.html";
  });
}

carregarTema();
configurarTema();
configurarVisualizacao();
configurarLimpezaDados();
