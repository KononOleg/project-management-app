import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Authorization from '../pages/Authorization';
import MainPage from '../pages/Main/WelcomePage';
import WelcomePage from '../pages/WelcomePage';
import LoginRoute from './LoginRoute';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: (
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/welcome',
        element: <WelcomePage />,
      },
      {
        path: '/signup',
        element: (
          <LoginRoute>
            <Authorization isSignUp={true} />
          </LoginRoute>
        ),
      },
      {
        path: '/signin',
        element: (
          <LoginRoute>
            <Authorization />
          </LoginRoute>
        ),
      },
    ],
  },
]);

export default router;
