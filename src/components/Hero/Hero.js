import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { LiquidGlassButton } from '../LiquidGlass';
import { FiClock, FiMapPin, FiCoffee, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ParallaxSection, BlurInWhenVisible } from '../AnimatedSection/AnimatedSection';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: ${props => props.theme.spacing.section.mobile} ${props => props.theme.spacing.container.padding};
  padding-top: calc(100px + ${props => props.theme.spacing.md});
  position: relative;
  overflow: hidden;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.section.desktop} ${props => props.theme.spacing.xl};
    padding-top: calc(100px + ${props => props.theme.spacing.lg});
  }
`;

const Container = styled.div`
  max-width: ${props => props.theme.spacing.container.maxWidth};
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing.xxl};
  align-items: center;
  
  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContentWrapper = styled(motion.div)`
  z-index: 2;
  position: relative;
`;

const Title = styled(motion.h1)`
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.primary.text};
  position: relative;
  text-align: center;
  font-size: ${props => props.theme.typography.sizes.h1.desktop};
  font-weight: ${props => props.theme.typography.weights.bold};
  letter-spacing: -1px;
  white-space: nowrap;
  overflow-wrap: normal;
  word-break: keep-all;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin-bottom: 180px;
    margin-top: ${props => props.theme.spacing.xl};
    font-size: 48px;
    line-height: 1.3;
    text-align: center;
    padding: 0 ${props => props.theme.spacing.md};
    white-space: normal;
    word-break: keep-all;
    overflow-wrap: normal;
    z-index: 5;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 38px;
    white-space: normal;
    word-break: keep-all;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(16px, 2.5vw, 20px);
  color: ${props => props.theme.colors.secondary.text};
  margin-bottom: ${props => props.theme.spacing.xxl};
  line-height: 1.8;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  font-weight: ${props => props.theme.typography.weights.light};
  position: relative;
  padding: 0 ${props => props.theme.spacing.lg};
  
  &::before {
    content: '"';
    position: absolute;
    left: -10px;
    top: -10px;
    font-size: 48px;
    color: ${props => props.theme.colors.primary.highlight};
    opacity: 0.3;
    font-family: Georgia, serif;
  }
  
  &::after {
    content: '"';
    position: absolute;
    right: -10px;
    bottom: -20px;
    font-size: 48px;
    color: ${props => props.theme.colors.primary.highlight};
    opacity: 0.3;
    font-family: Georgia, serif;
    transform: rotate(180deg);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 17px;
    padding: 0 ${props => props.theme.spacing.md};
    margin-bottom: ${props => props.theme.spacing.xl};
    
    &::before, &::after {
      font-size: 36px;
    }
  }
`;

const ButtonGroup = styled(motion.div)`
  position: fixed;
  bottom: ${props => props.theme.spacing.xxl};
  right: ${props => props.theme.spacing.xxl};
  z-index: 100;
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
    rgba(255, 255, 255, 0.8) 0%, 
    rgba(224, 171, 159, 0.1) 100%
  );
  backdrop-filter: blur(10px);
  border-radius: ${props => props.theme.borderRadius.pill};
  border: 1px solid rgba(224, 171, 159, 0.3);
  font-size: 12px;
  font-weight: ${props => props.theme.typography.weights.medium};
  color: ${props => props.theme.colors.primary.text};
  transition: all ${props => props.theme.transitions.normal};
  white-space: nowrap;
  
  svg {
    color: ${props => props.theme.colors.primary.highlight};
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
      rgba(255, 255, 255, 0.9) 0%, 
      rgba(224, 171, 159, 0.2) 100%
    );
    border-color: rgba(224, 171, 159, 0.5);
  }
`;

