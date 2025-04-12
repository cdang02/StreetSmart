import { Stack } from "expo-router";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="routeSelection" options={{ title: 'Route Selection' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
