import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiCheck, FiPlus, FiX, FiImage } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { LiquidGlassCard } from '../components/LiquidGlass';
import { createScrollTrigger } from '../hooks/useScrollAnimation';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.darkGreen} 0%,
    rgba(1, 57, 39, 0.85) 25%,
    rgba(28, 63, 51, 0.9) 50%,
    rgba(43, 91, 74, 0.85) 75%,
    ${props => props.theme.colors.darkGreen} 100%
  );
  background-attachment: fixed;
  padding-top: 80px;
`;

const MenuHeader = styled.section`
  padding: ${props => props.theme.spacing.xxl} ${props => props.theme.spacing.container.padding};
  text-align: center;
  position: relative;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.xxxl} ${props => props.theme.spacing.xl};
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: rgba(253, 249, 240, 0.9);
  backdrop-filter: blur(10px);
  border-radius: ${props => props.theme.borderRadius.pill};
  color: ${props => props.theme.colors.darkGreen};
  font-size: ${props => props.theme.typography.sizes.small};
  font-weight: ${props => props.theme.typography.weights.medium};
  transition: all ${props => props.theme.transitions.fast};
  margin-bottom: ${props => props.theme.spacing.xl};
  position: absolute;
  left: ${props => props.theme.spacing.xl};
  top: ${props => props.theme.spacing.xl};

  &:hover {
    background: rgba(253, 249, 240, 0.95);
    transform: translateX(-4px);
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    left: ${props => props.theme.spacing.md};
    top: ${props => props.theme.spacing.md};
  }
`;

const Title = styled(motion.h1)`
  font-size: ${props => props.theme.typography.sizes.h1.desktop};
  margin-bottom: ${props => props.theme.spacing.md};
  text-align: center;
  color: ${props => props.theme.colors.floralWhite};
  text-shadow: 2px 2px 4px rgba(1, 57, 39, 0.5);

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: ${props => props.theme.typography.sizes.h1.mobile};
    margin-top: ${props => props.theme.spacing.xl};
  }
`;

const Subtitle = styled(motion.p)`
  font-size: ${props => props.theme.typography.sizes.body.large};
  color: ${props => props.theme.colors.floralWhite};
  margin-bottom: ${props => props.theme.spacing.xl};
  font-style: italic;
  text-align: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 1px 1px 2px rgba(1, 57, 39, 0.4);
  opacity: 0.9;
`;

const MenuContainer = styled.div`
  max-width: ${props => props.theme.spacing.container.maxWidth};
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.container.padding};
`;

const MenuSection = styled(motion.section)`
  margin-bottom: ${props => props.theme.spacing.xxxl};
  position: relative;
  
  &:nth-child(even) {
    &::before {
      content: '';
      position: absolute;
      top: -20px;
      right: -100px;
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, 
        rgba(224, 171, 159, 0.1) 0%, 
        transparent 70%
      );
      border-radius: 50%;
    }
  }
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  margin-bottom: ${props => props.theme.spacing.xl};
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
`;

const MenuGrid = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.md};
`;

const MenuItem = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.md};
  margin: 0 -${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.medium};
  transition: all ${props => props.theme.transitions.fast};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: ${props => props.theme.spacing.md};
    right: ${props => props.theme.spacing.md};
    height: 1px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(28, 63, 51, 0.1) 50%, 
      transparent 100%
    );
  }
  
  &:last-child::after {
    display: none;
  }
  
  &:hover {
    background: linear-gradient(135deg, 
      rgba(224, 171, 159, 0.05) 0%, 
      rgba(224, 171, 159, 0.02) 100%
    );
    transform: translateX(4px);
  }
`;

const ItemName = styled.div`
  flex: 1;
  font-size: ${props => props.theme.typography.sizes.body.regular};
  color: ${props => props.theme.colors.floralWhite};
  text-shadow: 1px 1px 2px rgba(1, 57, 39, 0.4);

  span {
    display: block;
    font-size: ${props => props.theme.typography.sizes.small};
    color: ${props => props.theme.colors.floralWhite};
    margin-top: 4px;
    font-style: italic;
    opacity: 0.8;
    text-shadow: 1px 1px 2px rgba(1, 57, 39, 0.3);
  }
`;

const ItemPrice = styled.div`
  font-size: ${props => props.theme.typography.sizes.body.large};
  font-weight: ${props => props.theme.typography.weights.semibold};
  color: ${props => props.theme.colors.floralWhite};
  min-width: 60px;
  text-align: right;
  text-shadow: 1px 1px 2px rgba(1, 57, 39, 0.4);
`;

const Note = styled.p`
  font-size: ${props => props.theme.typography.sizes.small};
  color: ${props => props.theme.colors.floralWhite};
  font-style: italic;
  margin-top: ${props => props.theme.spacing.md};
  padding-left: ${props => props.theme.spacing.md};
  opacity: 0.8;
  text-shadow: 1px 1px 2px rgba(1, 57, 39, 0.3);
`;

const FormulaCard = styled(LiquidGlassCard)`
  padding: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.normal};
  position: relative;
  overflow: visible;
  
  ${props => props.$selected && `
    background: linear-gradient(135deg, 
      rgba(224, 171, 159, 0.15) 0%, 
      rgba(255, 255, 255, 0.95) 100%
    );
    box-shadow: 0 20px 40px rgba(224, 171, 159, 0.2);
    transform: translateY(-2px);
  `}
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, 
      ${props => props.theme.colors.primary.highlight} 0%, 
      ${props => props.theme.colors.primary.accent} 100%
    );
    border-radius: ${props => props.theme.borderRadius.large};
    opacity: ${props => props.$selected ? 0.3 : 0};
    z-index: -1;
    transition: opacity ${props => props.theme.transitions.normal};
  }
`;

const FormulaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const FormulaTitle = styled.h3`
  font-size: 24px;
  color: ${props => props.theme.colors.floralWhite};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  font-weight: ${props => props.theme.typography.weights.bold};
  text-shadow: 1px 1px 2px rgba(1, 57, 39, 0.4);
`;

const FormulaBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary.highlight} 0%, 
    rgba(224, 171, 159, 0.7) 100%
  );
  color: white;
  border-radius: ${props => props.theme.borderRadius.pill};
  font-size: 12px;
  font-weight: ${props => props.theme.typography.weights.medium};
  margin-left: ${props => props.theme.spacing.sm};
`;

const FormulaPrice = styled.div`
  font-size: 28px;
  font-weight: ${props => props.theme.typography.weights.bold};
  color: ${props => props.theme.colors.floralWhite};
  white-space: nowrap;
  margin-top: ${props => props.theme.spacing.md};
  text-shadow: 1px 1px 2px rgba(1, 57, 39, 0.4);
`;

const FormulaContent = styled.div`
  margin-top: ${props => props.theme.spacing.lg};
`;

const FormulaVisual = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, 
    rgba(224, 171, 159, 0.2) 0%, 
    rgba(224, 171, 159, 0.1) 100%
  );
  border-radius: ${props => props.theme.borderRadius.medium};
  margin-right: ${props => props.theme.spacing.lg};
  font-size: 28px;
