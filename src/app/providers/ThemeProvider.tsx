import React, { createContext, useState, useMemo, useContext, useCallback, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { darkTheme, lightTheme } from '@shared/theme';

type ThemeMode = 'light' | 'dark';

const ThemeContext = createContext({
  toggleTheme: () => {},
  mode: 'light' as ThemeMode
});

export const useThemeMode = () => useContext(ThemeContext);

export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    // инициализируем из localStorage один раз
    const stored = localStorage.getItem('theme') as ThemeMode | null;
    return stored ?? 'light';
  });

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const theme = mode === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  const contextValue = useMemo(
    () => ({
      toggleTheme,
      mode
    }),
    [toggleTheme, mode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
