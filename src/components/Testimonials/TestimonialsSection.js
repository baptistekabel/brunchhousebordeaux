import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';
import { LiquidGlassCard, LiquidGlassButton } from '../LiquidGlass';
import { useTranslation } from 'react-i18next';

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


const TestimonialsSection = () => {
  const { i18n } = useTranslation();
  
  const testimonials = [
    {
      name: "Magda Gomez",
      initial: "MG",
      date: i18n.language === 'en' ? "1 month ago" : i18n.language === 'es' ? "Hace 1 mes" : "il y a un mois",
      rating: 5,
      text: i18n.language === 'en' 
        ? "A superb discovery! The brunch was really delicious, with homemade, flavorful and well-presented dishes. Everything is 100% halal, which is a real plus! Price-wise, it's very accessible for the quality offered. We were able to park easily, which is rare in Bordeaux and really appreciated. The service is impeccable: the servers are adorable, very pleasant, attentive and always smiling."
        : i18n.language === 'es'
        ? "¡Un descubrimiento magnífico! El brunch estaba realmente delicioso, con platos caseros, sabrosos y bien presentados. Todo es 100% halal, ¡lo cual es un verdadero plus! En cuanto al precio, es muy accesible para la calidad ofrecida. Pudimos aparcar fácilmente, lo cual es raro en Burdeos y realmente apreciable. El servicio es impecable: los camareros son adorables, muy agradables, atentos y siempre sonrientes."
        : "Une superbe découverte ! Le brunch était vraiment délicieux, avec des plats faits maison, savoureux et bien présentés. Tout est 100 % halal, ce qui est un vrai plus ! Niveau prix, c'est très accessible pour la qualité proposée. On a pu se garer facilement, ce qui est rare à Bordeaux et vraiment appréciable. Le service est impeccable : les serveurs sont adorables, très agréables, à l'écoute et toujours souriants."
    },
    {
      name: "Bigué Gueye",
      initial: "BG",
      date: i18n.language === 'en' ? "2 weeks ago" : i18n.language === 'es' ? "Hace 2 semanas" : "il y a 2 semaines",
      rating: 5,
      text: i18n.language === 'en'
        ? "This brunch is really excellent: the formulas are very complete, with several choices to please everyone. The quantities are generous and the quality of the dishes is there. Plus, the prices are really affordable for what is offered. A great address that I recommend without hesitation!"
        : i18n.language === 'es'
        ? "Este brunch es realmente excelente: las fórmulas son muy completas, con varias opciones para complacer a todos. Las cantidades son generosas y la calidad de los platos está ahí. Además, los precios son realmente asequibles por lo que se ofrece. ¡Una gran dirección que recomiendo sin dudarlo!"
        : "Ce brunch est vraiment excellent : les formules sont très complètes, avec plusieurs choix pour plaire à tout le monde. Les quantités sont généreuses et la qualité des plats est au rendez-vous. En plus, les prix sont vraiment abordables pour ce qui est proposé. Une super adresse que je recommande sans hésiter !"
    },
    {
      name: "Cyrielle",
      initial: "C",
      date: i18n.language === 'en' ? "1 month ago" : i18n.language === 'es' ? "Hace 1 mes" : "il y a un mois",
      rating: 5,
      text: i18n.language === 'en'
        ? "Very good time spent at Brunch House. The staff is very kind, welcoming and helpful. The excellent meal. Small cute place, beautiful decoration, cozy atmosphere. I recommend!"
        : i18n.language === 'es'
        ? "Muy buen momento pasado en Brunch House. El personal es muy amable, acogedor y servicial. La comida excelente. Pequeño lugar lindo, hermosa decoración, ambiente acogedor. ¡Lo recomiendo!"
        : "Très bon moment passé au Brunch House. Le personnel est très gentil, accueillant et serviable. Le repas excellent. Petit endroit mignon, belle déco, ambiance cosy. Je recommande !"
    },
    {
      name: "Maxime Barros",
      initial: "MB",
      date: i18n.language === 'en' ? "2 weeks ago" : i18n.language === 'es' ? "Hace 2 semanas" : "il y a 2 semaines",
      rating: 5,
      text: i18n.language === 'en'
        ? "A super and delicious brunch! The products are fresh, the flavors well balanced and the atmosphere warm. Special mention for the pancakes which were incredible. I highly recommend."
        : i18n.language === 'es'
        ? "¡Un brunch súper y delicioso! Los productos son frescos, los sabores bien equilibrados y el ambiente cálido. Mención especial para los pancakes que estaban increíbles. Lo recomiendo mucho."
        : "Un brunch super et délicieux ! Les produits sont frais, les saveurs bien équilibrées et l'ambiance chaleureuse. Mention spéciale pour les pancakes qui étaient incroyable. Je recommande fortement."
    },
    {
      name: "Tess Maurel",
      initial: "TM",
      date: i18n.language === 'en' ? "1 week ago" : i18n.language === 'es' ? "Hace 1 semana" : "il y a une semaine",
      rating: 5,
      text: i18n.language === 'en'
        ? "We came as a group of 4 for a brunch and we had a great time. We were able to play UNO (which was provided) to keep busy. The relaxed service, the super good dishes, the very friendly server. We'll be back!"
        : i18n.language === 'es'
        ? "Vinimos en grupo de 4 para un brunch y nos lo pasamos genial. Pudimos jugar al UNO (que nos proporcionaron) para entretenernos. El servicio relajado, los platos súper buenos, el camarero muy simpático. ¡Volveremos!"
        : "Nous sommes venus à 4 pour un brunch et nous nous sommes régalés. Nous avons pu jouer au uno (qui était fourni) pour occuper. Le service à la cool, les plats super bon, le serveur très sympathique. On reviendra !"
    },
    {
      name: "Roukia Nomane",
      initial: "RN",
      date: i18n.language === 'en' ? "3 months ago" : i18n.language === 'es' ? "Hace 3 meses" : "il y a 3 mois",
      rating: 5,
      text: i18n.language === 'en'
        ? "Incredible moment, we had a wonderful time, everything was excellent! I highly recommend you come and have a brunch, you will be warmly welcomed by the Brunch House managers 😍"
        : i18n.language === 'es'
        ? "Momento increíble, lo pasamos de maravilla, ¡todo estaba excelente! Les recomiendo encarecidamente que vengan a tomar un brunch, serán calurosamente recibidos por los responsables del Brunch House 😍"
        : "Incroyable moment, nous nous sommes régalés tout était excellent ! Je vous recommande vivement de passer prendre un brunch vous serez chaleureusement accueilli par les responsables du Brunch House 😍"
    }
  ];
  
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
            {i18n.language === 'en' 
              ? 'They loved the experience'
              : i18n.language === 'es'
              ? 'Les encantó la experiencia'
              : "Ils ont adoré l'expérience"}
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {i18n.language === 'en'
              ? 'Discover what our customers say about us'
              : i18n.language === 'es'
              ? 'Descubre lo que nuestros clientes dicen de nosotros'
              : 'Découvrez ce que nos clients disent de nous'}
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
              {i18n.language === 'en'
                ? '+200 Google reviews'
                : i18n.language === 'es'
                ? '+200 reseñas de Google'
                : '+200 avis Google'}
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
            {i18n.language === 'en'
              ? 'Did you enjoy your experience?'
              : i18n.language === 'es'
              ? '¿Disfrutaste tu experiencia?'
              : 'Vous avez aimé votre expérience ?'}
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
            {i18n.language === 'en'
              ? 'Share your review on Google and help other food lovers discover our brunch'
              : i18n.language === 'es'
              ? 'Comparte tu opinión en Google y ayuda a otros amantes de la comida a descubrir nuestro brunch'
              : "Partagez votre avis sur Google et aidez d'autres gourmands à découvrir notre brunch"}
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
            {i18n.language === 'en'
              ? 'Leave a review on Google'
              : i18n.language === 'es'
              ? 'Dejar una reseña en Google'
              : 'Laisser un avis sur Google'}
          </LiquidGlassButton>
        </motion.div>
      </Container>
    </Section>
  );
};

export default TestimonialsSection;