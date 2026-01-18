/**
 * Controle do modal de usuários
 */
const guestFormModal = document.getElementById("guestFormModal");
const guestForm = document.getElementById("guestForm");

window.showAddGuestForm = () => {
  guestFormModal.style.display = "block";
};

window.closeGuestForm = () => {
  guestFormModal.style.display = "none";
  guestForm.reset();
};
