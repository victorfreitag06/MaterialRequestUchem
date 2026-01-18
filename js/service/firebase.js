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

// ================= ELEMENTOS =================
const materialTableBody = document.getElementById("materialTableBody");
const materialForm = document.getElementById("materialForm");

// ================= MODAL =================
const materialFormModal = document.getElementById("materialFormModal");
window.showAddMaterialForm = () => materialFormModal.style.display = "block";
window.closeMaterialForm = () => {
  materialFormModal.style.display = "none";
  materialForm.reset();
};

// ================= SALVAR =================
materialForm.addEventListener("submit", async e => {
  e.preventDefault();

  const requisicao = {
    nome: document.getElementById("matNome").value,
    funcao: document.getElementById("matFuncao").value,
    material: document.getElementById("matMaterial").value,
    quantidade: document.getElementById("matQtd").value,
    motivo: document.getElementById("matMotivo").value,
    equipamento: document.getElementById("matEquipamento").value,
    data: new Date().toLocaleString()
  };

  // Salva no Firestore
  await addDoc(collection(db, "requisicoes"), requisicao);

  // Envia email (opcional)
  emailjs.send("service_ph9nt3h", "template_fnmgrcp", requisicao)
    .catch(err => console.error("EmailJS:", err));

  closeMaterialForm();
  carregarMateriais();
});

// ================= LISTAR =================
async function carregarMateriais() {
  materialTableBody.innerHTML = "";

  const q = query(collection(db, "requisicoes"), orderBy("data", "desc"));
  const snapshot = await getDocs(q);

  snapshot.forEach(docSnap => {
    const r = docSnap.data();

    materialTableBody.innerHTML += `
      <tr>
        <td>${docSnap.id}</td>
        <td>${r.nome}</td>
        <td>${r.funcao}</td>
        <td>${r.material}</td>
        <td>${r.quantidade}</td>
        <td>${r.motivo}</td>
        <td>${r.equipamento || "-"}</td>
        <td>
          <button class="btn btn-danger btn-sm"
            onclick="excluirRequisicao('${docSnap.id}')">
            Excluir
          </button>
        </td>
      </tr>
    `;
  });
}

// ================= EXCLUIR =================
window.excluirRequisicao = async id => {
  await deleteDoc(doc(db, "requisicoes", id));
  carregarMateriais();
};

// ================= FILTRO =================
window.filtrarMaterial = texto => {
  texto = texto.toLowerCase();
  document.querySelectorAll("#materialTableBody tr").forEach(tr => {
    tr.style.display = tr.innerText.toLowerCase().includes(texto)
      ? ""
      : "none";
  });
};

// ================= INIT =================
carregarMateriais();
