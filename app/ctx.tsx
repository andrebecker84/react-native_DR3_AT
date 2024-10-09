import { useContext, createContext, type PropsWithChildren, useEffect, useState } from 'react';
import { setStorageItemAsync, useStorageState } from './useStorageState';
import { router } from "expo-router";
import { FirebaseApp, initializeApp } from "firebase/app";
import { login, createLogin, logout } from "@/services/auth";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseConfig } from "@/services/firebaseConfig";

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const AuthContext = createContext<{
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    signUp: (email: string, password: string, nome: string) => Promise<void>;
    firebaseApp?: FirebaseApp | null;
    session?: string | null;
    isLoading: boolean;
    changeTheme: (theme: string) => Promise<void>;
    theme?: string | null;
    isLoadingTheme: boolean;
}>(/* initial values */);

export function useSession() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }
    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');
    const [[isLoadingTheme, theme], setTheme] = useStorageState('theme');
    const [authIsLoading, setAuthIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setSession(user.uid);
            } else {
                setSession(null);
            }
            setAuthIsLoading(false);
        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider
            value={{
                signIn: async (email: string, password: string) => {
                    try {
                        await login(email, password, setSession);
                    } catch (error) {
                        console.error('Error during sign-in:', error);
                    }
                },
                signOut: async () => {
                    try {
                        await logout();
                        setSession(null);
                        router.replace("/login");
                    } catch (error) {
                        console.error('Error during sign-out:', error);
                    }
                },
                signUp: async (email: string, password: string, nome: string) => {
                    try {
                        await createLogin(email, password, nome);
                        router.replace("/login");
                    } catch (error) {
                        console.error('Error during sign-up:', error);
                    }
                },
                changeTheme: async (theme: string) => {
                    await setStorageItemAsync('theme', theme);
                    setTheme(theme);
                },
                firebaseApp: firebaseApp,
                session,
                isLoading: isLoading || authIsLoading,
                theme,
                isLoadingTheme,
            }}>
            {children}
        </AuthContext.Provider>
    );
}
