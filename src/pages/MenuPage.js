import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiCheck, FiPlus, FiX } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { LiquidGlassCard } from '../components/LiquidGlass';
import { createScrollTrigger } from '../hooks/useScrollAnimation';

const bgMove = keyframes`
  0% { background-position: 0% 50%; }
  25% { background-position: 50% 0%; }
  50% { background-position: 100% 50%; }
  75% { background-position: 50% 100%; }
  100% { background-position: 0% 50%; }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    -45deg,
    ${props => props.theme.colors.darkGreen} 0%,
    rgba(1, 57, 39, 0.85) 25%,
    rgba(28, 63, 51, 0.9) 50%,
    rgba(43, 91, 74, 0.85) 75%,
    ${props => props.theme.colors.darkGreen} 100%
  );
  background-size: 400% 400%;
  animation: ${bgMove} 25s ease infinite;
  padding-top: 80px;
`;

const MenuHeader = styled.section`
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.container.padding};
  text-align: center;
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.md};
    padding-top: ${props => props.theme.spacing.xl};
  }

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

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    left: ${props => props.theme.spacing.sm};
    top: ${props => props.theme.spacing.sm};
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
    font-size: 12px;
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

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 28px;
    margin-top: ${props => props.theme.spacing.lg};
    margin-bottom: ${props => props.theme.spacing.sm};
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

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 16px;
    margin-bottom: ${props => props.theme.spacing.lg};
    padding: 0 ${props => props.theme.spacing.sm};
  }
`;

const MenuContainer = styled.div`
  max-width: ${props => props.theme.spacing.container.maxWidth};
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.container.padding};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.md};
  }
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

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 24px;
    margin-bottom: ${props => props.theme.spacing.lg};
    gap: ${props => props.theme.spacing.sm};
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

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 15px;

    span {
      font-size: 13px;
    }
  }
`;

const ItemPrice = styled.div`
  font-size: ${props => props.theme.typography.sizes.body.large};
  font-weight: ${props => props.theme.typography.weights.semibold};
  color: ${props => props.theme.colors.floralWhite};
  min-width: 60px;
  text-align: right;
  text-shadow: 1px 1px 2px rgba(1, 57, 39, 0.4);

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 16px;
    min-width: 50px;
  }
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

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.lg};
    margin-bottom: ${props => props.theme.spacing.lg};
  }
  
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

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.sm};
    align-items: stretch;
  }
`;

const FormulaTitle = styled.h3`
  font-size: 24px;
  color: ${props => props.$selected ? props.theme.colors.teaRose : props.theme.colors.floralWhite};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  font-weight: ${props => props.theme.typography.weights.bold};
  text-shadow: ${props => props.$selected ? 'none' : '1px 1px 2px rgba(1, 57, 39, 0.4)'};
  transition: color ${props => props.theme.transitions.fast};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 20px;
    gap: ${props => props.theme.spacing.sm};
  }
`;


const FormulaPrice = styled.div`
  font-size: 28px;
  font-weight: ${props => props.theme.typography.weights.bold};
  color: ${props => props.$selected ? props.theme.colors.teaRose : props.theme.colors.floralWhite};
  white-space: nowrap;
  margin-top: ${props => props.theme.spacing.md};
  text-shadow: ${props => props.$selected ? 'none' : '1px 1px 2px rgba(1, 57, 39, 0.4)'};
  transition: color ${props => props.theme.transitions.fast};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 24px;
    text-align: center;
    margin-top: 0;
  }
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

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 50px;
    height: 50px;
    font-size: 24px;
    margin-right: ${props => props.theme.spacing.md};
  }
`;

const FormulaDescription = styled.p`
  font-size: ${props => props.theme.typography.sizes.small};
  color: ${props => props.$selected ? props.theme.colors.teaRose : props.theme.colors.floralWhite};
  font-style: italic;
  margin-top: ${props => props.theme.spacing.sm};
  padding-left: ${props => props.theme.spacing.sm};
  opacity: 0.8;
  text-shadow: ${props => props.$selected ? 'none' : '1px 1px 2px rgba(1, 57, 39, 0.3)'};
  transition: color ${props => props.theme.transitions.fast};
`;

const FormulaSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const FormulaSectionTitle = styled.h4`
  font-size: 14px;
  font-weight: ${props => props.theme.typography.weights.semibold};
  color: ${props => props.theme.colors.darkGreen};
  margin-bottom: ${props => props.theme.spacing.md};
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  text-shadow: none;

  &::before {
    content: '•';
    margin-right: ${props => props.theme.spacing.sm};
    color: ${props => props.theme.colors.darkGreen};
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
  color: ${props => props.theme.colors.darkGreen};

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
    left: 8px;
    right: 8px;
    bottom: 8px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    left: 0;
    right: 0;
    bottom: 0;
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
  max-width: 420px;
  width: 100%;
  max-height: 340px;
  min-height: 200px;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  pointer-events: auto;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    max-width: 100%;
    max-height: 45vh;
    min-height: auto;
    padding: 12px;
    border-radius: 16px 16px 12px 12px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    max-width: 100%;
    max-height: 40vh;
    padding: 10px;
    border-radius: 14px 14px 0 0;
    box-sizing: border-box;
  }
`;


const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-bottom: ${props => props.theme.spacing.xs};
  }
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
    gap: ${props => props.theme.spacing.xs};
    margin-bottom: ${props => props.theme.spacing.xs};
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
  margin-top: ${props => props.theme.spacing.md};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    margin-top: ${props => props.theme.spacing.sm};
  }
  
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

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    max-width: calc(100vw - 20px);
    max-height: 90vh;
    border-radius: ${props => props.theme.borderRadius.large};
  }
`;

const DishImage = styled.img`
  width: 100%;
  height: 480px;
  object-fit: cover;
  object-position: ${props => props.$isVeggieBurger ? 'center 70%' : props.$isBuche ? 'center 80%' : 'center center'};
  border-radius: ${props => props.theme.borderRadius.xlarge} ${props => props.theme.borderRadius.xlarge} 0 0;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: 400px;
    border-radius: ${props => props.theme.borderRadius.large} ${props => props.theme.borderRadius.large} 0 0;
  }
