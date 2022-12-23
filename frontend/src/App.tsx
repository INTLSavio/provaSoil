import React from 'react';
import { GlobalStyle } from './styles/Global';
import { AuthProvider } from './Context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes';

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
        <GlobalStyle />
      </AuthProvider>
    </>
  );
}

export default App;
