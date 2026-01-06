import { useState, useEffect } from 'react';
import { ParticleBackground } from './components/ParticleBackground';
import { HeroSection } from './components/HeroSection';
import { Dashboard } from './components/Dashboard';
import { TimeRing } from './components/TimeRing';
import { RoutineBuilder } from './components/RoutineBuilder';
import { HabitTracker } from './components/HabitTracker';
import { InsightsCards } from './components/InsightsCards';
import { ThemeToggle } from './components/ThemeToggle';

export default function App() {

  const handleGetStarted = () => {
    // Smooth scroll to dashboard
    const dashboardSection = document.getElementById('dashboard');
    if (dashboardSection) {
      dashboardSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      {/* Cosmic particle background */}
      <ParticleBackground />

      {/* Theme toggle */}
      <ThemeToggle />

      {/* Main content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <HeroSection onGetStarted={handleGetStarted} />

        {/* Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent dark:via-purple-500/20 max-w-4xl mx-auto" />

        {/* Dashboard and Features */}
        <div id="dashboard">
          <Dashboard />
        </div>

        <TimeRing />

        <RoutineBuilder />

        <HabitTracker />

        <InsightsCards />

        {/* Footer */}
        <footer className="relative w-full max-w-7xl mx-auto px-6 py-16 text-center border-t border-purple-500/10 dark:border-purple-500/20">
          <div className="mb-4">
            <div className="text-2xl mb-2 bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Beyond Time
            </div>
            <div className="text-gray-600 dark:text-gray-500 text-sm">
              Daily Routine Optimizer
            </div>
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-xs">
            Master your time. Design your life.
          </div>
        </footer>
      </div>

      {/* Custom styles */}
      <style>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: var(--muted);
        }

        ::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: var(--foreground);
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}