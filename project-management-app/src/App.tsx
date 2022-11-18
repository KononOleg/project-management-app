import './App.css';
import './helpers/i18n';
import { FC, Suspense } from 'react';
import { Provider } from 'react-redux';
import store from './store';

const App: FC = () => {
  return (
    <Suspense fallback={<div>...</div>}>
      <Provider store={store}>
        <></>
      </Provider>
    </Suspense>
  );
};

export default App;
