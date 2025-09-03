import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';
import { LiquidGlassCard, LiquidGlassButton } from '../LiquidGlass';

const Section = styled.section`
  padding: ${props => props.theme.spacing.section.mobile} ${props => props.theme.spacing.container.padding};
  
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
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing.xl};
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TestimonialCard = styled(LiquidGlassCard)`
  padding: ${props => props.theme.spacing.xl};
`;

const TestimonialHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Avatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${props => props.$image ? `url(${props.$image})` : `linear-gradient(135deg, 
    ${props.theme.colors.primary.accent} 0%, 
    ${props.theme.colors.primary.text} 100%
  )`};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.neutral.white};
  font-size: 20px;
  font-weight: ${props => props.theme.typography.weights.bold};
  border: 2px solid ${props => props.theme.colors.primary.background};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const TestimonialInfo = styled.div`
  flex: 1;
`;

const Name = styled.h4`
  font-size: 16px;
  font-weight: ${props => props.theme.typography.weights.semibold};
  margin-bottom: 4px;
`;

const Date = styled.span`
  font-size: ${props => props.theme.typography.sizes.small};
  color: ${props => props.theme.colors.secondary.text};
`;

const Rating = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: ${props => props.theme.spacing.md};
  
  svg {
    fill: #FFB800;
    color: #FFB800;
  }
`;

const TestimonialText = styled.p`
  font-size: ${props => props.theme.typography.sizes.body.regular};
  color: ${props => props.theme.colors.secondary.text};
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
  font-style: italic;
`;

const testimonials = [
  {
    name: "Sophie Larrieu",
    initial: "S",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    date: "Il y a 3 jours",
    rating: 5,
    text: "Un brunch exceptionnel ! Les pancakes sont les meilleurs que j'ai jamais mangés. L'ambiance est chaleureuse et le service impeccable."
  },
  {
    name: "Marc Durand",
    initial: "M",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    date: "Il y a 1 semaine",
    rating: 5,
    text: "Endroit parfait pour un brunch en famille. Le café est excellent et l'équipe très accueillante. Je recommande vivement !"
  },
  {
    name: "Julie Martin",
    initial: "J",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    date: "Il y a 2 semaines",
    rating: 5,
    text: "La nourriture est fraîche et savoureuse. Un vrai coup de cœur pour ce lieu chaleureux au cœur de Bordeaux. Brunch créatif du mercredi au top !"
  },
  {
    name: "Thomas Bernard",
    initial: "T",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    date: "Il y a 3 semaines",
    rating: 5,
    text: "Service rapide malgré l'affluence du dimanche. Les croissants French toast sont incroyables et les prix sont très raisonnables."
  },
  {
    name: "Emma Rousseau",
    initial: "E",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    date: "Il y a 1 mois",
    rating: 5,
    text: "Une découverte fantastique ! Tout est fait maison et ça se sent. L'équipe est adorable et aux petits soins."
  },
  {
    name: "Lucas Petit",
    initial: "L",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    date: "Il y a 2 mois",
    rating: 5,
    text: "Le meilleur brunch de Bordeaux sans hésitation. Les portions sont généreuses et tout est délicieux du début à la fin."
  }
];

const TestimonialsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <Section id="testimonials">
      <Container>
        <Header>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ils ont adoré l'expérience
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Découvrez ce que nos clients disent de nous
          </SectionSubtitle>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              marginTop: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              flexWrap: 'wrap'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '100px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(28, 63, 51, 0.1)'
            }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} size={18} style={{ fill: '#FFB800', color: '#FFB800' }} />
                ))}
              </div>
              <span style={{ fontWeight: '600', fontSize: '18px', color: '#1C3F33' }}>4.9</span>
            </div>
            <div style={{
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '100px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(28, 63, 51, 0.1)',
              color: '#1C3F33',
              fontWeight: '600'
            }}>
              +200 avis Google
            </div>
          </motion.div>
        </Header>
        
        <TestimonialsGrid
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              as={motion.div}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <TestimonialHeader>
                <Avatar $image={testimonial.image}>
                  {!testimonial.image && testimonial.initial}
                </Avatar>
                <TestimonialInfo>
                  <Name>{testimonial.name}</Name>
                  <Date>{testimonial.date}</Date>
                </TestimonialInfo>
              </TestimonialHeader>
              
              <Rating>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} size={16} />
                ))}
              </Rating>
              
              <TestimonialText>"{testimonial.text}"</TestimonialText>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ 
            textAlign: 'center', 
            marginTop: '60px',
            padding: '40px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(247, 242, 231, 0.5) 100%)',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)'
          }}
        >
          <motion.h3 
            style={{ 
              marginBottom: '16px',
              fontSize: '24px',
              color: '#1C3F33'
            }}
          >
            Vous avez aimé votre expérience ?
          </motion.h3>
          <motion.p 
            style={{ 
              marginBottom: '32px',
              color: '#5A7A6E',
              fontSize: '16px',
              maxWidth: '500px',
              margin: '0 auto 32px'
            }}
          >
            Partagez votre avis sur Google et aidez d'autres gourmands à découvrir notre brunch
          </motion.p>
          <LiquidGlassButton
            variant="accent"
            size="large"
            onClick={() => window.open('https://www.google.com/search?q=brunch+house+bordeaux&rlz=1C5CHFA_enFR1079FR1079#lrd=0xd5527cf9d0c3831:0xfed2e2f5b0c10c2e,3,,,,', '_blank')}
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            <FaGoogle size={20} />
            Laisser un avis sur Google
          </LiquidGlassButton>
        </motion.div>
      </Container>
    </Section>
  );
};

export default TestimonialsSection;