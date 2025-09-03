import styled from 'styled-components';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { LiquidGlassCard, LiquidGlassButton } from '../LiquidGlass';
import { FiCalendar, FiClock, FiUsers, FiCheck, FiAlertCircle } from 'react-icons/fi';
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

const Form = styled.form`
  display: grid;
  gap: ${props => props.theme.spacing.lg};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing.lg};
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: ${props => props.$columns || '1fr 1fr'};
  }
`;

const FormGroup = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-size: ${props => props.theme.typography.sizes.small};
  font-weight: ${props => props.theme.typography.weights.medium};
  color: ${props => props.theme.colors.primary.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const IconLeft = styled.div`
  position: absolute;
  left: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.primary.accent};
  pointer-events: none;
  z-index: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  padding-left: ${props => props.$hasIcon ? '48px' : props.theme.spacing.md};
  font-size: ${props => props.theme.typography.sizes.body.regular};
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(28, 63, 51, 0.1);
  border-radius: ${props => props.theme.borderRadius.medium};
  transition: all ${props => props.theme.transitions.fast};
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.95);
    border-color: ${props => props.theme.colors.primary.accent};
    box-shadow: 0 0 0 3px rgba(43, 91, 74, 0.1);
  }
  
  &::placeholder {
    color: rgba(34, 34, 34, 0.5);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  padding-left: ${props => props.$hasIcon ? '48px' : props.theme.spacing.md};
  font-size: ${props => props.theme.typography.sizes.body.regular};
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(28, 63, 51, 0.1);
  border-radius: ${props => props.theme.borderRadius.medium};
  transition: all ${props => props.theme.transitions.fast};
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%231C3F33' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;
  
  &:focus {
    outline: none;
    background-color: rgba(255, 255, 255, 0.95);
    border-color: ${props => props.theme.colors.primary.accent};
    box-shadow: 0 0 0 3px rgba(43, 91, 74, 0.1);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.typography.sizes.body.regular};
  font-family: inherit;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(28, 63, 51, 0.1);
  border-radius: ${props => props.theme.borderRadius.medium};
  transition: all ${props => props.theme.transitions.fast};
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.95);
    border-color: ${props => props.theme.colors.primary.accent};
    box-shadow: 0 0 0 3px rgba(43, 91, 74, 0.1);
  }
  
  &::placeholder {
    color: rgba(34, 34, 34, 0.5);
  }
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.typography.sizes.small};
  color: ${props => props.theme.colors.secondary.text};
  
  svg {
    color: ${props => props.theme.colors.status.success};
  }
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
  
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleReservation = () => {
    window.open('https://www.thefork.fr/restaurant/brunch-house-r847025', '_blank');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const formFieldVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      scale: 0.9
    },
    visible: i => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
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
                  <h3 style={{ marginBottom: '20px', color: theme.colors.primary.text }}>
                    {i18n.language === 'en'
                      ? 'Book easily on TheFork'
                      : i18n.language === 'es'
                      ? 'Reserva fácilmente en TheFork'
                      : 'Réservez facilement sur TheFork'}
                  </h3>
                  <p style={{ marginBottom: '30px', color: theme.colors.secondary.text, maxWidth: '500px', margin: '0 auto 30px' }}>
                    {i18n.language === 'en'
                      ? 'To book your table, click the button below and you will be redirected to our TheFork page where you can choose your date, time and number of guests.'
                      : i18n.language === 'es'
                      ? 'Para reservar tu mesa, haz clic en el botón de abajo y serás redirigido a nuestra página de TheFork donde podrás elegir tu fecha, hora y número de invitados.'
                      : 'Pour réserver votre table, cliquez sur le bouton ci-dessous et vous serez redirigé vers notre page TheFork où vous pourrez choisir votre date, heure et nombre de convives.'}
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
                    ? 'Book on TheFork'
                    : i18n.language === 'es'
                    ? 'Reservar en TheFork'
                    : 'Réserver sur TheFork'}
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