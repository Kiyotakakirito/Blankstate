import { motion } from 'motion/react';
import { useState } from 'react';
import { Droplet, Brain, Dumbbell, Book, Sun, Moon, Flame } from 'lucide-react';
import { SectionIntro } from './SectionIntro';

interface Habit {
  id: string;
  name: string;
  icon: typeof Droplet;
  color: string;
  completed: boolean;
  streak: number;
}

const INITIAL_HABITS: Habit[] = [
  { id: '1', name: 'Hydration', icon: Droplet, color: '#888888', completed: true, streak: 7 },
  { id: '2', name: 'Meditation', icon: Brain, color: '#aaaaaa', completed: true, streak: 12 },
  { id: '3', name: 'Exercise', icon: Dumbbell, color: '#cccccc', completed: false, streak: 5 },
  { id: '4', name: 'Reading', icon: Book, color: '#666666', completed: true, streak: 3 },
  { id: '5', name: 'Morning Routine', icon: Sun, color: '#dddddd', completed: true, streak: 15 },
  { id: '6', name: 'Sleep Schedule', icon: Moon, color: '#444444', completed: false, streak: 8 },
];

export function HabitTracker() {
  const [habits, setHabits] = useState(INITIAL_HABITS);

  const toggleHabit = (id: string) => {
    setHabits(habits.map(habit => 
      habit.id === id 
        ? { ...habit, completed: !habit.completed }
        : habit
    ));
  };

  const completedCount = habits.filter(h => h.completed).length;

  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 py-24">
      {/* Section introduction */}
      <SectionIntro
        badge="Habit System"
        badgeIcon={<Flame className="w-4 h-4" />}
        title="Energy Cores"
        description="Your daily practices, visualized as energy. Complete habits to fill them with light. Progress feels calm, encouraging, and rewarding."
        gradient="linear-gradient(to right, #000000, #ffffff)"
      />

      {/* Habits grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {habits.map((habit, index) => {
          const Icon = habit.icon;
          const fillPercentage = habit.completed ? 100 : 0;

          return (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="relative"
            >
              <motion.button
                onClick={() => toggleHabit(habit.id)}
                className="w-full relative group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Card background */}
                <div className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border border-gray-500/20 p-8 backdrop-blur-sm">
                  {/* Subtle glow effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${habit.color === '#888888' ? '#888888' : habit.color === '#aaaaaa' ? '#aaaaaa' : habit.color === '#cccccc' ? '#cccccc' : habit.color === '#666666' ? '#666666' : habit.color === '#dddddd' ? '#dddddd' : '#444444'}20, transparent 70%)`,
                    }}
                  />

                  {/* Energy core visualization */}
                  <div className="relative z-10 flex flex-col items-center">
                    {/* Core circle */}
                    <div className="relative w-32 h-32 mb-6">
                      {/* Outer ring */}
                      <svg className="w-full h-full transform -rotate-90">
                        {/* Background circle */}
                        <circle
                          cx="64"
                          cy="64"
                          r="60"
                          fill="none"
                          stroke="rgba(150, 150, 150, 0.1)"
                          strokeWidth="8"
                        />
                        
                        {/* Progress circle */}
                        <motion.circle
                          cx="64"
                          cy="64"
                          r="60"
                          fill="none"
                          stroke={habit.color}
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 60}`}
                          initial={{ strokeDashoffset: 2 * Math.PI * 60 }}
                          animate={{
                            strokeDashoffset: 2 * Math.PI * 60 * (1 - fillPercentage / 100),
                          }}
                          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                          style={{
                            filter: habit.completed ? `drop-shadow(0 0 15px ${habit.color === '#888888' ? '#888888' : habit.color === '#aaaaaa' ? '#aaaaaa' : habit.color === '#cccccc' ? '#cccccc' : habit.color === '#666666' ? '#666666' : habit.color === '#dddddd' ? '#dddddd' : '#444444'})` : 'none',
                          }}
                        />
                      </svg>

                      {/* Icon in center */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="p-4 rounded-full"
                          style={{
                            backgroundColor: habit.completed ? `${habit.color === '#888888' ? '#888888' : habit.color === '#aaaaaa' ? '#aaaaaa' : habit.color === '#cccccc' ? '#cccccc' : habit.color === '#666666' ? '#666666' : habit.color === '#dddddd' ? '#dddddd' : '#444444'}30` : 'rgba(150, 150, 150, 0.1)',
                          }}
                          animate={habit.completed ? {
                            boxShadow: [
                              `0 0 20px ${habit.color}60`,
                              `0 0 40px ${habit.color}80`,
                              `0 0 20px ${habit.color}60`,
                            ],
                          } : {}}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          <Icon
                            className="w-8 h-8"
                            style={{
                              color: habit.completed ? (habit.color === '#888888' ? '#888888' : habit.color === '#aaaaaa' ? '#aaaaaa' : habit.color === '#cccccc' ? '#cccccc' : habit.color === '#666666' ? '#666666' : habit.color === '#dddddd' ? '#dddddd' : '#444444') : '#6b7280',
                            }}
                          />
                        </motion.div>
                      </div>

                      {/* Gentle particles when completed - reduced */}
                      {habit.completed && (
                        <>
                          {Array.from({ length: 6 }).map((_, i) => {
                            const angle = (i / 6) * 360;
                            return (
                              <motion.div
                                key={i}
                                className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full"
                                style={{
                                  backgroundColor: habit.color === '#888888' ? '#888888' : habit.color === '#aaaaaa' ? '#aaaaaa' : habit.color === '#cccccc' ? '#cccccc' : habit.color === '#666666' ? '#666666' : habit.color === '#dddddd' ? '#dddddd' : '#444444',
                                }}
                                animate={{
                                  x: [0, Math.cos((angle * Math.PI) / 180) * 25],
                                  y: [0, Math.sin((angle * Math.PI) / 180) * 25],
                                  opacity: [0.8, 0],
                                  scale: [0.5, 1],
                                }}
                                transition={{
                                  duration: 2.5,
                                  repeat: Infinity,
                                  delay: i * 0.3,
                                  ease: 'easeOut',
                                }}
                              />
                            );
                          })}
                        </>
                      )}
                    </div>

                    {/* Habit name */}
                    <h3
                      className="text-xl mb-2 transition-colors duration-300"
                      style={{
                        color: habit.completed ? (habit.color === '#888888' ? '#888888' : habit.color === '#aaaaaa' ? '#aaaaaa' : habit.color === '#cccccc' ? '#cccccc' : habit.color === '#666666' ? '#666666' : habit.color === '#dddddd' ? '#dddddd' : '#444444') : 'rgb(107, 114, 128)',
                      }}
                    >
                      {habit.name}
                    </h3>

                    {/* Streak indicator */}
                    <div className="flex items-center gap-2 mb-4">
                      <div
                        className="w-1 h-1 rounded-full"
                        style={{
                          backgroundColor: habit.color === '#888888' ? '#888888' : habit.color === '#aaaaaa' ? '#aaaaaa' : habit.color === '#cccccc' ? '#cccccc' : habit.color === '#666666' ? '#666666' : habit.color === '#dddddd' ? '#dddddd' : '#444444',
                          boxShadow: `0 0 8px ${habit.color === '#888888' ? '#888888' : habit.color === '#aaaaaa' ? '#aaaaaa' : habit.color === '#cccccc' ? '#cccccc' : habit.color === '#666666' ? '#666666' : habit.color === '#dddddd' ? '#dddddd' : '#444444'}`,
                        }}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {habit.streak} day streak
                      </span>
                    </div>

                    {/* Gentle progress trail */}
                    {habit.streak > 0 && (
                      <motion.div
                        className="h-1 rounded-full"
                        style={{
                          width: `${Math.min(habit.streak * 6, 100)}%`,
                          backgroundColor: habit.color === '#888888' ? '#888888' : habit.color === '#aaaaaa' ? '#aaaaaa' : habit.color === '#cccccc' ? '#cccccc' : habit.color === '#666666' ? '#666666' : habit.color === '#dddddd' ? '#dddddd' : '#444444',
                          boxShadow: `0 0 15px ${habit.color === '#888888' ? '#888888' : habit.color === '#aaaaaa' ? '#aaaaaa' : habit.color === '#cccccc' ? '#cccccc' : habit.color === '#666666' ? '#666666' : habit.color === '#dddddd' ? '#dddddd' : '#444444'}`,
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min(habit.streak * 6, 100)}%` }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 1.2, 
                          delay: index * 0.1 + 0.5,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                      />
                    )}

                    {/* Status text - calm and encouraging */}
                    <motion.div
                      className="mt-4 text-sm"
                      animate={habit.completed ? {
                        opacity: [0.7, 1, 0.7],
                      } : {}}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                      }}
                      style={{
                        color: habit.completed ? (habit.color === '#888888' ? '#888888' : habit.color === '#aaaaaa' ? '#aaaaaa' : habit.color === '#cccccc' ? '#cccccc' : habit.color === '#666666' ? '#666666' : habit.color === '#dddddd' ? '#dddddd' : '#444444') : 'rgb(107, 114, 128)',
                      }}
                    >
                      {habit.completed ? '✓ Completed' : 'Tap to complete'}
                    </motion.div>
                  </div>
                </div>
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* Summary - calm and encouraging */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-20 text-center"
      >
        <div className="inline-flex items-center gap-6 px-10 py-6 rounded-full bg-gradient-to-r from-gray-500/10 to-gray-700/10 backdrop-blur-md border border-gray-500/30">
          <div>
            <div className="text-4xl font-bold mb-1 bg-gradient-to-r from-gray-800 to-gray-400 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {completedCount}/{habits.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              Habits completed today
            </div>
          </div>
          {completedCount === habits.length && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-2xl"
            >
              ✨
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}