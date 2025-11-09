import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { LiquidGlassButton } from '../LiquidGlass';
import { FiClock, FiMapPin, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import HeroIntro from './HeroIntro';
import DecorativeDots from './DecorativeDots';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: ${props => props.theme.spacing.section.mobile} ${props => props.theme.spacing.container.padding};
  padding-top: calc(40px + ${props => props.theme.spacing.md});
  position: relative;
  overflow: hidden;
  margin-top: -20px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: linear-gradient(
      to bottom,
      rgba(1, 57, 39, 0.05) 0%,
      rgba(1, 57, 39, 0.02) 50%,
      transparent 100%
    );
    z-index: 1;
  }

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.section.desktop} ${props => props.theme.spacing.xl};
    padding-top: calc(40px + ${props => props.theme.spacing.lg});
  }
`;

const Container = styled.div`
  max-width: ${props => props.theme.spacing.container.maxWidth};
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xxl};
  align-items: center;
  position: relative;
  z-index: 2;
  text-align: center;
`;

const ContentWrapper = styled(motion.div)`
  z-index: 2;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(135deg,
      ${props => props.theme.colors.floralWhite} 0%,
      rgba(253, 249, 240, 0.8) 100%
    );
    box-shadow:
      0 0 20px rgba(253, 249, 240, 0.5),
      0 0 40px rgba(253, 249, 240, 0.3);
    animation: floatDots 6s ease-in-out infinite;
  }

  &::before {
    width: 8px;
    height: 8px;
    top: -20px;
    left: -30px;
    animation-delay: 0s;
  }

  &::after {
    width: 12px;
    height: 12px;
    top: -40px;
    right: -40px;
    animation-delay: 2s;
  }

  @keyframes floatDots {
    0%, 100% {
      transform: translateY(0px) scale(1);
      opacity: 0.7;
    }
    50% {
      transform: translateY(-10px) scale(1.2);
      opacity: 1;
    }
  }
