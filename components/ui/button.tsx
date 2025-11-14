import { Pressable, StyleSheet, Text } from "react-native";
import { useColorScheme } from "../../context/theme-provider";
import { layoutTheme } from "@/constants/theme";

export default function Button({ content, onPress }: { content: string, onPress: () => void }) {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{content}</Text>
    </Pressable>
  );
}

const getStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    button: {
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor:
        theme === "dark"
          ? layoutTheme.colors.background.secondary
          : layoutTheme.colors.background.dark,
    },
    buttonText: {
      color:
        theme === "dark"
          ? layoutTheme.colors.text.primary
          : layoutTheme.colors.text.inverse,
      fontSize: 16,
      fontWeight: "bold",
    },
  });