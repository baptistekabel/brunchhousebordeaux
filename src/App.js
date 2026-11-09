import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import './i18n/i18n';
import { SpeedInsights } from '@vercel/speed-insights/react';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import LangRoute from './seo/LangRoute';
import NotFound from './pages/NotFound';
import LegalPage from './pages/LegalPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <SpeedInsights />
      <ErrorBoundary>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<LangRoute lang="fr" page="home"><HomePage /></LangRoute>} />
            <Route path="/menu" element={<LangRoute lang="fr" page="menu"><MenuPage /></LangRoute>} />
            <Route path="/en" element={<LangRoute lang="en" page="home"><HomePage /></LangRoute>} />
            <Route path="/en/menu" element={<LangRoute lang="en" page="menu"><MenuPage /></LangRoute>} />
            <Route path="/es" element={<LangRoute lang="es" page="home"><HomePage /></LangRoute>} />
            <Route path="/es/menu" element={<LangRoute lang="es" page="menu"><MenuPage /></LangRoute>} />
            <Route path="/mentions-legales" element={<LangRoute lang="fr" page="legal"><LegalPage /></LangRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;