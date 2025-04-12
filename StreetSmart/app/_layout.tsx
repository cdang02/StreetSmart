import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { View, StatusBar } from 'react-native';
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";


export default function Layout() {
  const [fontsLoaded] = useFonts({
    GolosText: require('@assets/fonts/GolosText-VariableFont_wght.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="routeSelection" options={{ title: 'Route Selection' }} />
      </Stack>
    </View>
  );
}