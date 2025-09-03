import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import './i18n/i18n';
import { useTranslation } from 'react-i18next';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';

function App() {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    // Set document language attribute
    document.documentElement.lang = i18n.language || 'fr';
    
    // Force French on first load if no language is stored
    if (!localStorage.getItem('i18nextLng')) {
      i18n.changeLanguage('fr');
    }
  }, [i18n]);
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;