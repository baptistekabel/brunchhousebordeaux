import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiInfo } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { createScrollTrigger } from '../../hooks/useScrollAnimation';

const ALLERGEN_LABELS = {
  gluten: { fr: 'Gluten', en: 'Gluten', es: 'Gluten', emoji: '🌾' },
  oeufs: { fr: 'Œufs', en: 'Eggs', es: 'Huevos', emoji: '🥚' },
  lait: { fr: 'Lait', en: 'Milk', es: 'Leche', emoji: '🥛' },
  poissons: { fr: 'Poissons', en: 'Fish', es: 'Pescado', emoji: '🐟' },
  crustaces: { fr: 'Crustacés', en: 'Crustaceans', es: 'Crustáceos', emoji: '🦐' },
  coque: { fr: 'Fruits à coque', en: 'Tree nuts', es: 'Frutos de cáscara', emoji: '🌰' },
  moutarde: { fr: 'Moutarde', en: 'Mustard', es: 'Mostaza', emoji: '🥫' },
  soja: { fr: 'Soja', en: 'Soy', es: 'Soja', emoji: '🫘' },
};

const ALLERGEN_DATA = [
  {
    id: 'viennoiseries',
    title: { fr: 'Viennoiseries', en: 'Pastries', es: 'Bollería' },
    emoji: '🥐',
    items: [
      { name: { fr: 'Croissant', en: 'Croissant', es: 'Croissant' }, allergens: ['gluten', 'oeufs', 'lait'] },
    ],
  },
  {
    id: 'sucre',
    title: { fr: 'Sucré', en: 'Sweet', es: 'Dulce' },
    emoji: '🍯',
    items: [
      { name: { fr: 'Le grec granola', en: 'Greek yogurt granola', es: 'Yogur griego con granola' }, allergens: ['gluten', 'lait'] },
    ],
  },
  {
    id: 'toasts',
    title: { fr: 'Toasts', en: 'Toasts', es: 'Tostadas' },
    emoji: '🍞',
    items: [
      { name: { fr: 'Œuf brouillé, bacon, tomate cerise', en: 'Scrambled egg, bacon, cherry tomato', es: 'Huevo revuelto, bacon, tomate cherry' }, allergens: ['gluten', 'oeufs'] },
      { name: { fr: "Caviar d'aubergine, émincé de poulet, parmesan", en: 'Eggplant caviar, sliced chicken, parmesan', es: 'Caviar de berenjena, pollo laminado, parmesano' }, allergens: ['gluten', 'lait'] },
      { name: { fr: 'Saumon, guacamole maison, fleur de sel', en: 'Salmon, homemade guacamole, fleur de sel', es: 'Salmón, guacamole casero, flor de sal' }, allergens: ['gluten', 'poissons'] },
      { name: { fr: 'Houmous à la betterave, avocat, noix', en: 'Beetroot hummus, avocado, walnuts', es: 'Hummus de remolacha, aguacate, nueces' }, allergens: ['gluten', 'coque'] },
      { name: { fr: 'Crevettes, avocat, tomates cerises, fromage frais', en: 'Shrimp, avocado, cherry tomatoes, cream cheese', es: 'Gambas, aguacate, tomates cherry, queso fresco' }, allergens: ['gluten', 'crustaces', 'lait'] },
      { name: { fr: 'Burrata, tomates cœur de bœuf, pesto', en: 'Burrata, beef heart tomatoes, pesto', es: 'Burrata, tomates corazón de buey, pesto' }, allergens: ['gluten', 'lait'] },
      { name: { fr: 'Toast œuf brouillé avocat, fromage frais, ciboulette', en: 'Scrambled egg avocado toast, cream cheese, chives', es: 'Tostada huevo revuelto aguacate, queso fresco, cebollino' }, allergens: ['gluten', 'oeufs', 'lait'] },
    ],
  },
  {
    id: 'plats',
    title: { fr: 'Plats', en: 'Mains', es: 'Platos' },
    emoji: '🍽️',
    items: [
      { name: { fr: 'Le Special One — pain brioche, guacamole, steak, cheddar, roquette, tomates, sauce barbecue', en: 'The Special One — brioche bun, guacamole, steak, cheddar, arugula, tomatoes, BBQ sauce', es: 'The Special One — pan brioche, guacamole, filete, cheddar, rúcula, tomates, salsa barbacoa' }, allergens: ['gluten', 'lait', 'moutarde'] },
      { name: { fr: 'Burger House poulet — pain brioché, poulet, cheddar, sauce safran (mayo)', en: 'Chicken Burger House — brioche bun, chicken, cheddar, saffron sauce (mayo)', es: 'Hamburguesa de pollo House — pan brioche, pollo, cheddar, salsa azafrán (mayonesa)' }, allergens: ['gluten', 'oeufs', 'lait', 'moutarde'] },
      { name: { fr: 'Cordon Bleu House — poulet, feuille de brique, fromage', en: 'Cordon Bleu House — chicken, brick pastry, cheese', es: 'Cordon Bleu House — pollo, masa brick, queso' }, allergens: ['gluten', 'lait'] },
      { name: { fr: 'Brioche burger — steak, cheddar, salade, tomate, oignons, sauce burger (mayo)', en: 'Brioche burger — steak, cheddar, salad, tomato, onions, burger sauce (mayo)', es: 'Brioche burger — filete, cheddar, ensalada, tomate, cebollas, salsa burger (mayonesa)' }, allergens: ['gluten', 'oeufs', 'lait', 'moutarde'] },
      { name: { fr: 'Brioche perdue salée œuf brouillé bacon', en: 'Savory French toast brioche, scrambled egg & bacon', es: 'Torrija salada, huevo revuelto y bacon' }, allergens: ['gluten', 'oeufs', 'lait'] },
      { name: { fr: 'Brioche perdue salée burrata pesto', en: 'Savory French toast brioche, burrata & pesto', es: 'Torrija salada, burrata y pesto' }, allergens: ['gluten', 'lait'] },
      { name: { fr: 'Croissant œufs brouillés bacon — cheddar, salade, tomates, oignons', en: 'Croissant scrambled eggs bacon — cheddar, salad, tomatoes, onions', es: 'Croissant huevos revueltos bacon — cheddar, ensalada, tomates, cebollas' }, allergens: ['gluten', 'oeufs', 'lait'] },
      { name: { fr: 'Croissant saumon guacamole — œufs brouillés, saumon, guacamole', en: 'Croissant salmon guacamole — scrambled eggs, salmon, guacamole', es: 'Croissant salmón guacamole — huevos revueltos, salmón, guacamole' }, allergens: ['gluten', 'oeufs', 'poissons', 'lait'] },
      { name: { fr: 'Croissant burger — steak haché, cheddar, salade, tomates, oignons, sauce burger (mayo)', en: 'Croissant burger — beef patty, cheddar, salad, tomatoes, onions, burger sauce (mayo)', es: 'Croissant burger — carne picada, cheddar, ensalada, tomates, cebollas, salsa burger (mayonesa)' }, allergens: ['gluten', 'oeufs', 'lait', 'moutarde'] },
    ],
  },
  {
    id: 'desserts',
    title: { fr: 'Desserts', en: 'Desserts', es: 'Postres' },
    emoji: '🍰',
    items: [
      { name: { fr: 'Grec granola, coulis passion / fruits rouges', en: 'Greek yogurt granola, passion fruit / red berry coulis', es: 'Yogur griego con granola, coulis de maracuyá / frutos rojos' }, allergens: ['gluten', 'lait'] },
      { name: { fr: "Brioche perdue — caramel beurre salé / chocolat noisette / sirop d'érable / fruit rouge", en: 'French toast brioche — salted caramel / chocolate hazelnut / maple syrup / red berries', es: 'Torrija — caramelo salado / chocolate avellana / sirope de arce / frutos rojos' }, allergens: ['gluten', 'oeufs', 'lait'] },
      { name: { fr: 'Brioche crème brûlée', en: 'Crème brûlée brioche', es: 'Brioche crème brûlée' }, allergens: ['gluten', 'oeufs', 'lait'] },
      { name: { fr: 'Brioche Tatin — pomme, caramel, cannelle, chantilly, spéculoos', en: 'Tatin brioche — apple, caramel, cinnamon, whipped cream, speculoos', es: 'Brioche Tatin — manzana, caramelo, canela, chantilly, speculoos' }, allergens: ['gluten', 'oeufs', 'lait'] },
      { name: { fr: 'Pancake crème brûlée', en: 'Crème brûlée pancake', es: 'Pancake crème brûlée' }, allergens: ['gluten', 'oeufs', 'lait'] },
      { name: { fr: 'Brioche perdue tiramisu', en: 'Tiramisu French toast brioche', es: 'Torrija tiramisú' }, allergens: ['gluten', 'oeufs', 'lait'] },
    ],
  },
  {
    id: 'kids',
    title: { fr: 'Menu Kids', en: 'Kids Menu', es: 'Menú Infantil' },
    emoji: '🧒',
    items: [
      { name: { fr: 'Steak frites', en: 'Steak & fries', es: 'Filete con patatas' }, allergens: [] },
      { name: { fr: 'Compote', en: 'Fruit compote', es: 'Compota' }, allergens: [] },
      { name: { fr: 'Caprisun', en: 'Caprisun', es: 'Caprisun' }, allergens: [] },
    ],
  },
  {
    id: 'boissons-chaudes',
    title: { fr: 'Boissons chaudes', en: 'Hot drinks', es: 'Bebidas calientes' },
    emoji: '☕',
    items: [
      { name: { fr: 'Expresso', en: 'Espresso', es: 'Espresso' }, allergens: [] },
      { name: { fr: 'Allongé', en: 'Long black', es: 'Café largo' }, allergens: [] },
      { name: { fr: 'Café noisette', en: 'Macchiato', es: 'Café cortado' }, allergens: ['lait'] },
      { name: { fr: 'Double expresso', en: 'Double espresso', es: 'Espresso doble' }, allergens: [] },
      { name: { fr: 'Cappuccino', en: 'Cappuccino', es: 'Capuchino' }, allergens: ['lait'] },
      { name: { fr: 'Café latté', en: 'Caffè latte', es: 'Café latte' }, allergens: ['lait'] },
      { name: { fr: 'Moka', en: 'Mocha', es: 'Moca' }, allergens: ['lait'] },
      { name: { fr: 'Moka caramel', en: 'Caramel mocha', es: 'Moca caramelo' }, allergens: ['lait'] },
      { name: { fr: 'Chocolat chaud maison', en: 'Homemade hot chocolate', es: 'Chocolate caliente casero' }, allergens: ['lait'] },
      { name: { fr: 'Matcha — coulis au choix', en: 'Matcha — coulis of your choice', es: 'Matcha — coulis a elegir' }, allergens: [] },
      { name: { fr: 'Thé', en: 'Tea', es: 'Té' }, allergens: [] },
      { name: { fr: 'Ube latté', en: 'Ube latte', es: 'Ube latte' }, allergens: ['lait'] },
      { name: { fr: 'Chai latté', en: 'Chai latte', es: 'Chai latte' }, allergens: ['lait'] },
    ],
  },
  {
    id: 'boissons-froides',
    title: { fr: 'Boissons froides', en: 'Cold drinks', es: 'Bebidas frías' },
    emoji: '🧊',
    items: [
      { name: { fr: 'Canette — Sprite, Coca-Cola, Coca Cherry, Coca Zero, Oasis, Fuze Tea, Orangina', en: 'Can — Sprite, Coca-Cola, Coca Cherry, Coca Zero, Oasis, Fuze Tea, Orangina', es: 'Lata — Sprite, Coca-Cola, Coca Cherry, Coca Zero, Oasis, Fuze Tea, Orangina' }, allergens: [] },
      { name: { fr: "Jus d'orange maison", en: 'Homemade orange juice', es: 'Zumo de naranja casero' }, allergens: [] },
      { name: { fr: "Jus d'ananas", en: 'Pineapple juice', es: 'Zumo de piña' }, allergens: [] },
      { name: { fr: 'Bissap maison', en: 'Homemade bissap', es: 'Bissap casero' }, allergens: [] },
      { name: { fr: 'Jus de gingembre maison', en: 'Homemade ginger juice', es: 'Zumo de jengibre casero' }, allergens: [] },
      { name: { fr: 'Jus de pastèque', en: 'Watermelon juice', es: 'Zumo de sandía' }, allergens: [] },
      { name: { fr: 'Jus de pomme', en: 'Apple juice', es: 'Zumo de manzana' }, allergens: [] },
      { name: { fr: 'Latté glacé — sirop/nappage au choix', en: 'Iced latte — syrup/topping of your choice', es: 'Latte helado — sirope/cobertura a elegir' }, allergens: ['lait'] },
      { name: { fr: 'Milkshake Spéculoos', en: 'Speculoos milkshake', es: 'Batido de speculoos' }, allergens: ['gluten', 'lait'] },
      { name: { fr: 'Milkshake Kinder', en: 'Kinder milkshake', es: 'Batido de Kinder' }, allergens: ['gluten', 'soja', 'lait', 'coque'] },
      { name: { fr: 'Smoothie Mangue', en: 'Mango smoothie', es: 'Smoothie de mango' }, allergens: [] },
      { name: { fr: 'Smoothie Ananas Coco', en: 'Pineapple coconut smoothie', es: 'Smoothie de piña y coco' }, allergens: ['lait'] },
      { name: { fr: 'Smoothie Orange Fraise Banane', en: 'Orange strawberry banana smoothie', es: 'Smoothie de naranja, fresa y plátano' }, allergens: [] },
      { name: { fr: 'Jus Ginger Ananas frais', en: 'Fresh ginger pineapple juice', es: 'Zumo fresco de jengibre y piña' }, allergens: [] },
      { name: { fr: 'Frappuccino nappage chocolat caramel', en: 'Frappuccino with chocolate caramel topping', es: 'Frappuccino con cobertura de chocolate y caramelo' }, allergens: ['gluten', 'lait'] },
      { name: { fr: 'Matcha frappé — sirop/nappage au choix', en: 'Matcha frappé — syrup/topping of your choice', es: 'Matcha frappé — sirope/cobertura a elegir' }, allergens: [] },
      { name: { fr: 'Ube frappé — sirop/nappage au choix', en: 'Ube frappé — syrup/topping of your choice', es: 'Ube frappé — sirope/cobertura a elegir' }, allergens: [] },
    ],
  },
];

