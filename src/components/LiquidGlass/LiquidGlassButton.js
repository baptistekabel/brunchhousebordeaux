import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledButton = styled(motion.button)`
  position: relative;
  padding: ${props => props.$size === 'large' ? '20px 44px' : '16px 36px'};
  font-size: ${props => props.$size === 'large' ? '17px' : '15px'};
  font-weight: ${props => props.theme.typography.weights.semibold};
  letter-spacing: 0.5px;
  border-radius: ${props => props.theme.borderRadius.pill};
  background: linear-gradient(
    135deg,
    rgba(253, 249, 240, 0.95) 0%,
    rgba(253, 249, 240, 0.8) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 2px solid rgba(252, 189, 189, 0.4);
  box-shadow:
    0 8px 32px rgba(1, 57, 39, 0.08),
    0 2px 8px rgba(1, 57, 39, 0.06),
    inset 0 2px 4px rgba(253, 249, 240, 0.6);
  color: ${props => props.$variant === 'primary' 
    ? props.theme.colors.primary.text 
    : props.theme.colors.neutral.white};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.normal};
  overflow: hidden;
  text-transform: uppercase;
  
  ${props => props.$variant === 'primary' && `
    background: linear-gradient(
      135deg,
      rgba(253, 249, 240, 0.98) 0%,
      rgba(253, 249, 240, 0.95) 100%
    );
    border: 2px solid rgba(252, 189, 189, 0.4);
    color: ${props.theme.colors.primary.text};
  `}
  
  ${props => props.$variant === 'secondary' && `
    background: linear-gradient(
      135deg,
      ${props.theme.colors.primary.text} 0%,
      ${props.theme.colors.primary.accent} 100%
    );
    border: 2px solid transparent;
    box-shadow: 
      0 10px 40px rgba(1, 57, 39, 0.3),
      0 2px 12px rgba(1, 57, 39, 0.2),
      inset 0 2px 4px rgba(255, 255, 255, 0.1);
  `}
  
  ${props => props.$variant === 'accent' && `
    background: linear-gradient(
      135deg,
      ${props.theme.colors.primary.highlight} 0%,
      rgba(252, 189, 189, 0.8) 100%
    );
    border: 2px solid rgba(255, 255, 255, 0.5);
    color: white;
    box-shadow: 
      0 10px 40px rgba(252, 189, 189, 0.4),
      0 2px 12px rgba(252, 189, 189, 0.3),
      inset 0 2px 4px rgba(255, 255, 255, 0.3);
  `}
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.4) 0%,
      transparent 70%
    );
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    transition: all ${props => props.theme.transitions.normal};
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-3px) scale(1.02);
    
    ${props => props.$variant === 'primary' && `
      box-shadow: 
        0 12px 40px rgba(252, 189, 189, 0.25),
        0 4px 12px rgba(252, 189, 189, 0.15),
        inset 0 2px 4px rgba(255, 255, 255, 0.5);
    `}
    
    ${props => props.$variant === 'secondary' && `
      box-shadow: 
        0 14px 48px rgba(1, 57, 39, 0.35),
        0 4px 16px rgba(1, 57, 39, 0.25),
        inset 0 2px 4px rgba(255, 255, 255, 0.2);
    `}
    
    ${props => props.$variant === 'accent' && `
      box-shadow: 
        0 14px 48px rgba(252, 189, 189, 0.5),
        0 4px 16px rgba(252, 189, 189, 0.35),
        inset 0 2px 4px rgba(255, 255, 255, 0.4);
    `}
    
    &::before {
      opacity: 0.5;
      transform: translate(-50%, -50%) scale(1.2);
    }
  }
  
  &:active:not(:disabled) {
    transform: translateY(0) scale(0.98);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.$size === 'large' ? '16px 32px' : '12px 24px'};
    font-size: ${props => props.$size === 'large' ? '16px' : '14px'};
  }
`;

const LiquidGlassButton = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick,
  disabled = false,
  ...props 
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default LiquidGlassButton;