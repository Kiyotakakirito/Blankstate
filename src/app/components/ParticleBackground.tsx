import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function ParticleBackground() {
  const { isDark } = useTheme();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Fewer particles for a cleaner look
    const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient background - more subtle */}
      <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-black via-[#1a1a1a] to-[#2a2a2a]' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'}`} />
      
      {/* Nebula effects - reduced opacity and blur */}
      <motion.div 
        className="absolute top-0 right-0 w-[50%] h-[50%] rounded-full blur-[150px]" 
        style={{
          background: `radial-gradient(circle, ${isDark ? 'rgba(200, 200, 200, 0.1)' : 'rgba(100, 100, 100, 0.05)'}, transparent 70%)`,
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 w-[50%] h-[50%] rounded-full blur-[150px]" 
        style={{
          background: `radial-gradient(circle, ${isDark ? 'rgba(150, 150, 150, 0.1)' : 'rgba(50, 50, 50, 0.05)'}, transparent 70%)`,
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
      
      {/* Floating particles - subtle */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.15)',
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}