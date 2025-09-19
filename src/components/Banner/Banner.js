import styled from 'styled-components';
import { motion } from 'framer-motion';

const getBackgroundColor = (variant) => {
  switch (variant) {
    case 'green':
      return 'linear-gradient(135deg, #013927 0%, rgba(1, 57, 39, 0.95) 50%, #013927 100%)';
    case 'rose':
      return 'linear-gradient(135deg, #FCBDBD 0%, rgba(252, 189, 189, 0.95) 50%, #BE6A65 100%)';
    case 'beige':
      return 'linear-gradient(135deg, #FDF9F0 0%, rgba(253, 249, 240, 0.95) 50%, #F7F2E7 100%)';
    default:
      return 'linear-gradient(135deg, #013927 0%, rgba(1, 57, 39, 0.95) 50%, #013927 100%)';
  }
};

const getTextColor = (variant) => {
  switch (variant) {
    case 'green':
      return '#FDF9F0';
    case 'rose':
      return '#FDF9F0';
    case 'beige':
      return '#013927';
    default:
      return '#FDF9F0';
  }
};

const BannerSection = styled.section`
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  padding: ${props => props.theme.spacing.md} 0;
  background: ${props => getBackgroundColor(props.$variant)};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 2px,
      ${props => props.$variant === 'beige' ? 'rgba(1, 57, 39, 0.03)' : 'rgba(253, 249, 240, 0.03)'} 2px,
      ${props => props.$variant === 'beige' ? 'rgba(1, 57, 39, 0.03)' : 'rgba(253, 249, 240, 0.03)'} 4px
    );
    pointer-events: none;
  }
`;

const BannerContent = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60px;
  position: relative;
  z-index: 2;
  overflow: visible;
  width: 100%;
`;

const BannerText = styled(motion.h2)`
  font-size: clamp(16px, 3vw, 28px);
  font-weight: ${props => props.theme.typography.weights.bold};
  color: ${props => getTextColor(props.$variant)};
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  text-shadow: ${props => props.$variant === 'beige' ? '1px 1px 2px rgba(1, 57, 39, 0.2)' : '2px 2px 4px rgba(0, 0, 0, 0.3)'};
  margin: 0;
  padding: 0 ${props => props.theme.spacing.lg};
  white-space: nowrap;
  position: relative;
  line-height: 1.2;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    letter-spacing: 1px;
    padding: 0 ${props => props.theme.spacing.md};
    font-size: clamp(12px, 3.5vw, 20px);
    white-space: normal;
    word-break: keep-all;
  }

`;

const Banner = ({ text, variant = 'green', delay = 0 }) => {
  return (
    <BannerSection $variant={variant}>
      <BannerContent
        initial={{
          x: '-100%',
          opacity: 0
        }}
        animate={{
          x: 0,
          opacity: 1
        }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        <BannerText $variant={variant}>
          {text}
        </BannerText>
      </BannerContent>
    </BannerSection>
  );
};

export default Banner;