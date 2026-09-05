import { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiExternalLink, FiCheckCircle } from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const GOOGLE_REVIEW_URL = 'https://search.google.com/local/writereview?placeid=ChIJz1t6mV0nVQ0ReiRRJk46vgI';

// Probabilités : menu = 0,01 %, toast = 5 %, le reste réparti selon le prix
// du produit (moins c'est cher, plus la chance est grande) :
// Canette 2 € → 27 % · Croissant 2 € → 27 % · Boisson chaude ~3 € → 21,99 %
// Smoothie 5,50 € → 9,5 % · Milkshake 5,50 € → 9,5 %
const PRIZES = [
  {
    id: 'menu',
    weight: 0.0001,
    color: '#BE6A65',
    emoji: '🎁',
    label: { fr: 'Formule Efficace', en: 'Efficace menu', es: 'Fórmula Efficace' },
  },
  {
    id: 'canette',
    weight: 0.27,
    color: '#013927',
    emoji: '🥤',
    label: { fr: 'Une canette', en: 'A canned drink', es: 'Una lata' },
  },
  {
    id: 'croissant',
    weight: 0.27,
    color: '#2B5B4A',
    emoji: '🥐',
    label: { fr: 'Un croissant', en: 'A croissant', es: 'Un croissant' },
  },
  {
    id: 'chaude',
    weight: 0.2199,
    color: '#013927',
    emoji: '☕',
    label: { fr: 'Boisson chaude', en: 'A hot drink', es: 'Bebida caliente' },
  },
  {
    id: 'smoothie',
    weight: 0.095,
    color: '#2B5B4A',
    emoji: '🍹',
    label: { fr: 'Un smoothie', en: 'A smoothie', es: 'Un smoothie' },
  },
  {
    id: 'milkshake',
    weight: 0.095,
    color: '#013927',
    emoji: '🥛',
    label: { fr: 'Un milkshake', en: 'A milkshake', es: 'Un batido' },
  },
  {
    id: 'toast',
    weight: 0.05,
    color: '#A5754F',
    emoji: '🍳',
    label: { fr: 'Toast œuf bacon', en: 'Egg bacon toast', es: 'Tostada huevo bacon' },
  },
];

const pickPrizeIndex = () => {
  const r = Math.random();
  let cumulative = 0;
  for (let i = 0; i < PRIZES.length; i++) {
    cumulative += PRIZES[i].weight;
    if (r < cumulative) return i;
  }
  return PRIZES.length - 1;
};

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(1, 30, 20, 0.75);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
  padding: ${props => props.theme.spacing.md};
`;

const Card = styled(motion.div)`
  background: linear-gradient(160deg, #fdf9f0 0%, #f7f0e2 100%);
  border-radius: 24px;
  max-width: 440px;
  width: 100%;
  max-height: 92vh;
  overflow-y: auto;
  position: relative;
  padding: 32px 28px 28px;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.45);
  text-align: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 24px 16px 20px;
    border-radius: 20px;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(1, 57, 39, 0.08);
  color: ${props => props.theme.colors.darkGreen};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 5;

  &:hover {
    background: rgba(1, 57, 39, 0.15);
    transform: rotate(90deg);
  }
`;

const StepTitle = styled.h3`
  font-family: ${props => props.theme.typography.fonts.heading};
  font-size: 26px;
  color: ${props => props.theme.colors.darkGreen};
  margin-bottom: 8px;
  line-height: 1.25;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 22px;
  }
`;

const StepText = styled.p`
  font-size: 15px;
  color: ${props => props.theme.colors.darkGreen};
  opacity: 0.8;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const StepsIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 18px;
`;

const StepDot = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: ${props => (props.$active ? props.theme.colors.darkGreen : 'rgba(1, 57, 39, 0.35)')};

  span.num {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => (props.$active ? props.theme.colors.darkGreen : 'rgba(1, 57, 39, 0.12)')};
    color: ${props => (props.$active ? '#FDF9F0' : 'rgba(1, 57, 39, 0.5)')};
    font-size: 11px;
  }
`;

const StepLine = styled.div`
  width: 28px;
  height: 2px;
  background: rgba(1, 57, 39, 0.15);
  border-radius: 2px;
`;

const GoogleButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px 20px;
  border-radius: 999px;
  background: ${props => props.theme.colors.darkGreen};
  color: #fdf9f0;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 6px 18px rgba(1, 57, 39, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(1, 57, 39, 0.4);
    color: #fdf9f0;
  }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 6px 18px rgba(190, 106, 101, 0.35); }
  50% { box-shadow: 0 6px 28px rgba(190, 106, 101, 0.65); }
`;

const SpinButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px 20px;
  border-radius: 999px;
  border: none;
  font-family: inherit;
  background: ${props =>
    props.disabled
      ? 'rgba(1, 57, 39, 0.15)'
      : `linear-gradient(135deg, ${props.theme.colors.sugarRose} 0%, #a5534e 100%)`};
  color: ${props => (props.disabled ? 'rgba(1, 57, 39, 0.4)' : '#fdf9f0')};
  font-size: 16px;
  font-weight: 700;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s;
  margin-top: 14px;

  &:not(:disabled) {
    animation: ${pulse} 2s ease-in-out infinite;
  }

  &:not(:disabled):hover {
    transform: translateY(-2px);
  }
`;

const ReviewDoneNote = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 13px;
  color: #2e7d52;
  font-weight: 600;
  margin-top: 12px;
`;

const Disclaimer = styled.p`
  font-size: 11px;
  color: rgba(1, 57, 39, 0.5);
  font-style: italic;
  margin-top: 12px;
  line-height: 1.5;
`;

const LockNote = styled.p`
  font-size: 12px;
  color: rgba(1, 57, 39, 0.55);
  font-style: italic;
  margin-top: 12px;
`;

const WheelWrapper = styled.div`
  position: relative;
  width: 290px;
  height: 290px;
  margin: 8px auto 4px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 250px;
    height: 250px;
  }
`;

const WheelSvg = styled(motion.svg)`
  width: 100%;
  height: 100%;
  transform-origin: 50% 50%;
  will-change: transform;
`;

const PointerWrapper = styled.div`
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
`;

const PointerTip = styled(motion.div)`
  width: 0;
  height: 0;
  border-left: 14px solid transparent;
  border-right: 14px solid transparent;
  border-top: 26px solid ${props => props.theme.colors.sugarRose};
  filter: drop-shadow(0 3px 4px rgba(0, 0, 0, 0.3));
  transform-origin: 50% 0%;
`;

const ConfettiPiece = styled(motion.span)`
  position: absolute;
  top: -10px;
  font-size: ${props => props.$size}px;
  pointer-events: none;
  z-index: 6;
`;

const CONFETTI = ['🎉', '🎊', '✨', '🥳', '💚', '🌸'];

const ConfettiBurst = () => (
  <>
    {Array.from({ length: 16 }).map((_, i) => (
      <ConfettiPiece
        key={i}
        $size={14 + (i % 4) * 4}
        style={{ left: `${6 + (i * 89) % 88}%` }}
        initial={{ y: -20, opacity: 0, rotate: 0 }}
        animate={{
          y: 340 + (i % 3) * 60,
          opacity: [0, 1, 1, 0],
          rotate: (i % 2 === 0 ? 1 : -1) * (180 + i * 30),
          x: (i % 2 === 0 ? 1 : -1) * (10 + (i % 5) * 8),
        }}
        transition={{
          duration: 2.2 + (i % 4) * 0.4,
          delay: i * 0.07,
          ease: 'easeIn',
        }}
      >
        {CONFETTI[i % CONFETTI.length]}
      </ConfettiPiece>
    ))}
  </>
);

const Hub = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -29px;
  margin-top: -29px;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: #fdf9f0;
  border: 4px solid ${props => props.theme.colors.darkGreen};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  z-index: 2;
`;

const PrizeCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(252, 189, 189, 0.25) 0%, rgba(252, 189, 189, 0.1) 100%);
  border: 2px dashed ${props => props.theme.colors.sugarRose};
  border-radius: 18px;
  padding: 22px 18px;
  margin: 18px 0 14px;
`;

const PrizeEmoji = styled.div`
  font-size: 52px;
  margin-bottom: 8px;
`;

const PrizeName = styled.div`
  font-family: ${props => props.theme.typography.fonts.heading};
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.theme.colors.darkGreen};
`;

const PrizeHint = styled.p`
  font-size: 13px;
  color: rgba(1, 57, 39, 0.65);
  line-height: 1.6;
`;

const DoneButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 13px 20px;
  border-radius: 999px;
  border: none;
  font-family: inherit;
  background: ${props => props.theme.colors.darkGreen};
  color: #fdf9f0;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 4px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(1, 57, 39, 0.3);
  }
