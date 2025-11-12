import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";

SplashScreen.preventAutoHideAsync();  

export default function RootLayout() {

  const [loaded, error] = useFonts({
    'Montserrat-Regular': require('../assets/fonts/montserrat/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/montserrat/Montserrat-Bold.ttf'),
    'Montserrat-Medium': require('../assets/fonts/montserrat/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('../assets/fonts/montserrat/Montserrat-SemiBold.ttf'),
    'Montserrat-Black': require('../assets/fonts/montserrat/Montserrat-Black.ttf'),
    'Montserrat-ExtraBold': require('../assets/fonts/montserrat/Montserrat-ExtraBold.ttf'),
    'Montserrat-Light': require('../assets/fonts/montserrat/Montserrat-Light.ttf'),
    'Montserrat-Thin': require('../assets/fonts/montserrat/Montserrat-Thin.ttf'),
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  
  if (error) {
    return <Text>Error loading fonts</Text>;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: 'Home' }} />
      <Stack.Screen name="users/[username]/page" options={{ headerShown: false, title: 'User Details' }} />
    </Stack>
  );
}
