export const theme = {
  colors: {
    primary: {
      background: '#FDF9F0', // Floral White - fond principal
      text: '#013927', // Dark Green - texte principal
      accent: '#013927', // Dark Green - accent principal
      highlight: '#FCBDBD', // Tea Rose - surbrillance
    },
    secondary: {
      surface: '#FDF9F0', // Floral White - surface secondaire
      text: '#BE6A65', // Sugar Rose - texte secondaire
    },
    status: {
      success: '#013927', // Dark Green - état positif
      alert: '#BE6A65', // Sugar Rose - état d'alerte
      accent: '#FCBDBD', // Tea Rose - accent
    },
    neutral: {
      white: '#FFFFFF',
      lightGray: 'rgba(1, 57, 39, 0.08)', // Dark Green avec opacité
    },
    // Couleurs de la charte graphique exactes
    darkGreen: '#013927',
    floralWhite: '#FDF9F0',
    teaRose: '#FCBDBD',
    sugarRose: '#BE6A65'
  },
  
  typography: {
    fonts: {
      heading: "'Playfair Display', Georgia, serif",
      body: "'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    sizes: {
      h1: {
        mobile: '40px',
        desktop: '64px',
      },
      h2: {
        mobile: '28px',
        desktop: '44px',
      },
      h3: {
        mobile: '20px',
        desktop: '28px',
      },
      body: {
        regular: '16px',
        large: '18px',
      },
      small: '14px',
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.6,
      relaxed: 1.8,
    },
    letterSpacing: {
      h1: '-0.02em',
      h2: '-0.01em',
      h3: '0',
      body: '0',
    }
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
    section: {
      mobile: '64px',
      desktop: '96px',
    },
    container: {
      padding: '20px',
      maxWidth: '1200px',
    }
  },
  
  borderRadius: {
    small: '8px',
    medium: '16px',
    large: '20px',
    xlarge: '28px',
    xxlarge: '32px',
    pill: '9999px',
  },
  
  shadows: {
    soft: '0 10px 30px rgba(1, 57, 39, 0.08)',
    medium: '0 15px 40px rgba(1, 57, 39, 0.12)',
    glass: 'inset 0 1px 0 0 rgba(255,255,255,0.1)',
    hover: '0 20px 50px rgba(1, 57, 39, 0.15)',
  },
  
  transitions: {
    fast: '150ms ease',
    normal: '300ms ease',
    slow: '500ms ease',
    spring: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    }
  },
  
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  },
  
  grid: {
    columns: 12,
    gutter: '24px',
  }
};