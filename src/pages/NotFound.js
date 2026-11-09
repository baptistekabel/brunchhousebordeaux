import { useEffect } from 'react';

const NotFound = () => {
  useEffect(() => {
    // Empêche l'indexation des URLs inexistantes (évite les "soft 404")
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, follow';
    meta.setAttribute('data-notfound', 'true');
    document.head.querySelectorAll('meta[name="robots"], meta[name="googlebot"]').forEach(el => el.setAttribute('content', 'noindex, follow'));
    document.head.appendChild(meta);
    document.title = 'Page non trouvée | Brunch House Bordeaux';
    return () => {
      meta.remove();
      document.head.querySelectorAll('meta[name="robots"], meta[name="googlebot"]').forEach(el => el.setAttribute('content', 'index, follow'));
    };
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      background: '#013927',
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
    </div>
  );
};

export default NotFound;
