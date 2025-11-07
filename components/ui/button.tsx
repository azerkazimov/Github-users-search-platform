import { Pressable, StyleSheet, Text } from "react-native";

export default function Button({ content, onPress }: { content: string, onPress: () => void }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{content}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
      },
      buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
      },
})