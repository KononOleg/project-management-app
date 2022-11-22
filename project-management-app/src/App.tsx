import './App.css';
import './helpers/i18n';
import { FC, useEffect } from 'react';

import { RouterProvider } from 'react-router-dom';
import router from './routes/index';
import { useAppDispatch } from './hooks/redux';
import { checkIsAuth } from './store/thunks/AuthThunks';

const App: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkIsAuth());
  }, []);
  return <RouterProvider router={router} />;
};

export default App;
