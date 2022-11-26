import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

interface IProps {
  children: JSX.Element;
}

const PrivateRoute: FC<IProps> = ({ children }) => {
  const { isAuth } = useAppSelector((state) => state.AuthReducer);
  return isAuth ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
