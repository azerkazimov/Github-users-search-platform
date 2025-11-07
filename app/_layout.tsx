import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: 'Home' }} />
      <Stack.Screen name="users/[username]/page" options={{ headerShown: false, title: 'User Details' }} />
    </Stack>
  );
}