`;

// Géométrie des parts (5 parts égales de 72°)
const SEGMENT_ANGLE = 360 / PRIZES.length;
const CX = 145;
const CY = 145;
const R = 140;

const polar = (angleDeg, radius) => {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return [CX + radius * Math.cos(rad), CY + radius * Math.sin(rad)];
};

const segmentPath = (index) => {
  const start = index * SEGMENT_ANGLE;
  const end = start + SEGMENT_ANGLE;
  const [x1, y1] = polar(start, R);
  const [x2, y2] = polar(end, R);
  return `M ${CX} ${CY} L ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2} Z`;
};

const ReviewWheel = ({ open, onClose }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : i18n.language === 'es' ? 'es' : 'fr';

  const [reviewClicked, setReviewClicked] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState(null);
  const pendingPrize = useRef(null);

  const t = (fr, en, es) => (lang === 'en' ? en : lang === 'es' ? es : fr);

  const handleReviewClick = () => {
    setReviewClicked(true);
  };

  const handleSpin = () => {
    if (!reviewClicked || spinning || wonPrize) return;
    const prizeIndex = pickPrizeIndex();
    pendingPrize.current = PRIZES[prizeIndex];
    // Angle du centre de la part gagnante + jitter pour un rendu naturel
    const segmentCenter = prizeIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
    const jitter = (Math.random() - 0.5) * (SEGMENT_ANGLE - 20);
    const target = 360 * 7 + (360 - segmentCenter) + jitter;
    setSpinning(true);
    setRotation(prev => prev + target);
  };

  const handleSpinComplete = () => {
    if (!spinning || !pendingPrize.current) return;
    const prize = pendingPrize.current;
    setSpinning(false);
    // Petite pause pour laisser la roue "respirer" avant l'écran de gain
    setTimeout(() => {
      setWonPrize(prize);
      try {
        localStorage.setItem('bh_wheel_prize', prize.id);
      } catch (e) { /* stockage indisponible */ }
    }, 450);
  };

  const handleClose = () => {
    if (spinning) return;
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <Card
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseBtn onClick={handleClose} aria-label={t('Fermer', 'Close', 'Cerrar')}>
              <FiX size={18} />
            </CloseBtn>

            {!wonPrize ? (
              <>
                <StepsIndicator>
                  <StepDot $active={!reviewClicked}>
                    <span className="num">1</span>
                    {t('Avis Google', 'Google review', 'Reseña Google')}
                  </StepDot>
                  <StepLine />
                  <StepDot $active={reviewClicked}>
                    <span className="num">2</span>
                    {t('Roue', 'Wheel', 'Ruleta')}
                  </StepDot>
                </StepsIndicator>

                <StepTitle>
                  {t(
                    '🎡 Tentez de gagner un cadeau !',
                    '🎡 Spin to win a gift!',
                    '🎡 ¡Gira y gana un regalo!'
                  )}
                </StepTitle>
                <StepText>
                  {t(
                    "Laissez-nous un avis sur Google, puis tournez la roue pour tenter de gagner une canette, un croissant, un smoothie, un toast œuf bacon… ou même une formule l'Efficace !",
                    "Leave us a Google review, then spin the wheel for a chance to win a canned drink, a croissant, a smoothie, an egg bacon toast… or even our 'l'Efficace' set menu!",
                    "Déjanos una reseña en Google y gira la ruleta para ganar una lata, un croissant, un smoothie, una tostada de huevo y bacon… ¡o incluso nuestra fórmula 'l'Efficace'!"
                  )}
                </StepText>

                <WheelWrapper>
                  <PointerWrapper>
                    <PointerTip
                      animate={spinning ? { rotate: [0, -18, 0] } : { rotate: 0 }}
                      transition={
                        spinning
                          ? { duration: 0.18, repeat: Infinity, ease: 'easeInOut' }
                          : { type: 'spring', stiffness: 400, damping: 12 }
                      }
                    />
                  </PointerWrapper>
                  <Hub
                    as={motion.div}
                    animate={spinning ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                    transition={
                      spinning
                        ? { duration: 0.6, repeat: Infinity, ease: 'easeInOut' }
                        : { duration: 0.3 }
                    }
                  >
                    🥞
                  </Hub>
                  <WheelSvg
                    viewBox="0 0 290 290"
                    animate={
                      rotation === 0
                        ? { rotate: 0 }
                        : { rotate: [null, rotation + 8, rotation] }
                    }
                    transition={
                      rotation === 0
                        ? { duration: 0 }
                        : {
                            duration: 6.2,
                            times: [0, 0.85, 1],
                            ease: [[0.12, 0.56, 0.18, 0.99], 'easeInOut'],
                          }
                    }
                    onAnimationComplete={handleSpinComplete}
                  >
                    {PRIZES.map((prize, i) => (
                      <g key={prize.id}>
                        <path
                          d={segmentPath(i)}
                          fill={prize.color}
                          stroke="#FDF9F0"
                          strokeWidth="3"
                        />
                        <g
                          transform={`rotate(${i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2} ${CX} ${CY})`}
                        >
                          <text
                            x={CX}
                            y={40}
                            textAnchor="middle"
                            fontSize="20"
                          >
                            {prize.emoji}
                          </text>
                          <text
                            x={CX}
                            y={60}
                            textAnchor="middle"
                            fontSize="9"
                            fontWeight="700"
                            fill="#FDF9F0"
                          >
                            {prize.label[lang].length > 17
                              ? prize.label[lang].slice(0, 16) + '…'
                              : prize.label[lang]}
                          </text>
                        </g>
                      </g>
                    ))}
                    <circle cx={CX} cy={CY} r={R} fill="none" stroke="#013927" strokeWidth="6" />
                  </WheelSvg>
                </WheelWrapper>

                {!reviewClicked ? (
                  <>
                    <GoogleButton
                      href={GOOGLE_REVIEW_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleReviewClick}
                    >
                      <FaGoogle size={18} />
                      {t(
                        'Laisser un avis sur Google',
                        'Leave a review on Google',
                        'Dejar una reseña en Google'
                      )}
                      <FiExternalLink size={16} />
                    </GoogleButton>
                    <LockNote>
                      {t(
                        '🔒 La roue se débloque après avoir laissé votre avis',
                        '🔒 The wheel unlocks after leaving your review',
                        '🔒 La ruleta se desbloquea tras dejar tu reseña'
                      )}
                    </LockNote>
                  </>
                ) : (
                  <ReviewDoneNote>
                    <FiCheckCircle size={16} />
                    {t('Merci pour votre avis !', 'Thanks for your review!', '¡Gracias por tu reseña!')}
                  </ReviewDoneNote>
                )}

                <SpinButton disabled={!reviewClicked || spinning} onClick={handleSpin}>
                  {spinning
                    ? t('La roue tourne…', 'Spinning…', 'Girando…')
                    : t('🎰 Tourner la roue !', '🎰 Spin the wheel!', '🎰 ¡Girar la ruleta!')}
                </SpinButton>

                <Disclaimer>
                  {t(
                    '* Offre réservée aux clients présents sur place au restaurant.',
                    '* Offer reserved for customers dining in at the restaurant.',
                    '* Oferta reservada a los clientes presentes en el restaurante.'
                  )}
                </Disclaimer>
              </>
            ) : (
              <>
                <ConfettiBurst />
                <StepTitle>
                  {t('🎉 Félicitations !', '🎉 Congratulations!', '🎉 ¡Felicidades!')}
                </StepTitle>
                <StepText>
                  {t('Vous avez gagné :', 'You won:', 'Has ganado:')}
                </StepText>
                <PrizeCard
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  <PrizeEmoji>{wonPrize.emoji}</PrizeEmoji>
                  <PrizeName>{wonPrize.label[lang]}</PrizeName>
                </PrizeCard>
                <PrizeHint>
                  {t(
                    'Montrez cet écran à notre équipe lors de votre commande pour profiter de votre cadeau. Offre valable uniquement sur place, aujourd’hui.',
                    'Show this screen to our team when ordering to enjoy your gift. Offer valid for dine-in only, today.',
                    'Muestra esta pantalla a nuestro equipo al hacer tu pedido para disfrutar de tu regalo. Oferta válida solo en el restaurante, hoy.'
                  )}
                </PrizeHint>
                <DoneButton onClick={handleClose}>
                  {t('Super, merci !', 'Great, thanks!', '¡Genial, gracias!')}
                </DoneButton>
              </>
            )}
          </Card>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default ReviewWheel;
