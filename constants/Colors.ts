/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = 'rgb(0, 100, 255)';
const tintColorDark = 'hsl(215, 15%, 75%)'; // contraste com azul



// rgb(115,33,48)
// rgb(163,46,67)
// rgb(223, 70, 97)
// rgb(190, 83, 111, 1)
// rgba(226, 29, 72, 0.5)
// rgba(226, 29, 72, 1)
// rgba(115, 33, 48, 0.2)
// rgba(253, 149, 13, 1)
// rgba(253, 204, 13, 1) colaborador
// rgba(0, 255, 0, 1)
// rgba(0, 255, 0, 0.8) admin
// #FF5722 visitante
// rgb(15, 18, 20)
// backgroundColor: 'rgba(29, 33, 38, 0.4)', fundo menu select dropdown
// rgb(29, 33, 38) borda menu select dropdown
// rgb(24,26,35)
// rgb(32,35,48)
// boxShadow: '0 10px 20px rgba(0, 0, 0, 0.7), 0 0 200px rgba(255, 255, 255, 0.3)'      card box shadow
// boxShadow: '0 10px 20px rgba(0, 0, 0, 0.7), 0 0 200px rgba(152, 49, 70, 0.3)',        titulo box shadow
// rgb(118,115,123)
// rgb(192,191,195)
// rgba(100, 0, 0, 1) logout
// rgba(160, 0, 0, 1) logout hover
// rgb(0, 60, 160) login
// rgb(0, 100, 255) login hover

export const Colors = {
  light: {
    "primary": "rgb(223, 70, 97)", // tom principal de vermelho
    "onPrimary": "#F8F8FF", // contraste com vermelho
    "primaryContainer": "rgb(255, 218, 214)", // container em tom mais claro
    "onPrimaryContainer": "rgb(115, 33, 48)", // contraste com o container principal
    "secondary": "rgb(118, 115, 123)", // cinza escuro
    "onSecondary": "#F8F8FF", // contraste para o secundário
    "secondaryContainer": "rgb(192, 191, 195)", // cinza claro
    "onSecondaryContainer": "rgb(24, 26, 35)", // contraste para container secundário
    "tertiary": "rgb(115, 33, 48)", // vermelho mais profundo
    "onTertiary": "#F8F8FF", // contraste para terciário
    "tertiaryContainer": "rgb(223, 70, 97)", // cor terciária mais suave
    "onTertiaryContainer": "rgb(32, 35, 48)", // contraste para o container terciário
    "error": "rgb(204, 0, 0)",
    "onError": "#F8F8FF", // contraste para erro
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(192,191,195)", // fundo claro
    "onBackground": "rgb(32, 35, 48)", // contraste com fundo
    "surface": "#F8F8FF", // mesma cor de fundo
    "onSurface": "rgb(192,191,195)", // contraste na superfície
    "surfaceVariant": "#F8F8FF", // variante de cinza claro
    "onSurfaceVariant": "rgb(118, 115, 123)", // contraste para a variante
    "outline": "rgb(160, 140, 138)", // cor para bordas
    "outlineVariant": "rgb(216, 194, 191)", // variante da borda
    "shadow": "rgb(0, 0, 0)", // sombras
    "scrim": "rgb(0, 0, 0)", // camadas sobre o fundo
    "inverseSurface": "rgb(54, 47, 46)", // contraste invertido na superfície
    "inverseOnSurface": "#F8F8FF", // cor invertida para contraste na superfície
    "inversePrimary": "rgb(186, 26, 32)", // cor primária invertida
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(20, 19, 21)",
      "level2": "rgb(30, 31, 34)",
      "level3": "rgb(43, 45, 49)",
      "level4": "rgb(64, 67, 73)",
      "level5": "rgb(75, 77, 85)"
    },
    "surfaceDisabled": "rgba(32, 35, 48, 0.12)",
    "onSurfaceDisabled": "rgba(32, 35, 48, 0.38)",
    "backdrop": "rgba(59, 45, 44, 0.4)"
  },
  dark: {
    "primary": "rgb(223, 70, 97)", // tom principal
    "onPrimary": "rgb(115, 33, 48)", // contraste escuro
    "primaryContainer": "rgb(115, 33, 48)", // container mais escuro
    "onPrimaryContainer": "rgb(255, 218, 214)", // contraste com o container
    "secondary": "rgb(192, 191, 195)", // cinza claro
    "onSecondary": "rgb(15, 18, 20)", // contraste para secundário
    "secondaryContainer": "rgb(118, 115, 123)", // cinza médio
    "onSecondaryContainer": "#F8F8FF", // contraste para container secundário
    "tertiary": "rgb(163, 46, 67)", // vermelho escuro
    "onTertiary": "#F8F8FF", // contraste para terciário
    "tertiaryContainer": "rgb(223, 70, 97)", // cor terciária mais suave
    "onTertiaryContainer": "rgb(15, 18, 20)", // contraste para container terciário
    "error": "rgb(223, 96, 96)",
    "onError": "rgb(204, 0, 0)",
    "errorContainer": "rgb(0, 0, 10)",
    "onErrorContainer": "rgb(255, 180, 171)",
    "background": "rgb(10, 0, 30)", // fundo escuro
    "onBackground": "#F8F8FF", // contraste para o fundo
    "surface": "rgb(24, 26, 35)", // mesma cor de fundo
    "onSurface": "rgb(10, 0, 30)", // contraste na superfície
    "surfaceVariant": "rgb(29, 33, 38)", // variante de cinza médio
    "onSurfaceVariant": "#F8F8FF", // contraste para a variante
    "outline": "rgb(59, 63, 68)", // cor para bordas
    "outlineVariant": "rgb(29, 33, 38)", // variante da borda
    "shadow": "rgb(0, 0, 0)", // sombras
    "scrim": "rgb(0, 0, 0)", // camadas sobre o fundo
    "inverseSurface": "#F8F8FF", // contraste invertido na superfície
    "inverseOnSurface": "rgb(54, 47, 46)", // cor invertida para contraste na superfície
    "inversePrimary": "rgb(223, 70, 97)", // cor primária invertida
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(115, 33, 48)",
      "level2": "rgb(125, 43, 58)",
      "level3": "rgb(135, 53, 68)",
      "level4": "rgb(145, 63, 78)",
      "level5": "rgb(155, 73, 88)"
    },
    "surfaceDisabled": "rgba(192, 191, 195, 0.12)",
    "onSurfaceDisabled": "rgba(192, 191, 195, 0.38)",
    "backdrop": "rgba(32, 35, 48, 0.4)"
  },
};
