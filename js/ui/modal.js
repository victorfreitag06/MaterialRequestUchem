/**
 * Controle do modal de Requisição de Materiais
 */
const materialFormModal = document.getElementById("materialFormModal");
const materialForm = document.getElementById("materialForm");

// Abrir modal
window.showAddMaterialForm = () => {
  materialFormModal.style.display = "block";
};

// Fechar modal e resetar campos
window.closeMaterialForm = () => {
  materialFormModal.style.display = "none";
  materialForm.reset();
};
