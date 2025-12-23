import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { MD3LightTheme as PaperLightTheme } from "react-native-paper";

import { Provider as PaperProvider } from "react-native-paper";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const unstable_settings = {
  anchor: "(tabs)",
};

const theme = {
  ...PaperLightTheme,
  colors: {
    ...PaperLightTheme.colors,
    primary: "#6a4c93", // purple
    secondary: "#ffb4a2", // soft peach
    background: "#f7f2fa",
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