`;

const Title = styled(motion.h1)`
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.floralWhite};
  position: relative;
  text-align: center;
  font-size: clamp(24px, 8vw, 80px);
  font-weight: ${props => props.theme.typography.weights.bold};
  letter-spacing: -1px;
  white-space: nowrap;
  overflow-wrap: normal;
  word-break: keep-all;
  text-shadow: 2px 2px 4px rgba(1, 57, 39, 0.3);
  z-index: 3;

  &::before {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background: ${props => props.theme.colors.teaRose};
    border-radius: 50%;
    top: 20%;
    left: -50px;
    box-shadow: 0 0 15px rgba(252, 189, 189, 0.6);
    animation: pulse1 4s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background: ${props => props.theme.colors.floralWhite};
    border-radius: 50%;
    bottom: 30%;
    right: -60px;
    box-shadow: 0 0 20px rgba(253, 249, 240, 0.8);
    animation: pulse2 5s ease-in-out infinite;
  }

  @keyframes pulse1 {
    0%, 100% {
      transform: scale(1) translateY(0);
      opacity: 0.8;
    }
    50% {
      transform: scale(1.5) translateY(-5px);
      opacity: 1;
    }
  }

  @keyframes pulse2 {
    0%, 100% {
      transform: scale(1) translateY(0);
      opacity: 0.7;
    }
    50% {
      transform: scale(1.3) translateY(-8px);
      opacity: 1;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin-bottom: ${props => props.theme.spacing.xl};
    margin-top: ${props => props.theme.spacing.xl};
    line-height: 1.3;
    text-align: center;
    padding: 0 ${props => props.theme.spacing.md};
    white-space: nowrap;
    word-break: keep-all;
    overflow-wrap: normal;

    &::before {
      left: -30px;
      width: 4px;
      height: 4px;
    }

    &::after {
      right: -40px;
      width: 8px;
      height: 8px;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    white-space: nowrap;
    word-break: keep-all;

    &::before {
      left: -20px;
    }

    &::after {
      right: -30px;
    }
  }
`;


const ButtonGroup = styled(motion.div)`
  position: fixed;
  bottom: ${props => props.theme.spacing.xxl};
  right: ${props => props.theme.spacing.xxl};
  z-index: 1500;
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: center;
  align-items: center;
  
  button {
    font-size: 16px;
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
    white-space: nowrap;
    font-weight: ${props => props.theme.typography.weights.semibold};
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    min-width: 160px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    left: 0;
    right: 0;
    width: 100%;
    transform: none;
    padding: 0 ${props => props.theme.spacing.md};
    
    button {
      font-size: 15px;
      padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
      min-width: 140px;
    }
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const Badge = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.sm};
  background: linear-gradient(135deg,
    rgba(253, 249, 240, 0.9) 0%,
    rgba(252, 189, 189, 0.2) 100%
  );
  backdrop-filter: blur(10px);
  border-radius: ${props => props.theme.borderRadius.pill};
  border: 1px solid rgba(252, 189, 189, 0.4);
  font-size: 12px;
  font-weight: ${props => props.theme.typography.weights.medium};
  color: ${props => props.theme.colors.primary.text};
  transition: all ${props => props.theme.transitions.normal};
  white-space: nowrap;

  svg {
    color: ${props => props.theme.colors.darkGreen};
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }

  span {
    white-space: nowrap;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 6px 10px;
    font-size: 11px;

    svg {
      width: 12px;
      height: 12px;
    }
  }

  &:hover {
    background: linear-gradient(135deg,
      rgba(253, 249, 240, 0.95) 0%,
      rgba(252, 189, 189, 0.3) 100%
    );
    border-color: rgba(252, 189, 189, 0.6);
  }
`;

const PhotosContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 80vh;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  margin-top: ${props => props.theme.spacing.xxl};
  margin-bottom: ${props => props.theme.spacing.xxl};
  overflow: hidden;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    height: auto;
    margin-top: ${props => props.theme.spacing.xl};
    margin-bottom: ${props => props.theme.spacing.xl};
    padding: ${props => props.theme.spacing.md} 0;
  }
`;

const PhotoGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.xl};

  .photo-item {
    position: relative;

    /* Photo de brunch principale - Plus grande et centrale */
    &:nth-child(1) {
      grid-column: 2 / 4;
      grid-row: 1 / 3;
      transform: rotate(-2deg);
      z-index: 10;
    }

    /* Photo de brunch secondaire - Grande à droite */
    &:nth-child(2) {
      grid-column: 4 / 6;
      grid-row: 2 / 4;
      transform: rotate(3deg);
      z-index: 9;
    }

    /* Photos de plats disposées autour */
    &:nth-child(3) {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
      transform: rotate(-8deg);
      z-index: 8;
    }

    &:nth-child(4) {
      grid-column: 5 / 6;
      grid-row: 1 / 2;
      transform: rotate(6deg);
      z-index: 7;
    }

    &:nth-child(5) {
      grid-column: 1 / 2;
      grid-row: 3 / 4;
      transform: rotate(4deg);
      z-index: 6;
    }

    &:nth-child(6) {
      grid-column: 6 / 7;
      grid-row: 2 / 3;
      transform: rotate(-5deg);
      z-index: 5;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    position: static;
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.spacing.lg};
    padding: ${props => props.theme.spacing.md};

    .photo-item {
      position: relative;
      width: 100%;
      height: 45vh;
      transform: none !important;
      grid-column: unset !important;
      grid-row: unset !important;
      border-radius: ${props => props.theme.borderRadius.xlarge};
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(1, 57, 39, 0.3);
      border: 2px solid rgba(252, 189, 189, 0.2);

      &:nth-child(1), &:nth-child(2) {
        height: 50vh;
        border: 3px solid ${props => props.theme.colors.teaRose};
        box-shadow: 0 25px 50px rgba(1, 57, 39, 0.4);
      }
    }
  }
`;



const ImageSlide = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: 0 8px 25px rgba(1, 57, 39, 0.3);
  border: 2px solid rgba(252, 189, 189, 0.6);
  overflow: hidden;
  cursor: pointer;
  will-change: transform, opacity;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  contain: layout style paint;

  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  /* Style spécial pour les photos de brunch */
  &.brunch-photo {
    border: 3px solid ${props => props.theme.colors.teaRose};
    box-shadow:
      0 12px 35px rgba(1, 57, 39, 0.4),
      0 0 0 1px rgba(252, 189, 189, 0.3);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(252, 189, 189, 0.1) 0%,
      transparent 50%,
      rgba(190, 106, 101, 0.1) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 2;
    pointer-events: none;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 40px rgba(1, 57, 39, 0.4);
    border-color: rgba(252, 189, 189, 0.9);

    &.brunch-photo {
      transform: scale(1.08);
      box-shadow:
        0 20px 50px rgba(1, 57, 39, 0.5),
        0 0 0 2px rgba(252, 189, 189, 0.6);
    }

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    border-radius: ${props => props.theme.borderRadius.small};
    box-shadow: 0 6px 20px rgba(1, 57, 39, 0.2);

    &:hover {
      transform: scale(1.02);
    }

  }
`;

const HeroImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
`;




// Modal Fullscreen Styles
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
`;

const ModalContent = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalImage = styled(motion.img)`
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: ${props => props.theme.borderRadius.xlarge};
  box-shadow: 0 50px 100px rgba(0, 0, 0, 0.5);
`;

const ModalCloseButton = styled(motion.button)`
  position: absolute;
  top: ${props => props.theme.spacing.xl};
  right: ${props => props.theme.spacing.xl};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }
`;

const ModalNavButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  
  ${props => props.$direction === 'prev' ? 'left: 20px;' : 'right: 20px;'}
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-50%) scale(1.1);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 40px;
    height: 40px;
  }
