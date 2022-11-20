import './App.css';
import './helpers/i18n';
import { FC, Suspense } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { RouterProvider } from 'react-router-dom';
import router from './routes/index';
import Header from './components/Header';

const App: FC = () => {
  return (
    <Suspense fallback={<div>...</div>}>
      <Provider store={store}>
        <Header />
        <RouterProvider router={router} />
      </Provider>
    </Suspense>
  );
};

export default App;
