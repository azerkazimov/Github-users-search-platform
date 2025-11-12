import { getGitHubUsers } from "@/hooks/get-github-users";

import { Image } from "expo-image";
import {  useState } from "react";
import {
  ColorSchemeName,

  Platform,

  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import UserCard from "../ui/user-card";
import { GitHubUserItem } from "../../types/user-types";
import Button from "../ui/button";
import { layoutTheme } from "@/constants/theme";



export default function Home() {
  let colorScheme = useColorScheme();
  let styles = getStyles(colorScheme);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<GitHubUserItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {width} = useWindowDimensions()

 
  

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const data = await getGitHubUsers(searchQuery);
      setUsers(data.items);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>GitHub Users Search</Text>
      <Image 
        source={require("../../assets/images/github-icon.png")} 
        style={styles.image} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Search for users" 
        placeholderTextColor={colorScheme === "dark" ? "#888" : "#666"}
        value={searchQuery} 
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      <Button content={isLoading ? "Searching..." : "Search"} onPress={handleSearch} />
      <View style={{
        ...styles.box,
        width: width * 0.9,
        aspectRatio: 1,
        
        }}>
          <Text style={styles.boxText}>Hello</Text>
        </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {users.length > 0 ? (
          users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))
        ) : (
          !isLoading && searchQuery && (
            <Text style={styles.text}>No users found</Text>
          )
        )}
      </ScrollView>
    </SafeAreaView>
    
    </>

  );
}

const getStyles = (theme: ColorSchemeName) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      gap: 10,
      backgroundColor: theme === "dark" ? "#000" : "#fff",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme === "dark" ? "#fff" : "#000",
      textAlign: "center",
      marginTop: 10,
    },
    text: {
      fontSize: 16,
      color: theme === "dark" ? "#fff" : "#000",
      textAlign: "center",
      marginTop: 20,
    },
    image: {
      width: 80,
      height: 80,
      alignSelf: "center",
      marginVertical: 10,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: theme === "dark" ? "#fff" : "#000",
      padding: 10,
      margin: 10,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      textAlignVertical: "center",
    },
    input: {
      borderWidth: 1,
      borderColor: theme === "dark" ? "#fff" : "#000",
      padding: 10,
      marginVertical: 10,
      borderRadius: 5,
      color: theme === "dark" ? "#fff" : "#000",
    },
    scrollView: {
      flex: 1,
      marginTop: 10,
    },
    scrollContent: {
      gap: 15,
      paddingBottom: 20,
    },
    box: {
      flex: 1,
      backgroundColor: Platform.OS === "ios" ? "red" : "blue",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
    },
    boxText: {
      fontFamily: layoutTheme.fonts.montserrat.regular as string,
      fontSize: 20,
      color: theme === "dark" ? "#fff" : "#000",
    }

  });
