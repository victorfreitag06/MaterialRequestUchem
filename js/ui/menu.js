/**
 * Controla a troca de telas do sistema
 * Ex.: Início, Requisições de Materiais, Email Padrão
 */
window.showBanco = function (id, btn) {
  // Esconde todas as seções
  document.querySelectorAll(".banco-rolagem")
    .forEach(div => div.classList.remove("show"));

  // Mostra a seção selecionada
  document.getElementById(id).classList.add("show");

  // Remove destaque de todos os botões
  document.querySelectorAll(".option-banco")
    .forEach(b => b.classList.remove("active"));

  // Destaca o botão clicado
  btn.classList.add("active");
};
