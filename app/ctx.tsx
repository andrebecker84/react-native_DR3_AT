import { useContext, createContext, type PropsWithChildren, useState } from 'react';
import { useStorageState } from './useStorageState';
import { router } from 'expo-router';
import { firebaseApp } from "@/services/firebaseConfig";
import { createLogin, login, logout } from "@/services/auth";

// Define o tipo do contexto
type AuthContextType = {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, nome: string) => Promise<void>;
  setId: (id: string | null) => void;
  id?: string | null;
  setUserEmail: (email: string | null) => void;
  userEmail?: string | null;
  firebaseApp?: typeof firebaseApp | null;
  session?: string | null;
  isLoading: boolean;
  isLoadingEmail: boolean;
};

// Inicialização do contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook para acessar o contexto
export function useSession() {
  const context = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production' && !context) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }
  return context;
}

// Função para validar e-mail
const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [id, setId] = useState<string | null>(null);
  const [[isLoadingEmail, userEmail], setUserEmail] = useStorageState('email');

  // Implementa o método signUp com validação de e-mail
  const signUp = async (email: string, password: string, nome: string) => {
    if (!isValidEmail(email)) {
      throw new Error("E-mail inválido. Por favor, insira um e-mail válido.");
    }
    await createLogin(email, password, nome);
    // Após a criação, você pode redirecionar ou definir a sessão conforme necessário
    // router.replace('(tabs)'); // Descomente se precisar redirecionar
  };

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string, password: string) => {
          await login(email, password, setSession, setUserEmail);
        },
        signOut: async () => {
          await logout();
          setSession(null);
        },
        signUp,
        firebaseApp,
        setId,
        id,
        session,
        isLoading,
        userEmail,
        isLoadingEmail,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
