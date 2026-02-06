import { motion } from 'framer-motion';

const WindVane = ({ direction, speed }) => {
  // Convert wind direction to rotation angle
  const getRotation = (dir) => {
    const directions = {
      'С': 0, 'СВ': 45, 'В': 90, 'ЮВ': 135,
      'Ю': 180, 'ЮЗ': 225, 'З': 270, 'СЗ': 315,
      'N': 0, 'NE': 45, 'E': 90, 'SE': 135,
      'S': 180, 'SW': 225, 'W': 270, 'NW': 315
    };
    return directions[dir] || 0;
  };

  // Calculate shake intensity based on wind speed
  const shakeIntensity = Math.min(speed / 100, 0.3);

  return (
    <motion.div
      className="relative w-8 h-8"
      animate={{
        rotate: [
          getRotation(direction) - shakeIntensity, 
          getRotation(direction) + shakeIntensity
        ],
      }}
      transition={{
        duration: 0.15,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      }}
    >
      {/* Simple arrow pointing in wind direction */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-full h-full"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          d="M12 2L12 18M12 2L8 6M12 2L16 6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[var(--accent-color)]"
        />
      </svg>
    </motion.div>
  );
};

export default WindVane;
