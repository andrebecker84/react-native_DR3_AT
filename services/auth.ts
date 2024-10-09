import { router } from "expo-router";
import {
  IdTokenResult,
  signInWithEmailAndPassword,
  UserCredential,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "@firebase/auth";
import { auth } from "@/services/firebaseConfig";
import { addUsuario } from "@/infra/usuarios";

const login = async (
  email: string,
  password: string,
  setSession: any,
  setUserEmail: any
) => {

  try {
    const response: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user: any = response.user.toJSON();
    setSession(user.stsTokenManager.accessToken);
    setUserEmail(user);
    router.replace("/(tabs)");
  } catch (error) {
    console.error("Error during login:", error);
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

const createLogin = async (
  email: string,
  password: string,
  nome: string
) => {

  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user: any = response.user;
    await updateProfile(user, {
      displayName: nome,
    });
    const newUser = {
      nome: user.displayName,
      email: user.email,
      ativo: true,
      telefone: "",
    };
    await addUsuario(newUser);

    router.replace("/login");
    
  } catch (error: any) {
    console.log("Sign up failed:", error);
  }
};

export { login, logout, createLogin };
