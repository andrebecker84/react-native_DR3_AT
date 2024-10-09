import { router } from "expo-router";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from "@firebase/auth";
import { addUsuario } from "@/infra/usuarios";
import { UserInterface } from "@/interfaces/User";
import { Timestamp } from "firebase/firestore"; // Para suportar Timestamp

const auth = getAuth();

const login = async (email: string, password: string, setSession: any) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const user: any = response.user.toJSON();

    const _user: UserInterface = {
      uid: user.uid,
      email: user.email || "",
      emailVerified: Boolean(user.emailVerified), // Conversão para booleano
      nome: user.displayName || "",
      role: user.role, // Supondo que o role seja carregado aqui
      phoneNumber: user.phoneNumber || "",
      photoURL: user.photoURL || "",
      dataCriacao: user.metadata.creationTime ? new Date(user.metadata.creationTime) : Timestamp.now(),
      sync: 1,
      blocked: user.blocked || false, // Adicionado suporte para bloqueio
    };

    setSession(user.stsTokenManager.accessToken);
    return router.replace("(tabs)");
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    router.replace("/login");
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

const createLogin = async (email: string, password: string, nome: string) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const user: any = response.user;

    await updateProfile(user, { displayName: nome });

    const newUser: UserInterface = {
      uid: user.uid,
      email: user.email,
      emailVerified: false,
      nome: user.displayName,
      phoneNumber: "",
      photoURL: "",
      dataCriacao: Timestamp.now(),
      role: 'colaborador', // Role padrão
      blocked: false, // Usuário não bloqueado ao criar conta
    };

    await addUsuario(newUser);
    router.replace("/login");
  } catch (error: any) {
    console.error("Sign up failed:", error);
  }
};

export { login, logout, createLogin };
