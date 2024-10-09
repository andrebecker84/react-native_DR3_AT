import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useSession } from "@/app/ctx";
import { useState } from "react";
import { Grid, Snackbar, Text, TextInput } from "@/components";
import { router } from "expo-router";

export default function LoginScreen() {
  const { signIn, signUp } = useSession();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState("colaborador@teste.com");
  const [password, setPassword] = useState("teste123");
  const [nome, setNome] = useState("");
  const [helpData, setHelpData] = useState({
    email: null,
    password: null,
  });
  const [possuiConta, setPossuiConta] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);

  const verifyFields = (text: string, name: string) => {
    setHelpData((v: any) => ({
      ...v,
      [name]: text.length === 0 ? "Campo obrigatório" : null,
    }));
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Grid
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Image
            source={require("@/assets/images/logoACME.png")}
            style={{
              height: 350,
              resizeMode: "contain", 
            }}
          />
        </Grid>
        <View style={styles.content}>
          <Text style={styles.title}>
            {possuiConta ? "Login" : "Criar Conta"}
          </Text>
          {possuiConta ? null : (
            <TextInput
              style={styles.textInput}
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
            />  
          )}

          <TextInput
            style={styles.textInput}
            placeholder="email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.textInput}
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

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
              // onPress={() => {console.log(nome, email, password)}}
            >
              <Text style={styles.text}>Criar Conta</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => setPossuiConta(!possuiConta)}>
            <Text style={styles.switchText}>
              {possuiConta
                ? "Não possui uma conta? Criar conta"
                : "Já possui uma conta? Login"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.replace("/forgot-password")}>
            <Text style={styles.switchText}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <Snackbar
            visible={message !== null}
            onDismiss={() => setMessage(null)}
            duration={4000}
          >
            {message}
          </Snackbar>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(10, 0, 30)",
    width: "100%", // ocupa toda a largura da tela
  },
  content: {
    width: "90%", // ocupa 90% da largura da tela
    alignItems: "center", // centraliza o conteúdo horizontalmente
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 40,
    color: "rgb(32, 26, 25)",
  },
  textInput: {
    height: 50,
    width: "100%", // ocupa toda a largura do content
    backgroundColor: "rgb(29, 33, 38)",
    borderColor: "#E8EAF6",
    borderWidth: 2,
    borderRadius: 15,
    marginVertical: 15,
    paddingHorizontal: 25,
    fontSize: 16,
    color: "#3C4858",
    shadowColor: "#9E9E9E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    width: "100%", // o botão também ocupa toda a largura
    marginVertical: 15,
    backgroundColor: "rgb(223, 70, 97)",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(152, 49, 70, 0.3)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  switchText: {
    marginTop: 20,
    color: "rgb(32, 26, 25)",
    fontSize: 16,
    fontWeight: "500",
  },
});
