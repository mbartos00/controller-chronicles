import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Theme from './Theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Theme>
      <App />
    </Theme>
  </React.StrictMode>
);
