import { ScrollView, Pressable } from 'react-native'; // Certifique-se de incluir Pressable aqui
import { Avatar, Button, Grid, Snackbar, Text, TextInput } from "@/components";
import { useSession } from "@/app/ctx";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

export default function LoginScreen() {
    const { signIn } = useSession();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [email, setEmail] = useState('tiago@gmail.com');
    const [password, setPassword] = useState('123456');
    const [helpData, setHelpData] = useState({
        email: null,
        password: null,
    });
    const router = useRouter();

    const verifyFields = (text: string, name: string) => {
        setHelpData((prev: any) => ({
            ...prev,
            [name]: text.length === 0 ? "Campo obrigatório" : null,
        }));
    };

    const handleSignIn = async () => {
        if (email.length > 0 && password.length > 0) {
            setLoading(true);
            try {
                await signIn(email, password);
            } catch (error) {
                const errorMessage = error?.message ?? 'Erro desconhecido';
                if (errorMessage.includes('auth/invalid-credential')) {
                    setMessage("Credenciais inválidas.");
                } else if (errorMessage.includes('auth/user-not-found')) {
                    setMessage("Usuário não encontrado.");
                } else if (errorMessage.includes('auth/wrong-password')) {
                    setMessage("Senha incorreta.");
                } else {
                    setMessage("Erro durante o login. Tente novamente.");
                }
            } finally {
                setLoading(false);
            }
        } else {
            setMessage("Preencha todos os campos.");
            verifyFields(email, 'email');
            verifyFields(password, 'password');
        }
    };

    return (
        <>
            <ScrollView>
                <Grid style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                    <Grid style={{ marginTop: 50, ...styles.container, ...styles.padding }}>
                        <Avatar size={200} source={require('../assets/images/logo.png')} />
                    </Grid>
                    <Grid style={{ ...styles.padding, ...styles.container }}>
                        <Text style={{ fontSize: 24 }}>Seja Bem-vindo!!!</Text>
                    </Grid>
                    <Grid style={styles.padding}>
                        <TextInput
                            value={email}
                            keyboardType="email-address"
                            onChangeText={(text: string) => {
                                setEmail(text);
                                verifyFields(text, 'email');
                            }}
                            label="E-mail"
                            helpText={helpData.email}
                            error={helpData.email !== null}
                        />
                    </Grid>
                    <Grid style={styles.padding}>
                        <TextInput
                            value={password}
                            onChangeText={(text: string) => {
                                setPassword(text);
                                verifyFields(text, 'password');
                            }}
                            label="Senha"
                            secureTextEntry
                            helpText={helpData.password}
                            error={helpData.password !== null}
                        />
                    </Grid>
                    <Grid style={{ ...styles.padding, ...styles.container }}>
                        <Pressable onPress={() => router.push("register")}>
                            <Text style={{ color: '#0000EE' }}>Criar conta</Text>
                        </Pressable>
                    </Grid>
                    <Grid style={styles.padding}>
                        <Button
                            style={{ borderRadius: 0 }}
                            loading={loading}
                            mode="contained"
                            onPress={handleSignIn}
                        >
                            Entrar
                        </Button>
                    </Grid>
                    <Grid style={{ ...styles.padding, ...styles.container }}>
                        <Pressable onPress={() => router.push("forgot-password")}>
                            <Text style={{ color: '#0000EE' }}>Esqueci minha senha</Text>
                        </Pressable>
                    </Grid>
                </Grid>
            </ScrollView>
            <Snackbar
                visible={message !== null}
                onDismiss={() => setMessage(null)}
                duration={5000}
                text={message}
            />
        </>
    );
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    padding: {
        padding: 16,
    },
};
