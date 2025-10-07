import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const IntroSection = styled.section`
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  min-height: 60vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgba(253, 249, 240, 0.95) 0%,
    rgba(251, 247, 238, 0.9) 100%
  );
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(1, 57, 39, 0.02) 50%,
      rgba(1, 57, 39, 0.05) 100%
    );
    z-index: 4;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/images/presentation5.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.7;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(253, 249, 240, 0.6) 0%,
      rgba(251, 247, 238, 0.7) 100%
    );
    z-index: 2;
  }
`;

const ContentWrapper = styled(motion.div)`
  position: relative;
  z-index: 3;
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Logo = styled(motion.img)`
  height: 280px;
  width: auto;
  margin: 0 auto;
  display: block;
  filter:
    brightness(0)
    invert(1)
    drop-shadow(2px 2px 8px rgba(1, 57, 39, 0.6))
    drop-shadow(0 0 20px rgba(253, 249, 240, 0.8))
    drop-shadow(0 0 40px rgba(253, 249, 240, 0.4));
  object-fit: contain;
  display: block;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 70%
    );
    opacity: 0;
    animation: shine 3s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes shine {
    0%, 100% {
      opacity: 0;
      transform: translateX(-100%);
    }
    50% {
      opacity: 1;
      transform: translateX(100%);
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    height: 200px;
  }
`;

const IntroText = styled(motion.h2)`
  font-size: clamp(24px, 4vw, 48px);
  font-weight: ${props => props.theme.typography.weights.bold};
  color: ${props => props.theme.colors.floralWhite};
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  text-shadow:
    2px 2px 8px rgba(1, 57, 39, 0.8),
    0 0 20px rgba(253, 249, 240, 0.6),
    0 0 40px rgba(253, 249, 240, 0.3);
  margin: 0;
  line-height: 1.2;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: clamp(18px, 5vw, 32px);
    letter-spacing: 1px;
  }
`;

const HeroIntro = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <IntroSection>
      <ContentWrapper
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Logo
          src="/logoBrunch.png"
          alt="Brunch House Logo"
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
        />
      </ContentWrapper>
    </IntroSection>
  );
};

export default HeroIntro;