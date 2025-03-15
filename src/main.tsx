import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/app/app.tsx'
import './index.scss'
import reportWebVitals from './reportWebVitals.ts';

import {thunk} from 'redux-thunk';

import { compose, createStore, applyMiddleware } from 'redux';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);

import { Provider } from 'react-redux';

import rootReducer from './services/reducers/root-reducer.js';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </StrictMode>,
)
reportWebVitals();