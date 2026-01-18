// Regras de negócio e acesso ao Firestore (Usuários)

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

const guestTableBody = document.getElementById("guestTableBody");

export async function salvarUsuario(usuario) {
  await addDoc(collection(db, "usuarios"), usuario);
}

export async function listarUsuarios() {
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

window.excluirUsuario = async id => {
  await deleteDoc(doc(db, "usuarios", id));
  listarUsuarios();
};
