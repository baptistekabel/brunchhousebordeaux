import { useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

export const useScrollAnimation = (offset = ["start end", "end start"]) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset
  });

  // Animations de base
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  
  // Animations spring pour plus de fluidité
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });
  
  // Rotations 3D
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 10]);
  
  return {
    ref,
    scrollYProgress,
    opacity,
    y: springY,
    scale: springScale,
    rotateX,
    rotateY
  };
};

export const animationVariants = {
  // Fade et slide élégant
  fadeInUp: {
    hidden: { 
      opacity: 0, 
      y: 60,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },
  
  // Zoom avec rotation
  scaleRotate: {
    hidden: { 
      opacity: 0, 
      scale: 0.7,
      rotate: -5
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  },
  
  // Effet de carte qui se retourne
  flipCard: {
    hidden: { 
      opacity: 0, 
      rotateY: -90,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  },
  
  // Container avec stagger
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  },
  
  // Items du stagger
  staggerItem: {
    hidden: { 
      opacity: 0, 
      x: -30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },
  
  // Bounce élégant
  bounceIn: {
    hidden: { 
      opacity: 0, 
      scale: 0.3,
      y: 100
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  },
  
  // Effet de vague
  wave: {
    hidden: { 
      opacity: 0,
      x: -100,
      scaleX: 0
    },
    visible: i => ({
      opacity: 1,
      x: 0,
      scaleX: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  }
};

export const createScrollTrigger = (threshold = 0.1) => ({
  viewport: { once: true, margin: "-100px", amount: threshold }
});