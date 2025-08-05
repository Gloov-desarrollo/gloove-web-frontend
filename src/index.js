import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // Importar el CartProvider

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider> {/* Envolver la App con el CartProvider */}
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