`;

const FormulaDescription = styled.p`
  font-size: ${props => props.theme.typography.sizes.small};
  color: ${props => props.theme.colors.floralWhite};
  font-style: italic;
  margin-top: ${props => props.theme.spacing.sm};
  padding-left: ${props => props.theme.spacing.sm};
  opacity: 0.8;
  text-shadow: 1px 1px 2px rgba(1, 57, 39, 0.3);
`;

const FormulaSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const FormulaSectionTitle = styled.h4`
  font-size: 14px;
  font-weight: ${props => props.theme.typography.weights.semibold};
  color: ${props => props.theme.colors.floralWhite};
  margin-bottom: ${props => props.theme.spacing.md};
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  text-shadow: 1px 1px 2px rgba(1, 57, 39, 0.4);

  &::before {
    content: '•';
    margin-right: ${props => props.theme.spacing.sm};
    color: ${props => props.theme.colors.floralWhite};
  }
`;

const FormulaOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const FormulaOption = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.$selected 
    ? 'linear-gradient(135deg, rgba(224, 171, 159, 0.2) 0%, rgba(224, 171, 159, 0.1) 100%)' 
    : 'rgba(255, 255, 255, 0.5)'};
  border: 1px solid ${props => props.$selected 
    ? props.theme.colors.primary.highlight 
    : 'rgba(28, 63, 51, 0.1)'};
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  position: relative;
  overflow: hidden;
  
  &:hover {
    background: ${props => props.$selected 
      ? 'linear-gradient(135deg, rgba(224, 171, 159, 0.25) 0%, rgba(224, 171, 159, 0.15) 100%)'
      : 'rgba(224, 171, 159, 0.08)'};
    transform: translateX(4px);
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: ${props => props.theme.colors.primary.highlight};
    opacity: ${props => props.$selected ? 1 : 0};
    transition: opacity ${props => props.theme.transitions.fast};
  }
`;

const RadioButton = styled(motion.div)`
  width: 20px;
  height: 20px;
  border: 2px solid ${props => props.$checked 
    ? props.theme.colors.primary.highlight 
    : 'rgba(28, 63, 51, 0.2)'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$checked 
    ? 'white' 
    : 'transparent'};
  transition: all ${props => props.theme.transitions.fast};
  position: relative;
  
  &::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${props => props.theme.colors.primary.highlight};
    opacity: ${props => props.$checked ? 1 : 0};
    transform: scale(${props => props.$checked ? 1 : 0});
    transition: all ${props => props.theme.transitions.fast};
  }
`;

const ExpandButton = styled(motion.button)`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary.highlight} 0%, 
    rgba(224, 171, 159, 0.8) 100%
  );
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(224, 171, 159, 0.3);
  transition: all ${props => props.theme.transitions.fast};
  z-index: 10;
  
  &:hover {
    transform: scale(1.15);
    box-shadow: 0 6px 16px rgba(224, 171, 159, 0.4);
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  bottom: ${props => props.theme.spacing.xl};
  right: ${props => props.theme.spacing.xl};
  z-index: 1000;
  pointer-events: none;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    left: ${props => props.theme.spacing.md};
    right: ${props => props.theme.spacing.md};
    bottom: ${props => props.theme.spacing.md};
  }
`;

const ModalContent = styled(motion.div)`
  background: linear-gradient(135deg, 
    rgba(251, 247, 238, 0.98) 0%, 
    rgba(247, 242, 231, 0.95) 100%
  );
  backdrop-filter: blur(20px);
  border: 1px solid rgba(224, 171, 159, 0.3);
  border-radius: ${props => props.theme.borderRadius.xlarge};
  padding: ${props => props.theme.spacing.lg};
  max-width: 600px;
  width: 100%;
  max-height: 450px;
  min-height: 350px;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  pointer-events: auto;
  overflow: hidden;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    max-width: calc(100vw - 40px);
    max-height: 450px;
    min-height: 350px;
  }
`;

const ProgressBar = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, 
    ${props => props.theme.colors.primary.highlight} 0%, 
    ${props => props.theme.colors.primary.accent} 100%
  );
  transform-origin: left;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ModalTitle = styled.h3`
  font-size: 18px;
  color: ${props => props.theme.colors.darkGreen};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  font-weight: ${props => props.theme.typography.weights.semibold};
`;

const CloseButton = styled(motion.button)`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(28, 63, 51, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background: rgba(255, 255, 255, 0.95);
    transform: rotate(90deg);
  }
`;

const ModalSections = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ModalSection = styled.div`
  padding: ${props => props.theme.spacing.sm};
  background: rgba(255, 255, 255, 0.3);
  border-radius: ${props => props.theme.borderRadius.medium};
`;

const ModalSectionTitle = styled.h4`
  font-size: 12px;
  font-weight: ${props => props.theme.typography.weights.semibold};
  color: ${props => props.theme.colors.darkGreen};
  margin-bottom: ${props => props.theme.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ModalItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.xs} 0;
  font-size: 14px;
  color: ${props => props.theme.colors.darkGreen};

  svg {
    color: ${props => props.theme.colors.teaRose};
    width: 14px;
    height: 14px;
  }
`;

const ModalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.lg};
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary.text} 0%, 
    ${props => props.theme.colors.primary.accent} 100%
  );
  border-radius: ${props => props.theme.borderRadius.medium};
  margin-top: ${props => props.theme.spacing.lg};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  span:first-child {
    font-size: 16px;
    font-weight: ${props => props.theme.typography.weights.semibold};
    color: white;
    opacity: 0.95;
  }
  
  span:last-child {
    font-size: 24px;
    font-weight: ${props => props.theme.typography.weights.bold};
    color: white;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.secondary.text};
  font-style: italic;
`;

const ValidateButton = styled(motion.button)`
  width: 100%;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.primary.text} 0%, 
    ${props => props.theme.colors.primary.accent} 100%
  );
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.xlarge};
  font-size: ${props => props.theme.typography.sizes.body.regular};
  font-weight: ${props => props.theme.typography.weights.semibold};
  cursor: pointer;
  margin-top: ${props => props.theme.spacing.xl};
  transition: all ${props => props.theme.transitions.normal};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(28, 63, 51, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DishModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: ${props => props.theme.spacing.xl};
`;

const DishModalContent = styled(motion.div)`
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.98) 0%, 
    rgba(247, 242, 231, 0.95) 100%
  );
  border-radius: ${props => props.theme.borderRadius.xlarge};
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const DishImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.xlarge} ${props => props.theme.borderRadius.xlarge} 0 0;
`;

const DishDetails = styled.div`
  padding: ${props => props.theme.spacing.xl};
`;

const DishName = styled.h2`
  font-size: 24px;
  color: ${props => props.theme.colors.darkGreen};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const DishDescription = styled.p`
  font-size: ${props => props.theme.typography.sizes.body.regular};
  color: ${props => props.theme.colors.darkGreen};
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
  margin-bottom: ${props => props.theme.spacing.lg};
  opacity: 0.8;
`;

