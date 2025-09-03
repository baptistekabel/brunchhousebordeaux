import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }
  
  body {
    font-family: ${props => props.theme.typography.fonts.body};
    font-size: ${props => props.theme.typography.sizes.body.regular};
    line-height: ${props => props.theme.typography.lineHeight.normal};
    color: ${props => props.theme.colors.primary.text};
    background-color: ${props => props.theme.colors.primary.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.typography.fonts.heading};
    font-weight: ${props => props.theme.typography.weights.bold};
    line-height: ${props => props.theme.typography.lineHeight.tight};
    color: ${props => props.theme.colors.primary.text};
  }
  
  h1 {
    font-size: ${props => props.theme.typography.sizes.h1.mobile};
    letter-spacing: ${props => props.theme.typography.letterSpacing.h1};
    
    @media (min-width: ${props => props.theme.breakpoints.tablet}) {
      font-size: ${props => props.theme.typography.sizes.h1.desktop};
    }
  }
  
  h2 {
    font-size: ${props => props.theme.typography.sizes.h2.mobile};
    letter-spacing: ${props => props.theme.typography.letterSpacing.h2};
    font-weight: ${props => props.theme.typography.weights.semibold};
    
    @media (min-width: ${props => props.theme.breakpoints.tablet}) {
      font-size: ${props => props.theme.typography.sizes.h2.desktop};
    }
  }
  
  h3 {
    font-size: ${props => props.theme.typography.sizes.h3.mobile};
    letter-spacing: ${props => props.theme.typography.letterSpacing.h3};
    font-weight: ${props => props.theme.typography.weights.semibold};
    
    @media (min-width: ${props => props.theme.breakpoints.tablet}) {
      font-size: ${props => props.theme.typography.sizes.h3.desktop};
    }
  }
  
  p {
    margin-bottom: ${props => props.theme.spacing.md};
  }
  
  a {
    color: ${props => props.theme.colors.primary.text};
    text-decoration: none;
    transition: color ${props => props.theme.transitions.fast};
    
    &:hover {
      color: ${props => props.theme.colors.primary.accent};
    }
  }
  
  button {
    cursor: pointer;
    font-family: inherit;
    border: none;
    outline: none;
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
  
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
  
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
  }
  
  ::selection {
    background-color: ${props => props.theme.colors.primary.accent};
    color: ${props => props.theme.colors.neutral.white};
  }
  
  ::-webkit-scrollbar {
    width: 10px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.secondary.surface};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary.accent};
    border-radius: ${props => props.theme.borderRadius.pill};
    
    &:hover {
      background: ${props => props.theme.colors.primary.text};
    }
  }
`;