import './styles.css';
import { FC } from 'react';
import loading from '../../assets/icon/loading.png';

const Loading: FC = () => {
  return (
    <div className="loading__wrapper">
      <img className="loading__image" src={loading} alt="loading" />
    </div>
  );
};

export default Loading;
