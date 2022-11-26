import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

interface IProps {
  children: JSX.Element;
}

const LoginRoute: FC<IProps> = ({ children }) => {
  const { isAuth } = useAppSelector((state) => state.AuthReducer);
  console.log(isAuth);
  return !isAuth ? children : <Navigate to="/" />;
};

export default LoginRoute;
