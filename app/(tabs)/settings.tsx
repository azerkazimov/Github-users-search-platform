import { layoutTheme } from "@/constants/theme";
import { useTheme } from "@/context/theme-provider";
import { StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const { theme, colorScheme, toggleTheme } = useTheme();
  const styles = getStyles(colorScheme);

  const handleToggleTheme = () => {
    // If currently showing dark, switch to light; otherwise switch to dark
    if (colorScheme === "dark") {
      toggleTheme("light");
    } else {
      toggleTheme("dark");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <View style={styles.content}>
        <View>
          <Text style={styles.text}>Theme</Text>
          <Text style={styles.subText}>
            {theme === "system" ? `System (${colorScheme})` : theme === "dark" ? "Dark" : "Light"}
          </Text>
        </View>
        <Switch
          onChange={handleToggleTheme}
          value={colorScheme === "dark"}
          trackColor={{
            false: colorScheme === "dark" ? "#fff" : "green",
            true: colorScheme === "dark" ? "#000" : "green",
          }}
          thumbColor={colorScheme === "dark" ? "#fff" : "#000"}
        />
      </View>
    </SafeAreaView>
  );
}

const getStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
      paddingHorizontal: 26,
    },
    header: {
      marginTop: 20,
      fontSize: 24,
      fontWeight: "bold",
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    content: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 20,
      marginTop: 20,
    },
    text: {
      fontSize: 16,
      fontWeight: "bold",
      color: colorScheme === "dark" ? "#fff" : "#000",
      fontFamily: layoutTheme.fonts.montserrat.regular as string,
    },
    subText: {
      fontSize: 12,
      color: colorScheme === "dark" ? "#999" : "#666",
      marginTop: 4,
      fontFamily: layoutTheme.fonts.montserrat.regular as string,
    },
  });
