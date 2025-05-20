import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import './index.css';

// Tema personalizado do Material UI com cores mais vibrantes
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#BB86FC', // Roxo claro
    },
    secondary: {
      main: '#03DAC6', // Verde-água
    },
    background: {
      default: '#121212', // Quase preto
      paper: '#1E1E1E',   // Cinza muito escuro
    },
    error: {
      main: '#CF6679', // Rosa escuro
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 6px 10px rgba(0,0,0,0.25)',
          },
        },
        contained: {
          backgroundColor: '#BB86FC',
          '&:hover': {
            backgroundColor: '#9965EB',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          overflow: 'hidden',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
          backgroundImage: 'linear-gradient(to right, #6A38E8, #BB86FC)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
        colorSuccess: {
          backgroundColor: 'rgba(3, 218, 197, 0.15)',
          color: '#03DAC6',
        },
        colorError: {
          backgroundColor: 'rgba(207, 102, 121, 0.15)',
          color: '#CF6679',
        },
        colorInfo: {
          backgroundColor: 'rgba(33, 150, 243, 0.15)',
          color: '#03A9F4',
        },
        colorWarning: {
          backgroundColor: 'rgba(255, 171, 64, 0.15)',
          color: '#FFAB40',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255, 255, 255, 0.05)',
        },
        head: {
          fontWeight: 600,
          color: '#BB86FC',
          backgroundColor: 'rgba(187, 134, 252, 0.05)',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(even)': {
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
          },
          '&:hover': {
            backgroundColor: 'rgba(187, 134, 252, 0.05) !important',
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&.Mui-selected': {
            backgroundColor: 'rgba(187, 134, 252, 0.15)',
            '&:hover': {
              backgroundColor: 'rgba(187, 134, 252, 0.2)',
            },
          },
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);