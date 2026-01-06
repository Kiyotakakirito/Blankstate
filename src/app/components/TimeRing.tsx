import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { SectionIntro } from './SectionIntro';
import { Clock } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  startHour: number;
  duration: number;
  energy: 'low' | 'medium' | 'high';
  icon: string;
}

const SAMPLE_TASKS: Task[] = [
  { id: '1', name: 'Morning Meditation', startHour: 6, duration: 1, energy: 'low', icon: '🧘' },
  { id: '2', name: 'Deep Work', startHour: 8, duration: 3, energy: 'high', icon: '💡' },
  { id: '3', name: 'Lunch & Walk', startHour: 12, duration: 1, energy: 'medium', icon: '🍽️' },
  { id: '4', name: 'Creative Session', startHour: 14, duration: 2, energy: 'high', icon: '🎨' },
  { id: '5', name: 'Exercise', startHour: 18, duration: 1, energy: 'medium', icon: '💪' },
  { id: '6', name: 'Evening Wind Down', startHour: 21, duration: 1, energy: 'low', icon: '📖' },
];

const ENERGY_COLORS = {
  low: '#06b6d4',
  medium: '#a855f7',
  high: '#fbbf24',
};

export function TimeRing() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hoveredTask, setHoveredTask] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentHour = currentTime.getHours() + currentTime.getMinutes() / 60;
  const currentAngle = (currentHour / 24) * 360 - 90;

  const getTaskPath = (task: Task) => {
    const startAngle = (task.startHour / 24) * 360 - 90;
    const endAngle = ((task.startHour + task.duration) / 24) * 360 - 90;
    const radius = 150;
    const thickness = 30;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = 200 + radius * Math.cos(startRad);
    const y1 = 200 + radius * Math.sin(startRad);
    const x2 = 200 + radius * Math.cos(endRad);
    const y2 = 200 + radius * Math.sin(endRad);

    const innerRadius = radius - thickness;
    const x3 = 200 + innerRadius * Math.cos(endRad);
    const y3 = 200 + innerRadius * Math.sin(endRad);
    const x4 = 200 + innerRadius * Math.cos(startRad);
    const y4 = 200 + innerRadius * Math.sin(startRad);

    const largeArc = task.duration > 12 ? 1 : 0;

    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`;
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 py-24">
      {/* Section introduction */}
      <SectionIntro
        badge="Time Visualization"
        badgeIcon={<Clock className="w-4 h-4" />}
        title="Your Living Timeline"
        description="Watch your day orbit like a constellation. Each glowing segment represents your tasks, energy, and flow through time."
        gradient="linear-gradient(to right, #a855f7, #06b6d4)"
      />

      {/* Time Ring SVG */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-2xl mx-auto"
      >
        <svg
          width="100%"
          viewBox="0 0 400 400"
          className="drop-shadow-2xl"
          style={{ filter: 'drop-shadow(0 0 60px rgba(139, 92, 246, 0.2))' }}
        >
          {/* Outer ring (hours) */}
          <circle
            cx="200"
            cy="200"
            r="150"
            fill="none"
            stroke="currentColor"
            className="stroke-purple-500/10 dark:stroke-purple-400/10"
            strokeWidth="1"
          />
          
          {/* Inner ring */}
          <circle
            cx="200"
            cy="200"
            r="120"
            fill="none"
            stroke="currentColor"
            className="stroke-purple-500/10 dark:stroke-purple-400/10"
            strokeWidth="1"
          />

          {/* Hour markers */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * 360 - 90;
            const rad = (angle * Math.PI) / 180;
            const x1 = 200 + 155 * Math.cos(rad);
            const y1 = 200 + 155 * Math.sin(rad);
            const x2 = 200 + 145 * Math.cos(rad);
            const y2 = 200 + 145 * Math.sin(rad);

            return (
              <g key={i}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="currentColor"
                  className={i % 6 === 0 ? 'stroke-purple-500/50 dark:stroke-purple-400/50' : 'stroke-purple-500/20 dark:stroke-purple-400/20'}
                  strokeWidth={i % 6 === 0 ? 2 : 1}
                />
                {i % 6 === 0 && (
                  <text
                    x={200 + 170 * Math.cos(rad)}
                    y={200 + 170 * Math.sin(rad)}
                    fill="currentColor" className="fill-purple-500/60 dark:fill-purple-400/60"
                    fontSize="12"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {i}
                  </text>
                )}
              </g>
            );
          })}

          {/* Task segments */}
          {SAMPLE_TASKS.map((task) => (
            <motion.path
              key={task.id}
              d={getTaskPath(task)}
              fill={ENERGY_COLORS[task.energy]}
              opacity={hoveredTask === task.id ? 0.9 : 0.6}
              onMouseEnter={() => setHoveredTask(task.id)}
              onMouseLeave={() => setHoveredTask(null)}
              style={{
                filter: hoveredTask === task.id 
                  ? `drop-shadow(0 0 20px ${ENERGY_COLORS[task.energy]})` 
                  : 'none',
                cursor: 'pointer',
              }}
              animate={hoveredTask === task.id ? {
                opacity: [0.6, 0.9, 0.6],
              } : {}}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Current time indicator */}
          <motion.g
            animate={{ rotate: currentAngle }}
            transition={{ duration: 0.5 }}
            style={{ transformOrigin: '200px 200px' }}
          >
            <line
              x1="200"
              y1="200"
              x2="200"
              y2="50"
              stroke="url(#timeGradient)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle
              cx="200"
              cy="50"
              r="6"
              fill="#fbbf24"
              style={{
                filter: 'drop-shadow(0 0 10px #fbbf24)',
              }}
            />
          </motion.g>

          {/* Center circle */}
          <circle
            cx="200"
            cy="200"
            r="40"
            fill="var(--card)"
            stroke="currentColor" className="stroke-purple-500/50 dark:stroke-purple-400/50"
            strokeWidth="2"
          />
          
          {/* Current time text */}
          <text
            x="200"
            y="195"
            fill="currentColor" className="fill-gray-900 dark:fill-white"
            fontSize="16"
            fontWeight="600"
            textAnchor="middle"
          >
            {currentTime.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: false 
            })}
          </text>
          <text
            x="200"
            y="210"
            fill="currentColor" className="fill-purple-500/80 dark:fill-purple-400/80"
            fontSize="10"
            textAnchor="middle"
          >
            NOW
          </text>

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="timeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>

        {/* Task tooltips */}
        {hoveredTask && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
            <div className="bg-white/95 dark:bg-black/95 backdrop-blur-xl border border-purple-500/40 rounded-2xl px-6 py-4 text-center shadow-2xl">
              <div className="text-3xl mb-2">
                {SAMPLE_TASKS.find(t => t.id === hoveredTask)?.icon}
              </div>
              <div className="text-gray-900 dark:text-white font-semibold mb-1">
                {SAMPLE_TASKS.find(t => t.id === hoveredTask)?.name}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                {SAMPLE_TASKS.find(t => t.id === hoveredTask)?.duration}h session
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex justify-center gap-8 mt-12"
      >
        {Object.entries(ENERGY_COLORS).map(([level, color]) => (
          <div key={level} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 12px ${color}`,
              }}
            />
            <span className="text-gray-600 dark:text-gray-400 text-sm capitalize tracking-wide">{level} Energy</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}