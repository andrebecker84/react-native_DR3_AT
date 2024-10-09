import {Redirect, Tabs} from 'expo-router';
import React, { useEffect } from 'react';
import { TabBarIcon } from "@/components";
import { useSession } from "@/app/ctx";
import { Text } from "react-native";
import { useTheme } from "react-native-paper";

export default function TabLayout() {
  const { session, isLoading } = useSession();
  const theme = useTheme();

  if (isLoading) {
    return <Text>Carregando...</Text>;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: theme.colors.primary,
      tabBarStyle: {
          backgroundColor: theme.colors.background,
      },
      headerShown: false,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="minhasRequisicoes"
        options={{
          title: "Requisições",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "list" : "list-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="criarRequisicoes"
        options={{
          title: "Nova Requisição",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "add" : "add-outline"}
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
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
