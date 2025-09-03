import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';

const Section = styled.section`
  padding: ${props => props.theme.spacing.section.mobile} ${props => props.theme.spacing.container.padding};
  background: ${props => props.theme.colors.secondary.surface};
  
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
  margin-bottom: ${props => props.theme.spacing.xxxl};
`;

const SectionTitle = styled(motion.h2)`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const SectionSubtitle = styled(motion.p)`
  font-size: ${props => props.theme.typography.sizes.body.large};
  color: ${props => props.theme.colors.secondary.text};
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const FAQItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(28, 63, 51, 0.1);
  border-radius: ${props => props.theme.borderRadius.large};
  overflow: hidden;
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background ${props => props.theme.transitions.fast};
  
  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

const QuestionText = styled.h3`
  font-size: 18px;
  font-weight: ${props => props.theme.typography.weights.medium};
  color: ${props => props.theme.colors.primary.text};
  flex: 1;
`;

const IconWrapper = styled(motion.div)`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primary.accent};
`;

const FAQAnswer = styled(motion.div)`
  padding: 0 ${props => props.theme.spacing.lg} ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.secondary.text};
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
`;

const faqs = [
  {
    question: "Faut-il réserver à l'avance ?",
    answer: "Nous recommandons fortement de réserver, surtout le week-end où l'affluence est importante. Vous pouvez réserver directement sur notre site ou par téléphone."
  },
  {
    question: "Proposez-vous des options véganes et sans gluten ?",
    answer: "Absolument ! Notre menu comprend plusieurs options véganes et nous pouvons adapter la plupart de nos plats pour les personnes intolérantes au gluten. N'hésitez pas à nous prévenir lors de votre réservation."
  },
  {
    question: "Acceptez-vous les groupes et événements privés ?",
    answer: "Oui, nous accueillons les groupes jusqu'à 30 personnes et proposons des formules pour les anniversaires, baptêmes et autres célébrations. La privatisation partielle ou totale est possible sur demande."
  },
  {
    question: "Y a-t-il un menu enfant ?",
    answer: "Bien sûr ! Nous proposons un menu spécial pour les enfants avec des portions adaptées et des plats qu'ils adorent. Des chaises hautes sont disponibles."
  },
  {
    question: "Où puis-je me garer ?",
    answer: "Un parking public se trouve à 2 minutes à pied. Les transports en commun (Tram A et B, arrêt Hôtel de Ville) sont également très pratiques pour nous rejoindre."
  },
  {
    question: "Le wifi est-il disponible ?",
    answer: "Oui, nous proposons une connexion wifi gratuite et rapide pour tous nos clients. Le mot de passe est disponible sur demande."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="faq">
      <Container>
        <Header>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Questions fréquentes
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Tout ce que vous devez savoir avant votre visite
          </SectionSubtitle>
        </Header>
        
        <FAQList>
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <FAQQuestion onClick={() => toggleFAQ(index)}>
                <QuestionText>{faq.question}</QuestionText>
                <IconWrapper
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {openIndex === index ? <FiMinus /> : <FiPlus />}
                </IconWrapper>
              </FAQQuestion>
              
              <AnimatePresence>
                {openIndex === index && (
                  <FAQAnswer
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    {faq.answer}
                  </FAQAnswer>
                )}
              </AnimatePresence>
            </FAQItem>
          ))}
        </FAQList>
      </Container>
    </Section>
  );
};

export default FAQSection;