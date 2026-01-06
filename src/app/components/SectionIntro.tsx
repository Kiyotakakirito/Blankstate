import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface SectionIntroProps {
  badge?: string;
  badgeIcon?: ReactNode;
  title: string;
  description: string;
  gradient?: string;
}

export function SectionIntro({ 
  badge, 
  badgeIcon,
  title, 
  description,
  gradient = 'linear-gradient(to right, #000000, #ffffff)'
}: SectionIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="text-center mb-20 max-w-3xl mx-auto"
    >
      {/* Optional badge */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 backdrop-blur-md border border-purple-500/20 mb-6"
        >
          {badgeIcon && <span className="text-purple-600 dark:text-purple-400">{badgeIcon}</span>}
          <span className="text-sm text-purple-600 dark:text-purple-200 tracking-wide">{badge}</span>
        </motion.div>
      )}
      
      {/* Section title */}
      <h2 
        className="text-4xl md:text-5xl lg:text-6xl mb-6 font-bold tracking-tight"
        style={{
          background: gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </h2>
      
      {/* Section description */}
      <p 
        className="text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300"
      >
        {description}
      </p>
    </motion.div>
  );
}
