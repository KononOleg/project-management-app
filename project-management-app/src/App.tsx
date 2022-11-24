import './App.css';
import './helpers/i18n';
import { FC, useEffect } from 'react';

import { RouterProvider } from 'react-router-dom';
import router from './routes/index';
import { useAppDispatch } from './hooks/redux';
import { checkIsAuth } from './store/thunks/AuthThunks';
import { SnackbarProvider } from 'notistack';

const App: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkIsAuth());
  }, []);
  return (
    <SnackbarProvider
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <RouterProvider router={router} />
    </SnackbarProvider>
  );
};

export default App;
