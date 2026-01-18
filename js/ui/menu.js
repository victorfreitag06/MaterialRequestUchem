/**
 * Controla a troca de telas do sistema
 */
window.showBanco = function (id, btn) {
  document.querySelectorAll(".banco-rolagem")
    .forEach(div => div.classList.remove("show"));

  document.getElementById(id).classList.add("show");

  document.querySelectorAll(".option-banco")
    .forEach(b => b.classList.remove("active"));

  btn.classList.add("active");
};
