import styled from 'styled-components';
import { motion } from 'framer-motion';

const DotsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
`;

const Dot = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.$color || props.theme.colors.floralWhite};
  box-shadow: 0 0 20px ${props => props.$glow || 'rgba(253, 249, 240, 0.6)'};
`;

const DecorativeDots = () => {
  const dots = [
    {
      size: 4,
      top: '15%',
      left: '20%',
      color: '#FCBDBD',
      glow: 'rgba(252, 189, 189, 0.6)',
      delay: 0
    },
    {
      size: 8,
      top: '25%',
      right: '15%',
      color: '#FDF9F0',
      glow: 'rgba(253, 249, 240, 0.8)',
      delay: 1
    },
    {
      size: 6,
      bottom: '35%',
      left: '10%',
      color: '#BE6A65',
      glow: 'rgba(190, 106, 101, 0.7)',
      delay: 2
    },
    {
      size: 12,
      bottom: '20%',
      right: '25%',
      color: '#FDF9F0',
      glow: 'rgba(253, 249, 240, 0.9)',
      delay: 0.5
    },
    {
      size: 5,
      top: '40%',
      left: '8%',
      color: '#FCBDBD',
      glow: 'rgba(252, 189, 189, 0.5)',
      delay: 1.5
    },
    {
      size: 7,
      top: '60%',
      right: '12%',
      color: '#FDF9F0',
      glow: 'rgba(253, 249, 240, 0.7)',
      delay: 3
    }
  ];

  return (
    <DotsContainer>
      {dots.map((dot, index) => (
        <Dot
          key={index}
          style={{
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            top: dot.top,
            bottom: dot.bottom,
            left: dot.left,
            right: dot.right,
          }}
          $color={dot.color}
          $glow={dot.glow}
          initial={{
            opacity: 0,
            scale: 0,
            y: 20
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.3, 1],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 4,
            delay: dot.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </DotsContainer>
  );
};

export default DecorativeDots;