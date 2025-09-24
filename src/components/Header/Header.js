import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiGlobe } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

const HeaderWrapper = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: ${props => props.$scrolled
    ? 'linear-gradient(135deg, rgba(253, 249, 240, 0.95) 0%, rgba(253, 249, 240, 0.9) 100%)'
    : 'linear-gradient(135deg, rgba(253, 249, 240, 0.8) 0%, rgba(253, 249, 240, 0.7) 100%)'};
  border-bottom: 1px solid ${props => props.$scrolled
    ? 'rgba(1, 57, 39, 0.1)'
    : 'rgba(252, 189, 189, 0.3)'};
  box-shadow: ${props => props.$scrolled
    ? '0 10px 30px rgba(1, 57, 39, 0.08)'
    : 'none'};
  transition: all ${props => props.theme.transitions.normal};
`;

const Container = styled.div`
  max-width: ${props => props.theme.spacing.container.maxWidth};
  margin: 0 auto;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.container.padding};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.xl};
  }
`;

const Logo = styled(motion.div)`
  cursor: pointer;
  display: flex;
  align-items: center;

  img {
    height: 50px;
    width: auto;
    object-fit: contain;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    img {
      height: 40px;
    }
  }
`;

const Nav = styled.nav`
  display: none;
  
  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    display: flex;
    gap: ${props => props.theme.spacing.xl};
    align-items: center;
  }
`;

const NavLink = styled.a`
  position: relative;
  font-size: ${props => props.theme.typography.sizes.body.regular};
  font-weight: ${props => props.theme.typography.weights.medium};
  color: ${props => props.theme.colors.primary.text};
  transition: color ${props => props.theme.transitions.fast};
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${props => props.theme.colors.primary.accent};
    transition: width ${props => props.theme.transitions.normal};
  }
  
  &:hover {
    color: ${props => props.theme.colors.primary.accent};
    
    &::after {
      width: 100%;
    }
  }
`;

const Actions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  align-items: center;
`;

const LanguageSelector = styled.div`
  position: relative;
`;

const LanguageButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: rgba(253, 249, 240, 0.8);
  border: 1px solid rgba(1, 57, 39, 0.1);
  border-radius: ${props => props.theme.borderRadius.medium};
  color: ${props => props.theme.colors.primary.text};
  font-size: ${props => props.theme.typography.sizes.small};
  font-weight: ${props => props.theme.typography.weights.medium};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background: rgba(253, 249, 240, 0.9);
    transform: translateY(-2px);
  }
`;

const LanguageDropdown = styled(motion.div)`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: rgba(253, 249, 240, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(1, 57, 39, 0.1);
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  overflow: hidden;
  min-width: 120px;
`;

const LanguageOption = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: transparent;
  border: none;
  text-align: left;
  font-size: ${props => props.theme.typography.sizes.small};
  color: ${props => props.theme.colors.primary.text};
  cursor: pointer;
  transition: background ${props => props.theme.transitions.fast};
  
  &:hover {
    background: rgba(1, 57, 39, 0.05);
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid rgba(1, 57, 39, 0.05);
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(253, 249, 240, 0.8);
  border: 1px solid rgba(1, 57, 39, 0.1);
  border-radius: ${props => props.theme.borderRadius.medium};
  color: ${props => props.theme.colors.primary.text};
  cursor: pointer;
  
  @media (min-width: ${props => props.theme.breakpoints.desktop}) {
    display: none;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 400px;
  height: 100vh;
  background: linear-gradient(135deg, 
    rgba(253, 249, 240, 0.98) 0%, 
    rgba(253, 249, 240, 0.95) 100%
  );
  backdrop-filter: blur(20px);
  box-shadow: -10px 0 40px rgba(1, 57, 39, 0.1);
  padding: ${props => props.theme.spacing.xl};
  z-index: 999;
`;

const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 998;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const MobileNavLink = styled.a`
  font-size: ${props => props.theme.typography.sizes.body.large};
  font-weight: ${props => props.theme.typography.weights.medium};
  color: ${props => props.theme.colors.primary.text};
  padding: ${props => props.theme.spacing.md} 0;
  border-bottom: 1px solid rgba(1, 57, 39, 0.05);
`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const location = useLocation();
  
  const headerY = useTransform(scrollY, [0, 100], [0, -10]);
  const headerOpacity = useTransform(scrollY, [0, 50], [1, 0.98]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangDropdownOpen(false);
  };

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];

  const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    // Si on clique sur Accueil, toujours retourner à l'accueil
    if (href === '#home') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Si on clique sur Menu, aller à la page menu
    if (href === '#menu') {
      navigate('/menu');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Si on est sur la page menu, retourner à l'accueil
    if (location.pathname === '/menu') {
      navigate('/');
      // Attendre un peu que la navigation se fasse puis scroller
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Si on est sur la page d'accueil, scroller directement
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { href: '#home', label: t('nav.home') },
    { href: '#menu', label: t('nav.menu') },
    { href: '#location', label: t('nav.location') },
    { href: '#reservation', label: t('nav.reservation') },
    { href: '#values', label: t('nav.values') }
  ];

  return (
    <>
      <HeaderWrapper
        $scrolled={scrolled}
        style={{ y: headerY, opacity: headerOpacity }}
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: scrolled ? 0 : -100,
          opacity: scrolled ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Container>
          <Logo
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (location.pathname === '/menu') {
                navigate('/');
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <img src="/logoBrunch.png" alt="Brunch House Logo" />
          </Logo>
          
          <Nav>
            {navItems.map((item, index) => (
              <NavLink 
                key={index} 
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </NavLink>
            ))}
          </Nav>
          
          <Actions>
            <LanguageSelector>
              <LanguageButton
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{currentLang.flag} {currentLang.code.toUpperCase()}</span>
              </LanguageButton>
              
              {langDropdownOpen && (
                <LanguageDropdown
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {languages.map(lang => (
                    <LanguageOption
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                    >
                      {lang.flag} {lang.name}
                    </LanguageOption>
                  ))}
                </LanguageDropdown>
              )}
            </LanguageSelector>
            
            <MobileMenuButton
              onClick={() => setMobileMenuOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMenu size={24} />
            </MobileMenuButton>
          </Actions>
        </Container>
      </HeaderWrapper>
      
      {mobileMenuOpen && (
        <>
          <MobileMenuOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
          />
          <MobileMenu
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <MobileMenuHeader>
              <Logo>Brunch <span>House</span></Logo>
              <MobileMenuButton
                onClick={() => setMobileMenuOpen(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiX size={24} />
              </MobileMenuButton>
            </MobileMenuHeader>
            
            <MobileNavLinks>
              {navItems.map((item, index) => (
                <MobileNavLink
                  key={index}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </MobileNavLink>
              ))}
            </MobileNavLinks>
            
            <div style={{ marginTop: '40px' }}>
              <LanguageSelector>
                <LanguageButton
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  style={{ width: '100%' }}
                >
                  <span>{currentLang.flag} {currentLang.name}</span>
                </LanguageButton>
              </LanguageSelector>
            </div>
          </MobileMenu>
        </>
      )}
    </>
  );
};

export default Header;