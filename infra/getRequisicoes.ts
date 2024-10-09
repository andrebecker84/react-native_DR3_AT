import {
  addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import { db } from "@/services/firebaseConfig";

  export async function getCotacao() {
    try {
      const querySnapshot = await getDocs(collection(db, "cotacao"));
      const cotacao: any = [];
      querySnapshot.forEach((doc) => {
        cotacao.push({ id: doc.id, ...doc.data() });
      });
      return cotacao;
    } catch (erro) {
      console.error("Error getting documents: ", erro);
    }
  }

  export async function deleteCotacao(id: string) {
    try {
      await deleteDoc(doc(db, "cotacao", id));
      console.log("Document deleted with ID: ", id);
    } catch (erro) {
      console.error("Error deleting document: ", erro);
    }
  }

  export async function getCadastroCompra() {
    try {
      const querySnapshot = await getDocs(collection(db, "requisicoes"));
      const requisicao: any = [];
      querySnapshot.forEach((doc) => {
        requisicao.push({ id: doc.id, ...doc.data() });
      });
      return requisicao;
    } catch (erro) {
      console.error("Erro ao buscar requisições de compras: ", erro);
    }
  }

  export async function deleteCadastroCompra(id: string) {
    try {
      await deleteDoc(doc(db, "requisicoes", id));
      console.log("Requisição de Compra excluída com ID: ", id);
    } catch (erro) {
      console.error("Erro ao excluir a requisição de compra: ", erro);
    }
  }

  export async function updateCadastroCompra(requisicao: any) {
    try {
      const docRef = doc(db, "requisicoes", requisicao.id);
      const requisicaoRef = {
        produto: requisicao.produto,
        quantidade: requisicao.quantidade,
        data: requisicao.data,
        prioridade: requisicao.prioridade,
        observacoes: requisicao.observacoes,
        status: requisicao.status,
      };
      await updateDoc(docRef, requisicaoRef);
      console.log("Requisição de Compra atualizada com ID: ", requisicao.id);
    } catch (erro) {
      console.error("Erro ao atualizar a requisição de compra: ", erro);
    }
  }

  export async function addCadastroCompra(novaRequisicao: any) {
    try {
      const docRef = await addDoc(collection(db, "CadastroCompra"), novaRequisicao);
      console.log("Requisição de Compra efetuada com ID: ", docRef.id);
    } catch (erro) {
      console.error("Erro ao criar a requisição de compra: ", erro);
    }
  }
