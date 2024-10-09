import { Redirect, Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components";
import { useSession } from "@/app/ctx";
import { Text } from "react-native";
import { ProgressBar } from "@/components";

export default function TabLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return (
      <ProgressBar
        style={{
          height: "100%",
          width: "100%",
        }}
      />
    );
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "planet" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-sharp"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="criarRequisicoes"
        options={{
          title: "Requisição Compra",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "add" : "cart-sharp"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="minhasRequisicoes"
        options={{
          title: "Lista de Requisições",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "list" : "list-circle-sharp"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
