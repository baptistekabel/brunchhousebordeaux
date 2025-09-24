import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FiMap, FiEye, FiNavigation } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const MapContainer = styled(motion.div)`
  position: relative;
  border-radius: ${props => props.theme.borderRadius.xlarge};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.medium};
  background: ${props => props.theme.colors.secondary.surface};
  height: 500px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    height: 400px;
  }
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const MapMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  height: 50px;
  background: ${props => props.theme.colors.primary.background};
  pointer-events: none;
  z-index: 5;
`;

const MapControls = styled.div`
  position: absolute;
  top: ${props => props.theme.spacing.lg};
  right: ${props => props.theme.spacing.lg};
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    top: ${props => props.theme.spacing.md};
    right: ${props => props.theme.spacing.md};
  }
`;

const ControlButton = styled(motion.button)`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.$active 
    ? 'linear-gradient(135deg, rgba(28, 63, 51, 0.95) 0%, rgba(43, 91, 74, 0.9) 100%)' 
    : 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid ${props => props.$active 
    ? 'rgba(43, 91, 74, 0.3)' 
    : 'rgba(28, 63, 51, 0.1)'};
  border-radius: ${props => props.theme.borderRadius.medium};
  color: ${props => props.$active 
    ? props.theme.colors.neutral.white 
    : props.theme.colors.primary.text};
  font-size: ${props => props.theme.typography.sizes.small};
  font-weight: ${props => props.theme.typography.weights.medium};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  min-width: 120px;
  justify-content: center;
  
  &:hover {
    transform: translateX(-4px);
    box-shadow: ${props => props.theme.shadows.soft};
  }
  
  svg {
    transition: transform ${props => props.theme.transitions.fast};
  }
  
  &:hover svg {
    transform: ${props => props.$active ? 'scale(1.1)' : 'rotate(15deg)'};
  }
`;

const DirectionsButton = styled(motion.a)`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: linear-gradient(135deg, 
    rgba(59, 170, 109, 0.95) 0%, 
    rgba(59, 170, 109, 0.85) 100%
  );
  backdrop-filter: blur(20px);
  border: 1px solid rgba(59, 170, 109, 0.3);
  border-radius: ${props => props.theme.borderRadius.medium};
  color: ${props => props.theme.colors.neutral.white};
  font-size: ${props => props.theme.typography.sizes.small};
  font-weight: ${props => props.theme.typography.weights.medium};
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  min-width: 120px;
  justify-content: center;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    transform: translateX(-4px);
    box-shadow: ${props => props.theme.shadows.soft};
    background: linear-gradient(135deg, 
      rgba(59, 170, 109, 1) 0%, 
      rgba(59, 170, 109, 0.95) 100%
    );
  }
`;

const MapOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 70%,
    rgba(28, 63, 51, 0.05) 100%
  );
  pointer-events: none;
`;

const MapEmbed = () => {
  const { t } = useTranslation();
  const [mapView, setMapView] = useState('streetview');
  
  // Coordonnées exactes pour 3 rue Ferbos, 33800 Bordeaux
  const address = "3 rue Ferbos, 33800 Bordeaux, France";
  const encodedAddress = encodeURIComponent(address);
  
  // Coordonnées exactes de 3 rue Ferbos, 33800 Bordeaux (quartier Bacalan)
  const lat = "44.82819"; // Latitude exacte pour 3 rue Ferbos
  const lng = "-0.567471"; // Longitude exacte pour 3 rue Ferbos
  
  // URL pour Google Maps avec l'adresse exacte
  const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedAddress}&zoom=17`;
  
  // Alternative sans clé API avec coordonnées exactes
  const mapEmbedUrlAlt = `https://maps.google.com/maps?q=${lat},${lng}&t=&z=17&ie=UTF8&iwloc=&output=embed`;
  
  // URL pour obtenir les directions
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;

  return (
    <MapContainer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <MapControls>
        <ControlButton
          $active={mapView === 'map'}
          onClick={() => setMapView('map')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiMap size={16} />
          <span>{t('location.map.plan')}</span>
        </ControlButton>
        
        <ControlButton
          $active={mapView === 'streetview'}
          onClick={() => setMapView('streetview')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiEye size={16} />
          <span>{t('location.map.streetView')}</span>
        </ControlButton>
        
        <DirectionsButton
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiNavigation size={16} />
          <span>{t('location.map.directions')}</span>
        </DirectionsButton>
      </MapControls>
      
      <MapWrapper>
        <AnimatePresence mode="wait">
          {mapView === 'map' ? (
            <motion.iframe
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              title="Brunch House Bordeaux - Plan"
              src={mapEmbedUrlAlt}
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <motion.div
              key="streetview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ width: '100%', height: '100%', position: 'relative' }}
            >
              <iframe
                title="Brunch House Bordeaux - Street View"
                src={`https://www.google.com/maps/embed/v1/streetview?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&location=${lat},${lng}&heading=210&pitch=10&fov=90`}
                frameBorder="0"
                style={{ width: '100%', height: '100%' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </MapWrapper>
      
      <MapOverlay />
    </MapContainer>
  );
};

export default MapEmbed;