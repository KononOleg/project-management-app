import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthorizationPage from '../pages/AuthorizationPage';
import BoardPage from '../pages/BoardPage';
import MainPage from '../pages/MainPage';
import WelcomePage from '../pages/WelcomePage';
import LoginRoute from './LoginRoute';
import PrivateRoute from './PrivateRoute';
import ProfilePage from '../pages/ProfilePage';

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
        path: '/board/:boardId',
        element: (
          <PrivateRoute>
            <BoardPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <PrivateRoute>
            <ProfilePage />
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
            <AuthorizationPage isSignUp={true} />
          </LoginRoute>
        ),
      },
      {
        path: '/signin',
        element: (
          <LoginRoute>
            <AuthorizationPage />
          </LoginRoute>
        ),
      },
    ],
  },
]);

export default router;
