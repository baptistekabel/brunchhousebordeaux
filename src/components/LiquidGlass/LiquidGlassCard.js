import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledCard = styled(motion.div)`
  background: linear-gradient(
    135deg,
    rgba(251, 247, 238, 0.9) 0%,
    rgba(255, 255, 255, 0.8) 100%
  );
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.$padding || props.theme.spacing.lg};
  box-shadow: 
    ${props => props.theme.shadows.soft},
    ${props => props.theme.shadows.glass};
  position: relative;
  overflow: hidden;
  transition: all ${props => props.theme.transitions.normal};
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0) 70%
    );
    opacity: 0;
    pointer-events: none;
    transition: opacity ${props => props.theme.transitions.normal};
  }
  
  ${props => props.$hoverable && `
    cursor: pointer;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 
        ${props.theme.shadows.hover},
        ${props.theme.shadows.glass};
      
      &::before {
        opacity: 1;
      }
    }
  `}
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

const LiquidGlassCard = ({ 
  children, 
  hoverable = false,
  padding,
  ...props 
}) => {
  return (
    <StyledCard
      $hoverable={hoverable}
      $padding={padding}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={hoverable ? { scale: 1.02 } : {}}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

export default LiquidGlassCard;