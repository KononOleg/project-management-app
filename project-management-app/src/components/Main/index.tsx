import './styles.css';
import { FC } from 'react';

const Main: FC<{ children: JSX.Element }> = ({ children }) => {
  return <main className="main">{children}</main>;
};

export default Main;
