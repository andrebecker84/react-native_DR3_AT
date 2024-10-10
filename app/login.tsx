import {
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { useSession } from "@/app/ctx";
import { useState } from "react";
import { Link } from "expo-router";
import { Avatar, Button, Grid, Snackbar, TextInput } from "@/components";
import { Text } from "react-native-paper";
import { router } from "expo-router";

export default function LoginScreen() {
  const { signIn, signUp } = useSession();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState("colaborador@teste.com"); // Preenchido com valor fixo para login
  const [password, setPassword] = useState("teste123"); // Preenchido com valor fixo para login
  const [nome, setNome] = useState(""); // Inicialmente vazio na tela de login
  const [possuiConta, setPossuiConta] = useState(true);
  const [helpData, setHelpData] = useState({
    nome: null,
    email: null,
    password: null,
  });
  const [imageSource, setImageSource] = useState(require("@/assets/images/logoACME.png"));

  const handleCreateAccount = () => {
    // Defina a nova imagem aqui, você pode ter várias imagens para alternar
    setImageSource(require("@/assets/images/criarConta.png"));
  };

  const verifyFields = (text: string, name: string) => {
    setHelpData((v: any) => ({
      ...v,
      [name]: text.length === 0 ? "Campo obrigatório" : null,
    }));
  };

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Grid style={{
          backgroundColor: "rgb(10, 0, 30)",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}>
          <Grid style={{
            marginTop: 100,
            ...styles.container,
            ...styles.padding,
          }}>
            <Avatar size={350} bgColor='transparent' source={imageSource}/>
          </Grid>
          <Grid style={{...styles.padding}}>
            {possuiConta && (
              <Text style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                letterSpacing: 2,
              }}>
                Seja bem-vindo!
              </Text>
            )}
          </Grid>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            letterSpacing: 2,
          }}>
            {possuiConta ? 
              "" :
            "Criar Conta"
            }
          </Text>
          {possuiConta ? null : (
            <Grid>
              <TextInput
                value={nome}
                onChangeText={(text: string) => {
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
              onChangeText={(text: string) => {
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
              onChangeText={(text: string) => {
                setPassword(text);
                verifyFields(text, 'password');
              }}
              label="Senha"
              secureTextEntry={true}
              helpText={helpData.password}
              error={helpData.password !== null}
            />
          </Grid>
          {possuiConta ? (
            <Grid style={{...styles.padding}}>
              <TouchableOpacity onPress={() => router.replace("/forgot-password")}>
                <Text style={styles.switchText}>Esqueci minha senha</Text>
              </TouchableOpacity>
            </Grid>
          ) : null}
          {possuiConta ? (
            <Grid style={{ display: 'flex', width: '100%', justifyContent: 'space-evenly', alignItems: 'center', gap: 20, marginTop: 20}}>
              <Button
                width={300}
                icon="login-variant"
                mode="contained"
                onPress={async () => {
                  signIn(email, password);
                }}
                style={{ padding: 5, borderRadius: 30, backgroundColor: 'rgb(0, 100, 255)' }}
              >
                LOGIN
              </Button>
              <Button
                width={300}
                icon="account-plus"
                mode="contained"
                onPress={() => {
                  setPossuiConta(!possuiConta),
                  setImageSource(require("@/assets/images/criarConta.png"))
                }}
                style={{ padding: 5, borderRadius: 30, backgroundColor: 'rgb(223, 70, 97)' }}
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
                onPress={async () => {
                  signUp(nome, email, password);
                }}
                style={{ padding: 5, borderRadius: 30, backgroundColor: 'rgb(223, 70, 97)' }}
              >
                CRIAR CONTA
              </Button>
            </Grid>
          )}

          <Grid style={{ display: 'flex', position: 'absolute', bottom: 50, alignItems: 'center', gap: 20 }}>
            {!possuiConta && ( // Verifica se não possui conta
              <>
                <Text style={styles.switchText}>
                  Já possui uma conta?
                </Text>
                <Button
                  width={170} // Ajuste o tamanho conforme necessário
                  icon="login-variant"
                  mode="contained" // Ajuste o modo conforme desejado
                  onPress={() => {
                    setPossuiConta(true),
                    setImageSource(require("@/assets/images/logoACME.png"))
                  }} // Adiciona a funcionalidade para mudar para a tela de login
                  style={styles.loginButton} // Adicione um estilo específico para o botão
                >
                  LOGIN
                </Button>
              </>
            )}
          </Grid>

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
    padding: 5,
  },
  button: {
    backgroundColor: "rgb(223, 70, 97)",
    padding: 10,
    paddingRight: 40,
    paddingLeft: 40,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(152, 49, 70, 0.3)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 4,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  switchText: {
    marginTop: 10,
    marginHorizontal: 20,
    color: "hsl(215, 15%, 75%)",
    fontSize: 15,
    fontWeight: "100",
    letterSpacing: 1,
  },
  loginButton: {
    paddingHorizontal: 10, // Ajuste o tamanho conforme necessário
    backgroundColor: "rgb(0, 100, 255)", // Cor do texto do botão
  },
});
