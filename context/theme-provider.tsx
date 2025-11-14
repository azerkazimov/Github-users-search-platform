import { createContext, useContext, useState } from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";

export type ThemeType = "system" | "light" | "dark" | "auto";

type ThemeContextType = {
  theme: ThemeType;
  colorScheme: "light" | "dark";
  toggleTheme: (theme: ThemeType) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// === useTheme hook ===
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// === useColorScheme hook - returns the actual resolved color scheme ===
export function useColorScheme() {
  const { colorScheme } = useTheme();
  return colorScheme;
}

// === ThemeProvider component ===
export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [appTheme, setAppTheme] = useState<ThemeType>("system");
  const systemColorScheme = useSystemColorScheme();

  const toggleTheme = (theme: ThemeType) => {
    setAppTheme(theme);
  };

  // Resolve the actual color scheme based on theme preference
  const getColorScheme = (): "light" | "dark" => {
    if (appTheme === "light") return "light";
    if (appTheme === "dark") return "dark";
    // For "system" or "auto", use the system color scheme
    return systemColorScheme === "dark" ? "dark" : "light";
  };

  return (
    <ThemeContext.Provider
      value={{ 
        theme: appTheme, 
        colorScheme: getColorScheme(),
        toggleTheme: toggleTheme 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