const DishPrice = styled.div`
  font-size: 28px;
  font-weight: ${props => props.theme.typography.weights.bold};
  color: ${props => props.theme.colors.teaRose};
  text-align: center;
  padding: ${props => props.theme.spacing.md};
  background: rgba(252, 189, 189, 0.1);
  border-radius: ${props => props.theme.borderRadius.medium};
`;

const DishCloseButton = styled(motion.button)`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
  
  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: rotate(90deg);
  }
`;

const DishPreview = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  margin-left: ${props => props.theme.spacing.md};
  width: 200px;
  background: white;
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 100;
  pointer-events: none;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
`;

const PreviewTitle = styled.div`
  padding: ${props => props.theme.spacing.sm};
  font-size: 12px;
  color: ${props => props.theme.colors.darkGreen};
  background: rgba(247, 242, 231, 0.8);
`;

const ImageIndicator = styled.div`
  display: none;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-left: ${props => props.theme.spacing.sm};
    overflow: hidden;
    border: 2px solid ${props => props.theme.colors.primary.highlight};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const MenuPage = () => {
  const { i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';
  const isSpanish = i18n.language === 'es';
  const [expandedFormulas, setExpandedFormulas] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentFormula, setCurrentFormula] = useState(null);
  const [selectedDish, setSelectedDish] = useState(null);
  const [showDishModal, setShowDishModal] = useState(false);
  const [hoveredDish, setHoveredDish] = useState(null);

  const toggleFormula = (formulaId) => {
    setExpandedFormulas(prev => ({
      ...prev,
      [formulaId]: !prev[formulaId]
    }));
  };

  const dishImages = {
    // Caviar d'aubergine
    "Caviar d'aubergine, émincé de poulet, parmesan": {
      image: "/images/menu/toastcaviaraubergine.jpeg",
      description: isEnglish 
        ? "Delicious eggplant caviar with sliced chicken and parmesan"
        : isSpanish
        ? "Delicioso caviar de berenjena con pollo laminado y parmesano"
        : "Délicieux caviar d'aubergine avec émincé de poulet et parmesan"
    },
    "Eggplant caviar, sliced chicken, parmesan": {
      image: "/images/menu/toastcaviaraubergine.jpeg",
      description: "Delicious eggplant caviar with sliced chicken and parmesan"
    },
    "Caviar de berenjena, pollo laminado, parmesano": {
      image: "/images/menu/toastcaviaraubergine.jpeg",
      description: "Delicioso caviar de berenjena con pollo laminado y parmesano"
    },
    
    // Burger House
    "Burger House": {
      image: "/images/menu/burgerhouse.jpeg",
      description: isEnglish
        ? "Our signature house burger with special sauce"
        : isSpanish
        ? "Nuestra hamburguesa de la casa con salsa especial"
        : "Notre burger maison avec sauce spéciale"
    },
    
    // Saumon guacamole
    "Saumon guacamole maison, fleur de sel": {
      image: "/images/menu/saumonguacamole.jpeg",
      description: isEnglish
        ? "Fresh salmon with homemade guacamole and fleur de sel"
        : isSpanish
        ? "Salmón fresco con guacamole casero y flor de sal"
        : "Saumon frais avec guacamole maison et fleur de sel"
    },
    "Salmon, homemade guacamole, fleur de sel": {
      image: "/images/menu/saumonguacamole.jpeg",
      description: "Fresh salmon with homemade guacamole and fleur de sel"
    },
    "Salmón, guacamole casero, flor de sal": {
      image: "/images/menu/saumonguacamole.jpeg",
      description: "Salmón fresco con guacamole casero y flor de sal"
    },
    
    // Œuf brouillé bacon
    "Œuf brouillé, bacon, tomates cerises": {
      image: "/images/menu/oeufbrouillebacon.jpeg",
      description: isEnglish
        ? "Scrambled eggs with crispy bacon and cherry tomatoes"
        : isSpanish
        ? "Huevos revueltos con bacon crujiente y tomates cherry"
        : "Œufs brouillés avec bacon croustillant et tomates cerises"
    },
    "Scrambled eggs, bacon, cherry tomatoes": {
      image: "/images/menu/oeufbrouillebacon.jpeg",
      description: "Scrambled eggs with crispy bacon and cherry tomatoes"
    },
    "Huevos revueltos, bacon, tomates cherry": {
      image: "/images/menu/oeufbrouillebacon.jpeg",
      description: "Huevos revueltos con bacon crujiente y tomates cherry"
    },
    
    // Pancake
    "Pancake": {
      image: "/images/menu/pancake.jpeg",
      description: isEnglish
        ? "Fluffy pancakes with maple syrup and fresh fruits"
        : isSpanish
        ? "Pancakes esponjosos con sirope de arce y frutas frescas"
        : "Pancakes moelleux avec sirop d'érable et fruits frais"
    },
    
    // Formule Plaisir
    "Plaisir": {
      image: "/images/menu/formuleplaisir.jpeg",
      description: isEnglish
        ? "The perfect balance between sweet and savory"
        : isSpanish
        ? "El equilibrio perfecto entre dulce y salado"
        : "L'équilibre parfait entre sucré et salé"
    },
    "Pleasure": {
      image: "/images/menu/formuleplaisir.jpeg",
      description: "The perfect balance between sweet and savory"
    },
    "Placer": {
      image: "/images/menu/formuleplaisir.jpeg",
      description: "El equilibrio perfecto entre dulce y salado"
    },
    
    // Houmous betterave
    "Houmous à la betterave, avocat": {
      image: "/images/menu/houmous.jpeg",
      description: isEnglish
        ? "Beetroot hummus with fresh avocado"
        : isSpanish
        ? "Hummus de remolacha con aguacate fresco"
        : "Houmous de betterave avec avocat frais"
    },
    "Beetroot hummus, avocado": {
      image: "/images/menu/houmous.jpeg",
      description: "Beetroot hummus with fresh avocado"
    },
    "Hummus de remolacha, aguacate": {
      image: "/images/menu/houmous.jpeg",
      description: "Hummus de remolacha con aguacate fresco"
    },
    
    // Jus maison
    "Jus d'orange maison": {
      image: "/images/menu/juice.jpeg",
      description: isEnglish
        ? "Freshly squeezed orange juice"
        : isSpanish
        ? "Zumo de naranja recién exprimido"
        : "Jus d'orange fraîchement pressé"
    },
    "Bissap maison": {
      image: "/images/menu/juice.jpeg",
      description: isEnglish
        ? "Homemade hibiscus drink"
        : isSpanish
        ? "Bebida de hibisco casera"
        : "Bissap fait maison"
    },
    "Jus de gingembre maison": {
      image: "/images/menu/juice.jpeg",
      description: isEnglish
        ? "Homemade ginger juice"
        : isSpanish
        ? "Zumo de jengibre casero"
        : "Jus de gingembre fait maison"
    },
    "Jus de saison": {
      image: "/images/menu/juice.jpeg",
      description: isEnglish
        ? "Seasonal fresh juice"
        : isSpanish
        ? "Zumo de temporada"
        : "Jus de saison frais"
    },
    "Homemade orange juice": {
      image: "/images/menu/juice.jpeg",
      description: "Freshly squeezed orange juice"
    },
    "Homemade bissap": {
      image: "/images/menu/juice.jpeg",
      description: "Homemade hibiscus drink"
    },
    "Homemade ginger juice": {
      image: "/images/menu/juice.jpeg",
      description: "Homemade ginger juice"
    },
    "Seasonal juice": {
      image: "/images/menu/juice.jpeg",
      description: "Seasonal fresh juice"
    },
    
    // Cordon Bleu
    "Cordon Bleu House": {
      image: "/images/menu/cordonbleue.jpeg",
      description: isEnglish
        ? "House special cordon bleu with melted cheese"
        : isSpanish
        ? "Cordon bleu especial de la casa con queso fundido"
        : "Cordon bleu maison avec fromage fondant"
    },
    
    // Viennoiseries
    "Croissant": {
      image: "/images/menu/croissant.png",
      description: isEnglish
        ? "Fresh buttery croissant"
        : isSpanish
        ? "Croissant fresco y mantecoso"
        : "Croissant frais au beurre"
    },
    "Chocolatine": {
      image: "/images/menu/chocolatine.jpg",
      description: isEnglish
        ? "Flaky pastry with chocolate filling"
        : isSpanish
        ? "Hojaldre con relleno de chocolate"
        : "Viennoiserie feuilletée au chocolat"
    },
    "Muffin chocolat": {
      image: "/images/menu/muffin.jpeg",
      description: isEnglish
        ? "Chocolate muffin with chocolate chips"
        : isSpanish
        ? "Muffin de chocolate con chips de chocolate"
        : "Muffin au chocolat avec pépites de chocolat"
    },
    "Chocolate muffin": {
      image: "/images/menu/muffin.jpeg",
      description: "Chocolate muffin with chocolate chips"
    },
    "Muffin de chocolate": {
      image: "/images/menu/muffin.jpeg",
      description: "Muffin de chocolate con chips de chocolate"
    },
    
    // Desserts
    "Grec granola": {
      image: "/images/menu/grecgranola.jpeg",
      description: isEnglish
        ? "Greek yogurt with homemade granola and fresh fruits"
        : isSpanish
        ? "Yogur griego con granola casera y frutas frescas"
        : "Yaourt grec avec granola maison et fruits frais"
    },
    "Greek granola": {
      image: "/images/menu/grecgranola.jpeg",
      description: "Greek yogurt with homemade granola and fresh fruits"
    },
    "Granola griego": {
      image: "/images/menu/grecgranola.jpeg",
      description: "Yogur griego con granola casera y frutas frescas"
    },
    "Brioche perdue": {
      image: "/images/menu/brioche.png",
      description: isEnglish
        ? "French toast with caramelized sugar"
        : isSpanish
        ? "Tostada francesa con azúcar caramelizado"
        : "Brioche perdue dorée au sucre caramélisé"
    },
    "French toast": {
      image: "/images/menu/brioche.png",
      description: "French toast with caramelized sugar"
    },
    "Tostada francesa": {
      image: "/images/menu/brioche.png",
      description: "Tostada francesa con azúcar caramelizado"
    },
    
    // Boissons chaudes spéciales
    "Matcha": {
      image: "/images/menu/matcha.png",
      description: isEnglish
        ? "Traditional Japanese matcha tea"
        : isSpanish
        ? "Té matcha japonés tradicional"
        : "Thé matcha japonais traditionnel"
    },
    "Chocolat viennois": {
      image: "/images/menu/chocolatviennois.png",
      description: isEnglish
        ? "Viennese hot chocolate with whipped cream"
        : isSpanish
        ? "Chocolate vienés con nata montada"
        : "Chocolat viennois avec chantilly"
    },
    "Viennese chocolate": {
      image: "/images/menu/chocolatviennois.png",
      description: "Viennese hot chocolate with whipped cream"
    },
    "Chocolate vienés": {
      image: "/images/menu/chocolatviennois.png",
      description: "Chocolate vienés con nata montada"
    },
    "Thé": {
      image: "/images/menu/tea.jpeg",
      description: isEnglish
        ? "Selection of fine teas"
        : isSpanish
        ? "Selección de tés finos"
        : "Sélection de thés fins"
    },
    "Tea": {
      image: "/images/menu/tea.jpeg",
      description: "Selection of fine teas"
    },
    "Té": {
      image: "/images/menu/tea.jpeg",
      description: "Selección de tés finos"
    },
    
    // Cafés
    "Café latte": {
      image: "/images/menu/cafelatte.jpg",
      description: isEnglish
        ? "Smooth latte with steamed milk"
        : isSpanish
        ? "Café latte suave con leche vaporizada"
        : "Café latte onctueux avec lait moussé"
    },
    "Latte": {
      image: "/images/menu/cafelatte.jpg",
      description: "Smooth latte with steamed milk"
    },
    "Cappuccino": {
      image: "/images/menu/cappucino.jpg",
      description: isEnglish
        ? "Classic Italian cappuccino"
        : isSpanish
        ? "Cappuccino italiano clásico"
        : "Cappuccino italien classique"
    },
    "Double expresso": {
      image: "/images/menu/doubleexpresso.jpg",
      description: isEnglish
        ? "Strong double shot of espresso"
        : isSpanish
        ? "Doble expreso fuerte"
        : "Double dose d'expresso corsé"
    },
    "Double espresso": {
      image: "/images/menu/doubleexpresso.jpg",
      description: "Strong double shot of espresso"
    },
    "Doble expreso": {
      image: "/images/menu/doubleexpresso.jpg",
      description: "Doble expreso fuerte"
    },
    "Café noisette": {
      image: "/images/menu/cafenoisette.jpg",
      description: isEnglish
        ? "Espresso with a dash of milk"
        : isSpanish
        ? "Expreso con un toque de leche"
        : "Expresso avec une pointe de lait"
    },
    "Hazelnut coffee": {
      image: "/images/menu/cafenoisette.jpg",
      description: "Espresso with a dash of milk"
    },
    "Café cortado": {
      image: "/images/menu/cafenoisette.jpg",
      description: "Expreso con un toque de leche"
    },
    "Allongé": {
      image: "/images/menu/cafeallonge.png",
      description: isEnglish
        ? "Long black coffee"
        : isSpanish
        ? "Café largo"
        : "Café allongé"
    },
    "Long coffee": {
      image: "/images/menu/cafeallonge.png",
      description: "Long black coffee"
    },
    "Café largo": {
      image: "/images/menu/cafeallonge.png",
      description: "Café largo"
    },
    "Expresso": {
      image: "/images/menu/expresso.png",
      description: isEnglish
        ? "Classic Italian espresso"
        : isSpanish
        ? "Expreso italiano clásico"
        : "Expresso italien classique"
    },
    "Espresso": {
      image: "/images/menu/expresso.png",
      description: "Classic Italian espresso"
    },
    
    // Boissons froides
    "Canette": {
      image: "/images/menu/canette.jpg",
      description: isEnglish
        ? "Selection of canned soft drinks"
        : isSpanish
        ? "Selección de refrescos en lata"
        : "Sélection de canettes de sodas"
    },
    "Can": {
      image: "/images/menu/canette.jpg",
      description: "Selection of canned soft drinks"
    },
    "Lata": {
      image: "/images/menu/canette.jpg",
      description: "Selección de refrescos en lata"
    },
    "Canette au choix": {
      image: "/images/menu/canette.jpg",
      description: isEnglish
        ? "Choice of canned soft drink"
        : isSpanish
        ? "Lata de refresco a elegir"
        : "Canette au choix"
    },
    "1 canette au choix": {
      image: "/images/menu/canette.jpg",
      description: isEnglish
        ? "Choice of canned soft drink"
        : isSpanish
        ? "Lata de refresco a elegir"
        : "Canette au choix"
    }
  };

  const handleDishClick = (item) => {
    const dishInfo = dishImages[item.name] || dishImages[item.name.split(',')[0]?.trim()];
    if (dishInfo) {
      setSelectedDish({
        ...item,
        ...dishInfo
      });
      setShowDishModal(true);
    }
  };

  const toggleOption = (formulaId, optionType, option) => {
    setSelectedOptions(prev => {
      const newOptions = {
        ...prev,
        [formulaId]: {
          ...prev[formulaId],
          [optionType]: prev[formulaId]?.[optionType] === option 
            ? null 
            : option
        }
      };
      
      // Ouvrir le modal après la sélection
      const formula = formulas.find(f => f.id === formulaId);
      if (formula) {
        setCurrentFormula({ ...formula, selections: newOptions[formulaId] || {} });
        setShowModal(true);
      }
      
      return newOptions;
    });
  };
  
  const isFormulaComplete = (formula) => {
    if (!selectedOptions[formula.id]) return false;
    
    const requiredSelections = formula.sections
      .filter(s => s.options && s.type)
      .map(s => s.type);
    
    const madeSelections = Object.keys(selectedOptions[formula.id] || {});
    
    return requiredSelections.every(req => 
      madeSelections.includes(req) && selectedOptions[formula.id][req]
    );
  };

  const menuData = {
    viennoiseries: {
      title: "🥐 Viennoiseries",
      items: [
        { name: "Croissant", price: "2 €" },
        { name: "Chocolatine", price: "2 €" },
        { name: isEnglish ? "Chocolate muffin" : isSpanish ? "Muffin de chocolate" : "Muffin chocolat", price: "4 €" }
      ]
    },
    desserts: {
      title: "🍰 Desserts",
      items: [
        { 
          name: isEnglish ? "Greek yogurt granola" : isSpanish ? "Granola griego" : "Grec granola", 
          description: isEnglish ? "passion coulis / red berries" : isSpanish ? "coulis de maracuyá / frutos rojos" : "coulis passion / fruits rouges", 
          price: "4 €" 
        },
        { name: isEnglish ? "The pancake" : isSpanish ? "El pancake" : "Le pancake", price: "8 €" },
        { name: isEnglish ? "French toast" : isSpanish ? "Tostada francesa" : "La brioche perdue", price: "8 €" }
      ],
      note: isEnglish 
        ? "Toppings: red berries / salted butter caramel / chocolate hazelnut / maple syrup."
        : isSpanish 
        ? "Coberturas: frutos rojos / caramelo de mantequilla salada / chocolate avellana / jarabe de arce."
        : "Nappage : fruits rouges / caramel beurre salé / chocolat noisette / sirop d'érable."
    },
    toasts: {
      title: "🥑 Toasts",
      items: [
        { 
          name: isEnglish 
            ? "Scrambled eggs, bacon, cherry tomatoes" 
            : isSpanish 
            ? "Huevos revueltos, bacon, tomates cherry"
            : "Œuf brouillé, bacon, tomates cerises", 
          price: "11 €" 
        },
        { 
          name: isEnglish 
            ? "Beetroot hummus, avocado" 
            : isSpanish 
            ? "Hummus de remolacha, aguacate"
            : "Houmous à la betterave, avocat", 
          price: "12 €" 
        },
        { 
          name: isEnglish 
            ? "Eggplant caviar, sliced chicken, parmesan" 
            : isSpanish 
            ? "Caviar de berenjena, pollo laminado, parmesano"
            : "Caviar d'aubergine, émincé de poulet, parmesan", 
          price: "14 €" 
        },
        { 
          name: isEnglish 
            ? "Salmon, homemade guacamole, fleur de sel" 
            : isSpanish 
            ? "Salmón, guacamole casero, flor de sal"
            : "Saumon guacamole maison, fleur de sel", 
          price: "14 €" 
        },
        { 
          name: isEnglish 
            ? "Burrata, beef heart tomatoes, fleur de sel" 
            : isSpanish 
            ? "Burrata, tomates corazón de buey, flor de sal"
            : "Burrata, tomates coeur de boeuf, fleur de sel", 
          price: "15 €" 
        }
      ],
      note: isEnglish 
        ? "*Toasts are served by 2."
        : isSpanish 
        ? "*Las tostadas se sirven de 2 en 2."
        : "*Les toasts sont servis par 2."
    },
    plats: {
      title: isEnglish ? "🍽️ Main dishes" : isSpanish ? "🍽️ Platos principales" : "🍽️ Plats",
      items: [
        { 
          name: "Le Special One", 
          description: isEnglish 
            ? "Brioche bun, guacamole, steak, cheddar, arugula, tomatoes, BBQ sauce"
            : isSpanish 
            ? "Pan brioche, guacamole, filete, cheddar, rúcula, tomates, salsa barbacoa"
            : "Pain brioche, guacamole, steak, cheddar, roquette, tomates, sauce barbecue", 
          price: "14 €" 
        },
        { 
          name: "Le Burger House", 
          description: isEnglish 
            ? "Brioche bun, chicken cutlet (beef or chicken), lamb's lettuce, tomatoes, red onion, cheddar, saffron sauce"
            : isSpanish 
            ? "Pan brioche, escalope de pollo (carne o pollo), canónigos, tomates, cebolla roja, cheddar, salsa azafrán"
            : "Pain brioche, escalope de poulet (viande ou poulet), mâche, tomates, oignon rouge, cheddar, sauce safran", 
          price: "14 €" 
        },
        { 
          name: isEnglish 
            ? "Veggie burger of the day" 
            : isSpanish 
            ? "Hamburguesa vegetariana del día"
            : "Burger végé du moment", 
          price: "14 €" 
        },
        { 
          name: "Cordon Bleu House", 
          description: isEnglish 
            ? "Marinated chicken cutlet, turkey ham, cheese"
            : isSpanish 
            ? "Escalope de pollo marinado, jamón de pavo, queso"
            : "Escalope de poulet mariné, jambon de dinde, fromage", 
          price: "15 €" 
        }
      ],
      note: isEnglish 
        ? "Burgers are served with fries or salad."
        : isSpanish 
        ? "Las hamburguesas se sirven con patatas fritas o ensalada."
        : "Les burgers sont servis avec frites ou salades."
    },
    boissonsC: {
      title: isEnglish ? "☕ Hot drinks" : isSpanish ? "☕ Bebidas calientes" : "☕ Boissons chaudes",
      items: [
        { name: "Expresso", price: "2 €" },
        { name: isEnglish ? "Long coffee" : isSpanish ? "Café largo" : "Allongé", price: "2,50 €" },
        { name: isEnglish ? "Coffee with milk" : isSpanish ? "Café cortado" : "Café noisette", price: "2,50 €" },
        { name: isEnglish ? "Double espresso" : isSpanish ? "Doble espresso" : "Double expresso", price: "3,50 €" },
        { name: "Cappuccino", price: "4 €" },
        { name: isEnglish ? "Café Latte" : isSpanish ? "Café con leche" : "Café Latté", price: "4 €" },
        { name: "Matcha", price: "5 €" },
        { name: isEnglish ? "Hot chocolate" : isSpanish ? "Chocolate caliente" : "Chocolat viennois", price: "5,50 €" },
        { name: isEnglish ? "Tea" : isSpanish ? "Té" : "Thé", price: "4 €" },
        { name: isEnglish ? "Mocha" : isSpanish ? "Moca" : "Moka", price: "5 €" }
      ],
      note: isEnglish 
        ? "Extra €2: whipped cream"
        : isSpanish 
        ? "Suplemento 2€: nata montada"
        : "Supplément 2€ : chantilly"
    },
    boissonsF: {
      title: isEnglish ? "🧊 Cold drinks" : isSpanish ? "🧊 Bebidas frías" : "🧊 Boissons froides",
      items: [
        { name: isEnglish ? "Can" : isSpanish ? "Lata" : "Canette", price: "2 €" },
        { name: isEnglish ? "Homemade orange juice" : isSpanish ? "Zumo de naranja casero" : "Jus d'orange maison", price: "4 €" },
        { name: isEnglish ? "Homemade hibiscus" : isSpanish ? "Bissap casero" : "Bissap maison", price: "4 €" },
        { name: isEnglish ? "Homemade ginger juice" : isSpanish ? "Zumo de jengibre casero" : "Jus de gingembre maison", price: "5 €" },
        { name: isEnglish ? "Seasonal juice" : isSpanish ? "Zumo de temporada" : "Jus de saison", price: "5 €" },
        { name: isEnglish ? "Iced jasmine tea" : isSpanish ? "Té de jazmín helado" : "Thé jasmin glacé", price: "5 €" }
      ]
    },
    kids: {
      title: isEnglish ? "👶 Kids Menu" : isSpanish ? "👶 Menú Niños" : "👶 Menu Kids",
      items: [
        { 
          name: isEnglish ? "Complete menu" : isSpanish ? "Menú completo" : "Menu complet", 
          description: isEnglish 
            ? "3 chicken tenders, Homemade fries, Caprisun"
            : isSpanish 
            ? "3 tiras de pollo, Patatas fritas caseras, Caprisun"
            : "3 aiguillettes de poulet, Frites maison, Caprisun", 
          price: "6 €" 
        }
      ]
    }
  };

  const formulas = [
    {
      id: 'efficace',
      name: isEnglish ? "The Efficient" : isSpanish ? "El Eficaz" : "L'Efficace",
      price: "15 €",
      emoji: "⚡",
      description: isEnglish 
        ? "Start your day simply and efficiently"
        : isSpanish 
        ? "Para empezar el día con sencillez"
        : "Pour bien démarrer la journée en toute simplicité",
      sections: [
        {
          title: isEnglish ? "Pastry" : isSpanish ? "Bollería" : "Viennoiserie",
          options: ["Chocolatine", "Croissant"],
          type: "viennoiserie"
        },
        {
          title: isEnglish ? "Hot drink" : isSpanish ? "Bebida caliente" : "Boisson chaude",
          options: [
            isEnglish ? "Espresso" : "Expresso", 
            isEnglish ? "Long coffee" : isSpanish ? "Café largo" : "Allongé", 
            isEnglish ? "Hot chocolate" : isSpanish ? "Chocolate caliente" : "Chocolat chaud"
          ],
          type: "boisson_chaude"
        },
        {
          title: isEnglish ? "Included" : isSpanish ? "Incluido" : "Inclus",
          fixed: [
            isEnglish 
              ? "1 cold drink (homemade orange juice)" 
              : isSpanish 
              ? "1 bebida fría (zumo de naranja casero)"
              : "1 boisson froide (jus d'orange maison)", 
            isEnglish 
              ? "1 scrambled egg & bacon toast" 
              : isSpanish 
              ? "1 tostada de huevos revueltos y bacon"
              : "1 toast œuf brouillé bacon"
          ]
        }
      ]
    },
    {
      id: 'house',
      name: isEnglish ? "The House" : isSpanish ? "El House" : "Le House",
      price: "27 €",
      emoji: "🏠",
      description: isEnglish 
        ? "The complete formula for a gourmet brunch"
        : isSpanish 
        ? "La fórmula completa para un brunch gourmet"
        : "La formule complète pour un brunch gourmand",
      sections: [
        {
          title: isEnglish ? "Hot drink" : isSpanish ? "Bebida caliente" : "Boisson chaude",
          options: [
            isEnglish ? "Espresso" : "Expresso", 
            isEnglish ? "Long coffee" : isSpanish ? "Café largo" : "Allongé", 
            isEnglish ? "Hot chocolate" : isSpanish ? "Chocolate caliente" : "Chocolat chaud"
          ],
          type: "boisson_chaude"
        },
        {
          title: isEnglish ? "Cold drink" : isSpanish ? "Bebida fría" : "Boisson froide",
          options: [
            isEnglish ? "Can" : isSpanish ? "Lata" : "Canette", 
            isEnglish ? "Apple juice" : isSpanish ? "Zumo de manzana" : "Jus de pomme", 
            isEnglish ? "Orange juice" : isSpanish ? "Zumo de naranja" : "Jus d'orange"
          ],
          type: "boisson_froide"
        },
        {
          title: isEnglish ? "Dessert" : isSpanish ? "Postre" : "Dessert",
          options: [
            isEnglish ? "Greek granola" : isSpanish ? "Granola griego" : "Grec granola", 
            "Pancake", 
            isEnglish ? "French toast" : isSpanish ? "Tostada francesa" : "Brioche perdue"
          ],
          type: "dessert",
          note: isEnglish 
            ? "Served with fruits and topping of choice"
            : isSpanish 
            ? "Servido con frutas y cobertura a elegir"
            : "Servis avec fruits et nappage au choix"
        },
        {
          title: isEnglish ? "Main course" : isSpanish ? "Plato principal" : "Plat",
          options: [
            isEnglish ? "Burger (beef or chicken)" : isSpanish ? "Burger (carne o pollo)" : "Burger (viande ou poulet)", 
            "Cordon bleu"
          ],
          type: "plat"
        }
      ]
    },
    {
      id: 'plaisir',
      name: isEnglish ? "Pleasure" : isSpanish ? "Placer" : "Plaisir",
      price: "22 €",
      emoji: "💝",
      description: isEnglish 
        ? "The perfect balance between sweet and savory"
        : isSpanish 
        ? "El equilibrio perfecto entre dulce y salado"
        : "L'équilibre parfait entre sucré et salé",
      sections: [
        {
          title: isEnglish ? "Hot drink" : isSpanish ? "Bebida caliente" : "Boisson chaude",
          options: [
            isEnglish ? "Espresso" : "Expresso", 
            isEnglish ? "Long coffee" : isSpanish ? "Café largo" : "Allongé", 
            isEnglish ? "Hot chocolate" : isSpanish ? "Chocolate caliente" : "Chocolat chaud"
          ],
          type: "boisson_chaude"
        },
        {
          title: isEnglish ? "Cold drink" : isSpanish ? "Bebida fría" : "Boisson froide",
          options: [
            isEnglish ? "Can" : isSpanish ? "Lata" : "Canette", 
            isEnglish ? "Apple juice" : isSpanish ? "Zumo de manzana" : "Jus de pomme", 
            isEnglish ? "Orange juice" : isSpanish ? "Zumo de naranja" : "Jus d'orange"
          ],
          type: "boisson_froide"
        },
        {
          title: isEnglish ? "Dessert" : isSpanish ? "Postre" : "Dessert",
          options: [
            isEnglish ? "Greek granola" : isSpanish ? "Granola griego" : "Grec granola", 
            "Pancake", 
            isEnglish ? "French toast" : isSpanish ? "Tostada francesa" : "Brioche perdue"
          ],
          type: "dessert",
          note: isEnglish 
            ? "Served with fruits and topping of choice"
            : isSpanish 
            ? "Servido con frutas y cobertura a elegir"
            : "Servis avec fruits et nappage au choix"
        },
        {
          title: isEnglish ? "Choice of toasts" : isSpanish ? "Tostadas a elegir" : "Toasts au choix",
          options: [
            isEnglish ? "Scrambled egg & bacon" : isSpanish ? "Huevo revuelto y bacon" : "Œuf brouillé bacon", 
            isEnglish ? "Beetroot hummus" : isSpanish ? "Hummus de remolacha" : "Houmous betterave", 
            isEnglish ? "Eggplant caviar" : isSpanish ? "Caviar de berenjena" : "Caviar d'aubergine", 
            isEnglish ? "Salmon guacamole" : isSpanish ? "Salmón guacamole" : "Saumon guacamole", 
            "Burrata (+2€)"
          ],
          type: "toasts"
        }
      ]
    },
    {
      id: 'etudiant',
      name: isEnglish ? "Student Formula" : isSpanish ? "Fórmula estudiante" : "Formule étudiante",
      price: "12 €",
      emoji: "🎓",
      description: isEnglish 
        ? "Specially designed for students"
        : isSpanish 
        ? "Especialmente diseñada para estudiantes"
        : "Spécialement conçue pour les étudiants",
      sections: [
        {
          title: isEnglish ? "Included" : isSpanish ? "Incluido" : "Inclus",
          fixed: [
            isEnglish ? "1 portion of fries" : isSpanish ? "1 porción de papas fritas" : "1 frite de pomme de terre", 
            isEnglish ? "1 can of choice" : isSpanish ? "1 lata a elegir" : "1 canette au choix"
          ]
        },
        {
          title: "Burger",
          options: [
            isEnglish ? "Chicken burger" : isSpanish ? "Hamburguesa de pollo" : "Burger poulet", 
            isEnglish ? "Beef burger" : isSpanish ? "Hamburguesa de carne" : "Burger viande hachée"
          ],
          type: "burger"
        }
      ]
    }
  ];

  return (
    <PageWrapper>
      <Header />
      
      <MenuHeader>
        <BackButton to="/">
          <FiArrowLeft /> {isEnglish ? "Back" : isSpanish ? "Volver" : "Retour"}
        </BackButton>
        
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          BRUNCH HOUSE — MENU
        </Title>
        
        <Subtitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {isEnglish ? "Everything is fresh and homemade" : isSpanish ? "Todo es fresco y casero" : "Tout est frais et fait maison"}
        </Subtitle>
      </MenuHeader>
      
      <MenuContainer>
        {Object.entries(menuData).map(([key, section], sectionIndex) => (
          <MenuSection
            key={key}
            initial={sectionIndex === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            {...(sectionIndex === 0 ? {} : createScrollTrigger())}
            transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
          >
            <SectionTitle>{section.title}</SectionTitle>
            <MenuGrid>
              {section.items.map((item, index) => {
                const dishInfo = dishImages[item.name] || dishImages[item.name.split(',')[0]?.trim()] || null;
                
                return (
                  <MenuItem
                    key={index}
                    initial={sectionIndex === 0 ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    {...(sectionIndex === 0 ? {} : createScrollTrigger())}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    onClick={() => dishInfo ? handleDishClick(item) : null}
                    style={{ cursor: dishInfo ? 'pointer' : 'default' }}
                    onMouseEnter={() => dishInfo && setHoveredDish({ ...item, ...dishInfo })}
                    onMouseLeave={() => setHoveredDish(null)}
                  >
                    <ItemName>
                      {item.name}
                      {item.description && <span>{item.description}</span>}
                    </ItemName>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <ItemPrice>{item.price}</ItemPrice>
                      {dishInfo && (
                        <ImageIndicator>
                          <img 
                            src={dishInfo.image} 
                            alt={item.name}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </ImageIndicator>
                      )}
                    </div>
                    
                    <AnimatePresence>
                      {hoveredDish && hoveredDish.name === item.name && dishInfo && (
                        <DishPreview
                          initial={{ opacity: 0, scale: 0.8, x: -10 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.8, x: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <PreviewImage 
                            src={dishInfo.image} 
                            alt={item.name}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                          <PreviewTitle>{item.name}</PreviewTitle>
                        </DishPreview>
                      )}
                    </AnimatePresence>
                  </MenuItem>
                );
              })}
            </MenuGrid>
            {section.note && <Note>{section.note}</Note>}
          </MenuSection>
        ))}
        
        <MenuSection
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          {...createScrollTrigger()}
        >
          <SectionTitle>🧺 {isEnglish ? "Formulas" : isSpanish ? "Fórmulas" : "Formules"}</SectionTitle>
          <Note style={{ marginBottom: '24px' }}>
            {isEnglish 
              ? "All our dishes include your choice of: orange juice or apple juice"
              : isSpanish 
              ? "Todos nuestros platos incluyen a elegir: zumo de naranja o zumo de manzana"
              : "Toutes nos formules incluent au choix : jus d'orange ou jus de pomme"}
          </Note>
          <Note style={{ marginBottom: '24px' }}>
            {isEnglish 
              ? "For all formulas: Extra €2: latte / cappuccino | Extra €3: mocha / matcha"
              : isSpanish 
              ? "Para todas las fórmulas: Suplemento 2€: latte / cappuccino | Suplemento 3€: moca / matcha"
              : "Pour toutes les formules : Supplément 2€ : latte / cappuccino | Supplément 3€ : moka / matcha"}
          </Note>
          
          {formulas.map((formula, index) => (
            <FormulaCard
              key={formula.id}
              $selected={expandedFormulas[formula.id]}
              onClick={() => toggleFormula(formula.id)}
              as={motion.div}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              {...createScrollTrigger()}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <ExpandButton
                animate={{ rotate: expandedFormulas[formula.id] ? 135 : 0 }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
              >
                <FiPlus size={20} />
              </ExpandButton>
              <FormulaHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <FormulaVisual>
                    {formula.emoji}
                  </FormulaVisual>
                  <div style={{ flex: 1 }}>
                    <FormulaTitle>
                      {formula.name}
                      {formula.id === 'etudiant' && <FormulaBadge>Étudiant</FormulaBadge>}
                    </FormulaTitle>
                    <FormulaDescription>{formula.description}</FormulaDescription>
                  </div>
                </div>
                <FormulaPrice>{formula.price}</FormulaPrice>
              </FormulaHeader>
              
              <AnimatePresence>
                {expandedFormulas[formula.id] && (
                  <FormulaContent
                    as={motion.div}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {formula.sections.map((section, sIndex) => (
                      <FormulaSection key={sIndex}>
                        <FormulaSectionTitle>{section.title}</FormulaSectionTitle>
                        {section.fixed ? (
                          <FormulaOptions>
                            {section.fixed.map((item, iIndex) => (
                              <motion.div 
                                key={iIndex} 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: iIndex * 0.1 }}
                                style={{ 
                                  padding: '12px 16px', 
                                  background: 'linear-gradient(135deg, rgba(59, 170, 109, 0.1) 0%, rgba(59, 170, 109, 0.05) 100%)',
                                  borderRadius: '12px',
                                  fontSize: '14px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  border: '1px solid rgba(59, 170, 109, 0.2)'
                                }}
                              >
                                <FiCheck style={{ color: '#3BAA6D', flexShrink: 0 }} />
                                <span>{item}</span>
                              </motion.div>
                            ))}
                          </FormulaOptions>
                        ) : (
                          <FormulaOptions>
                            {section.options.map((option, oIndex) => (
                              <FormulaOption
                                key={oIndex}
                                $selected={selectedOptions[formula.id]?.[section.type] === option}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleOption(formula.id, section.type, option);
                                }}
                                as={motion.div}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <RadioButton 
                                  $checked={selectedOptions[formula.id]?.[section.type] === option}
                                  animate={selectedOptions[formula.id]?.[section.type] === option ? {
                                    scale: [1, 1.2, 1],
                                  } : {}}
                                  transition={{ duration: 0.3 }}
                                />
                                <span style={{ 
                                  flex: 1, 
                                  fontWeight: selectedOptions[formula.id]?.[section.type] === option ? 600 : 400 
                                }}>
                                  {option}
                                </span>
                              </FormulaOption>
                            ))}
                            {section.note && (
                              <Note style={{ marginTop: '8px', paddingLeft: '28px' }}>
                                {section.note}
                              </Note>
                            )}
                          </FormulaOptions>
                        )}
                      </FormulaSection>
                    ))}
                  </FormulaContent>
                )}
              </AnimatePresence>
            </FormulaCard>
          ))}
          
          <Note style={{ marginTop: '32px', fontSize: '16px' }}>
            {i18n.language === 'en' 
              ? "Extra €3: salad / fries / sweet potato fries"
              : i18n.language === 'es'
              ? "Suplemento 3€: ensalada / patatas fritas / patatas dulces fritas"
              : "Supplément 3€ : salade / frites / frites patates douces"}
          </Note>
        </MenuSection>
      </MenuContainer>
      
      <Footer />
      
      <AnimatePresence>
        {showModal && currentFormula && (
          <ModalOverlay>
            <ModalContent
              initial={{ y: 100, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.95 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                duration: 0.3
              }}
            >
              <ModalHeader>
                <ModalTitle>
                  <span>{currentFormula.emoji}</span>
                  {currentFormula.name}
                </ModalTitle>
                <CloseButton
                  onClick={() => setShowModal(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiX size={16} />
                </CloseButton>
              </ModalHeader>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                
                <ModalSections>
                  {currentFormula.sections.map((section, index) => (
                    <ModalSection key={index}>
                      <ModalSectionTitle>{section.title}</ModalSectionTitle>
                      {section.fixed ? (
                        section.fixed.map((item, i) => (
                          <ModalItem key={i}>
                            <FiCheck size={16} />
                            <span>{item}</span>
                          </ModalItem>
                        ))
                      ) : (
                        currentFormula.selections[section.type] ? (
                          <ModalItem>
                            <FiCheck size={16} style={{ color: '#3BAA6D' }} />
                            <span style={{ fontWeight: 500 }}>
                              {currentFormula.selections[section.type]}
                            </span>
                          </ModalItem>
                        ) : (
                          <ModalItem style={{ opacity: 0.5, fontStyle: 'italic' }}>
                            <span>Aucune sélection</span>
                          </ModalItem>
                        )
                      )}
                      {section.note && (
                        <Note style={{ marginTop: '8px', paddingLeft: '24px', fontSize: '12px' }}>
                          {section.note}
                        </Note>
                      )}
                    </ModalSection>
                  ))}
                </ModalSections>
                
                <ModalPrice>
                  <span>Prix total</span>
                  <span>{currentFormula.price}</span>
                </ModalPrice>
                
                {!isFormulaComplete(currentFormula) && (
                  <div style={{
                    fontSize: '12px',
                    color: '#999',
                    textAlign: 'center',
                    marginTop: '12px',
                    fontStyle: 'italic'
                  }}>
                    Continuez à sélectionner vos options...
                  </div>
                )}
              </motion.div>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* Modal pour les plats avec images */}
      <AnimatePresence>
        {showDishModal && selectedDish && (
          <DishModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDishModal(false)}
          >
            <DishModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <DishCloseButton
                onClick={() => setShowDishModal(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiX size={20} />
              </DishCloseButton>
              
              {selectedDish.image && (
                <DishImage 
                  src={selectedDish.image} 
                  alt={selectedDish.name}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
              
              <DishDetails>
                <DishName>{selectedDish.name}</DishName>
                {selectedDish.description && (
                  <DishDescription>{selectedDish.description}</DishDescription>
                )}
                <DishPrice>{selectedDish.price}</DishPrice>
              </DishDetails>
            </DishModalContent>
          </DishModalOverlay>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default MenuPage;