const Section = styled(motion.section)`
  margin-bottom: ${props => props.theme.spacing.xxxl};
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  margin-bottom: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.floralWhite};
  text-shadow: 2px 2px 4px rgba(1, 57, 39, 0.5);

  &::after {
    content: '';
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg,
      ${props => props.theme.colors.floralWhite} 0%,
      transparent 100%
    );
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 24px;
    gap: ${props => props.theme.spacing.sm};
  }
`;

const IntroNote = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background: rgba(253, 249, 240, 0.12);
  border: 1px solid rgba(253, 249, 240, 0.25);
  border-radius: ${props => props.theme.borderRadius.medium};
  color: ${props => props.theme.colors.floralWhite};
  font-size: ${props => props.theme.typography.sizes.small};
  font-style: italic;
  margin-bottom: ${props => props.theme.spacing.xl};
  line-height: 1.6;

  svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: ${props => props.theme.colors.teaRose};
  }
`;

const CategoryCard = styled.div`
  background: rgba(253, 249, 240, 0.95);
  border-radius: ${props => props.theme.borderRadius.large};
  margin-bottom: ${props => props.theme.spacing.md};
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(1, 57, 39, 0.2);
`;

const CategoryHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  transition: background ${props => props.theme.transitions.fast};

  &:hover {
    background: rgba(252, 189, 189, 0.15);
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  }
`;