const MobileImageDisplay = styled(motion.div)`
  display: block;
  position: absolute;
  top: 70%;
  right: -550px;
  transform: translateY(-50%) translateZ(0);
  width: 400px;
  height: 300px;
  pointer-events: none;
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  
  > * {
    pointer-events: auto;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    left: 50%;
    right: auto;
    transform: translate(-50%, -50%) translateZ(0);
    width: 90%;
    max-width: 400px;
    height: 250px;
    will-change: transform;
  }
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  border-radius: ${props => props.theme.borderRadius.xlarge};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.soft};
  height: 500px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
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
      rgba(28, 63, 51, 0.1) 0%,
      rgba(43, 91, 74, 0.05) 100%
    );
    pointer-events: none;
    z-index: 2;
    
    @media (max-width: ${props => props.theme.breakpoints.tablet}) {
      display: none;
    }
  }
`;

const ImageCarousel = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: flex;
    height: 120px;
    gap: 0;
    margin-bottom: ${props => props.theme.spacing.xl};
    position: relative;
  }
`;

const ImageSlide = styled(motion.div)`
  position: absolute;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 3px solid white;
  overflow: hidden;
  cursor: pointer;
  will-change: transform, opacity;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  contain: layout style paint;
  
  &:nth-child(1) {
    top: 0px;
    left: 0px;
    transform: rotate(-20deg) ${props => props.$active === 1 ? 'scale(1.3) rotate(-5deg)' : 'scale(1)'};
    z-index: ${props => props.$active === 1 ? 4 : 1};
    animation: float1 6s ease-in-out infinite;
  }
  
  &:nth-child(2) {
    top: 0px;
    right: 0px;
    left: auto;
    transform: rotate(15deg) ${props => props.$active === 2 ? 'scale(1.3) rotate(0deg)' : 'scale(1)'};
    z-index: ${props => props.$active === 2 ? 4 : 2};
    animation: float2 5s ease-in-out infinite;
  }
  
  &:nth-child(3) {
    bottom: 0px;
    left: 0px;
    transform: rotate(-10deg) ${props => props.$active === 3 ? 'scale(1.3) rotate(5deg)' : 'scale(1)'};
    z-index: ${props => props.$active === 3 ? 4 : 1};
    animation: float3 7s ease-in-out infinite;
  }
  
  &:nth-child(4) {
    bottom: 0px;
    right: 0px;
    left: auto;
    transform: rotate(25deg) ${props => props.$active === 4 ? 'scale(1.3) rotate(10deg)' : 'scale(1)'};
    z-index: ${props => props.$active === 4 ? 4 : 3};
    animation: float4 6.5s ease-in-out infinite;
  }
  
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 110px;
    height: 110px;
    
    &:nth-child(1) {
      top: -70px;
      left: 0%;
      transform: rotate(-20deg) ${props => props.$active === 1 ? 'scale(1.3) rotate(-5deg)' : 'scale(1)'} translateZ(0);
      z-index: ${props => props.$active === 1 ? 4 : 1};
      animation: float1Mobile 6s ease-in-out infinite;
    }
    
    &:nth-child(2) {
      top: -70px;
      right: 0%;
      left: auto;
      transform: rotate(15deg) ${props => props.$active === 2 ? 'scale(1.3) rotate(0deg)' : 'scale(1)'} translateZ(0);
      z-index: ${props => props.$active === 2 ? 4 : 2};
      animation: float2Mobile 5s ease-in-out infinite;
    }
    
    &:nth-child(3) {
      bottom: -70px;
      left: 0%;
    }
    
    &:nth-child(4) {
      bottom: -70px;
      right: 0%;
      left: auto;
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
  }
  
  @keyframes float1 {
    0%, 100% { transform: translateY(0px) rotate(-25deg) translateZ(0); }
    50% { transform: translateY(-10px) rotate(-20deg) translateZ(0); }
  }
  
  @keyframes float2 {
    0%, 100% { transform: translateY(0px) rotate(15deg) translateZ(0); }
    50% { transform: translateY(10px) rotate(20deg) translateZ(0); }
  }
  
  @keyframes float3 {
    0%, 100% { transform: translateY(0px) rotate(-10deg) translateZ(0); }
    50% { transform: translateY(-15px) rotate(-5deg) translateZ(0); }
  }
  
  @keyframes float4 {
    0%, 100% { transform: translateY(0px) rotate(25deg) translateZ(0); }
    50% { transform: translateY(12px) rotate(20deg) translateZ(0); }
  }
  
  @keyframes float1Mobile {
    0%, 100% { transform: translateY(0px) rotate(-20deg) translateZ(0); }
    50% { transform: translateY(-5px) rotate(-15deg) translateZ(0); }
  }
  
  @keyframes float2Mobile {
    0%, 100% { transform: translateY(0px) rotate(15deg) translateZ(0); }
    50% { transform: translateY(5px) rotate(20deg) translateZ(0); }
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


const ImageDots = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: none;
  gap: ${props => props.theme.spacing.sm};
  z-index: 10;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: flex;
  }
