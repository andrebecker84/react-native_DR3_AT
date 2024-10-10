/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/criarRequisicoes` | `/(tabs)/minhasRequisicoes` | `/(tabs)/perfil` | `/..\components\Dropdown\` | `/_sitemap` | `/criarRequisicoes` | `/ctx` | `/edit` | `/forgot-password` | `/form` | `/login` | `/minhasRequisicoes` | `/perfil` | `/settings` | `/useStorageState`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
