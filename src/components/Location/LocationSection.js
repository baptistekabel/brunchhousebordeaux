import styled from 'styled-components';
import { motion } from 'framer-motion';
import { LiquidGlassCard } from '../LiquidGlass';
import { FiClock, FiMapPin, FiInstagram } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import MapEmbed from './MapEmbed';

const Section = styled.section`
  padding: ${props => props.theme.spacing.section.mobile} ${props => props.theme.spacing.container.padding};
  background: linear-gradient(180deg, 
    ${props => props.theme.colors.primary.background} 0%, 
    ${props => props.theme.colors.secondary.surface} 100%
  );
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.section.desktop} ${props => props.theme.spacing.xl};
  }
`;

const Container = styled.div`
  max-width: ${props => props.theme.spacing.container.maxWidth};
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing.xxl};
  
  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
`;

const ContentWrapper = styled.div``;

const SectionTitle = styled(motion.h2)`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Description = styled(motion.p)`
  font-size: ${props => props.theme.typography.sizes.body.large};
  color: ${props => props.theme.colors.secondary.text};
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const InfoGrid = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.lg};
`;

const InfoCard = styled(LiquidGlassCard)`
  display: flex;
  align-items: start;
  gap: ${props => props.theme.spacing.md};
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary.accent} 0%, 
    ${props => props.theme.colors.primary.text} 100%
  );
  border-radius: ${props => props.theme.borderRadius.medium};
  color: ${props => props.theme.colors.neutral.white};
  flex-shrink: 0;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoTitle = styled.h3`
  font-size: 18px;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const InfoText = styled.p`
  font-size: ${props => props.theme.typography.sizes.small};
  color: ${props => props.theme.colors.secondary.text};
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
`;



const LocationSection = () => {
  const { t } = useTranslation();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <Section id="location">
      <Container>
        <Grid>
          <ContentWrapper
            as={motion.div}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionTitle variants={itemVariants}>
              {t('location.title')}
            </SectionTitle>
            
            <Description variants={itemVariants}>
              {t('location.subtitle')}
            </Description>
            
            <InfoGrid>
              <InfoCard as={motion.div} variants={itemVariants}>
                <IconWrapper>
                  <FiClock size={24} />
                </IconWrapper>
                <InfoContent>
                  <InfoTitle>{t('location.hours.title')}</InfoTitle>
                  <InfoText>
                    {t('location.hours.weekdays')}<br />
                    {t('location.hours.weekend')}<br />
                    {t('location.hours.service')}
                  </InfoText>
                </InfoContent>
              </InfoCard>
              
              <InfoCard as={motion.div} variants={itemVariants}>
                <IconWrapper>
                  <FiMapPin size={24} />
                </IconWrapper>
                <InfoContent>
                  <InfoTitle>{t('location.address.title')}</InfoTitle>
                  <InfoText>
                    {t('location.address.street')}<br />
                    {t('location.address.city')}<br />
                    {t('location.address.transport')}
                  </InfoText>
                </InfoContent>
              </InfoCard>
              
              <InfoCard as={motion.div} variants={itemVariants}>
                <IconWrapper>
                  <FiInstagram size={24} />
                </IconWrapper>
                <InfoContent>
                  <InfoTitle>{t('location.contact.title')}</InfoTitle>
                  <InfoText>
                    {t('location.contact.phone')}<br />
                    {t('location.contact.reservation')}<br />
                    {t('location.contact.groups')}
                  </InfoText>
                </InfoContent>
              </InfoCard>
            </InfoGrid>
          </ContentWrapper>
          
          <MapEmbed />
        </Grid>
      </Container>
    </Section>
  );
};

export default LocationSection;