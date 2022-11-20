import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

const HeaderLayout: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default HeaderLayout;
