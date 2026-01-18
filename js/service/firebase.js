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

// ================= CONFIG =================
const firebaseConfig = {
  apiKey: "AIzaSyA-9He-8SuZ_pIIxTwZe0vrwyd8hcAu4oQ",
  authDomain: "feature-request-cc834.firebaseapp.com",
  projectId: "feature-request-cc834",
  storageBucket: "feature-request-cc834.appspot.com",
  messagingSenderId: "1002484973088",
  appId: "1:1002484973088:web:3930ba674b03ce09344645"
};

// ================= INIT =================
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const guestTableBody = document.getElementById("guestTableBody");
const guestForm = document.getElementById("guestForm");

// ================= SALVAR =================
guestForm.addEventListener("submit", async e => {
  e.preventDefault();

  const usuario = {
    nome: guestNome.value,
    cpf: guestCpf.value,
    email: guestEmail.value,
    senha: guestSenha.value
  };

  await addDoc(collection(db, "usuarios"), usuario);

  emailjs.send("service_ph9nt3h", "template_fnmgrcp", {
    nome: usuario.nome,
    email: usuario.email,
    cpf: usuario.cpf
  }).catch(err => console.error("EmailJS:", err));

  closeGuestForm();
  carregarUsuarios();
});

// ================= LISTAR =================
async function carregarUsuarios() {
  guestTableBody.innerHTML = "";

  const q = query(collection(db, "usuarios"), orderBy("nome"));
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

// INIT
carregarUsuarios();