const CategoryTitle = styled.h3`
  font-size: 18px;
  font-weight: ${props => props.theme.typography.weights.semibold};
  color: ${props => props.theme.colors.darkGreen};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 16px;
  }
`;

const CategoryCount = styled.span`
  font-size: 13px;
  font-weight: ${props => props.theme.typography.weights.regular};
  color: ${props => props.theme.colors.sugarRose};
`;

const Chevron = styled(motion.span)`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.darkGreen};
  flex-shrink: 0;
`;

const CategoryBody = styled(motion.div)`
  overflow: hidden;
`;

const ItemsList = styled.div`
  padding: 0 ${props => props.theme.spacing.lg} ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0 ${props => props.theme.spacing.md} ${props => props.theme.spacing.sm};
  }
`;

const ItemRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.sm} 0;
  border-top: 1px solid rgba(1, 57, 39, 0.08);

  &:first-child {
    border-top: none;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const ItemName = styled.div`
  font-size: 15px;
  color: ${props => props.theme.colors.darkGreen};
  line-height: 1.4;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 14px;
  }
`;

const ChipsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: flex-end;
  max-width: 55%;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    justify-content: flex-start;
    max-width: 100%;
  }
`;

const AllergenChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: ${props => props.theme.typography.weights.medium};
  background: rgba(190, 106, 101, 0.12);
  border: 1px solid rgba(190, 106, 101, 0.3);
  color: ${props => props.theme.colors.sugarRose};
  white-space: nowrap;
`;

