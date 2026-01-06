import { motion } from 'motion/react';
import { useState } from 'react';
import { Sparkles, Play, ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePosition({
      x: (clientX / innerWidth - 0.5) * 20,
      y: (clientY / innerHeight - 0.5) * 20,
    });
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
      onMouseMove={handleMouseMove}
    >
      {/* Floating UI elements with parallax - more subtle */}
      <motion.div
        className="absolute top-32 left-[10%] w-64 h-64 rounded-full bg-gray-500/5 backdrop-blur-sm border border-gray-500/10"
        style={{
          x: mousePosition.x * 0.3,
          y: mousePosition.y * 0.3,
        }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute bottom-32 right-[10%] w-48 h-48 rounded-full bg-gray-600/5 backdrop-blur-sm border border-gray-600/10"
        style={{
          x: mousePosition.x * -0.2,
          y: mousePosition.y * -0.2,
        }}
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Subtle badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-500/10 backdrop-blur-md border border-gray-500/20 mb-12"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </motion.div>
          <span className="text-sm text-purple-600 dark:text-purple-200 tracking-wide">Beyond Time Experience</span>
        </motion.div>

        {/* Hero headline - refined typography */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
          style={{
            fontSize: 'clamp(3rem, 10vw, 7rem)',
            lineHeight: '1.1',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #000000 0%, #888888 40%, #cccccc 70%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Master Your Time.
          <br />
          Design Your Life.
        </motion.h1>

        {/* Clear value proposition */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-xl md:text-2xl mb-16 max-w-2xl mx-auto leading-relaxed text-gray-600 dark:text-gray-300"
        >
          A living system that optimizes your routines, habits, and energy — intelligently.
        </motion.p>

        {/* Clear CTAs with strong hierarchy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-20"
        >
          {/* Primary CTA - unmissable */}
          <motion.button
            onClick={onGetStarted}
            className="group relative px-10 py-5 rounded-full overflow-hidden min-w-[280px]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated gradient background */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-400"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            />
            
            {/* Breathing glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-300 blur-2xl"
              animate={{
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            <span className="relative flex items-center justify-center gap-2 text-white text-lg font-semibold">
              <Sparkles className="w-5 h-5" />
              Start Optimizing My Day
            </span>
          </motion.button>

          {/* Secondary CTA - clearly secondary */}
          <motion.button
            className="group px-10 py-5 rounded-full border-2 border-gray-500/30 backdrop-blur-sm hover:border-gray-500/50 hover:bg-gray-500/5 transition-all duration-300 min-w-[260px]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 text-lg font-medium group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
              <Play className="w-5 h-5" />
              Experience a Perfect Day
            </span>
          </motion.button>
        </motion.div>

        {/* Scroll indicator - elegant and clear */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-3 text-purple-600/60 dark:text-purple-300/60"
        >
          <span className="text-sm tracking-wider uppercase text-purple-600 dark:text-purple-300">Discover More</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}