import styled from 'styled-components';
import { motion } from 'framer-motion';
import { LiquidGlassCard } from '../LiquidGlass';
import { LiquidGlassButton } from '../LiquidGlass';
import { animationVariants, createScrollTrigger } from '../../hooks/useScrollAnimation';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

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
  margin-bottom: calc(${props => props.theme.spacing.xxxl} * 1.5);
  padding: ${props => props.theme.spacing.xl} 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(
      90deg,
      transparent,
      ${props => props.theme.colors.primary.highlight},
      transparent
    );
    border-radius: ${props => props.theme.borderRadius.pill};
  }
`;

const SectionTitle = styled(motion.h2)`
  margin-bottom: ${props => props.theme.spacing.xl};
  font-size: clamp(36px, 5vw, 56px);
  color: ${props => props.theme.colors.floralWhite};
  text-shadow: 2px 2px 4px rgba(1, 57, 39, 0.5);
  letter-spacing: -1px;
  line-height: 1.2;
`;

const SectionSubtitle = styled(motion.p)`
  font-size: ${props => props.theme.typography.sizes.body.large};
  color: ${props => props.theme.colors.floralWhite};
  max-width: 700px;
  margin: 0 auto;
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
  padding: 0 ${props => props.theme.spacing.lg};
  opacity: 0.9;
  font-style: italic;
  text-shadow: 1px 1px 2px rgba(1, 57, 39, 0.4);
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 350px));
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xxl};
  justify-content: center;
  
  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, minmax(280px, 350px));
  }
`;

const MenuItem = styled(LiquidGlassCard)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MenuItemImage = styled.div`
  width: calc(100% + ${props => props.theme.spacing.lg} * 2);
  height: 200px;
  margin: -${props => props.theme.spacing.lg} -${props => props.theme.spacing.lg} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.large} ${props => props.theme.borderRadius.large} 0 0;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform ${props => props.theme.transitions.slow};
  }
  
  ${MenuItem}:hover & img {
    transform: scale(1.05);
  }
`;

const MenuItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MenuItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const MenuItemName = styled.h3`
  font-size: 20px;
  flex: 1;
  color: ${props => props.theme.colors.floralWhite};
  text-shadow: 1px 1px 2px rgba(1, 57, 39, 0.4);
`;

const MenuItemPrice = styled.span`
  font-size: ${props => props.theme.typography.sizes.body.large};
  font-weight: ${props => props.theme.typography.weights.semibold};
  color: ${props => props.theme.colors.floralWhite};
  text-shadow: 1px 1px 2px rgba(1, 57, 39, 0.4);
`;

const MenuItemDescription = styled.p`
  font-size: ${props => props.theme.typography.sizes.small};
  color: ${props => props.theme.colors.floralWhite};
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
  flex: 1;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(1, 57, 39, 0.3);
`;


const CTAWrapper = styled.div`
  text-align: center;
  margin-top: ${props => props.theme.spacing.xl};
`;

const MenuSection = () => {
  const { t } = useTranslation();
  
  const menuItems = [
    {
      id: 1,
      name: t('menu.homeItems.pancakes.name'),
      description: t('menu.homeItems.pancakes.description'),
      price: t('menu.homeItems.pancakes.price'),
      image: "/images/menu/pancake.jpeg",
      homemade: true
    },
    {
      id: 2,
      name: t('menu.homeItems.burgerHouse.name'),
      description: t('menu.homeItems.burgerHouse.description'),
      price: t('menu.homeItems.burgerHouse.price'),
      image: "/images/menu/burgerhouse.jpeg",
      homemade: true
    },
    {
      id: 3,
      name: t('menu.homeItems.salmonGuacamole.name'),
      description: t('menu.homeItems.salmonGuacamole.description'),
      price: t('menu.homeItems.salmonGuacamole.price'),
      image: "/images/menu/saumonguacamole.jpeg",
      homemade: true
    },
    {
      id: 4,
      name: t('menu.homeItems.eggplantCaviar.name'),
      description: t('menu.homeItems.eggplantCaviar.description'),
      price: t('menu.homeItems.eggplantCaviar.price'),
      image: "/images/menu/toastcaviaraubergine.jpeg",
      homemade: true
    },
    {
      id: 5,
      name: t('menu.homeItems.scrambledEggsBacon.name'),
      description: t('menu.homeItems.scrambledEggsBacon.description'),
      price: t('menu.homeItems.scrambledEggsBacon.price'),
      image: "/images/menu/oeufbrouillebacon.jpeg",
      homemade: true
    },
    {
      id: 6,
      name: t('menu.homeItems.beetrootHummus.name'),
      description: t('menu.homeItems.beetrootHummus.description'),
      price: t('menu.homeItems.beetrootHummus.price'),
      image: "/images/menu/houmous.jpeg",
      homemade: true
    }
  ];
  const navigate = useNavigate();
  
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 80,
      rotateX: -15,
      scale: 0.9
    },
    visible: i => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        opacity: { duration: 0.6 },
        scale: {
          type: "spring",
          stiffness: 100,
          damping: 15
        }
      }
    }),
    hover: {
      y: -10,
      scale: 1.03,
      rotateY: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <Section id="menu">
      <Container>
        <Header>
          <SectionTitle
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {t('menu.title')}
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {t('menu.subtitle')}
          </SectionSubtitle>
        </Header>
        
        <MenuGrid
          as={motion.div}
          initial="hidden"
          whileInView="visible"
          {...createScrollTrigger(0.2)}
        >
          {menuItems.map((item, index) => (
            <MenuItem
              key={item.id}
              hoverable
              as={motion.div}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              {...createScrollTrigger()}
              style={{ 
                transformPerspective: 1000,
                transformStyle: "preserve-3d"
              }}
            >
              <MenuItemImage>
                <img src={item.image} alt={item.name} />
              </MenuItemImage>
              <MenuItemContent>
                <MenuItemHeader>
                  <MenuItemName>{item.name}</MenuItemName>
                  <MenuItemPrice>{item.price}</MenuItemPrice>
                </MenuItemHeader>
                <MenuItemDescription>{item.description}</MenuItemDescription>
              </MenuItemContent>
            </MenuItem>
          ))}
        </MenuGrid>
        
        <CTAWrapper>
          <motion.div
            variants={animationVariants.bounceIn}
            initial="hidden"
            whileInView="visible"
            {...createScrollTrigger()}
          >
            <LiquidGlassButton 
              variant="secondary" 
              size="large"
              as={motion.button}
              whileHover={{ scale: 1.05, rotateZ: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                navigate('/menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              {t('menu.cta')}
            </LiquidGlassButton>
          </motion.div>
        </CTAWrapper>
      </Container>
    </Section>
  );
};

export default MenuSection;