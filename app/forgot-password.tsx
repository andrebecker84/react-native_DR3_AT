import {
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { useState } from "react";
import { Avatar, Button, Grid, Snackbar, TextInput } from "@/components";
import { Text } from "react-native-paper";
import { auth } from "@/services/firebaseConfig";
import { router } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";

import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPasswordScreen() {
    const [message, setMessage] = useState(null);
    const [email, setEmail] = useState("");
    const [helpData, setHelpData] = useState({email: null});

    const resetSenha = async() => {
        if (email === "") {
          alert("Digite o e-mail para iniciar o processo de recuperação de senha.");
          return;
        } else {
            try {
              await sendPasswordResetEmail(auth, email);
              alert("E-mail para recuperação da senha enviado. Por favor verifique a sua caixa de entrada ou spam.");
            } catch (erro: any) {
              console.log(erro);
              alert("Erro ao enviar e-mail para recuperação da senha: " + erro.message);
            }  
        }
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
              marginTop: 60,
              ...styles.container,
              ...styles.padding,
            }}>
              <Avatar size={350} bgColor='transparent' source={require("@/assets/images/redefinirSenha.png")}/>
            </Grid>
            <Grid style={{...styles.padding}}>
                <Text style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'center',
                  letterSpacing: 2,
                  margin: 10
                }}>
                  Redefinir senha:
                </Text>
            </Grid>
            <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                width = "80%"
              />
            </Grid>
            <Grid style={{ display: 'flex', width: '100%', justifyContent: 'space-evenly', alignItems: 'center', margin: 20 }}>
              <Button
                width={200}
                icon="key-outline"
                mode="contained"
                // onPress={resetSenha}
                onPress={async () => {
                  resetSenha();
                }}
                style={{ padding: 5, borderRadius: 30, backgroundColor: '#d32f2f' }}
              >
                RESETAR SENHA
              </Button>
            </Grid>
            <Grid style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <>
                  <Text style={styles.switchText}>
                    Retornar para o login?
                  </Text>
                  <Button
                    width={170}
                    icon="login-variant"
                    mode="contained"
                    onPress={() => router.replace("/login")} // onPress={() => {router.replace("/login")}}>
                    style={styles.loginButton}
                  >
                    LOGIN
                  </Button>
                </>
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








    title: {
      fontSize: 28,
      fontWeight: "800",
      marginBottom: 40,
      color:  "rgb(32, 26, 25)",
    },
    textInput: {
      height: 50,
      width: "90%",
      backgroundColor: "#FFFFFF",
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
  });
