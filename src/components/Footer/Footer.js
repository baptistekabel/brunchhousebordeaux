import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiInstagram, FiFacebook, FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import { LiquidGlassButton } from '../LiquidGlass';
import { useTranslation } from 'react-i18next';

const FooterSection = styled.footer`
  padding: ${props => props.theme.spacing.xxxl} ${props => props.theme.spacing.container.padding} ${props => props.theme.spacing.xl};
  background: linear-gradient(180deg, 
    ${props => props.theme.colors.primary.text} 0%, 
    #0A1F19 100%
  );
  color: ${props => props.theme.colors.neutral.white};
`;

const Container = styled.div`
  max-width: ${props => props.theme.spacing.container.maxWidth};
  margin: 0 auto;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing.xxl};
  margin-bottom: ${props => props.theme.spacing.xxl};
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const FooterColumn = styled.div``;

const Logo = styled.h3`
  font-family: ${props => props.theme.typography.fonts.heading};
  font-size: 28px;
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.neutral.white};
`;

const Description = styled.p`
  font-size: ${props => props.theme.typography.sizes.small};
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
  margin-bottom: ${props => props.theme.spacing.lg};
  opacity: 0.9;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
`;

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${props => props.theme.borderRadius.medium};
  color: ${props => props.theme.colors.neutral.white};
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const ColumnTitle = styled.h4`
  font-size: 16px;
  font-weight: ${props => props.theme.typography.weights.semibold};
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.neutral.white};
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
`;

const InfoItem = styled.li`
  display: flex;
  align-items: start;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.typography.sizes.small};
  opacity: 0.9;
  
  svg {
    flex-shrink: 0;
    margin-top: 2px;
    opacity: 0.7;
  }
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
`;

const LinkItem = styled.li`
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const FooterLink = styled.a`
  color: ${props => props.theme.colors.neutral.white};
  font-size: ${props => props.theme.typography.sizes.small};
  opacity: 0.9;
  transition: opacity ${props => props.theme.transitions.fast};
  
  &:hover {
    opacity: 1;
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.md};
`;

const EmailInput = styled.input`
  flex: 1;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${props => props.theme.borderRadius.medium};
  color: ${props => props.theme.colors.neutral.white};
  font-size: ${props => props.theme.typography.sizes.small};
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const NewsletterButton = styled(LiquidGlassButton)`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  font-size: ${props => props.theme.typography.sizes.small};
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: ${props => props.theme.spacing.xxl} 0 ${props => props.theme.spacing.lg};
`;

const FooterBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  align-items: center;
  text-align: center;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
`;

const Copyright = styled.p`
  font-size: ${props => props.theme.typography.sizes.small};
  opacity: 0.7;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
`;

const Footer = () => {
  const { t, i18n } = useTranslation();
  
  return (
    <FooterSection>
      <Container>
        <FooterContent>
          <FooterColumn>
            <Logo>Brunch House</Logo>
            <Description>
              {i18n.language === 'en'
                ? "The gourmet rendezvous that reconciles morning and noon. A unique culinary experience in the heart of Bordeaux."
                : i18n.language === 'es'
                ? "El encuentro gourmet que reconcilia mañana y mediodía. Una experiencia culinaria única en el corazón de Burdeos."
                : "Le rendez-vous gourmand qui réconcilie matin et midi. Une expérience culinaire unique au cœur de Bordeaux."}
            </Description>
            <SocialLinks>
              <SocialLink
                href="https://www.instagram.com/brunchhousebordeaux/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiInstagram size={20} />
              </SocialLink>
            </SocialLinks>
          </FooterColumn>
          
          <FooterColumn>
            <ColumnTitle>
              {i18n.language === 'en' ? 'Contact' : i18n.language === 'es' ? 'Contacto' : 'Contact'}
            </ColumnTitle>
            <InfoList>
              <InfoItem>
                <FiMapPin size={14} />
                <span>3 rue Ferbos<br />33800 Bordeaux</span>
              </InfoItem>
              <InfoItem>
                <FiInstagram size={14} />
                <span>@brunchhousebordeaux</span>
              </InfoItem>
            </InfoList>
          </FooterColumn>
          
          <FooterColumn>
            <ColumnTitle>
              {i18n.language === 'en' ? 'Opening Hours' : i18n.language === 'es' ? 'Horarios' : 'Horaires'}
            </ColumnTitle>
            <InfoList>
              <InfoItem>
                <FiClock size={14} />
                <span>
                  {i18n.language === 'en' 
                    ? <>Tue-Sun: 10:00am-4:00pm<br />Closed on Monday<br />⏰ Kitchen closes at 3:00 PM<br />🎨 Creative Brunch Tue-Fri</>
                    : i18n.language === 'es'
                    ? <>Mar-Dom: 10:00-16:00<br />Cerrado los lunes<br />⏰ La cocina cierra a las 15:00<br />🎨 Brunch Creativo Mar-Vie</>
                    : <>Mar-Dim: 10h00-16h00<br />Fermé le lundi<br />⏰ La cuisine ferme à 15h<br />🎨 Brunch Créatif Mar-Ven</>}
                </span>
              </InfoItem>
            </InfoList>
            <ColumnTitle style={{ marginTop: '24px' }}>
              {i18n.language === 'en' ? 'Quick Links' : i18n.language === 'es' ? 'Enlaces útiles' : 'Liens utiles'}
            </ColumnTitle>
            <LinkList>
              <LinkItem>
                <FooterLink href="#menu">
                  {i18n.language === 'en' ? 'Menu' : i18n.language === 'es' ? 'Menú' : 'Menu'}
                </FooterLink>
              </LinkItem>
              <LinkItem>
                <FooterLink href="#reservation">
                  {i18n.language === 'en' ? 'Reservation' : i18n.language === 'es' ? 'Reserva' : 'Réservation'}
                </FooterLink>
              </LinkItem>
              <LinkItem>
                <FooterLink href="#location">
                  {i18n.language === 'en' ? 'Find Us' : i18n.language === 'es' ? 'Encuéntranos' : 'Nous trouver'}
                </FooterLink>
              </LinkItem>
            </LinkList>
          </FooterColumn>
          
        </FooterContent>
        
        <Divider />
        
        <FooterBottom>
          <Copyright>
            © 2024 Brunch House Bordeaux. 
            {i18n.language === 'en' 
              ? 'All rights reserved.'
              : i18n.language === 'es'
              ? 'Todos los derechos reservados.'
              : 'Tous droits réservés.'}
          </Copyright>
        </FooterBottom>
      </Container>
    </FooterSection>
  );
};

export default Footer;