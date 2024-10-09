import { Snackbar, Text, TextInput } from "@/components";
import { auth } from "@/services/firebaseConfig";
import { router } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState("");


    const resetSenha = async() => {
    
        if (email === "") {
          alert("Digite o e-mail para iniciar o processo de recuperação de senha.");
          return;
        } else {
  
            try {
              await sendPasswordResetEmail(auth, email);
              alert("E-mail para recuperação da senha enviado, favor verifique sua caixa de entrada ou spam.");
            } catch (erro: any) {
              console.log(erro);
              alert("Erro ao enviar e-mail para recuperação da senha: " + erro.message);
            }  
        }
      };

      useEffect(() => {
        
      }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Esqueci minha senha
            </Text>
            <TextInput
                style={styles.textInput}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={resetSenha}
            >
                <Text style={styles.text}>Resetar a senha</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {router.replace("/login")}}>
          <Text style={styles.switchText}>Você já tem uma conta? Faça seu login!</Text>
        </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
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
    button: {
      width: "90%",
      marginVertical: 15,
      backgroundColor: "#d32f2f",
      padding: 20,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#d32f2f",
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
      color:  "rgb(32, 26, 25)",
      fontSize: 16,
      fontWeight: "500",
    },
  });
