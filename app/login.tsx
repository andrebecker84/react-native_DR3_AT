import {
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { useSession } from "@/app/ctx";
import { useState, useEffect } from "react";
import { Link } from "expo-router";
import { Avatar, Button, Grid, Snackbar, TextInput } from "@/components";
import { Text } from "react-native-paper";
import { router } from "expo-router";

export default function LoginScreen() {
  const { signIn, signUp } = useSession();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [nome, setNome] = useState(""); 
  const [possuiConta, setPossuiConta] = useState(true);
  const [helpData, setHelpData] = useState({
    nome: null,
    email: null,
    password: null,
  });
  const [imageSource, setImageSource] = useState(require("@/assets/images/logoACME.png"));

  useEffect(() => {
    if (possuiConta) {
      setEmail("colaborador@teste.com");
      setPassword("teste123");
    } else {
      setEmail("");
      setPassword("");
    }
  }, [possuiConta]);

  const verifyFields = (text, name) => {
    setHelpData(prev => ({
      ...prev,
      [name]: text.length === 0 ? "Campo obrigatório" : null,
    }));
  };

  const handleAuth = async () => {
    setLoading(true);
    try {
      if (possuiConta) {
        await signIn(email, password);
      } else {
        await signUp(email, password, nome); // Corrigido: ordem dos parâmetros
      }
      setMessage(possuiConta ? "Login realizado com sucesso!" : "Conta criada com sucesso!");
    } catch (error) {
      setMessage("Erro: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Grid style={{ height: '100%', ...styles.container }}>
          <Grid style={{ marginTop: 60, ...styles.container, ...styles.padding }}>
            <Avatar size={350} bgColor='transparent' source={imageSource}/>
          </Grid>
          <Grid style={styles.padding}>
            {possuiConta && (
              <Text style={styles.textHeader}>Seja bem-vindo!</Text>
            )}
          </Grid>
          <Text style={styles.textHeader}>
            {possuiConta ? "" : "Criar Conta"}
          </Text>
          {!possuiConta && (
            <Grid>
              <TextInput
                value={nome}
                onChangeText={(text) => {
                  setNome(text);
                  verifyFields(text, 'nome');
                }}
                label="Nome"
                helpText={helpData.nome}
                error={helpData.nome !== null}
              />
            </Grid>
          )}
          <Grid>
            <TextInput
              value={email}
              keyboardType="email-address"
              onChangeText={(text) => {
                setEmail(text);
                verifyFields(text, 'email');
              }}
              label="E-mail"
              helpText={helpData.email}
              error={helpData.email !== null}
            />
          </Grid>
          <Grid>
            <TextInput
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                verifyFields(text, 'password');
              }}
              label="Senha"
              secureTextEntry={true}
              helpText={helpData.password}
              error={helpData.password !== null}
            />
          </Grid>
          {possuiConta && (
            <Grid style={styles.padding}>
              <TouchableOpacity onPress={() => router.replace("/forgot-password")}>
                <Text style={styles.switchText}>Esqueci minha senha</Text>
              </TouchableOpacity>
            </Grid>
          )}
            {possuiConta ? (
                <Grid style={styles.buttonContainer}>
                  <Button
                    width={300}
                    icon="login-variant"
                    mode="contained"
                    onPress={handleAuth}
                    style={styles.loginButton}
                    loading={loading}
                  >
                    LOGIN
                  </Button>
                  <Button
                    width={300}
                    icon="account-plus"
                    mode="contained"
                    onPress={() => {
                      setPossuiConta(!possuiConta);
                      setImageSource(require("@/assets/images/criarConta.png"));
                    }}
                    style={styles.signupButton}
                  >
                    CRIAR CONTA
                  </Button>
                </Grid>
            ) : (
              <Grid style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 20 }}>
                <Button
                  width={300}
                  icon="account-plus"
                  mode="contained"
                  onPress={handleAuth}
                  style={styles.signupButton}
                  loading={loading}
                >
                  CRIAR CONTA
                </Button>
              </Grid>
            )}
          {!possuiConta && (
            <Grid style={styles.alternateOptionContainer}>
              <Text style={styles.switchText}>Já possui uma conta?</Text>
              <Button
                width={170}
                icon="login-variant"
                mode="contained"
                onPress={() => {
                  setPossuiConta(true);
                  setImageSource(require("@/assets/images/logoACME.png"));
                }}
                style={styles.loginButton}
              >
                LOGIN
              </Button>
            </Grid>
          )}
          <Snackbar
            visible={message !== null}
            onDismiss={() => setMessage(null)}
            duration={4000}
          >
            {message}
          </Snackbar>
        </Grid>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(10, 0, 30)",
  },
  padding: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 20,
    marginTop: 20,
  },
  alternateOptionContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
  },
  loginButton: {
    padding: 5,
    borderRadius: 30,
    backgroundColor: "rgb(0, 100, 255)",
  },
  signupButton: {
    padding: 5,
    borderRadius: 30,
    backgroundColor: 'rgb(223, 70, 97)',
  },
  switchText: {
    marginTop: 10,
    color: "hsl(215, 15%, 75%)",
    fontSize: 15,
    letterSpacing: 1,
  },
  textHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 2,
  }
});
