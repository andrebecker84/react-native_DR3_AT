import {FirebaseStorage, getDownloadURL, ref, getStorage, uploadBytes, deleteObject} from "@firebase/storage";
import { firebaseApp } from "@/services/firebaseConfig";
import conexao from "@/services/verificarConexao";


const uriToBlob = async (uri: string) => {
    const response = await fetch(uri);
    return await response.blob();
}

const uploadImageToFirebaseStorage = async (uri: string, path: string, name: string) => {
    const imageBlog = await uriToBlob(uri);
    if (!conexao()) {
        throw new Error('Sem conexão com a internet...');
        return false
    }else{
    try {
        const storage: FirebaseStorage = getStorage(firebaseApp);
        const storageRef = ref(storage, `images/${path}/${name}`);
        await uploadBytes(storageRef, imageBlog);
        return await getDownloadURL(storageRef);
    } catch (erro) {
        console.error(`[uploadImageToFirebaseStorage] >> Erro ao enviar imagem: ${erro}`);
        throw erro;
    }
}
}

const deleteImage = async (path: string, name: string) => {
    try {
        const storage: FirebaseStorage = getStorage(firebaseApp);
        const storageRef = ref(storage, `images/${path}/${name}`);
        await deleteObject(storageRef);
    }catch (erro) {
        console.error(`[deleteImage] > Erro ao deletar imagem: ${erro}`);
        throw erro;
    }
}

export {
    uploadImageToFirebaseStorage,
    deleteImage
}
