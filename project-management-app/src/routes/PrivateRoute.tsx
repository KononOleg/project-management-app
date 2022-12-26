import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { useAppSelector } from '../hooks/redux';

interface IProps {
  children: JSX.Element;
}

const PrivateRoute: FC<IProps> = ({ children }) => {
  const { isAuth, isPending } = useAppSelector((state) => state.AuthReducer);
  return <>{isPending ? <Loading /> : <> {isAuth ? children : <Navigate to="/signin" />}</>}</>;
};

export default PrivateRoute;
