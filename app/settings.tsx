import { Grid, TopBar } from "@/components";
import { useTheme } from "../hooks/useTheme";
import { View, StyleSheet, ScrollView } from "react-native";
import { Switch, Text, useTheme as usePaperTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  const { toggleTheme, colorScheme } = useTheme();
  const paperTheme = usePaperTheme();

  // Define as cores com base no tema
  const backgroundColor = paperTheme.colors.background;
  const textColor = colorScheme === "dark" ? "#ffffff" : "#000000"; // Cor do texto

  return (
    <>
      <TopBar title="Configurações" back={true} menu={false} />
      <ScrollView
        contentContainerStyle={{
          backgroundColor: backgroundColor,
          display: 'flex',
          alignItems: 'center',
          flexGrow: 1,
        }}
      >
        <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 30, maxWidth: 200 }}>
          <Text style={[styles.label, { color: textColor }]}>
            {colorScheme === "dark" ? "Tema Escuro" : "Tema Claro"}
          </Text>
          <Grid style={styles.switchContainer}>
            <Ionicons
              name="sunny"
              size={24}
              color={colorScheme === "light" ? "#FFD700" : "#888888"}
              //@ts-ignore
              style={[styles.icon, styles.sunIcon]}
            />
            <Switch
              value={colorScheme === "dark"}
              onValueChange={toggleTheme}
              style={styles.switch}
            />
            <Ionicons
              name="moon"
              size={24}
              color={colorScheme === "dark" ? "#FFD700" : "#888888"}
            />
          </Grid>
        </Grid>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 17,
    fontWeight: "bold",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  switch: {
    marginHorizontal: 16,
  },
});