`;

const Dot = styled(motion.button)`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid white;
  background: ${props => props.$active ? 'white' : 'transparent'};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
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
  const [activeImage, setActiveImage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  // Preload images on mount
  useEffect(() => {
    const imageUrls = [
      '/images/presentation1.png',
      '/images/presentation2.png',
      '/images/presentation3.png',
      '/images/presentation4.png'
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
        setActiveImage(prev => (prev % 4) + 1);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [showModal, imagesLoaded]);
  
  const images = [
    { 
      id: 1, 
      src: '/images/presentation1.png', 
      title: 'Pancakes Gourmands',
      alt: 'Nos fameux pancakes avec sirop d\'érable et fruits frais' 
    },
    { 
      id: 2, 
      src: '/images/presentation2.png', 
      title: 'Avocado Toast Signature',
      alt: 'Toast à l\'avocat, œuf poché et graines torréfiées' 
    },
    { 
      id: 3, 
      src: '/images/presentation3.png',
      title: 'Bowl Énergétique',
      alt: 'Granola maison, yaourt grec et fruits de saison' 
    },
    { 
      id: 4, 
      src: '/images/presentation4.png',
      title: 'Œufs Bénédicte',
      alt: 'Œufs pochés, sauce hollandaise et jambon de Bayonne' 
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
  
  const imageVariants = {
    initial: { scale: 1.2, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };
  
  const mobileImageVariants = {
    initial: (i) => ({
      opacity: 0,
      scale: 0,
      x: i === 0 ? -100 : i === 2 ? 100 : 0,
      y: -50,
      rotate: i === 0 ? -180 : i === 2 ? 180 : 0
    }),
    animate: (i) => ({
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotate: i === 0 ? -15 : i === 1 ? 5 : 12,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }),
    tap: {
      scale: 1.3,
      rotate: 0,
      zIndex: 10,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  return (
    <HeroSection>
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
                const titleWithBreak = title.replace('commence...', '\ncommence...');
                return titleWithBreak.split('').map((letter, index) => (
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
                      display: letter === '\n' ? 'block' : 'inline-block',
                      transformOrigin: 'center bottom'
                    }}
                  >
                    {letter === ' ' ? '\u00A0' : letter === '\n' ? '' : letter}
                  </motion.span>
                ));
              })()}
              <MobileImageDisplay>
                {imagesLoaded && images.map((image, index) => (
                  <ImageSlide
                    key={image.id}
                    $active={activeImage}
                    custom={index}
                    initial="initial"
                    animate="animate"
                    whileTap="tap"
                    variants={mobileImageVariants}
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
              </MobileImageDisplay>
            </Title>
          </motion.div>
          
          <Subtitle
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 1.2,
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              {t('hero.subtitle').split(' ').map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1.3 + index * 0.05,
                    duration: 0.5
                  }}
                  style={{ display: 'inline-block', marginRight: '6px' }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.span>
          </Subtitle>
          
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
              initial={{ scale: 0, rotate: -180 }}
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
                variant="accent" 
                size="large"
                onClick={() => window.open('https://www.thefork.fr/restaurant/brunch-house-r847025', '_blank')}
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
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
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
  );
};

export default Hero;