import { motion } from 'motion/react';
import { Sparkles, TrendingUp, Lightbulb, Zap, Brain } from 'lucide-react';
import { SectionIntro } from './SectionIntro';

interface Insight {
  id: string;
  title: string;
  description: string;
  icon: typeof Sparkles;
  color: string;
  gradient: string;
}

const INSIGHTS: Insight[] = [
  {
    id: '1',
    title: 'Peak Focus Window',
    description: 'You focus best between 6:30–9:00 AM. Schedule your most important work during this golden window.',
    icon: Zap,
    color: '#fbbf24',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    id: '2',
    title: 'Energy Pattern Detected',
    description: 'Your energy dips after long screen sessions. Try a 5-minute reset every 90 minutes to maintain peak performance.',
    icon: TrendingUp,
    color: '#a855f7',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    id: '3',
    title: 'Productivity Boost',
    description: 'Tasks completed before 10 AM have a 40% higher success rate. Start your day with intention.',
    icon: Lightbulb,
    color: '#06b6d4',
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
];

export function InsightsCards() {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 py-24">
      {/* Section introduction */}
      <SectionIntro
        badge="AI Intelligence"
        badgeIcon={<Brain className="w-4 h-4" />}
        title="Smart Insights"
        description="Personalized insights that understand your patterns. Supportive guidance, not robotic data."
        gradient="linear-gradient(to right, #06b6d4, #a855f7, #fbbf24)"
      />

      {/* Insights grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {INSIGHTS.map((insight, index) => {
          const Icon = insight.icon;
          
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ 
                delay: index * 0.15, 
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
              className="relative group"
            >
              {/* Floating card */}
              <div className="relative h-full">
                {/* Subtle outer glow */}
                <motion.div
                  className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${insight.color}30, transparent 70%)`,
                    filter: 'blur(20px)',
                  }}
                />

                {/* Card content */}
                <div className={`relative h-full overflow-hidden rounded-3xl bg-gradient-to-br ${insight.gradient} backdrop-blur-sm border border-purple-500/20 p-8`}>
                  {/* Icon */}
                  <motion.div
                    className="relative mb-6"
                    whileHover={{
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    <div
                      className="inline-flex p-4 rounded-2xl"
                      style={{
                        backgroundColor: `${insight.color}20`,
                        boxShadow: `0 0 30px ${insight.color}30`,
                      }}
                    >
                      <Icon
                        className="w-8 h-8"
                        style={{ color: insight.color }}
                      />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3
                      className="text-2xl mb-4 font-semibold"
                      style={{ color: insight.color }}
                    >
                      {insight.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base mb-6">
                      {insight.description}
                    </p>

                    {/* Subtle data visualization - minimal */}
                    <div className="flex gap-1 h-12">
                      {Array.from({ length: 12 }).map((_, i) => {
                        const height = Math.random() * 60 + 40;
                        return (
                          <motion.div
                            key={i}
                            className="flex-1 rounded-sm"
                            style={{
                              backgroundColor: `${insight.color}40`,
                            }}
                            initial={{ scaleY: 0, height: 0 }}
                            whileInView={{ scaleY: 1, height: `${height}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.6,
                              delay: index * 0.15 + i * 0.03,
                              ease: [0.22, 1, 0.36, 1]
                            }}
                            style={{ transformOrigin: 'bottom' }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Subtle shimmer effect on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20"
                    style={{
                      background: `linear-gradient(135deg, transparent 0%, ${insight.color}60 50%, transparent 100%)`,
                    }}
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}