import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { LiquidGlassCard } from '../LiquidGlass';
import { ParallaxSection, ScaleInWhenVisible } from '../AnimatedSection/AnimatedSection';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const Section = styled.section`
  padding: ${props => props.theme.spacing.section.mobile} ${props => props.theme.spacing.container.padding};
  position: relative;
  overflow: hidden;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.section.desktop} ${props => props.theme.spacing.xl};
  }
  
`;

const Container = styled.div`
  max-width: ${props => props.theme.spacing.container.maxWidth};
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xxxl};
`;

const SectionTitle = styled(motion.h2)`
  margin-bottom: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.typography.sizes.h2.desktop};
  color: ${props => props.theme.colors.floralWhite};
  text-shadow: 2px 2px 4px rgba(1, 57, 39, 0.5);

  span {
    color: inherit;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: ${props => props.theme.typography.sizes.body.large};
  color: ${props => props.theme.colors.floralWhite};
  max-width: 600px;
  margin: 0 auto;
  text-shadow: 1px 1px 2px rgba(1, 57, 39, 0.4);
  opacity: 0.9;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing.xl};
  align-items: center;
  
  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContentCard = styled(LiquidGlassCard)`
  padding: ${props => props.theme.spacing.xxl};
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(251, 247, 238, 0.9) 100%
  );
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  background: linear-gradient(135deg,
    ${props => props.theme.colors.darkGreen} 0%,
    rgba(1, 57, 39, 0.9) 100%
  );
  border-radius: ${props => props.theme.borderRadius.pill};
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.floralWhite};
  font-weight: ${props => props.theme.typography.weights.medium};

  svg {
    color: ${props => props.theme.colors.floralWhite};
  }
`;

const ContentTitle = styled.h3`
  font-size: 28px;
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.darkGreen};
`;

const ContentText = styled.p`
  font-size: ${props => props.theme.typography.sizes.body.regular};
  color: ${props => props.theme.colors.darkGreen};
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
  margin-bottom: ${props => props.theme.spacing.lg};
  opacity: 0.8;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.darkGreen};
  opacity: 0.8;

  &::before {
    content: '✨';
    font-size: 20px;
    color: ${props => props.theme.colors.teaRose};
  }
`;

const SliderWrapper = styled(motion.div)`
  position: relative;
  border-radius: ${props => props.theme.borderRadius.xxlarge};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.medium};

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg,
      rgba(28, 63, 51, 0.2) 0%,
      transparent 100%
    );
    pointer-events: none;
    z-index: 1;
  }
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
`;

const SliderTrack = styled.div`
  display: flex;
  width: ${props => props.imageCount * 100}%;
  height: 100%;
  transform: translateX(-${props => props.currentIndex * (100 / props.imageCount)}%);
  transition: transform 0.3s ease-in-out;
`;

const SliderImage = styled.img`
  width: ${props => 100 / props.imageCount}%;
  height: 100%;
  object-fit: cover;
  flex-shrink: 0;
`;

const SliderButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 2;
  color: ${props => props.theme.colors.darkGreen};

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-50%) scale(1.1);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }
`;

const PrevButton = styled(SliderButton)`
  left: 15px;
`;

const NextButton = styled(SliderButton)`
  right: 15px;
`;

const SliderDots = styled.div`
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active
    ? 'rgba(255, 255, 255, 0.9)'
    : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.8);
    transform: scale(1.2);
  }
`;


const CreativeBrunch = () => {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    {
      src: "/images/menu/brunchAccueil.JPG",
      alt: "Brunch créatif - Ambiance accueil"
    },
    {
      src: "/images/optimized/atelierBrunch.jpg",
      srcSet: `
        /images/optimized/atelierBrunch-400w.jpg 400w,
        /images/optimized/atelierBrunch-800w.jpg 800w,
        /images/optimized/atelierBrunch-1200w.jpg 1200w,
        /images/optimized/atelierBrunch-1600w.jpg 1600w
      `,
      sizes: "(max-width: 768px) 400px, (max-width: 1200px) 800px, 1200px",
      alt: t('creativeBrunch.imageAlt')
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };


  return (
    <Section id="creative-brunch">
      <Container>
        <Header>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span>{t('creativeBrunch.title')}</span> {t('creativeBrunch.subtitle')}
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('creativeBrunch.description')}
          </SectionSubtitle>
        </Header>
        
        <Grid>
          <ScaleInWhenVisible delay={0.2}>
            <ContentCard>
              <Badge>
                <FiCalendar size={18} />
                <span>{t('creativeBrunch.badge')}</span>
              </Badge>
              
              <ContentTitle>{t('creativeBrunch.cardTitle')}</ContentTitle>
              <ContentText>
                {t('creativeBrunch.cardDescription')}
              </ContentText>
              
              <FeatureList>
                <FeatureItem>
                  {t('creativeBrunch.features.item1')}
                </FeatureItem>
                <FeatureItem>
                  {t('creativeBrunch.features.item2')}
                </FeatureItem>
                <FeatureItem>
                  {t('creativeBrunch.features.item3')}
                </FeatureItem>
                <FeatureItem>
                  {t('creativeBrunch.features.item4')}
                </FeatureItem>
                <FeatureItem>
                  {t('creativeBrunch.features.item5')}
                </FeatureItem>
              </FeatureList>
              
            </ContentCard>
          </ScaleInWhenVisible>
          
          <ParallaxSection offset={30}>
            <SliderWrapper
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <SliderContainer>
                <SliderTrack
                  currentIndex={currentImageIndex}
                  imageCount={images.length}
                >
                  {images.map((image, index) => (
                    <SliderImage
                      key={index}
                      src={image.src}
                      srcSet={image.srcSet}
                      sizes={image.sizes}
                      alt={image.alt}
                      imageCount={images.length}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  ))}
                </SliderTrack>

                {images.length > 1 && (
                  <>
                    <PrevButton onClick={prevImage} aria-label="Image précédente">
                      <FiChevronLeft size={20} />
                    </PrevButton>
                    <NextButton onClick={nextImage} aria-label="Image suivante">
                      <FiChevronRight size={20} />
                    </NextButton>

                    <SliderDots>
                      {images.map((_, index) => (
                        <Dot
                          key={index}
                          active={index === currentImageIndex}
                          onClick={() => goToImage(index)}
                          aria-label={`Aller à l'image ${index + 1}`}
                        />
                      ))}
                    </SliderDots>
                  </>
                )}
              </SliderContainer>
            </SliderWrapper>
          </ParallaxSection>
        </Grid>
      </Container>
    </Section>
  );
};

export default CreativeBrunch;