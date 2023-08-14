import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00509d',
      light: '#168aad',
      dark: '#005BAF',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#5f0f40',
      light: '#f9dbbd',
      dark: '#CC4E4E',
      contrastText: '#000000',
    },
    error: {
      main: '#FF3D00',
      light: '#FF7539',
      dark: '#C30000',
    },
    info: {
      main: '#2196F3',
      light: '#64B5F6',
      dark: '#1976D2',
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#9E9E9E',
      hint: '#BDBDBD',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    grey: {
      '50': '#FAFAFA',
      '100': '#F5F5F5',
      // ... up to grey.900
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  spacing: 4,
});

export default theme;
