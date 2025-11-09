import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { LiquidGlassCard, LiquidGlassButton } from '../LiquidGlass';
import { FiAlertCircle } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { animationVariants, createScrollTrigger } from '../../hooks/useScrollAnimation';
import { theme } from '../../styles/theme';

const Section = styled.section`
  padding: ${props => props.theme.spacing.section.mobile} ${props => props.theme.spacing.container.padding};
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.section.desktop} ${props => props.theme.spacing.xl};
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xxl};
  display: none;
`;

const SectionTitle = styled(motion.h2)`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const SectionSubtitle = styled(motion.p)`
  font-size: ${props => props.theme.typography.sizes.body.large};
  color: ${props => props.theme.colors.secondary.text};
`;

const FormCard = styled(LiquidGlassCard)`
  padding: ${props => props.theme.spacing.xl};
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.xxl};
  }
`;










const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
`;


const SuccessMessage = styled(motion.div)`
  padding: ${props => props.theme.spacing.lg};
  background: linear-gradient(135deg, 
    rgba(59, 170, 109, 0.1) 0%, 
    rgba(59, 170, 109, 0.05) 100%
  );
  border: 1px solid rgba(59, 170, 109, 0.2);
  border-radius: ${props => props.theme.borderRadius.medium};
  text-align: center;
  color: ${props => props.theme.colors.status.success};
  font-weight: ${props => props.theme.typography.weights.medium};
`;

const ReservationSection = () => {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 10]);
  
  
  const [showError] = useState(false);

  const handleReservation = () => {
    window.open('https://www.google.com/maps/reserve/v/dine/c/tYfq5WqTgGw?source=pa&opi=89978449&hl=fr-FR&gei=J6rNaMFru-jszw-zsPfoDw&sourceurl=https%3A%2F%2Fwww.google.com%2Fsearch%3Fq%3Dbrunch%2Bhouse%2Bbordeaux%26rlz%3D1C5CHFA_enFR1079FR1079%26oq%3Dbrunch%2Bhouse%26gs_lcrp%3DEgZjaHJvbWUqCggAEAAY4wIYgAQyCggAEAAY4wIYgAQyDQgBEC4YrwEYxwEYgAQyBwgCEAAYgAQyBwgDEAAYgAQyDQgEEAAYgwEYsQMYgAQyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQg0OTA2ajBqN6gCALACAA%26sourceid%3Dchrome%26ie%3DUTF-8&ihs=3', '_blank');
  };



  return (
    <Section id="reservation" ref={sectionRef}>
      <Container>
        <Header>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            {...createScrollTrigger()}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
          >
            <SectionTitle>
              {t('reservation.title')}
            </SectionTitle>
          </motion.div>
          <motion.div
            variants={animationVariants.fadeInUp}
            initial="hidden"
            whileInView="visible"
            {...createScrollTrigger()}
          >
            <SectionSubtitle>
              {t('reservation.subtitle')}
            </SectionSubtitle>
          </motion.div>
        </Header>
        
        <motion.div
          style={{ 
            scale,
            rotateY,
            transformPerspective: 1000,
            transformStyle: "preserve-3d"
          }}
        >
          <FormCard
            as={motion.div}
            initial={{ opacity: 0, y: 50, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            {...createScrollTrigger()}
            transition={{ 
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
          {showError ? (
            <SuccessMessage
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{ background: 'linear-gradient(135deg, rgba(227, 123, 94, 0.1) 0%, rgba(227, 123, 94, 0.05) 100%)', borderColor: 'rgba(227, 123, 94, 0.2)', color: '#E37B5E' }}
            >
              <FiAlertCircle size={24} style={{ marginBottom: '8px' }} />
              <p>Service de réservation temporairement indisponible</p>
              <p style={{ fontSize: '14px', marginTop: '8px' }}>
                Veuillez nous appeler au 05 56 44 00 00 pour réserver.
              </p>
            </SuccessMessage>
          ) : (
            <div>
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 style={{ marginBottom: '20px', color: theme.colors.floralWhite, textShadow: '2px 2px 4px rgba(1, 57, 39, 0.5)' }}>
                    {i18n.language === 'en'
                      ? 'Book easily on Google'
                      : i18n.language === 'es'
                      ? 'Reserva fácilmente en Google'
                      : 'Réservez facilement sur Google'}
                  </h3>
                  <p style={{ marginBottom: '30px', color: theme.colors.floralWhite, textShadow: '1px 1px 2px rgba(1, 57, 39, 0.4)', opacity: '0.9', maxWidth: '500px', margin: '0 auto 30px' }}>
                    {i18n.language === 'en'
                      ? 'To book your table, click the button below and you will be redirected to our Google reservation page where you can choose your date, time and number of guests.'
                      : i18n.language === 'es'
                      ? 'Para reservar tu mesa, haz clic en el botón de abajo y serás redirigido a nuestra página de reserva de Google donde podrás elegir tu fecha, hora y número de invitados.'
                      : 'Pour réserver votre table, cliquez sur le bouton ci-dessous et vous serez redirigé vers notre page de réservation Google où vous pourrez choisir votre date, heure et nombre de convives.'}
                  </p>
                </motion.div>
              </div>
              
              <LiquidGlassButton 
                onClick={handleReservation}
                variant="accent" 
                size="large"
                style={{ 
                  width: '100%', 
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px'
                }}
                as={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>
                  {i18n.language === 'en'
                    ? 'Book on Google'
                    : i18n.language === 'es'
                    ? 'Reservar en Google'
                    : 'Réserver sur Google'}
                </span>
                <span style={{ fontSize: '20px' }}>→</span>
              </LiquidGlassButton>
              
              <Features style={{ display: 'none' }}>
              </Features>
            </div>
          )}
          </FormCard>
        </motion.div>
      </Container>
    </Section>
  );
};

export default ReservationSection;