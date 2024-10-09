import { db } from "@/services/firebaseConfig";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc  } from "firebase/firestore"; 

export async function getProducts() {
    try {
        const querySnapshot = await getDocs(collection(db, "produtos"));
        const products: any = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });
        return products;
    } catch (e) {
        console.error("Error getting documents: ", e);
    }
}
