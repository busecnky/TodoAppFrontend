import React, { createContext, useState, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const defaultThemeContext: ThemeContextType = {
  isDark: false,
  toggleTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState<boolean>(systemColorScheme === 'dark');

  const toggleTheme = () => {
    setIsDark(prevIsDark => !prevIsDark);
  };

  const value = { isDark, toggleTheme };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};