const NoAllergenChip = styled(AllergenChip)`
  background: rgba(1, 57, 39, 0.06);
  border-color: rgba(1, 57, 39, 0.15);
  color: ${props => props.theme.colors.darkGreen};
  opacity: 0.8;
`;

const AllergensSection = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : i18n.language === 'es' ? 'es' : 'fr';
  const [openCategories, setOpenCategories] = useState({});

  const toggleCategory = (id) => {
    setOpenCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const noAllergenLabel = lang === 'en'
    ? 'No major allergens'
    : lang === 'es'
    ? 'Sin alérgenos principales'
    : 'Sans allergène majeur';

  return (
    <Section
      id="allergenes"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      {...createScrollTrigger()}
      transition={{ duration: 0.6 }}
    >
      <SectionTitle>
        ⚠️ {lang === 'en' ? 'Allergens' : lang === 'es' ? 'Alérgenos' : 'Allergènes'}
      </SectionTitle>

      <IntroNote>
        <FiInfo size={18} />
        <span>
          {lang === 'en'
            ? 'For each dish, only the allergens present are listed. Our team is at your disposal for any further information.'
            : lang === 'es'
            ? 'Para cada plato, solo se indican los alérgenos presentes. Nuestro equipo está a su disposición para cualquier información adicional.'
            : "Pour chaque plat, seuls les allergènes présents sont indiqués. Notre équipe reste à votre disposition pour toute précision."}
        </span>
      </IntroNote>

      {ALLERGEN_DATA.map((category) => {
        const isOpen = !!openCategories[category.id];
        return (
          <CategoryCard key={category.id}>
            <CategoryHeader
              onClick={() => toggleCategory(category.id)}
              aria-expanded={isOpen}
            >
              <CategoryTitle>
                <span>{category.emoji}</span>
                {category.title[lang]}
                <CategoryCount>
                  {category.items.length}{' '}
                  {lang === 'en' ? 'items' : lang === 'es' ? 'productos' : 'produits'}
                </CategoryCount>
              </CategoryTitle>
              <Chevron
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <FiChevronDown size={20} />
              </Chevron>
            </CategoryHeader>

            <AnimatePresence initial={false}>
              {isOpen && (
                <CategoryBody
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ItemsList>
                    {category.items.map((item, index) => (
                      <ItemRow key={index}>
                        <ItemName>{item.name[lang]}</ItemName>
                        <ChipsWrapper>
                          {item.allergens.length > 0 ? (
                            item.allergens.map((allergen) => (
                              <AllergenChip key={allergen}>
                                <span>{ALLERGEN_LABELS[allergen].emoji}</span>
                                {ALLERGEN_LABELS[allergen][lang]}
                              </AllergenChip>
                            ))
                          ) : (
                            <NoAllergenChip>✓ {noAllergenLabel}</NoAllergenChip>
                          )}
                        </ChipsWrapper>
                      </ItemRow>
                    ))}
                  </ItemsList>
                </CategoryBody>
              )}
            </AnimatePresence>
          </CategoryCard>
        );
      })}
    </Section>
  );
};

export default AllergensSection;
