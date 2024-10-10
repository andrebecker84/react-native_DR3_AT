import { useState, useEffect } from "react";
import { useRouter, useGlobalSearchParams } from "expo-router";

export const useTheme = () => {
  const router = useRouter();
  const { colorScheme: globalColorScheme } = useGlobalSearchParams();
  
  const [localColorScheme, setLocalColorScheme] = useState(
    globalColorScheme || "dark"
  );

  useEffect(() => {
    console.log("globalColorScheme:", globalColorScheme);
    console.log("localColorScheme:", localColorScheme);

    if (globalColorScheme && globalColorScheme !== localColorScheme) {
      setLocalColorScheme(globalColorScheme);
      console.log("Atualizando localColorScheme para:", globalColorScheme);
    }
  }, [globalColorScheme, localColorScheme]); // adicione localColorScheme para garantir a atualização correta

  const toggleTheme = () => {
    const newScheme = localColorScheme === "light" ? "dark" : "light";
    setLocalColorScheme(newScheme);
    router.setParams({ colorScheme: newScheme });
    console.log("Tema alterado para", newScheme);
  };

  return { toggleTheme, colorScheme: localColorScheme };
};
