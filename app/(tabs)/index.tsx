import { Redirect, router } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import { useSession } from "../ctx";
import { Button, Text } from "react-native-paper";
import { Grid, TopBar } from "@/components";
import Topbar from "@/components/navigation/TopBar";

export default function HomeScreen() {
  const { userEmail } = useSession();
  
  return (
    <Grid
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <Grid>
        <Topbar title="Início" />
      </Grid>
      <Grid style={styles.container}>
        <Text style={styles.title}>Sistema de Compras</Text>
        <Image
          source={require("@/assets/images/logoACME.png")}
          style={{
            height: 400,
            resizeMode: "contain",
          }}
        />
      </Grid>
    </Grid>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  content: {
    width: "90%",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 40,
    color: "#A32E43",
  },
  textInput: {
    height: 50,
    width: "100%",
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
    width: "100%",
    marginVertical: 15,
    backgroundColor: "#732130",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#732130",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  text: {
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
