// app/_layout.tsx
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { View, StatusBar } from 'react-native';


export default function Layout() {
  const [fontsLoaded] = useFonts({
    GolosText: require('@assets/fonts/GolosText-VariableFont_wght.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
