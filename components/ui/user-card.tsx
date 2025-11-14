import { Image } from "expo-image";
import { Link } from "expo-router";
import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useColorScheme } from "../../context/theme-provider";
import { GitHubUserItem } from "../../types/user-types";

export default function UserCard({ user }: { user: GitHubUserItem }) {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);
  const {width} = useWindowDimensions();

  return (
    <Link
      href={{
        pathname: "/users/[username]/page",
        params: { username: user.login },
      }}
    >
      <View style={{...styles.wrapper, width: width }}>
        <Image
          source={user?.avatar_url && { uri: user.avatar_url }}
          style={styles.image}
        />
        <Text style={styles.text}>{user.login}</Text>
        <Text style={styles.text}>{user.html_url}</Text>
        <Text style={styles.text}>{user.url}</Text>
      </View>
    </Link>
  );
}

const getStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      borderWidth: 1,
      borderColor: theme === "dark" ? "white" : "black",
      padding: 10,
      borderRadius: 10,
      backgroundColor: theme === "dark" ? "black" : "white",

    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    text: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme === "dark" ? "white" : "black",
    },
  });
