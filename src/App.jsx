import { RouterProvider } from 'react-router-dom';
import { router } from './routes/AppRoutes';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ab00c0',
      light: '#d500ff',
      background: '#0a0016',
      contrastText: '#fff',
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Toaster />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
