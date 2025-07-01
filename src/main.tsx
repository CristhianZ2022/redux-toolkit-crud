import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';
import { Provider } from 'react-redux';
import App from './App.tsx';
import './index.css';
import { store } from './stores';
Modal.setAppElement('#root');

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
