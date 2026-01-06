import { motion } from 'motion/react';
import { useState } from 'react';
import { Plus, Coffee, Laptop, Dumbbell, Book, Heart, Moon, Layers } from 'lucide-react';
import { SectionIntro } from './SectionIntro';

interface Task {
  id: string;
  name: string;
  icon: typeof Coffee;
  energy: 'low' | 'medium' | 'high';
  duration: number;
  timeSlot?: string;
}

const AVAILABLE_TASKS: Task[] = [
  { id: 't1', name: 'Morning Coffee', icon: Coffee, energy: 'low', duration: 30 },
  { id: 't2', name: 'Deep Work', icon: Laptop, energy: 'high', duration: 120 },
  { id: 't3', name: 'Workout', icon: Dumbbell, energy: 'medium', duration: 60 },
  { id: 't4', name: 'Reading', icon: Book, energy: 'low', duration: 45 },
  { id: 't5', name: 'Meditation', icon: Heart, energy: 'low', duration: 20 },
  { id: 't6', name: 'Evening Wind Down', icon: Moon, energy: 'low', duration: 30 },
];

const TIME_SLOTS = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00',
];

const ENERGY_COLORS = {
  low: '#888888',
  medium: '#aaaaaa',
  high: '#cccccc',
};

export function RoutineBuilder() {
  const [scheduledTasks, setScheduledTasks] = useState<Map<string, Task>>(new Map());
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setHoveredSlot(null);
  };

  const handleDrop = (timeSlot: string) => {
    if (draggedTask) {
      const newScheduled = new Map(scheduledTasks);
      newScheduled.set(timeSlot, { ...draggedTask, timeSlot });
      setScheduledTasks(newScheduled);
      setDraggedTask(null);
      setHoveredSlot(null);
    }
  };

  const removeTask = (timeSlot: string) => {
    const newScheduled = new Map(scheduledTasks);
    newScheduled.delete(timeSlot);
    setScheduledTasks(newScheduled);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 py-24">
      {/* Section introduction */}
      <SectionIntro
        badge="Interactive Builder"
        badgeIcon={<Layers className="w-4 h-4" />}
        title="Build Your Constellation"
        description="Design your perfect day. Drag tasks into time slots—each placement is intentional, each moment optimized."
        gradient="linear-gradient(to right, #000000, #ffffff)"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Available tasks */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-1"
        >
          <div className="sticky top-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-gray-500/10">
                <Plus className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-xl text-gray-700 dark:text-gray-300 font-semibold">Available Tasks</h3>
            </div>
            
            <div className="space-y-3">
              {AVAILABLE_TASKS.map((task, index) => {
                const Icon = task.icon;
                const isBeingDragged = draggedTask?.id === task.id;
                
                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.1,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    draggable
                    onDragStart={() => handleDragStart(task)}
                    onDragEnd={handleDragEnd}
                    className={`cursor-move transition-opacity duration-200 ${
                      isBeingDragged ? 'opacity-40' : 'opacity-100'
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.03, x: 8 }}
                      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border border-gray-500/20 p-4 backdrop-blur-sm group"
                    >
                      {/* Subtle glow on hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle at 0% 50%, ${ENERGY_COLORS[task.energy]}15, transparent 70%)`,
                        }}
                      />
                      
                      <div className="relative z-10 flex items-center gap-3">
                        <div
                          className="p-2.5 rounded-xl"
                          style={{
                            backgroundColor: `${ENERGY_COLORS[task.energy]}20`,
                          }}
                        >
                          <Icon
                            className="w-5 h-5"
                            style={{ color: ENERGY_COLORS[task.energy] }}
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="text-gray-100 dark:text-gray-100 text-sm font-medium truncate">
                            {task.name}
                          </div>
                          <div className="text-gray-600 dark:text-gray-500 text-xs">
                            {task.duration} min
                          </div>
                        </div>

                        {/* Energy indicator */}
                        <motion.div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{
                            backgroundColor: ENERGY_COLORS[task.energy],
                            boxShadow: `0 0 10px ${ENERGY_COLORS[task.energy]}`,
                          }}
                          animate={{
                            scale: [1, 1.3, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.2,
                          }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Helper text */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-6 p-4 rounded-xl bg-gray-500/5 border border-gray-500/20"
            >
              <p className="text-sm text-gray-700/80 dark:text-gray-300/80">
                💡 Drag tasks to build your perfect day
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-2"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-500/30 to-transparent" />
            <h3 className="text-xl text-gray-700 dark:text-gray-300 font-semibold">Your Day</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-500/30 to-transparent" />
          </div>
          
          <div className="space-y-2">
            {TIME_SLOTS.map((timeSlot, index) => {
              const scheduledTask = scheduledTasks.get(timeSlot);
              const isHovered = hoveredSlot === timeSlot;
              
              return (
                <motion.div
                  key={timeSlot}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.03,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setHoveredSlot(timeSlot);
                  }}
                  onDragLeave={() => setHoveredSlot(null)}
                  onDrop={() => handleDrop(timeSlot)}
                  className="relative"
                >
                  <div
                    className={`relative overflow-hidden rounded-2xl border backdrop-blur-sm p-4 transition-all duration-300 ${
                      scheduledTask
                        ? 'bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-gray-500/30'
                        : isHovered
                        ? 'bg-gray-500/10 border-gray-500/50 border-dashed scale-[1.02]'
                        : 'bg-black/10 border-gray-500/10 border-dashed hover:border-gray-500/20'
                    }`}
                  >
                    {/* Magnetic attraction effect */}
                    {isHovered && !scheduledTask && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-700/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                    )}

                    <div className="relative z-10 flex items-center gap-4">
                      {/* Time */}
                      <div className="w-20 text-gray-600 dark:text-gray-500 text-sm font-mono flex-shrink-0">
                        {timeSlot}
                      </div>

                      {/* Task or placeholder */}
                      {scheduledTask ? (
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="flex-1 flex items-center gap-3"
                        >
                          <div
                            className="p-2.5 rounded-xl"
                            style={{
                              backgroundColor: `${ENERGY_COLORS[scheduledTask.energy]}20`,
                            }}
                          >
                            {(() => {
                              const Icon = scheduledTask.icon;
                              return (
                                <Icon
                                  className="w-5 h-5"
                                  style={{ color: ENERGY_COLORS[scheduledTask.energy] }}
                                />
                              );
                            })()}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="text-gray-100 dark:text-gray-100 font-medium truncate">
                              {scheduledTask.name}
                            </div>
                            <div className="text-gray-600 dark:text-gray-500 text-sm">
                              {scheduledTask.duration} minutes
                            </div>
                          </div>

                          {/* Pulse animation */}
                          <motion.div
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{
                              backgroundColor: ENERGY_COLORS[scheduledTask.energy],
                            }}
                            animate={{
                              boxShadow: [
                                `0 0 10px ${ENERGY_COLORS[scheduledTask.energy]}`,
                                `0 0 20px ${ENERGY_COLORS[scheduledTask.energy]}`,
                                `0 0 10px ${ENERGY_COLORS[scheduledTask.energy]}`,
                              ],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                            }}
                          />

                          {/* Remove button */}
                          <motion.button
                            onClick={() => removeTask(timeSlot)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors flex-shrink-0"
                          >
                            <span className="text-red-400 text-sm">×</span>
                          </motion.button>
                        </motion.div>
                      ) : (
                        <div className="flex-1 text-gray-600 dark:text-gray-400 text-sm">
                          {isHovered ? '✨ Drop here' : 'Empty slot'}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}