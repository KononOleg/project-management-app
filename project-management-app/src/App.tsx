import { FC } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './store';

const App: FC = () => {
  return (
    <Provider store={store}>
      <></>
    </Provider>
  );
};

export default App;
