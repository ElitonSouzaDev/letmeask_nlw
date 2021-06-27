import { createContext, ReactNode, useEffect, useState } from "react";

type ThemeContextProps = "light" | "dark";
type ThemeContextPoviderProps = {
  children: ReactNode;
};
type ThemeContextType = {
  currentTheme: ThemeContextProps;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  currentTheme: "light",
} as ThemeContextType);

export function ThemeContextProvider(props: ThemeContextPoviderProps) {
  const [currentTheme, setTheme] = useState<ThemeContextProps>(() => {
      const storagedTheme = localStorage.getItem('theme');
      return (storagedTheme ?? 'light') as ThemeContextProps;
  });
  function toggleTheme() {
    setTheme(currentTheme === "light" ? "dark" : "light");
  }

  useEffect(() => {
      localStorage.setItem('theme', currentTheme);
      document.body.className = currentTheme;
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
