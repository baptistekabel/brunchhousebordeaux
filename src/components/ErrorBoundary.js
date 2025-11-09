import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log l'erreur pour le debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #1C3F33 0%, #2A5F47 100%)',
          color: 'white',
          textAlign: 'center',
          padding: '20px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          <div style={{
            maxWidth: '600px',
            padding: '40px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)'
          }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>🚨 Oops!</h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
              Une erreur inattendue s'est produite dans notre cuisine digitale.
            </p>

            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '12px 24px',
                background: '#D4AF37',
                color: '#1C3F33',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem',
                margin: '10px'
              }}
            >
              Recharger la page
            </button>

            <a
              href="/"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: 'transparent',
                color: 'white',
                border: '2px solid white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                margin: '10px'
              }}
            >
              Retour à l'accueil
            </a>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{
                marginTop: '30px',
                textAlign: 'left',
                background: 'rgba(0,0,0,0.3)',
                padding: '20px',
                borderRadius: '8px',
                fontSize: '0.9rem'
              }}>
                <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  Détails de l'erreur (dev only)
                </summary>
                <pre style={{
                  whiteSpace: 'pre-wrap',
                  marginTop: '10px',
                  fontSize: '0.8rem'
                }}>
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;