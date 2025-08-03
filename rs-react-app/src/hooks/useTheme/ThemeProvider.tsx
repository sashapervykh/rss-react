import { useEffect, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const themeContextValue = {
    theme,
    setTheme,
  };

  useEffect(() => {
    document.documentElement.classList.remove(
      `background-${theme === 'dark' ? 'light' : 'dark'}`
    );
    document.documentElement.classList.add(`background-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
