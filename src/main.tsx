import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/app/app.tsx'
import './index.scss'
import reportWebVitals from './report-webvitals.ts';

import { store } from './services/store';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </StrictMode>,
)
reportWebVitals();