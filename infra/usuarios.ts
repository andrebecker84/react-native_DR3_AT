import { auth, db } from "@/services/firebaseConfig";
import { onAuthStateChanged, updatePhoneNumber, updateProfile } from "firebase/auth";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
  } from "firebase/firestore";

export async function addUsuario(novoUsuario: any) {
    try {
      const docRef = await addDoc(collection(db, "usuarios"), novoUsuario);
      console.log("Usuário adicionado com ID: ", docRef.id);
    } catch (erro) {
      console.error("Erro ao adicionar usuário: ", erro);
    }
  }

  export async function getUsuario() {
    try {
      const querySnapshot = await getDocs(collection(db, "usuario"));
      const users: any = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      return users;
    } catch (erro) {
      console.error("Erro ao buscar usuários: ", erro);
      return []; // Retorna um array vazio em caso de erro
    }
  }
  export async function updateUsuario(usuario: any) {
    try {
      //console.log(RequisicaoDeCompra);
      const docRef = doc(db, "usuario", usuario.id);
      const updateTelefone = {
        telefone: usuario.telefone,
      };
      await updateDoc(docRef, updateTelefone);
      console.log("Usuário atualizado com ID: ", usuario.id);
    } catch (erro) {
      console.error("Erro ao atualizar usuário: ", erro);
    }
  }

  export async function getUserAuthentication() {
    return new Promise((resolve, reject) => {
      try {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const userData = user;
            //console.log("Usuário autenticado: ", userData);
            resolve(userData);
          } else {
            resolve(null); // Nenhum usuário autenticado
          }
        });
      } catch (erro) {
        reject("Erro na autenticação: " + erro);
      }
    });
  }

  export async function updateUserAuthentication(infoUser: any) {
    try {
        const user = auth.currentUser;

        if (!user) {
            throw new Error("Usuário não autenticado.");
        }

        await updateProfile(user, {
            displayName: infoUser.nome,
            photoURL: infoUser.photoURL,
        });
        console.log("Perfil atualizado com sucesso");
    } catch (erro: any) {
        console.error("Erro ao atualizar perfil: ", erro.message);
    }
}


  
