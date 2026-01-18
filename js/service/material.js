// Regras de negócio e acesso ao Firestore (Requisições de Materiais)

import { db } from "../config/firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const materialTableBody = document.getElementById("materialTableBody");

// Salvar nova requisição
export async function salvarRequisicao(requisicao) {
  await addDoc(collection(db, "requisicoes"), requisicao);
}

// Listar todas as requisições
export async function listarRequisicoes() {
  materialTableBody.innerHTML = "";

  const q = query(
    collection(db, "requisicoes"),
    orderBy("data", "desc") // Ordena pela data da requisição
  );

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

// Excluir requisição
window.excluirRequisicao = async id => {
  await deleteDoc(doc(db, "requisicoes", id));
  listarRequisicoes();
};
