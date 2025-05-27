import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light'
  },
  components: {
    MuiIcon: {
      defaultProps: {
        // Отключаем использование шрифтовых иконок
        baseClassName: undefined
      }
    }
  }
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
  components: {
    MuiIcon: {
      defaultProps: {
        // Отключаем использование шрифтовых иконок
        baseClassName: undefined
      }
    }
  }
});
