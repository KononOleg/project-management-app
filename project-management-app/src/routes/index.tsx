import { createBrowserRouter } from 'react-router-dom';
import HeaderLayout from '../layouts/HeaderLayout';
import Authorization from '../pages/Authorization';
import WelcomePage from '../pages/WelcomePage';

const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
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