`;

const DishDetails = styled.div`
  padding: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.lg};
  }
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
      image: "/images/new/toastcaviardaubergines.jpg",
      description: isEnglish 
        ? "Delicious eggplant caviar with sliced chicken and parmesan"
        : isSpanish
        ? "Delicioso caviar de berenjena con pollo laminado y parmesano"
        : "Délicieux caviar d'aubergine avec émincé de poulet et parmesan"
    },
    "Eggplant caviar, sliced chicken, parmesan": {
      image: "/images/new/toastcaviardaubergines.jpg",
      description: "Delicious eggplant caviar with sliced chicken and parmesan"
    },
    "Caviar de berenjena, pollo laminado, parmesano": {
      image: "/images/new/toastcaviardaubergines.jpg",
      description: "Delicioso caviar de berenjena con pollo laminado y parmesano"
    },
    
    // Burger House
    "Burger House": {
      image: "/images/new/burguerpoulet.jpg",
      description: isEnglish
        ? "Our signature house burger with special sauce"
        : isSpanish
        ? "Nuestra hamburguesa de la casa con salsa especial"
        : "Notre burger maison avec sauce spéciale"
    },
    "Le Burger House": {
      image: "/images/new/burguerpoulet.jpg",
      description: isEnglish
        ? "Our signature house burger with special sauce"
        : isSpanish
        ? "Nuestra hamburguesa de la casa con salsa especial"
        : "Notre burger maison avec sauce spéciale"
    },

    // Le Special One
    "Le Special One": {
      image: "/images/new/burguerviande.jpg",
      description: isEnglish
        ? "Brioche bun, guacamole, steak, cheddar, arugula, tomatoes, BBQ sauce"
        : isSpanish
        ? "Pan brioche, guacamole, filete, cheddar, rúcula, tomates, salsa barbacoa"
        : "Pain brioche, guacamole, steak, cheddar, roquette, tomates, sauce barbecue"
    },

    // Burger végé aubergine
    "Burger végé aubergine": {
      image: "/images/menu/burgerVege.JPG",
      description: isEnglish
        ? "Veggie eggplant burger"
        : isSpanish
        ? "Hamburguesa vegetariana de berenjena"
        : "Burger végétarien à l'aubergine"
    },
    "Veggie eggplant burger": {
      image: "/images/menu/burgerVege.JPG",
      description: "Veggie eggplant burger"
    },
    "Hamburguesa vegetariana de berenjena": {
      image: "/images/menu/burgerVege.JPG",
      description: "Hamburguesa vegetariana de berenjena"
    },

    // Cordon Bleu House
    "Cordon Bleu House": {
      image: "/images/new/cordonbleu.jpg",
      description: isEnglish
        ? "Marinated chicken cutlet, turkey ham, cheese"
        : isSpanish
        ? "Escalope de pollo marinado, jamón de pavo, queso"
        : "Escalope de poulet mariné, jambon de dinde, fromage"
    },

    // Saumon guacamole
    "Saumon, guacamole, fleur de sel": {
      image: "/images/new/toastsaumon.jpg",
      description: isEnglish
        ? "Fresh salmon with guacamole and fleur de sel"
        : isSpanish
        ? "Salmón fresco con guacamole y flor de sal"
        : "Saumon frais avec guacamole et fleur de sel"
    },
    "Salmon, guacamole, fleur de sel": {
      image: "/images/new/toastsaumon.jpg",
      description: "Fresh salmon with guacamole and fleur de sel"
    },
    "Salmón, guacamole, flor de sal": {
      image: "/images/new/toastsaumon.jpg",
      description: "Salmón fresco con guacamole y flor de sal"
    },
    
    // Œuf brouillé bacon
    "Œuf brouillé, bacon, tomates cerises": {
      image: "/images/new/toastoeufbrouille.jpg",
      description: isEnglish
        ? "Scrambled eggs with crispy bacon and cherry tomatoes"
        : isSpanish
        ? "Huevos revueltos con bacon crujiente y tomates cherry"
        : "Œufs brouillés avec bacon croustillant et tomates cerises"
    },
    "Scrambled eggs, bacon, cherry tomatoes": {
      image: "/images/new/toastoeufbrouille.jpg",
      description: "Scrambled eggs with crispy bacon and cherry tomatoes"
    },
    "Huevos revueltos, bacon, tomates cherry": {
      image: "/images/new/toastoeufbrouille.jpg",
      description: "Huevos revueltos con bacon crujiente y tomates cherry"
    },
    
    // Pancake
    "Pancake": {
      image: "/images/new/panecakechocolat.jpg",
      description: isEnglish
        ? "Fluffy pancakes with maple syrup and fresh fruits"
        : isSpanish
        ? "Pancakes esponjosos con sirope de arce y frutas frescas"
        : "Pancakes moelleux avec napage et fruits frais"
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

    // Burrata
    "Burrata, tomates cœur de bœuf, pesto": {
      image: "/images/new/toastburrata.jpg",
      description: isEnglish
        ? "Burrata with beef heart tomatoes and pesto"
        : isSpanish
        ? "Burrata con tomates corazón de buey y pesto"
        : "Burrata avec tomates cœur de bœuf et pesto"
    },
    "Burrata, beef heart tomatoes, pesto": {
      image: "/images/new/toastburrata.jpg",
      description: "Burrata with beef heart tomatoes and pesto"
    },
    "Burrata, tomates corazón de buey, pesto": {
      image: "/images/new/toastburrata.jpg",
      description: "Burrata con tomates corazón de buey y pesto"
    },

    // Crevettes tomates cerises fromage frais
    "Crevettes, tomates cerises, fromage frais": {
      image: "/images/new/toastcrevette.jpg",
      description: isEnglish
        ? "Shrimp with cherry tomatoes and cream cheese"
        : isSpanish
        ? "Gambas con tomates cherry y queso fresco"
        : "Crevettes avec tomates cerises et fromage frais"
    },
    "Shrimp, cherry tomatoes, cream cheese": {
      image: "/images/new/toastcrevette.jpg",
      description: "Shrimp with cherry tomatoes and cream cheese"
    },
    "Gambas, tomates cherry, queso fresco": {
      image: "/images/new/toastcrevette.jpg",
      description: "Gambas con tomates cherry y queso fresco"
    },

    // Houmous betterave
    "Houmous à la betterave, avocat, noix": {
      image: "/images/new/toasthoumous.jpg",
      description: isEnglish
        ? "Beetroot hummus with fresh avocado and walnuts"
        : isSpanish
        ? "Hummus de remolacha con aguacate fresco y nueces"
        : "Houmous de betterave avec avocat frais et noix"
    },
    "Beetroot hummus, avocado, walnuts": {
      image: "/images/new/toasthoumous.jpg",
      description: "Beetroot hummus with fresh avocado and walnuts"
    },
    "Hummus de remolacha, aguacate, nueces": {
      image: "/images/new/toasthoumous.jpg",
      description: "Hummus de remolacha con aguacate fresco y nueces"
    },
    
    // Jus maison
    "Jus d'orange maison": {
      image: "/images/new/jusdorange.jpg",
      description: isEnglish
        ? "Freshly squeezed orange juice"
        : isSpanish
        ? "Zumo de naranja recién exprimido"
        : "Jus d'orange fraîchement pressé"
    },
    "Bissap maison": {
      image: "/images/new/jusbissap.jpg",
      description: isEnglish
        ? "Homemade hibiscus drink"
        : isSpanish
        ? "Bebida de hibisco casera"
        : "Bissap fait maison"
    },
    "Jus de gingembre maison": {
      image: "/images/new/jusdegingembre.jpg",
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
      image: "/images/new/jusdorange.jpg",
      description: "Freshly squeezed orange juice"
    },
    "Homemade bissap": {
      image: "/images/new/jusbissap.jpg",
      description: "Homemade hibiscus drink"
    },
    "Homemade ginger juice": {
      image: "/images/new/jusdegingembre.jpg",
      description: "Homemade ginger juice"
    },
    "Seasonal juice": {
      image: "/images/menu/juice.jpeg",
      description: "Seasonal fresh juice"
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

    // Croissant œufs brouillés bacon
    "Croissant œufs brouillés bacon": {
      image: "/images/menu/croissant1.png",
      description: isEnglish
        ? "Scrambled eggs, bacon, cheddar, salad, tomatoes, onions"
        : isSpanish
        ? "Huevos revueltos, bacon, cheddar, ensalada, tomates, cebollas"
        : "Œufs brouillés, bacon, cheddar, salade, tomates, oignons"
    },
    "Croissant scrambled eggs bacon": {
      image: "/images/menu/croissant1.png",
      description: "Scrambled eggs, bacon, cheddar, salad, tomatoes, onions"
    },
    "Croissant huevos revueltos bacon": {
      image: "/images/menu/croissant1.png",
      description: "Huevos revueltos, bacon, cheddar, ensalada, tomates, cebollas"
    },

    // Croissant saumon guacamole
    "Croissant saumon guacamole": {
      image: "/images/menu/croissant2.png",
      description: isEnglish
        ? "Salmon, guacamole, scrambled eggs, salad, tomatoes, red onions"
        : isSpanish
        ? "Salmón, guacamole, huevos revueltos, ensalada, tomates, cebollas rojas"
        : "Saumon, guacamole, œufs brouillés, salade, tomates, oignons rouges"
    },
    "Croissant salmon guacamole": {
      image: "/images/menu/croissant2.png",
      description: "Salmon, guacamole, scrambled eggs, salad, tomatoes, red onions"
    },
    "Croissant salmón guacamole": {
      image: "/images/menu/croissant2.png",
      description: "Salmón, guacamole, huevos revueltos, ensalada, tomates, cebollas rojas"
    },

    // Croissant burger
    "Croissant burger": {
      image: "/images/menu/croissant3.png",
      description: isEnglish
        ? "Beef patty, cheddar, salad, tomatoes, onions, homemade burger sauce"
        : isSpanish
        ? "Steak picado, cheddar, ensalada, tomates, cebollas, salsa burger casera"
        : "Steak haché, cheddar, salade, tomates, oignons, sauce burger maison"
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
    "Le pancake": {
      image: "/images/new/panecakesiropderable.jpeg",
      description: isEnglish
        ? "Fluffy pancake with toppings"
        : isSpanish
        ? "Pancake esponjoso con coberturas"
        : "Pancake moelleux avec napage"
    },
    "The pancake": {
      image: "/images/new/panecakesiropderable.jpeg",
      description: "Fluffy pancake with toppings"
    },
    "El pancake": {
      image: "/images/new/panecakesiropderable.jpeg",
      description: "Pancake esponjoso con coberturas"
    },
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
      image: "/images/new/brioche2.jpeg",
      description: isEnglish
        ? "French toast with caramelized sugar"
        : isSpanish
        ? "Tostada francesa con azúcar caramelizado"
        : "Brioche perdue dorée au sucre caramélisé"
    },
    "French toast": {
      image: "/images/new/brioche2.jpeg",
      description: "French toast with caramelized sugar"
    },
    "Tostada francesa": {
      image: "/images/new/brioche2.jpeg",
      description: "Tostada francesa con azúcar caramelizado"
    },
    // Pancake crème brûlée
    "Pancake crème brûlée": {
      image: "/images/new/panecakecremebrulee.jpg",
      description: isEnglish
        ? "Crème brûlée pancake"
        : isSpanish
        ? "Pancake crème brûlée"
        : "Pancake crème brûlée"
    },
    "Crème brûlée pancake": {
      image: "/images/new/panecakecremebrulee.jpg",
      description: "Crème brûlée pancake"
    },

    // Brioche perdue tiramisu
    "Brioche perdue tiramisu": {
      image: "/images/new/brochetiramisu.jpg",
      description: isEnglish
        ? "Tiramisu French toast"
        : isSpanish
        ? "Tostada francesa tiramisú"
        : "Brioche perdue tiramisu"
    },
    "Tiramisu French toast": {
      image: "/images/new/brochetiramisu.jpg",
      description: "Tiramisu French toast"
    },

    // Brioche perdue salée œuf brouillé bacon
    "Brioche perdue salée œuf brouillé bacon": {
      image: "/images/new/briochesaleeoeufbrouillebacon.jpg",
      description: isEnglish
        ? "Savory French toast with scrambled eggs and bacon"
        : isSpanish
        ? "Tostada francesa salada con huevos revueltos y bacon"
        : "Brioche perdue salée avec œuf brouillé et bacon"
    },
    "Savory French toast scrambled eggs bacon": {
      image: "/images/new/briochesaleeoeufbrouillebacon.jpg",
      description: "Savory French toast with scrambled eggs and bacon"
    },

    // Brioche perdue salée burrata pesto
    "Brioche perdue salée burrata pesto": {
      image: "/images/new/briochesaleeburratapesto.jpg",
      description: isEnglish
        ? "Savory French toast with burrata and pesto"
        : isSpanish
        ? "Tostada francesa salada con burrata y pesto"
        : "Brioche perdue salée avec burrata et pesto"
    },
    "Savory French toast burrata pesto": {
      image: "/images/new/briochesaleeburratapesto.jpg",
      description: "Savory French toast with burrata and pesto"
    },

    // Ube Latté
    "Ube Latté": {
      image: "/images/new/ubelatte.jpg",
      description: isEnglish
        ? "Purple yam ube latte"
        : isSpanish
        ? "Ube latte de boniato morado"
        : "Ube latté"
    },

    // Brioche crème brûlée
    "Brioche crème brûlée": {
      image: "/images/new/briochecremebrulee.jpg",
      description: isEnglish
        ? "Crème brûlée French toast"
        : isSpanish
        ? "Tostada francesa crème brûlée"
        : "Brioche perdue crème brûlée"
    },

    // Brioche Tatin
    "Brioche Tatin": {
      image: "/images/new/briochetatin.JPG",
      description: isEnglish
        ? "Apple, caramel, cinnamon, whipped cream, speculoos"
        : isSpanish
        ? "Manzana, caramelo, canela, nata montada, speculoos"
        : "Pomme, caramel, cannelle, chantilly, spéculoos"
    },
    "Brioche crème brûlée EN": {
      image: "/images/new/briochechocolat.jpg",
      description: "Crème brûlée French toast"
    },
    "Brioche crème brûlée ES": {
      image: "/images/new/briochechocolat.jpg",
      description: "Tostada francesa crème brûlée"
    },

    // Boissons chaudes spéciales
    "Matcha": {
      image: "/images/new/matcha.jpg",
      description: isEnglish
        ? "Japanese matcha tea - Choice of coulis: vanilla / caramel / mango / passion"
        : isSpanish
        ? "Té matcha japonés - Coulis a elegir: caramelo / vainilla / mango / maracuyá"
        : "Coulis au choix : caramel / vanille / mangue / passion"
    },
    "Moka": {
      image: "/images/menu/moka.JPG",
      description: isEnglish
        ? "Rich mocha coffee with chocolate"
        : isSpanish
        ? "Café moca con chocolate"
        : "Coulis au choix : chocolat / caramel"
    },
    "Mocha": {
      image: "/images/menu/moka.JPG",
      description: "Rich mocha coffee with chocolate"
    },
    "Moca": {
      image: "/images/menu/moka.JPG",
      description: "Café moca rico con chocolate"
    },
    "Chocolat": {
      image: "/images/menu/chocolat.JPG",
      description: isEnglish
        ? "Rich hot chocolate - Whipped cream +0.50€"
        : isSpanish
        ? "Chocolate caliente cremoso - Nata montada +0,50€"
        : "Chocolat chaud onctueux - Chantilly +0,50€"
    },
    "Viennese chocolate": {
      image: "/images/menu/chocolat.JPG",
      description: "Rich hot chocolate - Whipped cream +0.50€"
    },
    "Chocolate vienés": {
      image: "/images/menu/chocolat.JPG",
      description: "Chocolate caliente cremoso - Nata montada +0,50€"
    },
    "Thé": {
      image: "/images/menu/tea.JPG",
      description: isEnglish
        ? "Selection of fine teas"
        : isSpanish
        ? "Selección de tés finos"
        : "Sélection de thés fins"
    },
    "Tea": {
      image: "/images/menu/tea.JPG",
      description: "Selection of fine teas"
    },
    "Té": {
      image: "/images/menu/tea.JPG",
      description: "Selección de tés finos"
    },
    
    // Cafés
    "Café latte": {
      image: "/images/new/latte.jpg",
      description: isEnglish
        ? "Smooth latte with steamed milk"
        : isSpanish
        ? "Café latte suave con leche vaporizada"
        : "Café latte onctueux avec lait moussé"
    },
    "Café Latté": {
      image: "/images/new/latte.jpg",
      description: isEnglish
        ? "Smooth latte with steamed milk"
        : isSpanish
        ? "Café latte suave con leche vaporizada"
        : "Café latte onctueux avec lait moussé"
    },
    "Café Latte": {
      image: "/images/new/latte.jpg",
      description: isEnglish
        ? "Smooth latte with steamed milk"
        : isSpanish
        ? "Café latte suave con leche vaporizada"
        : "Café latte onctueux avec lait moussé"
    },
    "Café con leche": {
      image: "/images/new/latte.jpg",
      description: isEnglish
        ? "Smooth latte with steamed milk"
        : isSpanish
        ? "Café latte suave con leche vaporizada"
        : "Café latte onctueux avec lait moussé"
    },
    "Latte": {
      image: "/images/new/latte.jpg",
      description: "Smooth latte with steamed milk"
    },
    "Cappuccino": {
      image: "/images/new/cappuccino.jpg",
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
        ? "Cappuccino with a dash of milk"
        : isSpanish
        ? "Cappuccino con un toque de leche"
        : "Cappuccino avec une pointe de lait"
    },
    "Hazelnut coffee": {
      image: "/images/menu/cafenoisette.jpg",
      description: "Cappuccino with a dash of milk"
    },
    "Café cortado": {
      image: "/images/menu/cafenoisette.jpg",
      description: "Cappuccino con un toque de leche"
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
      image: "/images/menu/canettes.png",
      description: isEnglish
        ? "Selection of canned soft drinks"
        : isSpanish
        ? "Selección de refrescos en lata"
        : "Sélection de canettes de sodas"
    },

    "Can": {
      image: "/images/menu/canettes.png",
      description: "Selection of canned soft drinks"
    },
    "Lata": {
      image: "/images/menu/canettes.png",
      description: "Selección de refrescos en lata"
    },
    "Canette au choix": {
      image: "/images/menu/canettes.png",
      description: isEnglish
        ? "Choice of canned soft drink"
        : isSpanish
        ? "Lata de refresco a elegir"
        : "Canette au choix"
    },
    "1 canette au choix": {
      image: "/images/menu/canettes.png",
      description: isEnglish
        ? "Choice of canned soft drink"
        : isSpanish
        ? "Lata de refresco a elegir"
        : "Canette au choix"
    },

    // Burger (formule options)
    "Burger (viande ou poulet)": {
      images: [
        { src: "/images/new/burguerviande.jpg", label: isEnglish ? "Beef" : isSpanish ? "Carne" : "Viande" },
        { src: "/images/new/burguerpoulet.jpg", label: isEnglish ? "Chicken" : isSpanish ? "Pollo" : "Poulet" }
      ],
      description: isEnglish ? "Beef or chicken burger" : isSpanish ? "Hamburguesa de carne o pollo" : "Burger viande ou poulet"
    },
    "Burger (beef or chicken)": {
      images: [
        { src: "/images/new/burguerviande.jpg", label: "Beef" },
        { src: "/images/new/burguerpoulet.jpg", label: "Chicken" }
      ],
      description: "Beef or chicken burger"
    },
    "Burger (carne o pollo)": {
      images: [
        { src: "/images/new/burguerviande.jpg", label: "Carne" },
        { src: "/images/new/burguerpoulet.jpg", label: "Pollo" }
      ],
      description: "Hamburguesa de carne o pollo"
    },

    // Cordon bleu
    "Cordon bleu": {
      image: "/images/new/cordonbleu.jpg",
      description: isEnglish
        ? "Marinated chicken cutlet, turkey ham, cheese"
        : isSpanish
        ? "Escalope de pollo marinado, jamón de pavo, queso"
        : "Escalope de poulet mariné, jambon de dinde, fromage"
    },

    // Croissant saumon (sans guacamole)
    "Croissant saumon": {
      image: "/images/menu/croissant2.png",
      description: isEnglish
        ? "Salmon croissant"
        : isSpanish
        ? "Croissant de salmón"
        : "Croissant au saumon"
    },
    "Croissant salmon": {
      image: "/images/menu/croissant2.png",
      description: "Salmon croissant"
    },
    "Croissant salmón": {
      image: "/images/menu/croissant2.png",
      description: "Croissant de salmón"
    },

    // Croissant œuf brouillé bacon (variante sans s)
    "Croissant œuf brouillé bacon": {
      image: "/images/menu/croissant1.png",
      description: isEnglish
        ? "Scrambled eggs, bacon, cheddar, salad, tomatoes, onions"
        : isSpanish
        ? "Huevos revueltos, bacon, cheddar, ensalada, tomates, cebollas"
        : "Œuf brouillé, bacon, cheddar, salade, tomates, oignons"
    },

    // Chocolat chaud
    "Chocolat chaud": {
      image: "/images/menu/chocolat.JPG",
      description: isEnglish
        ? "Rich hot chocolate"
        : isSpanish
        ? "Chocolate caliente cremoso"
        : "Chocolat chaud onctueux"
    },
    "Hot chocolate": {
      image: "/images/menu/chocolat.JPG",
      description: "Rich hot chocolate"
    },
    "Chocolate caliente": {
      image: "/images/menu/chocolat.JPG",
      description: "Chocolate caliente cremoso"
    },

    // Latté
    "Latté": {
      image: "/images/new/latte.jpg",
      description: isEnglish
        ? "Smooth latte with steamed milk"
        : isSpanish
        ? "Café latte suave con leche vaporizada"
        : "Café latte onctueux avec lait moussé"
    },

    // Chai Latté
    "Chai Latté": {
      image: "/images/menu/tea.JPG",
      description: isEnglish
        ? "Spiced chai latte"
        : isSpanish
        ? "Chai latte especiado"
        : "Chai latté épicé"
    },

    // Jus de pomme
    "Jus de pomme": {
      image: "/images/menu/juice.jpeg",
      description: "Jus de pomme"
    },
    "Apple juice": {
      image: "/images/menu/juice.jpeg",
      description: "Apple juice"
    },
    "Zumo de manzana": {
      image: "/images/menu/juice.jpeg",
      description: "Zumo de manzana"
    },

    // Jus d'orange
    "Jus d'orange": {
      image: "/images/new/jusdorange.jpg",
      description: "Jus d'orange"
    },
    "Orange juice": {
      image: "/images/new/jusdorange.jpg",
      description: "Orange juice"
    },
    "Zumo de naranja": {
      image: "/images/new/jusdorange.jpg",
      description: "Zumo de naranja"
    },




    // Jus de gingembre
    "Jus de gingembre": {
      image: "/images/new/jusdegingembre.jpg",
      description: "Jus de gingembre"
    },
    "Ginger juice": {
      image: "/images/new/jusdegingembre.jpg",
      description: "Ginger juice"
    },
    "Zumo de jengibre": {
      image: "/images/new/jusdegingembre.jpg",
      description: "Zumo de jengibre"
    },

    // Bissap
    "Bissap": {
      image: "/images/new/jusbissap.jpg",
      description: "Bissap"
    },

    // Jus de pastèque
    "Jus de pastèque": {
      image: "/images/new/pastequejus.jpg",
      description: "Jus de pastèque"
    },
    "Watermelon juice": {
      image: "/images/new/pastequejus.jpg",
      description: "Watermelon juice"
    },
    "Zumo de sandía": {
      image: "/images/new/pastequejus.jpg",
      description: "Zumo de sandía"
    },

    // Milkshakes & Smoothies
    "Milkshake Spéculoos": {
      image: "/images/new/milkshakespeculos.jpg",
      description: isEnglish ? "Speculoos milkshake" : isSpanish ? "Milkshake de speculoos" : "Milkshake spéculoos"
    },
    "Speculoos milkshake": {
      image: "/images/new/milkshakespeculos.jpg",
      description: "Speculoos milkshake"
    },
    "Milkshake de speculoos": {
      image: "/images/new/milkshakespeculos.jpg",
      description: "Milkshake de speculoos"
    },
    "Milkshake Kinder": {
      image: "/images/new/milkshakekinder.jpg",
      description: isEnglish ? "Kinder milkshake" : isSpanish ? "Milkshake de Kinder" : "Milkshake Kinder"
    },
    "Kinder milkshake": {
      image: "/images/new/milkshakekinder.jpg",
      description: "Kinder milkshake"
    },
    "Milkshake de Kinder": {
      image: "/images/new/milkshakekinder.jpg",
      description: "Milkshake de Kinder"
    },
    "Smoothie Mangue": {
      image: "/images/new/smootiemangue.jpg",
      description: isEnglish ? "Mango smoothie" : isSpanish ? "Smoothie de mango" : "Smoothie mangue"
    },
    "Mango smoothie": {
      image: "/images/new/smootiemangue.jpg",
      description: "Mango smoothie"
    },
    "Smoothie de mango": {
      image: "/images/new/smootiemangue.jpg",
      description: "Smoothie de mango"
    },
    "Smoothie Ananas Coco": {
      image: "/images/new/smootieananascoco.jpg",
      description: isEnglish ? "Pineapple coconut smoothie" : isSpanish ? "Smoothie de piña y coco" : "Smoothie ananas coco"
    },
    "Pineapple coconut smoothie": {
      image: "/images/new/smootieananascoco.jpg",
      description: "Pineapple coconut smoothie"
    },
    "Smoothie de piña y coco": {
      image: "/images/new/smootieananascoco.jpg",
      description: "Smoothie de piña y coco"
    },
    "Smoothie Orange Fraise Banane": {
      image: "/images/new/smootieorangefraisebanane.jpg",
      description: isEnglish ? "Orange strawberry banana smoothie" : isSpanish ? "Smoothie de naranja, fresa y plátano" : "Smoothie orange fraise banane"
    },
    "Orange strawberry banana smoothie": {
      image: "/images/new/smootieorangefraisebanane.jpg",
      description: "Orange strawberry banana smoothie"
    },
    "Smoothie de naranja, fresa y plátano": {
      image: "/images/new/smootieorangefraisebanane.jpg",
      description: "Smoothie de naranja, fresa y plátano"
    },
    "Frappuccino": {
      image: "/images/new/frappucino.jpeg",
      description: isEnglish ? "Chocolate caramel drizzle" : isSpanish ? "Cobertura de chocolate y caramelo" : "Nappage chocolat caramel"
    },
    "Matcha frappé": {
      image: "/images/new/matcha.jpg",
      description: isEnglish ? "Iced matcha" : isSpanish ? "Matcha frappé" : "Matcha frappé"
    },
    "Iced matcha": {
      image: "/images/new/matcha.jpg",
      description: "Iced matcha"
    },
    "Ube frappé": {
      image: "/images/new/ubelatte.jpg",
      description: isEnglish ? "Iced ube" : isSpanish ? "Ube frappé" : "Ube frappé"
    },
    "Iced ube": {
      image: "/images/new/ubelatte.jpg",
      description: "Iced ube"
    },
    "Latté glacé": {
      image: "/images/new/latte.jpg",
      description: isEnglish ? "Iced latte" : isSpanish ? "Latté helado" : "Latté glacé"
    },
    "Iced latte": {
      image: "/images/new/latte.jpg",
      description: "Iced latte"
    },
    "Latté helado": {
      image: "/images/new/latte.jpg",
      description: "Latté helado"
    },

    // Toast chèvre miel
    "Chèvre, miel": {
      image: "/images/new/toastchevremiel.jpg",
      description: isEnglish ? "Goat cheese and honey toast" : isSpanish ? "Tostada de queso de cabra y miel" : "Toast chèvre miel"
    },
    "Goat cheese, honey": {
      image: "/images/new/toastchevremiel.jpg",
      description: "Goat cheese and honey toast"
    },
    "Queso de cabra, miel": {
      image: "/images/new/toastchevremiel.jpg",
      description: "Tostada de queso de cabra y miel"
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

  // Helper function to get comparable value from option (string or object.name)
  const getOptionValue = (option) => {
    return typeof option === 'string' ? option : option.name;
  };

  const isOptionSelected = (formulaId, optionType, option) => {
    const currentSelections = selectedOptions[formulaId]?.[optionType];
    const optionValue = getOptionValue(option);

    if (optionType === 'toasts') {
      return Array.isArray(currentSelections) && currentSelections.includes(optionValue);
    }
    return currentSelections === optionValue;
  };

  const toggleOption = (formulaId, optionType, option) => {
    const optionValue = getOptionValue(option);
    setSelectedOptions(prev => {
      const currentSelections = prev[formulaId]?.[optionType];
      let newSelection;

      // Pour les toasts, permettre la sélection de 2 maximum
      if (optionType === 'toasts') {
        const currentArray = Array.isArray(currentSelections) ? currentSelections : [];
        if (currentArray.includes(optionValue)) {
          // Désélectionner si déjà sélectionné
          newSelection = currentArray.filter(item => item !== optionValue);
        } else if (currentArray.length < 2) {
          // Ajouter si moins de 2 sélectionnés
          newSelection = [...currentArray, optionValue];
        } else {
          // Remplacer le premier par le nouveau si déjà 2 sélectionnés
          newSelection = [currentArray[1], optionValue];
        }
      } else {
        // Comportement normal pour les autres types
        newSelection = currentSelections === optionValue ? null : optionValue;
      }

      const newOptions = {
        ...prev,
        [formulaId]: {
          ...prev[formulaId],
          [optionType]: newSelection
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
        {
          name: isEnglish ? "The pancake" : isSpanish ? "El pancake" : "Le pancake",
          description: isEnglish
            ? "topping: salted butter caramel / chocolate hazelnut / maple syrup / red berries"
            : isSpanish
            ? "cobertura: caramelo de mantequilla salada / chocolate avellana / jarabe de arce / frutos rojos"
            : "nappage : caramel beurre salé / chocolat noisette / sirop d'érable / fruit rouge",
          price: "8 €"
        },
        {
          name: isEnglish ? "French toast" : isSpanish ? "Tostada francesa" : "Brioche perdue",
          description: isEnglish
            ? "topping: salted butter caramel / chocolate hazelnut / maple syrup / red berries"
            : isSpanish
            ? "cobertura: caramelo de mantequilla salada / chocolate avellana / jarabe de arce / frutos rojos"
            : "nappage : caramel beurre salé / chocolat noisette / sirop d'érable / fruit rouge",
          price: "8 €"
        },
        { name: "Brioche crème brûlée", price: "10 €" },
        {
          name: "Brioche Tatin",
          description: isEnglish
            ? "Apple, caramel, cinnamon, whipped cream, speculoos"
            : isSpanish
            ? "Manzana, caramelo, canela, nata montada, speculoos"
            : "Pomme, caramel, cannelle, chantilly, spéculoos",
          price: "10 €"
        },
        {
          name: isEnglish ? "Crème brûlée pancake" : isSpanish ? "Pancake crème brûlée" : "Pancake crème brûlée",
          price: "10 €"
        },
        {
          name: isEnglish ? "Tiramisu French toast" : isSpanish ? "Tostada francesa tiramisú" : "Brioche perdue tiramisu",
          price: "10 €"
        },
        {
          name: isEnglish ? "Savory French toast scrambled eggs bacon" : isSpanish ? "Tostada francesa salada huevos revueltos bacon" : "Brioche perdue salée œuf brouillé bacon",
          price: "14 €"
        },
        {
          name: isEnglish ? "Savory French toast burrata pesto" : isSpanish ? "Tostada francesa salada burrata pesto" : "Brioche perdue salée burrata pesto",
          price: "14 €"
        }
      ]
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
            ? "Beetroot hummus, avocado, walnuts"
            : isSpanish
            ? "Hummus de remolacha, aguacate, nueces"
            : "Houmous à la betterave, avocat, noix",
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
            ? "Salmon, guacamole, fleur de sel"
            : isSpanish
            ? "Salmón, guacamole, flor de sal"
            : "Saumon, guacamole, fleur de sel",
          price: "14 €"
        },
        {
          name: isEnglish
            ? "Burrata, beef heart tomatoes, pesto"
            : isSpanish
            ? "Burrata, tomates corazón de buey, pesto"
            : "Burrata, tomates cœur de bœuf, pesto",
          price: "15 €"
        },
        {
          name: isEnglish
            ? "Shrimp, cherry tomatoes, cream cheese"
            : isSpanish
            ? "Gambas, tomates cherry, queso fresco"
            : "Crevettes, tomates cerises, fromage frais",
          price: "14 €"
        },
        {
          name: isEnglish
            ? "Goat cheese, honey"
            : isSpanish
            ? "Queso de cabra, miel"
            : "Chèvre, miel",
          price: "14 €"
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
          name: "Cordon Bleu House",
          description: isEnglish
            ? "Marinated chicken cutlet, turkey ham, cheese"
            : isSpanish
            ? "Escalope de pollo marinado, jamón de pavo, queso"
            : "Escalope de poulet mariné, jambon de dinde, fromage",
          price: "15 €"
        },
        {
          name: isEnglish
            ? "Croissant scrambled eggs bacon"
            : isSpanish
            ? "Croissant huevos revueltos bacon"
            : "Croissant œufs brouillés bacon",
          description: isEnglish
            ? "Scrambled eggs, bacon, cheddar, salad, tomatoes, onions"
            : isSpanish
            ? "Huevos revueltos, bacon, cheddar, ensalada, tomates, cebollas"
            : "Œufs brouillés, bacon, cheddar, salade, tomates, oignons",
          price: "14 €"
        },
        {
          name: isEnglish
            ? "Croissant salmon guacamole"
            : isSpanish
            ? "Croissant salmón guacamole"
            : "Croissant saumon guacamole",
          description: isEnglish
            ? "Salmon, guacamole, scrambled eggs, salad, tomatoes, red onions"
            : isSpanish
            ? "Salmón, guacamole, huevos revueltos, ensalada, tomates, cebollas rojas"
            : "Saumon, guacamole, œufs brouillés, salade, tomates, oignons rouges",
          price: "14 €"
        },
        {
          name: isEnglish
            ? "Croissant burger"
            : isSpanish
            ? "Croissant burger"
            : "Croissant burger",
          description: isEnglish
            ? "Beef patty, cheddar, salad, tomatoes, onions, homemade burger sauce"
            : isSpanish
            ? "Steak picado, cheddar, ensalada, tomates, cebollas, salsa burger casera"
            : "Steak haché, cheddar, salade, tomates, oignons, sauce burger maison",
          price: "14 €"
        },
        {
          name: isEnglish ? "Savory French toast scrambled eggs bacon" : isSpanish ? "Tostada francesa salada huevos revueltos bacon" : "Brioche perdue salée œuf brouillé bacon",
          price: "14 €"
        },
        {
          name: isEnglish ? "Savory French toast burrata pesto" : isSpanish ? "Tostada francesa salada burrata pesto" : "Brioche perdue salée burrata pesto",
          price: "14 €"
        }
      ],
      note: isEnglish
        ? "Dishes are served with fries and salad."
        : isSpanish
        ? "Los platos se sirven con patatas fritas y ensalada."
        : "Les plats sont servis avec frites et salade."
    },
    boissonsC: {
      title: isEnglish ? "☕ Hot drinks" : isSpanish ? "☕ Bebidas calientes" : "☕ Boissons chaudes",
      items: [
        { name: "Expresso", price: "2 €" },
        { name: isEnglish ? "Long coffee" : isSpanish ? "Café largo" : "Allongé", price: "2,50 €" },
        { name: isEnglish ? "Coffee with milk" : isSpanish ? "Café cortado" : "Café noisette", price: "2,50 €" },
        { name: isEnglish ? "Double espresso" : isSpanish ? "Doble espresso" : "Double expresso", price: "2,50 €" },
        { name: "Cappuccino", price: "4 €" },
        { name: isEnglish ? "Café Latte" : isSpanish ? "Café con leche" : "Café Latté", price: "4 €" },
        {
          name: isEnglish ? "Iced latte" : isSpanish ? "Latté helado" : "Latté glacé",
          description: isEnglish
            ? "Choice of syrups: caramel / vanilla / mango — Drizzle: caramel or chocolate"
            : isSpanish
            ? "Siropes a elegir: caramelo / vainilla / mango — Cobertura: caramelo o chocolate"
            : "Sirops au choix : caramel / vanille / mangue — Nappage : caramel ou chocolat",
          price: "5 €"
        },
        {
          name: "Matcha",
          description: isEnglish
            ? "Choice of coulis: vanilla caramel / mango / passion"
            : isSpanish
            ? "Coulis a elegir: caramelo vainilla / mango / maracuyá"
            : "Coulis au choix : caramel vanille / mangue / passion",
          price: "5 €"
        },
        {
          name: isEnglish ? "Hot chocolate" : isSpanish ? "Chocolate caliente" : "Chocolat",
          description: isEnglish
            ? "Optional whipped cream +0.50€"
            : isSpanish
            ? "Nata montada opcional +0,50€"
            : "Chantilly en option +0,50€",
          price: "5 €"
        },
        { name: isEnglish ? "Tea" : isSpanish ? "Té" : "Thé", price: "4 €" },
        { name: isEnglish ? "Mocha" : isSpanish ? "Moca" : "Moka", price: "5 €" },
        { name: "Ube Latté", price: "6 €" },
        { name: "Chai Latté", price: "5 €" }
      ],
      note: isEnglish 
        ? "Extra +€0.50: whipped cream"
        : isSpanish
        ? "Suplemento +0,50€: nata montada"
        : "Supplément +0,50€ : chantilly"
    },
    boissonsF: {
      title: isEnglish ? "🧊 Cold drinks" : isSpanish ? "🧊 Bebidas frías" : "🧊 Boissons froides",
      items: [
        {
          name: isEnglish ? "Can" : isSpanish ? "Lata" : "Canette",
          description: "Sprite, Coca Cola, Coca Cherry, Coca Zero, Oasis, Fuze Tea, Orangina",
          price: "2 €"
        },
        { name: isEnglish ? "Homemade orange juice" : isSpanish ? "Zumo de naranja casero" : "Jus d'orange maison", price: "4 €" },
        { name: isEnglish ? "Pineapple juice" : isSpanish ? "Zumo de piña" : "Jus d'ananas", price: "4 €" },
        { name: isEnglish ? "Homemade hibiscus" : isSpanish ? "Bissap casero" : "Bissap maison", price: "4 €" },
        { name: isEnglish ? "Homemade ginger juice" : isSpanish ? "Zumo de jengibre casero" : "Jus de gingembre maison", price: "5 €" },
        { name: isEnglish ? "Watermelon juice" : isSpanish ? "Zumo de sandía" : "Jus de pastèque", price: "5 €" },
        { name: isEnglish ? "Apple juice" : isSpanish ? "Zumo de manzana" : "Jus de pomme", price: "4 €" },
      ]
    },
    milkshakesSmoothies: {
      title: isEnglish ? "🥤 Milkshakes & Smoothies" : isSpanish ? "🥤 Milkshakes & Smoothies" : "🥤 Milkshakes & Smoothies",
      items: [
        { name: isEnglish ? "Speculoos milkshake" : isSpanish ? "Milkshake de speculoos" : "Milkshake Spéculoos", price: "5,50 €", formulaPrice: "3 €" },
        { name: isEnglish ? "Kinder milkshake" : isSpanish ? "Milkshake de Kinder" : "Milkshake Kinder", price: "5,50 €", formulaPrice: "3 €" },
        { name: isEnglish ? "Mango smoothie" : isSpanish ? "Smoothie de mango" : "Smoothie Mangue", price: "5,50 €", formulaPrice: "3 €" },
        { name: isEnglish ? "Pineapple coconut smoothie" : isSpanish ? "Smoothie de piña y coco" : "Smoothie Ananas Coco", price: "5,50 €", formulaPrice: "3 €" },
        { name: isEnglish ? "Orange strawberry banana smoothie" : isSpanish ? "Smoothie de naranja, fresa y plátano" : "Smoothie Orange Fraise Banane", price: "5,50 €", formulaPrice: "3 €" },
        {
          name: "Frappuccino",
          description: isEnglish ? "chocolate caramel drizzle" : isSpanish ? "cobertura de chocolate y caramelo" : "nappage chocolat caramel",
          price: "5,50 €",
          formulaPrice: "3 €"
        },
        {
          name: isEnglish ? "Iced matcha" : isSpanish ? "Matcha frappé" : "Matcha frappé",
          description: isEnglish
            ? "Choice of syrups: caramel / vanilla / mango — Drizzle: caramel or chocolate"
            : isSpanish
            ? "Siropes a elegir: caramelo / vainilla / mango — Cobertura: caramelo o chocolate"
            : "Sirops au choix : caramel / vanille / mangue — Nappage : caramel ou chocolat",
          price: "5,50 €",
          formulaPrice: "3 €"
        },
        {
          name: isEnglish ? "Iced ube" : isSpanish ? "Ube frappé" : "Ube frappé",
          description: isEnglish
            ? "Choice of syrups: caramel / vanilla / mango — Drizzle: caramel or chocolate"
            : isSpanish
            ? "Siropes a elegir: caramelo / vainilla / mango — Cobertura: caramelo o chocolate"
            : "Sirops au choix : caramel / vanille / mangue — Nappage : caramel ou chocolat",
          price: "5,50 €",
          formulaPrice: "3 €"
        }
      ],
      note: isEnglish
        ? "In formula: +3€"
        : isSpanish
        ? "En fórmula: +3€"
        : "En formule : +3 €"
    }
  };

  const kidsMenu = {
    title: isEnglish ? "👶 Kids Menu" : isSpanish ? "👶 Menú Niños" : "👶 Menu Kids",
    items: [
      {
        name: isEnglish ? "Complete menu" : isSpanish ? "Menú completo" : "Menu complet",
        description: isEnglish
          ? "Steak and fries, compote, Caprisun"
          : isSpanish
          ? "Steak con patatas fritas, compota, Caprisun"
          : "Steak frites, compote, Caprisun",
        price: "8 €"
      }
    ]
  };

  const formulas = [
    {
      id: 'creatif',
      name: isEnglish ? "Creative Brunch" : isSpanish ? "Brunch Creativo" : "Brunch Créatif",
      price: "35 €",
      emoji: "🎨",
      description: isEnglish
        ? "Tuesday to Friday — Between brushstrokes and gourmet bites, experience a creative brunch."
        : isSpanish
        ? "De martes a viernes — Entre pinceladas y bocados gourmet, vive un brunch creativo."
        : "Du mardi au vendredi — Entre coups de pinceau et bouchées gourmandes, vivez un brunch créatif.",
      sections: [
        {
          title: isEnglish ? "The concept" : isSpanish ? "El concepto" : "Le concept",
          fixed: [
            isEnglish
              ? "A creative workshop included with your brunch"
              : isSpanish
              ? "Un taller creativo incluido con tu brunch"
              : "Un atelier créatif inclus avec votre brunch",
            isEnglish
              ? "Tuesday to Friday"
              : isSpanish
              ? "De martes a viernes"
              : "Du mardi au vendredi",
            isEnglish
              ? "Surprise creative activities every week"
              : isSpanish
              ? "Actividades creativas sorpresa cada semana"
              : "Activités créatives surprise chaque semaine"
          ]
        },
        {
          title: isEnglish ? "Choose your formula" : isSpanish ? "Elige tu fórmula" : "Choisissez votre formule",
          description: isEnglish ? "Select a formula or customize your menu" : isSpanish ? "Selecciona una fórmula o personaliza tu menú" : "Sélectionnez une formule ou personnalisez votre menu",
          options: [
            {
              name: isEnglish ? "Pleasure formula" : isSpanish ? "Fórmula Placer" : "Formule Plaisir",
              description: isEnglish ? "2 toasts of choice + dessert + hot drink + cold drink" : isSpanish ? "2 tostadas a elegir + postre + bebida caliente + bebida fría" : "2 toasts au choix + dessert + boisson chaude + boisson froide"
            },
            {
              name: isEnglish ? "The House formula" : isSpanish ? "Fórmula House" : "Formule Le House",
              description: isEnglish ? "Main course + dessert + hot drink + cold drink" : isSpanish ? "Plato principal + postre + bebida caliente + bebida fría" : "Plat + dessert + boisson chaude + boisson froide"
            },
          ],
          type: "formule_choice"
        },
        {
          title: isEnglish ? "Main course" : isSpanish ? "Plato principal" : "Plat",
          options: [
            isEnglish ? "Burger (beef or chicken)" : isSpanish ? "Burger (carne o pollo)" : "Burger (viande ou poulet)",
            "Cordon bleu",
            isEnglish ? "Croissant burger" : isSpanish ? "Croissant burger" : "Croissant burger",
            isEnglish ? "Croissant scrambled eggs bacon" : isSpanish ? "Croissant huevos revueltos bacon" : "Croissant œuf brouillé bacon",
            isEnglish ? "Croissant salmon" : isSpanish ? "Croissant salmón" : "Croissant saumon",
            isEnglish ? "Savory French toast scrambled eggs bacon" : isSpanish ? "Tostada francesa salada huevos revueltos bacon" : "Brioche perdue salée œuf brouillé bacon",
            isEnglish ? "Savory French toast burrata pesto" : isSpanish ? "Tostada francesa salada burrata pesto" : "Brioche perdue salée burrata pesto"
          ],
          type: "plat"
        },
        {
          title: isEnglish ? "Dessert" : isSpanish ? "Postre" : "Dessert",
          options: [
            {
              name: isEnglish ? "Greek granola" : isSpanish ? "Granola griego" : "Grec granola",
              description: isEnglish ? "passion coulis / red berries" : isSpanish ? "coulis de maracuyá / frutos rojos" : "coulis passion / fruits rouges"
            },
            {
              name: "Pancake",
              description: isEnglish ? "toppings: red berries / salted butter caramel / chocolate hazelnut / maple syrup" : isSpanish ? "coberturas: frutos rojos / caramelo de mantequilla salada / chocolate avellana / jarabe de arce" : "napage : fruits rouges / caramel beurre salé / chocolat noisette / sirop d'érable"
            },
            {
              name: isEnglish ? "French toast" : isSpanish ? "Tostada francesa" : "Brioche perdue",
              description: isEnglish ? "toppings: red berries / salted butter caramel / chocolate hazelnut / maple syrup / crème brûlée (+2€)" : isSpanish ? "coberturas: frutos rojos / caramelo de mantequilla salada / chocolate avellana / jarabe de arce / crème brûlée (+2€)" : "napage : fruits rouges / caramel beurre salé / chocolat noisette / sirop d'érable / crème brûlée (+2€)"
            }
          ],
          type: "dessert"
        },
        {
          title: isEnglish ? "Hot drink" : isSpanish ? "Bebida caliente" : "Boisson chaude",
          options: [
            isEnglish ? "Espresso" : "Expresso",
            isEnglish ? "Double espresso" : isSpanish ? "Doble espresso" : "Double expresso",
            isEnglish ? "Long coffee" : isSpanish ? "Café largo" : "Allongé",
            isEnglish ? "Hot chocolate" : isSpanish ? "Chocolate caliente" : "Chocolat chaud",
            isEnglish ? "Latté (+2€)" : isSpanish ? "Latté (+2€)" : "Latté (+2€)",
            "Cappuccino (+2€)",
            isEnglish ? "Mocha (+3€)" : isSpanish ? "Moca (+3€)" : "Moca (+3€)",
            "Matcha (+3€)",
            "Chai Latté (+3€)",
            {
              name: isEnglish ? "Tea (+2€)" : isSpanish ? "Té (+2€)" : "Thé (+2€)",
              description: isEnglish ? "mint / jasmine / mango" : isSpanish ? "menta / jazmín / mango" : "menthe / jasmin / mangue"
            },
            "Ube Latté (+3€)"
          ],
          type: "boisson_chaude"
        },
        {
          title: isEnglish ? "Cold drink" : isSpanish ? "Bebida fría" : "Boisson froide",
          options: [
            {
              name: isEnglish ? "Can" : isSpanish ? "Lata" : "Canette",
              description: "Sprite, Coca Cola, Coca Cherry, Coca Zero, Oasis, Fuze Tea, Orangina"
            },
            isEnglish ? "Apple juice" : isSpanish ? "Zumo de manzana" : "Jus de pomme",
            isEnglish ? "Orange juice" : isSpanish ? "Zumo de naranja" : "Jus d'orange",
            isEnglish ? "Pineapple juice" : isSpanish ? "Zumo de piña" : "Jus d'ananas",
            isEnglish ? "Ginger juice (+2€)" : isSpanish ? "Zumo de jengibre (+2€)" : "Jus de gingembre (+2€)",
            isEnglish ? "Bissap (+2€)" : isSpanish ? "Bissap (+2€)" : "Bissap (+2€)",
            isEnglish ? "Watermelon juice (+2€)" : isSpanish ? "Zumo de sandía (+2€)" : "Jus de pastèque (+2€)",
            isEnglish ? "Speculoos milkshake (+3€)" : isSpanish ? "Milkshake de speculoos (+3€)" : "Milkshake Spéculoos (+3€)",
            isEnglish ? "Kinder milkshake (+3€)" : isSpanish ? "Milkshake de Kinder (+3€)" : "Milkshake Kinder (+3€)",
            isEnglish ? "Mango smoothie (+3€)" : isSpanish ? "Smoothie de mango (+3€)" : "Smoothie Mangue (+3€)",
            isEnglish ? "Pineapple coconut smoothie (+3€)" : isSpanish ? "Smoothie de piña y coco (+3€)" : "Smoothie Ananas Coco (+3€)",
            isEnglish ? "Orange strawberry banana smoothie (+3€)" : isSpanish ? "Smoothie de naranja, fresa y plátano (+3€)" : "Smoothie Orange Fraise Banane (+3€)",
            "Frappuccino (+3€)",
            isEnglish ? "Iced matcha (+3€)" : isSpanish ? "Matcha frappé (+3€)" : "Matcha frappé (+3€)",
            isEnglish ? "Iced ube (+3€)" : isSpanish ? "Ube frappé (+3€)" : "Ube frappé (+3€)",
            isEnglish ? "Iced latte (+3€)" : isSpanish ? "Latté helado (+3€)" : "Latté glacé (+3€)"
          ],
          type: "boisson_froide"
        }
      ]
    },
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
          title: isEnglish ? "Included" : isSpanish ? "Incluido" : "Inclus",
          fixed: [
            isEnglish
              ? "1 cold drink (homemade orange juice)"
              : isSpanish
              ? "1 bebida fría (zumo de naranja casero)"
              : "1 boisson froide (jus d'orange maison)",
            isEnglish
              ? "1 scrambled eggs, bacon, cherry tomatoes toast"
              : isSpanish
              ? "1 tostada de huevos revueltos, bacon, tomates cherry"
              : "1 toast œuf brouillé, bacon, tomates cerises"
          ]
        },
        {
          title: isEnglish ? "Pastry" : isSpanish ? "Bollería" : "Viennoiserie",
          options: ["Chocolatine", "Croissant"],
          type: "viennoiserie"
        },
        {
          title: isEnglish ? "Hot drink" : isSpanish ? "Bebida caliente" : "Boisson chaude",
          options: [
            isEnglish ? "Espresso" : "Expresso",
            isEnglish ? "Double espresso" : isSpanish ? "Doble espresso" : "Double expresso",
            isEnglish ? "Long coffee" : isSpanish ? "Café largo" : "Allongé",
            isEnglish ? "Hot chocolate" : isSpanish ? "Chocolate caliente" : "Chocolat chaud",
            isEnglish ? "Latté (+2€)" : isSpanish ? "Latté (+2€)" : "Latté (+2€)",
            "Cappuccino (+2€)",
            isEnglish ? "Mocha (+3€)" : isSpanish ? "Moca (+3€)" : "Moca (+3€)",
            "Matcha (+3€)",
            {
              name: isEnglish ? "Tea (+2€)" : isSpanish ? "Té (+2€)" : "Thé (+2€)",
              description: isEnglish ? "mint / jasmine / mango" : isSpanish ? "menta / jazmín / mango" : "menthe / jasmin / mangue"
            },
            isEnglish ? "Oat chai latte (+3€)" : isSpanish ? "Chai latte avena (+3€)" : "Chaï latté avoine (+3€)",
            "Ube Latté (+3€)"
          ],
          type: "boisson_chaude"
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
          title: isEnglish ? "Main course" : isSpanish ? "Plato principal" : "Plat",
          options: [
            isEnglish ? "Burger (beef or chicken)" : isSpanish ? "Burger (carne o pollo)" : "Burger (viande ou poulet)",
            "Cordon bleu",
            isEnglish ? "Croissant burger" : isSpanish ? "Croissant burger" : "Croissant burger",
            isEnglish ? "Croissant scrambled eggs bacon" : isSpanish ? "Croissant huevos revueltos bacon" : "Croissant œuf brouillé bacon",
            isEnglish ? "Croissant salmon" : isSpanish ? "Croissant salmón" : "Croissant saumon",
            isEnglish ? "Savory French toast scrambled eggs bacon" : isSpanish ? "Tostada francesa salada huevos revueltos bacon" : "Brioche perdue salée œuf brouillé bacon",
            isEnglish ? "Savory French toast burrata pesto" : isSpanish ? "Tostada francesa salada burrata pesto" : "Brioche perdue salée burrata pesto"
          ],
          type: "plat"
        },
        {
          title: isEnglish ? "Dessert" : isSpanish ? "Postre" : "Dessert",
          options: [
            {
              name: isEnglish ? "Greek granola" : isSpanish ? "Granola griego" : "Grec granola",
              description: isEnglish ? "passion coulis / red berries" : isSpanish ? "coulis de maracuyá / frutos rojos" : "coulis passion / fruits rouges"
            },
            {
              name: "Pancake",
              description: isEnglish ? "toppings: red berries / salted butter caramel / chocolate hazelnut / maple syrup" : isSpanish ? "coberturas: frutos rojos / caramelo de mantequilla salada / chocolate avellana / jarabe de arce" : "napage : fruits rouges / caramel beurre salé / chocolat noisette / sirop d'érable"
            },
            {
              name: isEnglish ? "French toast" : isSpanish ? "Tostada francesa" : "Brioche perdue",
              description: isEnglish ? "toppings: red berries / salted butter caramel / chocolate hazelnut / maple syrup / crème brûlée (+2€)" : isSpanish ? "coberturas: frutos rojos / caramelo de mantequilla salada / chocolate avellana / jarabe de arce / crème brûlée (+2€)" : "napage : fruits rouges / caramel beurre salé / chocolat noisette / sirop d'érable / crème brûlée (+2€)"
            },
            "Brioche Tatin (+2€)",
            isEnglish ? "Crème brûlée pancake (+2€)" : isSpanish ? "Pancake crème brûlée (+2€)" : "Pancake crème brûlée (+2€)",
            isEnglish ? "Tiramisu French toast (+2€)" : isSpanish ? "Tostada francesa tiramisú (+2€)" : "Brioche perdue tiramisu (+2€)",
          ],
          type: "dessert"
        },
        {
          title: isEnglish ? "Hot drink" : isSpanish ? "Bebida caliente" : "Boisson chaude",
          options: [
            isEnglish ? "Espresso" : "Expresso",
            isEnglish ? "Double espresso" : isSpanish ? "Doble espresso" : "Double expresso",
            isEnglish ? "Long coffee" : isSpanish ? "Café largo" : "Allongé",
            isEnglish ? "Hot chocolate" : isSpanish ? "Chocolate caliente" : "Chocolat chaud",
            isEnglish ? "Latté (+2€)" : isSpanish ? "Latté (+2€)" : "Latté (+2€)",
            "Cappuccino (+2€)",
            isEnglish ? "Mocha (+3€)" : isSpanish ? "Moca (+3€)" : "Moca (+3€)",
            "Matcha (+3€)",
            "Chai Latté (+3€)",
            {
              name: isEnglish ? "Tea (+2€)" : isSpanish ? "Té (+2€)" : "Thé (+2€)",
              description: isEnglish ? "mint / jasmine / mango" : isSpanish ? "menta / jazmín / mango" : "menthe / jasmin / mangue"
            },
            "Ube Latté (+3€)"
          ],
          type: "boisson_chaude"
        },
        {
          title: isEnglish ? "Cold drink" : isSpanish ? "Bebida fría" : "Boisson froide",
          options: [
            {
              name: isEnglish ? "Can" : isSpanish ? "Lata" : "Canette",
              description: "Sprite, Coca Cola, Coca Cherry, Coca Zero, Oasis, Fuze Tea, Orangina"
            },
            isEnglish ? "Apple juice" : isSpanish ? "Zumo de manzana" : "Jus de pomme",
            isEnglish ? "Orange juice" : isSpanish ? "Zumo de naranja" : "Jus d'orange",
            isEnglish ? "Pineapple juice" : isSpanish ? "Zumo de piña" : "Jus d'ananas",
            isEnglish ? "Ginger juice (+2€)" : isSpanish ? "Zumo de jengibre (+2€)" : "Jus de gingembre (+2€)",
            isEnglish ? "Bissap (+2€)" : isSpanish ? "Bissap (+2€)" : "Bissap (+2€)",
            isEnglish ? "Watermelon juice (+2€)" : isSpanish ? "Zumo de sandía (+2€)" : "Jus de pastèque (+2€)",
            isEnglish ? "Speculoos milkshake (+3€)" : isSpanish ? "Milkshake de speculoos (+3€)" : "Milkshake Spéculoos (+3€)",
            isEnglish ? "Kinder milkshake (+3€)" : isSpanish ? "Milkshake de Kinder (+3€)" : "Milkshake Kinder (+3€)",
            isEnglish ? "Mango smoothie (+3€)" : isSpanish ? "Smoothie de mango (+3€)" : "Smoothie Mangue (+3€)",
            isEnglish ? "Pineapple coconut smoothie (+3€)" : isSpanish ? "Smoothie de piña y coco (+3€)" : "Smoothie Ananas Coco (+3€)",
            isEnglish ? "Orange strawberry banana smoothie (+3€)" : isSpanish ? "Smoothie de naranja, fresa y plátano (+3€)" : "Smoothie Orange Fraise Banane (+3€)",
            "Frappuccino (+3€)",
            isEnglish ? "Iced matcha (+3€)" : isSpanish ? "Matcha frappé (+3€)" : "Matcha frappé (+3€)",
            isEnglish ? "Iced ube (+3€)" : isSpanish ? "Ube frappé (+3€)" : "Ube frappé (+3€)",
            isEnglish ? "Iced latte (+3€)" : isSpanish ? "Latté helado (+3€)" : "Latté glacé (+3€)"
          ],
          type: "boisson_froide"
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
          title: isEnglish ? "Choice of toasts" : isSpanish ? "Tostadas a elegir" : "Toasts au choix",
          description: isEnglish ? "Choose up to 2 toasts to your liking" : isSpanish ? "Elige hasta 2 tostadas a tu gusto" : "Choisissez jusqu'à 2 toasts selon vos envies",
          options: [
            isEnglish ? "Scrambled eggs, bacon, cherry tomatoes" : isSpanish ? "Huevos revueltos, bacon, tomates cherry" : "Œuf brouillé, bacon, tomates cerises",
            isEnglish ? "Beetroot hummus, avocado, walnuts" : isSpanish ? "Hummus de remolacha, aguacate, nueces" : "Houmous à la betterave, avocat, noix",
            isEnglish ? "Eggplant caviar, sliced chicken, parmesan" : isSpanish ? "Caviar de berenjena, pollo laminado, parmesano" : "Caviar d'aubergine, émincé de poulet, parmesan",
            isEnglish ? "Salmon, guacamole, fleur de sel" : isSpanish ? "Salmón, guacamole, flor de sal" : "Saumon, guacamole, fleur de sel",
            isEnglish ? "Shrimp, cherry tomatoes, cream cheese" : isSpanish ? "Gambas, tomates cherry, queso fresco" : "Crevettes, tomates cerises, fromage frais",
            isEnglish ? "Burrata, beef heart tomatoes, pesto (+2€)" : isSpanish ? "Burrata, tomates corazón de buey, pesto (+2€)" : "Burrata, tomates cœur de bœuf, pesto (+2€)"
          ],
          type: "toasts"
        },
        {
          title: isEnglish ? "Dessert" : isSpanish ? "Postre" : "Dessert",
          options: [
            {
              name: isEnglish ? "Greek granola" : isSpanish ? "Granola griego" : "Grec granola",
              description: isEnglish ? "passion coulis / red berries" : isSpanish ? "coulis de maracuyá / frutos rojos" : "coulis passion / fruits rouges"
            },
            {
              name: "Pancake",
              description: isEnglish ? "toppings: red berries / salted butter caramel / chocolate hazelnut / maple syrup" : isSpanish ? "coberturas: frutos rojos / caramelo de mantequilla salada / chocolate avellana / jarabe de arce" : "napage : fruits rouges / caramel beurre salé / chocolat noisette / sirop d'érable"
            },
            {
              name: isEnglish ? "French toast" : isSpanish ? "Tostada francesa" : "Brioche perdue",
              description: isEnglish ? "toppings: red berries / salted butter caramel / chocolate hazelnut / maple syrup / crème brûlée (+2€)" : isSpanish ? "coberturas: frutos rojos / caramelo de mantequilla salada / chocolate avellana / jarabe de arce / crème brûlée (+2€)" : "napage : fruits rouges / caramel beurre salé / chocolat noisette / sirop d'érable / crème brûlée (+2€)"
            },
            "Brioche Tatin (+2€)",
            isEnglish ? "Crème brûlée pancake (+2€)" : isSpanish ? "Pancake crème brûlée (+2€)" : "Pancake crème brûlée (+2€)",
            isEnglish ? "Tiramisu French toast (+2€)" : isSpanish ? "Tostada francesa tiramisú (+2€)" : "Brioche perdue tiramisu (+2€)",
          ],
          type: "dessert"
        },
        {
          title: isEnglish ? "Hot drink" : isSpanish ? "Bebida caliente" : "Boisson chaude",
          options: [
            isEnglish ? "Espresso" : "Expresso",
            isEnglish ? "Double espresso" : isSpanish ? "Doble espresso" : "Double expresso",
            isEnglish ? "Long coffee" : isSpanish ? "Café largo" : "Allongé",
            isEnglish ? "Hot chocolate" : isSpanish ? "Chocolate caliente" : "Chocolat chaud",
            isEnglish ? "Latté (+2€)" : isSpanish ? "Latté (+2€)" : "Latté (+2€)",
            "Cappuccino (+2€)",
            isEnglish ? "Mocha (+3€)" : isSpanish ? "Moca (+3€)" : "Moca (+3€)",
            "Matcha (+3€)",
            "Chai Latté (+3€)",
            {
              name: isEnglish ? "Tea (+2€)" : isSpanish ? "Té (+2€)" : "Thé (+2€)",
              description: isEnglish ? "mint / jasmine / mango" : isSpanish ? "menta / jazmín / mango" : "menthe / jasmin / mangue"
            },
            "Ube Latté (+3€)"
          ],
          type: "boisson_chaude"
        },
        {
          title: isEnglish ? "Cold drink" : isSpanish ? "Bebida fría" : "Boisson froide",
          options: [
            {
              name: isEnglish ? "Can" : isSpanish ? "Lata" : "Canette",
              description: "Sprite, Coca Cola, Coca Cherry, Coca Zero, Oasis, Fuze Tea, Orangina"
            },
            isEnglish ? "Apple juice" : isSpanish ? "Zumo de manzana" : "Jus de pomme",
            isEnglish ? "Orange juice" : isSpanish ? "Zumo de naranja" : "Jus d'orange",
            isEnglish ? "Pineapple juice" : isSpanish ? "Zumo de piña" : "Jus d'ananas",
            isEnglish ? "Ginger juice (+2€)" : isSpanish ? "Zumo de jengibre (+2€)" : "Jus de gingembre (+2€)",
            isEnglish ? "Bissap (+2€)" : isSpanish ? "Bissap (+2€)" : "Bissap (+2€)",
            isEnglish ? "Watermelon juice (+2€)" : isSpanish ? "Zumo de sandía (+2€)" : "Jus de pastèque (+2€)",
            isEnglish ? "Speculoos milkshake (+3€)" : isSpanish ? "Milkshake de speculoos (+3€)" : "Milkshake Spéculoos (+3€)",
            isEnglish ? "Kinder milkshake (+3€)" : isSpanish ? "Milkshake de Kinder (+3€)" : "Milkshake Kinder (+3€)",
            isEnglish ? "Mango smoothie (+3€)" : isSpanish ? "Smoothie de mango (+3€)" : "Smoothie Mangue (+3€)",
            isEnglish ? "Pineapple coconut smoothie (+3€)" : isSpanish ? "Smoothie de piña y coco (+3€)" : "Smoothie Ananas Coco (+3€)",
            isEnglish ? "Orange strawberry banana smoothie (+3€)" : isSpanish ? "Smoothie de naranja, fresa y plátano (+3€)" : "Smoothie Orange Fraise Banane (+3€)",
            "Frappuccino (+3€)",
            isEnglish ? "Iced matcha (+3€)" : isSpanish ? "Matcha frappé (+3€)" : "Matcha frappé (+3€)",
            isEnglish ? "Iced ube (+3€)" : isSpanish ? "Ube frappé (+3€)" : "Ube frappé (+3€)",
            isEnglish ? "Iced latte (+3€)" : isSpanish ? "Latté helado (+3€)" : "Latté glacé (+3€)"
          ],
          type: "boisson_froide"
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
        <MenuSection
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <SectionTitle>🧺 {isEnglish ? "Formulas" : isSpanish ? "Fórmulas" : "Formules"}</SectionTitle>
          
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
                    <FormulaTitle $selected={expandedFormulas[formula.id]}>
                      {formula.name}
                    </FormulaTitle>
                    <FormulaDescription $selected={expandedFormulas[formula.id]}>{formula.description}</FormulaDescription>
                  </div>
                </div>
                <FormulaPrice $selected={expandedFormulas[formula.id]}>{formula.price}</FormulaPrice>
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
                        {section.description && (
                          <div style={{
                            fontSize: '0.9em',
                            color: 'white',
                            marginBottom: '12px',
                            fontStyle: 'italic'
                          }}>
                            {section.description}
                          </div>
                        )}
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
                                  border: '1px solid rgba(59, 170, 109, 0.2)',
                                  color: '#1c3f33'
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
                                $selected={isOptionSelected(formula.id, section.type, option)}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleOption(formula.id, section.type, option);
                                }}
                                as={motion.div}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <RadioButton
                                  $checked={isOptionSelected(formula.id, section.type, option)}
                                  animate={isOptionSelected(formula.id, section.type, option) ? {
                                    scale: [1, 1.2, 1],
                                  } : {}}
                                  transition={{ duration: 0.3 }}
                                />
                                <span style={{
                                  flex: 1,
                                  fontWeight: isOptionSelected(formula.id, section.type, option) ? 600 : 400
                                }}>
                                  {typeof option === 'string' ? option : option.name}
                                  {typeof option === 'object' && option.description && (
                                    <span style={{
                                      display: 'block',
                                      fontSize: '0.85em',
                                      color: '#666',
                                      fontWeight: 400,
                                      marginTop: '2px'
                                    }}>
                                      {option.description}
                                    </span>
                                  )}
                                </span>
                                {(() => {
                                  const optName = typeof option === 'string' ? option : option.name;
                                  const optDish = dishImages[optName] || dishImages[optName?.split(' (+')[0]?.trim()] || dishImages[optName?.split(' (')[0]?.trim()];
                                  return optDish?.images ? (
                                    <div style={{ display: 'flex', gap: '4px', flexShrink: 0, marginLeft: '8px' }}>
                                      {optDish.images.map((img, i) => (
                                        <div key={i}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedDish({ name: `${optName} — ${img.label}`, description: optDish.description, image: img.src });
                                            setShowDishModal(true);
                                          }}
                                          style={{
                                            width: '44px',
                                            height: '44px',
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                            border: '2px solid rgba(28, 63, 51, 0.15)',
                                            boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                                            cursor: 'pointer'
                                          }}>
                                          <img src={img.src} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                                        </div>
                                      ))}
                                    </div>
                                  ) : optDish?.image ? (
                                    <div
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedDish({ name: optName, description: optDish.description, ...optDish });
                                        setShowDishModal(true);
                                      }}
                                      style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        flexShrink: 0,
                                        marginLeft: '8px',
                                        border: '2px solid rgba(28, 63, 51, 0.15)',
                                        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                                        cursor: 'pointer'
                                      }}>
                                      <img
                                        src={optDish.image}
                                        alt={optName}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                      />
                                    </div>
                                  ) : null;
                                })()}
                              </FormulaOption>
                            ))}
                            {section.note && (
                              <Note style={{ marginTop: '8px', paddingLeft: '28px', color: '#1c3f33' }}>
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
              ? "Extra +€2: salad / fries / sweet potato fries"
              : i18n.language === 'es'
              ? "Suplemento +2€: ensalada / patatas fritas / patatas dulces fritas"
              : "Supplément +2€ : salade / frites / frites patates douces"}
          </Note>
        </MenuSection>

        <MenuSection
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          {...createScrollTrigger()}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <SectionTitle>{kidsMenu.title}</SectionTitle>
          <MenuGrid>
            {kidsMenu.items.map((item, index) => (
              <MenuItem
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                {...createScrollTrigger()}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ItemName>
                  {item.name}
                  {item.description && <span>{item.description}</span>}
                </ItemName>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <ItemPrice>{item.price}</ItemPrice>
                </div>
              </MenuItem>
            ))}
          </MenuGrid>
        </MenuSection>

        {Object.entries(menuData).map(([key, section], sectionIndex) => (
          <MenuSection
            key={key}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            {...createScrollTrigger()}
            transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
          >
            <SectionTitle>{section.title}</SectionTitle>
            <MenuGrid>
              {section.items.map((item, index) => {
                const dishInfo = dishImages[item.name] || dishImages[item.name.split(',')[0]?.trim()] || null;

                return (
                  <MenuItem
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    {...createScrollTrigger()}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    onClick={() => dishInfo ? handleDishClick(item) : null}
                    style={{ cursor: dishInfo ? 'pointer' : 'default' }}
                    onMouseEnter={() => dishInfo && setHoveredDish({ ...item, ...dishInfo })}
                    onMouseLeave={() => setHoveredDish(null)}
                  >
                    <ItemName>
                      {item.name}
                      {item.description && item.name !== "Moka" && item.name !== "Matcha" && <span>{item.description}</span>}
                      {(item.name === "Moka" || item.name === "Matcha") && dishInfo && dishInfo.description && <span>{dishInfo.description}</span>}
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
                          Array.isArray(currentFormula.selections[section.type]) ? (
                            currentFormula.selections[section.type].map((item, i) => (
                              <ModalItem key={i}>
                                <FiCheck size={16} style={{ color: '#3BAA6D' }} />
                                <span style={{ fontWeight: 500 }}>
                                  {item}
                                </span>
                              </ModalItem>
                            ))
                          ) : (
                            <ModalItem>
                              <FiCheck size={16} style={{ color: '#3BAA6D' }} />
                              <span style={{ fontWeight: 500 }}>
                                {currentFormula.selections[section.type]}
                              </span>
                            </ModalItem>
                          )
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
              
              {selectedDish.images ? (
                <DishImage
                  src={selectedDish.images[0].src}
                  alt={selectedDish.name}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : selectedDish.image && (
                <DishImage
                  src={selectedDish.image}
                  alt={selectedDish.name}
                  $isVeggieBurger={selectedDish.name.includes('végé') || selectedDish.name.includes('Veggie') || selectedDish.name.includes('vegetariana')}
                  $isBuche={selectedDish.name.includes('bûche') || selectedDish.name.includes('Bûche') || selectedDish.name.includes('Yule log') || selectedDish.name.includes('Tronco')}
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