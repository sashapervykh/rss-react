import { useEffect, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const savedTheme: unknown = localStorage.getItem('theme');
  const [theme, setTheme] = useState<'light' | 'dark'>(
    savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'dark'
  );

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
