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
  const [email, setEmail] = useState("colaborador@teste.com");
  const [password, setPassword] = useState("teste123");
  const [nome, setNome] = useState("Colaborador");
  const [possuiConta, setPossuiConta] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [helpData, setHelpData] = useState({
    nome: null,
    email: null,
    password: null,
  });

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
          <Avatar size={350} bgColor='transparent' source={require("@/assets/images/logoACME.png")}/>
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
            <Grid style={{...styles.padding}}>
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
            <Grid style={{ ...styles.textInput, ...styles.padding }}>
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
            <Grid style={{...styles.padding}}>
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
            <Grid style={{...styles.padding}}>
            <TouchableOpacity onPress={() => router.replace("/forgot-password")}>
              <Text style={styles.switchText}>Esqueci minha senha</Text>
            </TouchableOpacity>
            </Grid>
            <Grid style={{
                            ...styles.padding,
                            ...styles.container,
                            textAlign: 'center'
                        }}>
                            {/*@ts-ignore*/}
                            <Link href="register">
                                Criar conta
                            </Link>
                        </Grid>
          {possuiConta ? (
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                signIn(email, password);
              }}
            >
              <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                signUp(email, password, nome);
              }}
            >
              <Text style={styles.text}>Criar Conta</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => setPossuiConta(!possuiConta)}>
            <Text style={styles.switchText}>
              {possuiConta
                ? "Não possui uma conta? Criar conta."
                : "Já possui uma conta? Login"}
            </Text>
          </TouchableOpacity>
          

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
    padding: 10,
  },
  button: {
    // width: "100%",
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
    color: "hsl(215, 15%, 75%)",
    fontSize: 15,
    fontWeight: "100",
    letterSpacing: 1,
  },
});
