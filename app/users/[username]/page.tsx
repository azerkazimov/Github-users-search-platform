import { Image } from "expo-image";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ColorSchemeName,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../components/ui/button";
import { getGitHubUsers } from "../../../hooks/get-github-users";
import { GitHubSearchResponse } from "../../../types/user-types";

export default function Users() {
  const { username } = useLocalSearchParams();
  let colorScheme = useColorScheme();
  let styles = getStyles(colorScheme);
  const [userData, setUserData] = useState<GitHubSearchResponse | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getGitHubUsers(username as string);
      setUserData(data);
    };
    fetchUser();
  }, [username]);

 const handleReturnToHome = () => {
  router.push("/");
 };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>

            <Link href="/"><Text style={styles.link}>Home</Text></Link>

      <Text style={styles.text}>GitHub Users </Text>
      </View>
      <Image source={userData?.items[0]?.avatar_url && { uri: userData.items[0].avatar_url } } style={styles.image} />
      {userData && (
        <ScrollView>
          <View style={styles.container}>
              {username && <Text style={styles.text}>{userData?.items[0]?.login}</Text>}
            <Text style={styles.text} numberOfLines={2}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum, alias consequuntur ullam laborum, maiores ipsum illo, quaerat quis ipsa debitis impedit dignissimos animi aliquam minima doloremque necessitatibus ea odit? Sed?</Text>
            <Button content="Search" onPress={handleReturnToHome} />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const getStyles = (theme: ColorSchemeName) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      gap: 10,
      backgroundColor: theme === "dark" ? "#000" : "#fff"
    },
    text: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme === "dark" ? "#fff" : "#000"
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: theme === "dark" ? "#fff" : "#000",
      padding: 10,
      margin: 10,
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      textAlignVertical: "center",
    },
    input: {
      borderWidth: 1,
      borderColor: theme === "dark" ? "#fff" : "#000",
      padding: 10,
      margin: 10,
      borderRadius: 5,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    link: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme === "dark" ? "#fff" : "#2072F5",
    },
  });
