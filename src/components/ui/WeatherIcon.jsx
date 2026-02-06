import { motion } from 'framer-motion';

const WeatherIcon = ({ type, className = "w-16 h-16" }) => {
  const iconTypes = {
    sun: (
      <motion.svg 
        viewBox="0 0 64 64" 
        className={className}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {/* Sun rays */}
        {[...Array(8)].map((_, i) => (
          <motion.line
            key={i}
            x1="32" y1="8" x2="32" y2="2"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            transform={`rotate(${i * 45} 32 32)`}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
        {/* Sun core */}
        <circle cx="32" cy="32" r="14" fill="currentColor" />
        <circle cx="32" cy="32" r="10" fill="var(--accent-color)" />
      </motion.svg>
    ),

    cloud: (
      <motion.svg 
        viewBox="0 0 64 64" 
        className={className}
      >
        <motion.path
          d="M16 40 Q16 28 28 28 Q30 16 44 20 Q56 16 56 32 Q64 32 64 44 Q64 56 48 56 L24 56 Q8 56 8 44 Q8 36 16 40"
          fill="currentColor"
          initial={{ x: -2 }}
          animate={{ x: 2 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
      </motion.svg>
    ),

    rain: (
      <motion.svg 
        viewBox="0 0 64 64" 
        className={className}
      >
        <path
          d="M16 36 Q16 24 28 24 Q30 12 44 16 Q56 12 56 28 Q64 28 64 40 Q64 52 48 52 L24 52 Q8 52 8 40 Q8 32 16 36"
          fill="currentColor"
        />
        {/* Rain drops */}
        {[0, 1, 2].map((i) => (
          <motion.line
            key={i}
            x1={20 + i * 12} y1="56" x2={16 + i * 12} y2="64"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: [0, 1, 0], y: [0, 10, 20] }}
            transition={{ 
              duration: 1, 
              repeat: Infinity, 
              delay: i * 0.3,
              ease: "easeIn"
            }}
          />
        ))}
      </motion.svg>
    ),

    snow: (
      <motion.svg 
        viewBox="0 0 64 64" 
        className={className}
      >
        <path
          d="M16 36 Q16 24 28 24 Q30 12 44 16 Q56 12 56 28 Q64 28 64 40 Q64 52 48 52 L24 52 Q8 52 8 40 Q8 32 16 36"
          fill="currentColor"
        />
        {/* Snowflakes */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={20 + i * 12}
            cy="56"
            r="2"
            fill="currentColor"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: [0, 1, 0], y: [0, 15, 30] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: i * 0.5,
              ease: "linear"
            }}
          />
        ))}
      </motion.svg>
    ),

    storm: (
      <motion.svg 
        viewBox="0 0 64 64" 
        className={className}
      >
        <path
          d="M16 36 Q16 24 28 24 Q30 12 44 16 Q56 12 56 28 Q64 28 64 40 Q64 52 48 52 L24 52 Q8 52 8 40 Q8 32 16 36"
          fill="currentColor"
        />
        {/* Lightning */}
        <motion.path
          d="M28 44 L24 56 L32 56 L28 68"
          stroke="var(--accent-color)"
          strokeWidth="3"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />
      </motion.svg>
    ),

    moon: (
      <motion.svg 
        viewBox="0 0 64 64" 
        className={className}
      >
        <motion.path
          d="M40 8 A 24 24 0 1 1 40 56 A 18 18 0 1 0 40 8"
          fill="currentColor"
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Stars */}
        {[...Array(3)].map((_, i) => (
          <motion.circle
            key={i}
            cx={50 + i * 5}
            cy={15 + i * 10}
            r="1"
            fill="currentColor"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </motion.svg>
    ),

    partlyCloudy: (
      <motion.svg 
        viewBox="0 0 64 64" 
        className={className}
      >
        {/* Sun behind cloud */}
        <motion.circle
          cx="24"
          cy="24"
          r="10"
          fill="var(--accent-color)"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "24px 24px" }}
        />
        {/* Cloud in front */}
        <motion.path
          d="M16 40 Q16 28 28 28 Q30 16 44 20 Q56 16 56 32 Q64 32 64 44 Q64 56 48 56 L24 56 Q8 56 8 44 Q8 36 16 40"
          fill="currentColor"
          initial={{ x: 0 }}
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>
    ),
  };

  return iconTypes[type] || iconTypes.sun;
};

export default WeatherIcon;
