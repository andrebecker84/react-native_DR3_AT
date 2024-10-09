/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/novasRequisicoes` | `/(tabs)/requisicoes` | `/CadastroCompras` | `/Requisicoes` | `/_sitemap` | `/ctx` | `/forgot-password` | `/login` | `/novasRequisicoes` | `/register` | `/requisicoes` | `/useStorageState`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
