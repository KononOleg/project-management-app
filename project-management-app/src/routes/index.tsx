import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Authorization from '../pages/Authorization';
import WelcomePage from '../pages/WelcomePage';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <WelcomePage />,
      },
      {
        path: '/signup',
        element: <Authorization isSignUp={true} />,
      },
      {
        path: '/signin',
        element: <Authorization />,
      },
    ],
  },
]);

export default router;
