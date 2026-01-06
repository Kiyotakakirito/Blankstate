import { motion } from 'motion/react';
import { Zap, TrendingUp, Clock, Target } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SectionIntro } from './SectionIntro';

export function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const stats = [
    { label: 'Tasks Completed', value: '12/15', icon: Target, color: '#888888', progress: 80 },
    { label: 'Focus Time', value: '4.5h', icon: Clock, color: '#aaaaaa', progress: 75 },
    { label: 'Energy Level', value: 'High', icon: Zap, color: '#cccccc', progress: 90 },
    { label: 'Productivity', value: '+23%', icon: TrendingUp, color: '#666666', progress: 85 },
  ];

  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 py-24">
      {/* Section introduction */}
      <SectionIntro
        badge="Your Command Center"
        title="Welcome Home"
        description="A real-time view of your day, energy, and progress. Everything you need to know, at a glance."
        gradient="linear-gradient(135deg, #000000, #ffffff)"
      />

      {/* Personalized greeting card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16 overflow-hidden rounded-3xl bg-gradient-to-br from-gray-500/10 to-gray-700/10 backdrop-blur-md border border-gray-500/20 p-8 md:p-12"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="text-gray-700/70 dark:text-gray-300/60 text-sm mb-2 tracking-wider uppercase">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <h3 
              className="text-4xl md:text-5xl mb-3 font-bold bg-gradient-to-r from-gray-800 to-gray-400 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
            >
              {getGreeting()}, Nirmal
            </h3>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              You're ahead of schedule. Keep the momentum going.
            </p>
          </div>
          
          {/* Live time display */}
          <div className="flex items-center gap-3">
            <motion.div
              className="w-2 h-2 rounded-full bg-green-400"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.6, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <span className="text-2xl font-mono text-gray-700 dark:text-gray-200">
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
              })}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Stats grid - cleaner, more focused */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative group"
            >
              <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border border-gray-500/20 p-6 backdrop-blur-sm">
                {/* Subtle glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${stat.color}15, transparent 70%)`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="p-3 rounded-xl"
                      style={{
                        backgroundColor: stat.color.includes('#06b6d4') ? '#88888815' : stat.color.includes('#a855f7') ? '#aaaaaa15' : stat.color.includes('#fbbf24') ? '#cccccc15' : '#66666615',
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: stat.color.includes('#06b6d4') ? '#888888' : stat.color.includes('#a855f7') ? '#aaaaaa' : stat.color.includes('#fbbf24') ? '#cccccc' : '#666666' }} />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div 
                      className="text-3xl font-bold mb-1"
                      style={{ color: stat.color.includes('#06b6d4') ? '#888888' : stat.color.includes('#a855f7') ? '#aaaaaa' : stat.color.includes('#fbbf24') ? '#cccccc' : '#666666' }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">
                      {stat.label}
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-gray-700/40 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: stat.color.includes('#06b6d4') ? '#888888' : stat.color.includes('#a855f7') ? '#aaaaaa' : stat.color.includes('#fbbf24') ? '#cccccc' : '#666666' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stat.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 1.2, 
                        delay: index * 0.1 + 0.3,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}