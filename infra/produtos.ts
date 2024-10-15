import { db } from "@/services/firebaseConfig";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc  } from "firebase/firestore"; 

export async function getProdutos() {
  try {
      const querySnapshot = await getDocs(collection(db, 'produtos'));
      const produtos: any = [];
      querySnapshot.forEach((doc) => {
          produtos.push({ id: doc.id, ...doc.data() });
      });
      return produtos;
  } catch (erro) {
      console.error("Error ao carregar produtos: ", erro);
      return []; // Retorne um array vazio em caso de erro
  }
}
