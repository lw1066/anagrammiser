import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { AuthContextProvider } from './context/AuthContext';

import './index.css';
import App from './App';
    
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<AuthContextProvider>
    <StrictMode>
        <App />
    </StrictMode>
</AuthContextProvider>

);

