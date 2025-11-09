import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import './i18n/i18n';
import { useTranslation } from 'react-i18next';
import { SpeedInsights } from '@vercel/speed-insights/react';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';

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
      <SpeedInsights />
      <ErrorBoundary>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="*" element={<div style={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              background: 'linear-gradient(135deg, #1C3F33 0%, #2A5F47 100%)',
              color: 'white',
              textAlign: 'center',
              padding: '20px'
            }}>
              <h1>🍳 Page non trouvée</h1>
              <p>Cette page n'existe pas dans notre menu.</p>
              <a href="/" style={{
                padding: '12px 24px',
                background: '#D4AF37',
                color: '#1C3F33',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                marginTop: '20px'
              }}>
                Retour à l'accueil
              </a>
            </div>} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;