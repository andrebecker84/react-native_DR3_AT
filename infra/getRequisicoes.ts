import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  setDoc, // Importando setDoc
} from "firebase/firestore";
import { db } from "@/services/firebaseConfig";

export async function getCotacao() {
  try {
    const querySnapshot = await getDocs(collection(db, "cotacoes"));
    const cotacao: Array<Requisicao> = []; // Especificar o tipo correto aqui
    querySnapshot.forEach((doc) => {
      cotacao.push({ id: doc.id, ...doc.data() } as Requisicao); // Cast para o tipo correto
    });
    return cotacao;
  } catch (erro) {
    console.error("Erro ao buscar cotações: ", erro);
  }
}

export async function deleteCotacao(id: string) {
  try {
    await deleteDoc(doc(db, "cotacoes", id));
    console.log("Cotação deletada com o ID: ", id);
  } catch (erro) {
    console.error("Erro ao apagar cotação: ", erro);
  }
}

export async function getCadastroCompra() {
  try {
    const querySnapshot = await getDocs(collection(db, "requisicoes"));
    const requisicao: Array<CadastroCompra> = []; // Especificar o tipo correto aqui
    querySnapshot.forEach((doc) => {
      requisicao.push({ id: doc.id, ...doc.data() } as CadastroCompra); // Cast para o tipo correto
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

export async function updateCadastroCompra(requisicao: CadastroCompra) {
  try {
    const docRef = doc(db, "requisicoes", requisicao.id);
    const requisicaoRef = {
      produto: requisicao.produto,
      quantidade: requisicao.quantidade,
      valorUnitario: requisicao.valorUnitario, // Adicione valorUnitario, se necessário
      valorTotal: requisicao.valorTotal, // Adicione valorTotal, se necessário
      dataEdicaoReq: requisicao.dataEdicaoReq, // Certifique-se de que este campo está correto
      prioridade: requisicao.prioridade, // Verifique se este campo está correto
      notas: requisicao.notas || '', // Use uma string vazia se notas não estiver definida
      statusCotacao: requisicao.statusCotacao, // Certifique-se de usar o nome correto
    };
    
    await updateDoc(docRef, requisicaoRef);
    console.log("Requisição de Compra atualizada com ID: ", requisicao.id);
  } catch (erro) {
    console.error("Erro ao atualizar a requisição de compra: ", erro);
  }
}

// Atualizando a função para adicionar a requisição com RID como ID
export const addCadastroCompra = async (novaRequisicao: CadastroCompra) => {
  try {
    const { RID, ...dados } = novaRequisicao; // Desestrutura os dados
    const docRef = doc(db, "requisicoes", RID); // Cria uma referência com RID como ID
    await setDoc(docRef, {
      RID, // Mantém o ID que você também quer guardar no documento
      ...dados,
    });
    console.log("Requisição de Compra efetuada com ID: ", RID);
    return { id: RID }; // Retorna o ID da requisição
  } catch (erro) {
    console.error("Erro ao adicionar requisição: ", erro);
  }
};