`;


const SwipeIndicator = styled(motion.div)`
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  opacity: 0.6;
  font-size: ${props => props.theme.typography.sizes.small};
  display: none;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [, setActiveImage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  // Preload images on mount
  useEffect(() => {
    const imageUrls = [
      '/images/presentation1.png',
      '/images/presentation2.png',
      '/images/presentation3.png',
      '/images/presentation4.png',
      '/images/presentation5.jpg',
      '/images/presentation6.jpg'
    ];
    
    const preloadImages = async () => {
      const promises = imageUrls.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
      });
      
      try {
        await Promise.all(promises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
        setImagesLoaded(true); // Still show images even if preload fails
      }
    };
    
    preloadImages();
  }, []);
  
  // Auto-rotation sur mobile
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile && !showModal && imagesLoaded) {
      const interval = setInterval(() => {
        setActiveImage(prev => (prev % 6) + 1);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [showModal, imagesLoaded]);
  
  const images = [
    {
      id: 1,
      src: '/images/presentation5.jpg',
      title: 'Ambiance Brunch',
      alt: 'L\'atmosphère chaleureuse de notre brunch',
      isBrunch: true
    },
    {
      id: 2,
      src: '/images/presentation6.jpg',
      title: 'Expérience Brunch',
      alt: 'Découvrez l\'art du brunch à la française',
      isBrunch: true
    },
    {
      id: 3,
      src: '/images/presentation1.png',
      title: 'Pancakes Gourmands',
      alt: 'Nos fameux pancakes avec napage et fruits frais',
      isBrunch: false
    },
    {
      id: 4,
      src: '/images/presentation2.png',
      title: 'Avocado Toast Signature',
      alt: 'Toast à l\'avocat, œuf poché et graines torréfiées',
      isBrunch: false
    },
    {
      id: 5,
      src: '/images/presentation3.png',
      title: 'Bowl Énergétique',
      alt: 'Granola maison, yaourt grec et fruits de saison',
      isBrunch: false
    },
    {
      id: 6,
      src: '/images/presentation4.png',
      title: 'Œufs Bénédicte',
      alt: 'Œufs pochés, sauce hollandaise et jambon de Bayonne',
      isBrunch: false
    }
  ];
  
  const openModal = (image) => {
    setModalImage(image);
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setModalImage(null);
  };
  
  const navigateImage = (direction) => {
    const currentIndex = images.findIndex(img => img.id === modalImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % images.length;
    } else {
      newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    }
    
    setModalImage(images[newIndex]);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };
  
  

  return (
    <>
      <HeroIntro />
      <HeroSection>
        <DecorativeDots />
        <Container>
        <ContentWrapper
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div style={{ position: 'relative' }}>
            <Title>
              {(() => {
                const title = t('hero.title');
                return title.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      opacity: 0,
                      y: 50,
                      scale: 0,
                      rotate: Math.random() * 360 - 180
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      rotate: 0
                    }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 150,
                      damping: 15
                    }}
                    whileHover={{
                      scale: 1.2,
                      rotate: [-5, 5, -5],
                      transition: { duration: 0.3 }
                    }}
                    style={{
                      display: 'inline-block',
                      transformOrigin: 'center bottom'
                    }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ));
              })()}
            </Title>
          </motion.div>

          {/* Photos directement après le titre sur mobile */}
          <PhotosContainer>
            <PhotoGrid>
              {imagesLoaded && images.map((image, index) => (
                <ImageSlide
                  key={image.id}
                  custom={index}
                  className={`photo-item ${image.isBrunch ? 'brunch-photo' : ''}`}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    y: 50
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      delay: index * 0.2,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }
                  }}
                  viewport={{
                    once: true,
                    margin: "-50px"
                  }}
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                    transition: {
                      duration: 0.3
                    }
                  }}
                  onClick={() => openModal(image)}
                >
                  <HeroImage
                    src={image.src}
                    alt={image.alt}
                    loading="eager"
                    decoding="async"
                  />
                </ImageSlide>
              ))}
            </PhotoGrid>
          </PhotosContainer>

          <ButtonGroup
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1.5,
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
          >
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 1.8,
                duration: 0.6,
                type: "spring",
                stiffness: 150,
                damping: 12
              }}
            >
              <LiquidGlassButton
                variant="secondary"
                size="large"
                onClick={() => {
                  navigate('/menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                as={motion.button}
                whileHover={{
                  scale: 1.08,
                  rotate: [0, 2, -2, 2, 0],
                  transition: { rotate: { duration: 0.4 } }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {t('hero.cta.menu')}
              </LiquidGlassButton>
            </motion.div>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 2,
                duration: 0.6,
                type: "spring",
                stiffness: 150,
                damping: 12
              }}
            >
              <LiquidGlassButton
                variant="accent"
                size="large"
                onClick={() => window.open('https://www.google.com/maps/reserve/v/dine/c/tYfq5WqTgGw?source=pa&opi=89978449&hl=fr-FR&gei=J6rNaMFru-jszw-zsPfoDw&sourceurl=https%3A%2F%2Fwww.google.com%2Fsearch%3Fq%3Dbrunch%2Bhouse%2Bbordeaux%26rlz%3D1C5CHFA_enFR1079FR1079%26oq%3Dbrunch%2Bhouse%26gs_lcrp%3DEgZjaHJvbWUqCggAEAAY4wIYgAQyCggAEAAY4wIYgAQyDQgBEC4YrwEYxwEYgAQyBwgCEAAYgAQyBwgDEAAYgAQyDQgEEAAYgwEYsQMYgAQyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQg0OTA2ajBqN6gCALACAA%26sourceid%3Dchrome%26ie%3DUTF-8&ihs=3', '_blank')}
                as={motion.button}
                whileHover={{
                  scale: 1.08,
                  rotate: [0, -2, 2, -2, 0],
                  transition: { rotate: { duration: 0.4 } }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {t('hero.cta.reserve')}
              </LiquidGlassButton>
            </motion.div>
          </ButtonGroup>

          <motion.div variants={itemVariants}>
            <BadgeContainer>
              <Badge
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FiClock size={16} />
                <span>{t('hero.badges.open')}</span>
              </Badge>
              <Badge
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FiMapPin size={16} />
                <span>{t('hero.badges.location')}</span>
              </Badge>
            </BadgeContainer>
          </motion.div>

        </ContentWrapper>
      </Container>
      
      {/* Modal Fullscreen */}
      <AnimatePresence>
        {showModal && modalImage && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalImage
                src={modalImage.src}
                alt={modalImage.alt}
                initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
                transition={{ 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
                drag="x"
                dragConstraints={{ left: -100, right: 100 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset }) => {
                  if (offset.x > 100) {
                    navigateImage('prev');
                  } else if (offset.x < -100) {
                    navigateImage('next');
                  }
                }}
                whileHover={{ scale: 1.02 }}
              />
              
              <ModalCloseButton
                onClick={closeModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.3 }}
              >
                <FiX size={24} />
              </ModalCloseButton>
              
              <ModalNavButton
                $direction="prev"
                onClick={() => navigateImage('prev')}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <FiChevronLeft size={24} />
              </ModalNavButton>
              
              <ModalNavButton
                $direction="next"
                onClick={() => navigateImage('next')}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <FiChevronRight size={24} />
              </ModalNavButton>
              
              
              <SwipeIndicator
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 1 }}
              >
                ← Glissez pour naviguer →
              </SwipeIndicator>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
      </HeroSection>
    </>
  );
};

export default Hero;