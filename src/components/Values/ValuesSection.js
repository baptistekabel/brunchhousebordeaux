import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMapPin, FiSun, FiHome } from 'react-icons/fi';

const Section = styled.section`
  padding: ${props => props.theme.spacing.section.mobile} ${props => props.theme.spacing.container.padding};
  background: ${props => props.theme.colors.secondary.surface};
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.section.desktop} ${props => props.theme.spacing.xl};
  }
`;

const Container = styled.div`
  max-width: ${props => props.theme.spacing.container.maxWidth};
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
  max-width: 600px;
  margin: 0 auto;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing.xl};
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ValueCard = styled(motion.div)`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
`;

const IconContainer = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, 
    rgba(28, 63, 51, 0.1) 0%, 
    rgba(43, 91, 74, 0.05) 100%
  );
  border-radius: ${props => props.theme.borderRadius.xlarge};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, 
      ${props => props.theme.colors.primary.accent} 0%, 
      ${props => props.theme.colors.primary.text} 100%
    );
    border-radius: ${props => props.theme.borderRadius.xlarge};
    opacity: 0;
    transition: opacity ${props => props.theme.transitions.normal};
    z-index: -1;
  }
  
  ${ValueCard}:hover &::before {
    opacity: 0.2;
  }
  
  svg {
    color: ${props => props.theme.colors.primary.text};
    transition: transform ${props => props.theme.transitions.normal};
  }
  
  ${ValueCard}:hover & svg {
    transform: scale(1.1);
  }
`;

const ValueTitle = styled.h3`
  font-size: 24px;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.primary.text};
`;

const ValueDescription = styled.p`
  font-size: ${props => props.theme.typography.sizes.body.regular};
  color: ${props => props.theme.colors.secondary.text};
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
`;

const ValuesSection = () => {
  const values = [
    {
      icon: <FiMapPin size={32} />,
      title: "Local",
      description: "Nous privilégions les producteurs locaux de la région bordelaise pour garantir fraîcheur et qualité tout en soutenant l'économie locale."
    },
    {
      icon: <FiSun size={32} />,
      title: "Saisonnier",
      description: "Notre menu évolue au fil des saisons pour vous offrir le meilleur de chaque période de l'année avec des produits à leur apogée."
    },
    {
      icon: <FiHome size={32} />,
      title: "Fait maison",
      description: "Tout est préparé sur place par notre équipe."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <Section id="values">
      <Container>
        <Header>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Nos valeurs
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Un engagement quotidien pour une cuisine authentique et responsable.
          </SectionSubtitle>
        </Header>
        
        <ValuesGrid
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {values.map((value, index) => (
            <ValueCard
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <IconContainer>
                {value.icon}
              </IconContainer>
              <ValueTitle>{value.title}</ValueTitle>
              <ValueDescription>{value.description}</ValueDescription>
            </ValueCard>
          ))}
        </ValuesGrid>
      </Container>
    </Section>
  );
};

export default ValuesSection;