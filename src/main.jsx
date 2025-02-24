import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './components/app/app.jsx'
import './index.css'
import reportWebVitals from './reportWebVitals';

import {thunk} from 'redux-thunk';

import { compose, createStore, applyMiddleware } from 'redux';
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);

import { Provider } from 'react-redux';

import rootReducer from './services/reducers/root-reducer';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>

        <App />

    </Provider>
  </StrictMode>,
)
reportWebVitals();