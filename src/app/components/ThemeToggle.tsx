import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-4 rounded-full backdrop-blur-md border border-purple-500/30 bg-black/20 hover:bg-black/40 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        boxShadow: isDark
          ? '0 0 20px rgba(139, 92, 246, 0.3)'
          : '0 0 20px rgba(251, 191, 36, 0.3)',
      }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.5 }}
      >
        {isDark ? (
          <Moon className="w-6 h-6 text-purple-400" />
        ) : (
          <Sun className="w-6 h-6 text-amber-400" />
        )}
      </motion.div>
    </motion.button>
  );
}
