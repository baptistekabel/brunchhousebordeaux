import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCalendar, FiUsers, FiStar } from 'react-icons/fi';
import { LiquidGlassCard } from '../LiquidGlass';
import { ParallaxSection, ScaleInWhenVisible } from '../AnimatedSection/AnimatedSection';

const Section = styled.section`
  padding: ${props => props.theme.spacing.section.mobile} ${props => props.theme.spacing.container.padding};
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary.background} 0%, 
    rgba(251, 247, 238, 0.5) 100%
  );
  position: relative;
  overflow: hidden;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.section.desktop} ${props => props.theme.spacing.xl};
  }
  
  &::before {
    content: '🎨';
    position: absolute;
    top: 10%;
    right: 5%;
    font-size: 100px;
    opacity: 0.1;
    transform: rotate(-15deg);
  }
  
  &::after {
    content: '🥞';
    position: absolute;
    bottom: 10%;
    left: 5%;
    font-size: 120px;
    opacity: 0.1;
    transform: rotate(15deg);
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
  
  span {
    background: linear-gradient(135deg, 
      ${props => props.theme.colors.primary.accent} 0%, 
      ${props => props.theme.colors.primary.text} 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: ${props => props.theme.typography.sizes.body.large};
  color: ${props => props.theme.colors.secondary.text};
  max-width: 600px;
  margin: 0 auto;
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
    rgba(28, 63, 51, 0.1) 0%, 
    rgba(43, 91, 74, 0.05) 100%
  );
  border-radius: ${props => props.theme.borderRadius.pill};
  margin-bottom: ${props => props.theme.spacing.lg};
  
  svg {
    color: ${props => props.theme.colors.primary.accent};
  }
`;

const ContentTitle = styled.h3`
  font-size: 28px;
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.primary.text};
`;

const ContentText = styled.p`
  font-size: ${props => props.theme.typography.sizes.body.regular};
  color: ${props => props.theme.colors.secondary.text};
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
  margin-bottom: ${props => props.theme.spacing.lg};
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
  
  &::before {
    content: '✨';
    font-size: 20px;
  }
`;

const ImageWrapper = styled(motion.div)`
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
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
`;

const FloatingEmoji = styled(motion.div)`
  position: absolute;
  font-size: 40px;
  z-index: 10;
  
  &.emoji1 { top: 10%; left: 10%; }
  &.emoji2 { top: 20%; right: 15%; }
  &.emoji3 { bottom: 20%; left: 20%; }
  &.emoji4 { bottom: 10%; right: 10%; }
`;

const CreativeBrunch = () => {
  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
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
            <span>Brunch Créatif</span> du Mercredi
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Chaque mercredi, transformez votre pause déjeuner en moment créatif et gourmand 🎨
          </SectionSubtitle>
        </Header>
        
        <Grid>
          <ScaleInWhenVisible delay={0.2}>
            <ContentCard>
              <Badge>
                <FiCalendar size={18} />
                <span>Tous les mercredis</span>
              </Badge>
              
              <ContentTitle>Une expérience unique</ContentTitle>
              <ContentText>
                Rejoignez-nous chaque mercredi pour notre Brunch Créatif ! 
                Un moment spécial où gastronomie et créativité se rencontrent 
                pour créer une expérience inoubliable.
              </ContentText>
              
              <FeatureList>
                <FeatureItem>
                  Ateliers créatifs surprise chaque semaine
                </FeatureItem>
                <FeatureItem>
                  Menu spécial avec créations exclusives
                </FeatureItem>
                <FeatureItem>
                  Ambiance artistique et inspirante
                </FeatureItem>
                <FeatureItem>
                  Rencontres et échanges créatifs
                </FeatureItem>
                <FeatureItem>
                  Surprises gourmandes à partager
                </FeatureItem>
              </FeatureList>
              
              <FloatingEmoji className="emoji1" animate={floatingAnimation}>
                🎨
              </FloatingEmoji>
              <FloatingEmoji 
                className="emoji2" 
                animate={{
                  ...floatingAnimation,
                  transition: { ...floatingAnimation.transition, delay: 0.5 }
                }}
              >
                🥞
              </FloatingEmoji>
              
              <FloatingEmoji 
                className="emoji4" 
                animate={{
                  ...floatingAnimation,
                  transition: { ...floatingAnimation.transition, delay: 1.5 }
                }}
              >
                🌟
              </FloatingEmoji>
            </ContentCard>
          </ScaleInWhenVisible>
          
          <ParallaxSection offset={30}>
            <ImageWrapper
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <Image 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                alt="Brunch créatif avec touches artistiques"
              />
            </ImageWrapper>
          </ParallaxSection>
        </Grid>
      </Container>
    </Section>
  );
};

export default CreativeBrunch;