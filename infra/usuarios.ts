import { auth, db } from "@/services/firebaseConfig";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
} from "firebase/firestore";
import { uploadImageToFirebaseStorage, deleteImage } from "@/services/storage"; // ajuste o caminho conforme necessário
import { UserInterface } from "@/interfaces/User";

// Função para adicionar um novo usuário
export async function addUsuario(novoUsuario: UserInterface) {
    try {
        const docRef = await addDoc(collection(db, "usuario"), novoUsuario);
        console.log("Usuário adicionado com ID: ", docRef.id);
    } catch (e) {
        console.error("Erro ao adicionar documento: ", e);
    }
}

// Função para obter todos os usuários
export async function getUsuarios(): Promise<UserInterface[]> {
    try {
        const querySnapshot = await getDocs(collection(db, "usuario"));
        const users: UserInterface[] = [];
        querySnapshot.forEach((doc) => {
            users.push({ id: doc.id, ...doc.data() } as UserInterface);
        });
        return users;
    } catch (e) {
        console.error("Erro ao obter documentos: ", e);
        return [];
    }
}

// Função para atualizar informações de um usuário
export async function updateUsuario(usuario: UserInterface) {
    try {
        const docRef = doc(db, "usuario", usuario.id!);
        const updateData = { telefone: usuario.phoneNumber, email: usuario.email }; // Adicione campos adicionais conforme necessário
        await updateDoc(docRef, updateData);
        console.log("Documento atualizado com ID: ", usuario.id);
    } catch (e) {
        console.error("Erro ao atualizar documento: ", e);
    }
}

// Função para obter dados de autenticação do usuário
export async function getUserAuthentication(): Promise<UserInterface | null> {
    return new Promise((resolve, reject) => {
        try {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const userData: UserInterface = {
                        uid: user.uid,
                        email: user.email ?? "",
                        emailVerified: user.emailVerified,
                        nome: user.displayName ?? "",
                        phoneNumber: user.phoneNumber ?? "",
                        photoURL: user.photoURL ?? "",
                        dataCriacao: user.metadata.creationTime ? new Date(user.metadata.creationTime) : undefined,
                        role: 'colaborador', // Atribua um valor padrão ou customize conforme necessário
                        sync: 1,
                        blocked: false
                    };
                    resolve(userData);
                } else {
                    resolve(null);
                }
            });
        } catch (e) {
            reject("Erro na autenticação: " + e);
        }
    });
}

// Função para atualizar a autenticação do usuário e foto de perfil
export async function updateUserAuthentication(infoUser: { nome: string; photoURL?: string }) {
    try {
        const user = auth.currentUser;

        if (!user) {
            throw new Error("Usuário não autenticado.");
        }

        await updateProfile(user, {
            displayName: infoUser.nome,
            photoURL: infoUser.photoURL,
        });
        console.log("Usuário atualizado com sucesso");
    } catch (e: any) {
        console.error("Erro ao atualizar usuário: ", e.message);
    }
}

// Função para atualizar a foto de perfil e armazenar o link no Firestore
export async function updateUserProfilePicture(uid: string, uri: string) {
    try {
        const photoURL = await uploadImageToFirebaseStorage(uri, "usuarios", uid);
        const userDocRef = doc(db, "usuario", uid);
        await updateDoc(userDocRef, { photoURL });
        console.log("Foto de perfil atualizada com sucesso.");
    } catch (e) {
        console.error("Erro ao atualizar a foto de perfil:", e);
    }
}

export async function deleteUserProfilePicture(uid: string) {
    try {
        await deleteImage("usuarios", uid);
        console.log("Foto de perfil deletada com sucesso.");
    } catch (e) {
        console.error("Erro ao deletar a foto de perfil:", e);
    }
}
