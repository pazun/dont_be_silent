import { createRoot } from 'react-dom/client'
import './index.css'
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Root from './App.jsx'
import './i18n/i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Root />
  </Provider>,
)
