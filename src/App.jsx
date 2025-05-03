import { RouterProvider } from 'react-router-dom';

// project imports
import router from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';

// date adapter for MUI X DatePickers
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AuthProvider } from './contexts/AuthContext';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <ThemeCustomization>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthProvider>
        <ScrollTop>
          <RouterProvider router={router} />
        </ScrollTop>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeCustomization>
  );
}
