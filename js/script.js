// ================= EMAILJS INIT =================
(function () {
  emailjs.init("NC_gTV0M_mIkjVnEZ");
})();

// ================= FIREBASE IMPORTS =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ================= FIREBASE CONFIG =================
const firebaseConfig = {
  apiKey: "AIzaSyA-9He-8SuZ_pIIxTwZe0vrwyd8hcAu4oQ",
  authDomain: "feature-request-cc834.firebaseapp.com",
  projectId: "feature-request-cc834",
  storageBucket: "feature-request-cc834.appspot.com",
  messagingSenderId: "1002484973088",
  appId: "1:1002484973088:web:3930ba674b03ce09344645"
};

// ================= FIREBASE INIT =================
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ================= MENU =================
// 🔴 ESSENCIAL: precisa estar no window
window.showBanco = function (id, btn) {
  document.querySelectorAll('.banco-rolagem')
    .forEach(div => div.classList.remove('show'));

  document.getElementById(id).classList.add('show');

  document.querySelectorAll('.option-banco')
    .forEach(b => b.classList.remove('active'));

  btn.classList.add('active');
};

// ================= MODAL =================
const guestFormModal = document.getElementById("guestFormModal");
const guestForm = document.getElementById("guestForm");
const guestTableBody = document.getElementById("guestTableBody");

window.showAddGuestForm = () => {
  guestFormModal.style.display = "block";
};

window.closeGuestForm = () => {
  guestFormModal.style.display = "none";
  guestForm.reset();
};

// ================= SALVAR + EMAIL =================
guestForm.addEventListener("submit", async e => {
  e.preventDefault();

  const usuario = {
    nome: guestNome.value,
    cpf: guestCpf.value,
    email: guestEmail.value,
    senha: guestSenha.value
  };

  await addDoc(collection(db, "usuarios"), usuario);

  // Email apenas para verificação interna
  emailjs.send("service_ph9nt3h", "template_fnmgrcp", {
    nome: usuario.nome,
    email: usuario.email,
    cpf: usuario.cpf
  }).catch(err => {
    console.error("Erro EmailJS:", err);
  });

  closeGuestForm();
  carregarUsuarios();
});

// ================= LISTAR USUÁRIOS =================
async function carregarUsuarios() {
  guestTableBody.innerHTML = "";

  const q = query(
    collection(db, "usuarios"),
    orderBy("nome")
  );

  const snapshot = await getDocs(q);

  snapshot.forEach(docSnap => {
    const u = docSnap.data();

    guestTableBody.innerHTML += `
      <tr>
        <td>${docSnap.id}</td>
        <td>${u.nome}</td>
        <td>${u.cpf}</td>
        <td>${u.email}</td>
        <td>
          <button class="btn btn-danger btn-sm"
            onclick="excluirUsuario('${docSnap.id}')">
            Excluir
          </button>
        </td>
      </tr>
    `;
  });
}

// ================= EXCLUIR =================
window.excluirUsuario = async id => {
  await deleteDoc(doc(db, "usuarios", id));
  carregarUsuarios();
};

// ================= FILTRO =================
window.filtrarUsuarios = texto => {
  texto = texto.toLowerCase();
  document.querySelectorAll("#guestTableBody tr").forEach(tr => {
    tr.style.display = tr.innerText.toLowerCase().includes(texto)
      ? ""
      : "none";
  });
};

// ================= INIT =================
carregarUsuarios();
