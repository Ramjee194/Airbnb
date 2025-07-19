import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './context/AuthContext.jsx';
import UserContext from './context/UserContext.jsx';
import ListingContext from './context/ListingContext.jsx';
import axios from 'axios';

// ✅ Global axios config to send cookies with every request
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <UserContext>
          <ListingContext>
            <App />
          </ListingContext>
        </UserContext>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
