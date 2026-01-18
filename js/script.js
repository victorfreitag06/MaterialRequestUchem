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

// ================= ELEMENTOS =================
const materialFormModal = document.getElementById("materialFormModal");
const materialForm = document.getElementById("materialForm");
const materialTableBody = document.getElementById("materialTableBody");
const btnAddMaterial = document.getElementById("btnAddMaterial");
const btnCancelarMaterial = document.getElementById("btnCancelarMaterial");
const filtroMaterial = document.getElementById("filtroMaterial");

// ================= MENU NAVBAR =================
window.showBanco = (id, btn) => {
  document.querySelectorAll(".banco-rolagem").forEach(div => div.classList.remove("show"));
  document.getElementById(id).classList.add("show");
  document.querySelectorAll(".option-banco").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
};

// Navbar moderna sem onclick inline
document.querySelectorAll(".option-banco").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-target");
    showBanco(target, btn);
  });
});

// ================= MODAL =================
btnAddMaterial.addEventListener("click", () => materialFormModal.style.display = "block");
btnCancelarMaterial.addEventListener("click", () => {
  materialFormModal.style.display = "none";
  materialForm.reset();
});

// ================= SALVAR REQUISIÇÃO + EMAIL =================
materialForm.addEventListener("submit", async e => {
  e.preventDefault();

  const osNumero = document.getElementById("matOS").value.trim();
  if (!/^\d{4,6}$/.test(osNumero)) {
    alert("O Número da O.S. deve conter entre 4 e 6 dígitos inteiros.");
    return;
  }

  const qtd = document.getElementById("matQtd").value;
  const unidade = document.getElementById("matUnidade").value;
  if (!qtd || !unidade) {
    alert("Informe a quantidade e selecione a unidade.");
    return;
  }

  const requisicao = {
    numeroOS: parseInt(osNumero),
    nome: document.getElementById("matNome").value,
    funcao: document.getElementById("matFuncao").value,
    material: document.getElementById("matMaterial").value,
    quantidade: `${qtd} ${unidade}`,
    motivo: document.getElementById("matMotivo").value,
    equipamento: document.getElementById("matEquipamento").value,
    data: new Date().toLocaleString()
  };

  await addDoc(collection(db, "requisicoes"), requisicao);

  emailjs.send("service_ph9nt3h", "template_fnmgrcp", requisicao)
    .catch(err => console.error("Erro EmailJS:", err));

  materialFormModal.style.display = "none";
  materialForm.reset();
  carregarMateriais();
});

// ================= LISTAR REQUISIÇÕES =================
async function carregarMateriais() {
  materialTableBody.innerHTML = "";
  const q = query(collection(db, "requisicoes"), orderBy("numeroOS", "asc"));
  const snapshot = await getDocs(q);

  snapshot.forEach(docSnap => {
    const r = docSnap.data();
    materialTableBody.innerHTML += `
      <tr>
        <td>${r.numeroOS}</td>
        <td>${r.nome}</td>
        <td>${r.funcao}</td>
        <td>${r.material}</td>
        <td>${r.quantidade}</td>
        <td>${r.motivo}</td>
        <td>${r.equipamento || "-"}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="excluirMaterial('${docSnap.id}')">Excluir</button>
        </td>
      </tr>
    `;
  });
}

// ================= EXCLUIR =================
window.excluirMaterial = async id => {
  await deleteDoc(doc(db, "requisicoes", id));
  carregarMateriais();
};

// ================= FILTRO =================
filtroMaterial.addEventListener("keyup", () => {
  const texto = filtroMaterial.value.toLowerCase();
  document.querySelectorAll("#materialTableBody tr").forEach(tr => {
    tr.style.display = tr.innerText.toLowerCase().includes(texto) ? "" : "none";
  });
});

// ================= INIT =================
carregarMateriais();
