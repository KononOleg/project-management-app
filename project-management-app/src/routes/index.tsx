import { createBrowserRouter } from 'react-router-dom';
import Authorization from '../pages/Authorization';
import WelcomePage from '../pages/WelcomePage';

const router = createBrowserRouter([
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
]);

export default router;
