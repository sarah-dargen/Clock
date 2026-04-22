/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Cloud, Flower, Wind, Music, Wand2, Plus, Minus, Check } from 'lucide-react';

export default function App() {
  const [time, setTime] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);
  const [offsetMs, setOffsetMs] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      if (!isEditing) {
        setTime(new Date(now.getTime() + offsetMs));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isEditing, offsetMs]);

  const adjustTime = (type: 'hours' | 'minutes', amount: number) => {
    const msToAdd = amount * (type === 'hours' ? 3600000 : 60000);
    setOffsetMs(prev => prev + msToAdd);
    setTime(prev => new Date(prev.getTime() + msToAdd));
  };

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const ampm = hours >= 12 ? 'pm' : 'am';
  const displayHours = (hours % 12 || 12).toString();
  const displayMinutes = minutes.toString().padStart(2, '0');
  const displaySeconds = seconds.toString().padStart(2, '0');

  // Interactive elements: "Goofy" bounce for everything
  const bounceTransition = {
    type: "spring",
    stiffness: 400,
    damping: 10,
    repeat: Infinity,
    repeatType: "reverse" as const,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#BAE6FD] via-[#F0FDF4] to-[#BBF7D0] overflow-hidden flex flex-col font-rounded p-4 md:p-8 cursor-default select-none">
      
      {/* Floating Clouds Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-[10%] left-[5%]"
          animate={{ x: [0, 40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <Cloud size={80} className="text-white opacity-60" fill="white" />
        </motion.div>
        <motion.div 
          className="absolute top-[15%] right-[10%]"
          animate={{ x: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <Cloud size={100} className="text-white opacity-40" fill="white" />
        </motion.div>
        <motion.div 
          className="absolute bottom-[20%] left-[8%]"
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <Cloud size={60} className="text-white opacity-50" fill="white" />
        </motion.div>
      </div>

      {/* Header with Sun */}
      <header className="relative z-10 flex justify-between items-center bg-white/30 backdrop-blur-md p-4 md:p-6 rounded-[40px] border-4 border-dashed border-[#FCD34D]">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sun size={48} className="text-[#FBBF24]" fill="#FDE68A" />
          </motion.div>
          <h1 className="font-display text-4xl md:text-5xl text-[#166534] tracking-wider drop-shadow-sm">
            Spring <span className="text-[#BE185D]">Clock</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsEditing(!isEditing)}
            className={`p-4 rounded-full shadow-lg border-2 transition-all duration-300 ${isEditing ? 'bg-[#BE185D] border-white text-white' : 'bg-white border-[#BE185D] text-[#BE185D]'}`}
          >
            {isEditing ? <Check size={24} /> : <Wand2 size={24} />}
          </motion.button>

          <div className="hidden sm:flex gap-4">
            <motion.div animate={{ y: [0, -5] }} transition={bounceTransition}>
              <div className="bg-[#DBEAFE] px-4 py-2 rounded-full border-2 border-[#60A5FA] text-[#1E40AF] font-bold text-sm">
                {isEditing ? "Time Travel Mode!" : "Today is Happy Day!"}
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center gap-12 py-12 relative z-10">
        
        {/* Digital Time - Goofy Bubble Text */}
        <div className="flex flex-col items-center gap-6 w-full max-w-4xl">
          <motion.div 
            layout
            className="bg-white/60 backdrop-blur-lg px-8 md:px-12 py-8 rounded-[60px] border-8 border-white shadow-xl flex flex-col items-center w-full md:w-auto"
            whileHover={!isEditing ? { scale: 1.05, rotate: [-1, 1, -1] } : {}}
          >
            <div className="flex flex-col items-center">
              <div className="flex items-baseline gap-2">
                {/* Hour Controls */}
                <div className="flex flex-col items-center gap-2">
                  <AnimatePresence>
                    {isEditing && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        onClick={() => adjustTime('hours', 1)}
                        className="bg-[#BE185D]/10 p-2 rounded-full text-[#BE185D] hover:bg-[#BE185D]/20 transition-colors"
                      >
                        <Plus size={32} />
                      </motion.button>
                    )}
                  </AnimatePresence>
                  <span className="font-display text-8xl md:text-[10rem] text-[#BE185D] leading-none drop-shadow-md">
                    {displayHours}
                  </span>
                  <AnimatePresence>
                    {isEditing && (
                      <motion.button
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        onClick={() => adjustTime('hours', -1)}
                        className="bg-[#BE185D]/10 p-2 rounded-full text-[#BE185D] hover:bg-[#BE185D]/20 transition-colors"
                      >
                        <Minus size={32} />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                <motion.span 
                  className="text-6xl md:text-8xl text-[#F472B6]"
                  animate={!isEditing ? { opacity: [1, 0, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  :
                </motion.span>

                {/* Minute Controls */}
                <div className="flex flex-col items-center gap-2">
                  <AnimatePresence>
                    {isEditing && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        onClick={() => adjustTime('minutes', 1)}
                        className="bg-[#BE185D]/10 p-2 rounded-full text-[#BE185D] hover:bg-[#BE185D]/20 transition-colors"
                      >
                        <Plus size={32} />
                      </motion.button>
                    )}
                  </AnimatePresence>
                  <span className="font-display text-8xl md:text-[10rem] text-[#BE185D] leading-none drop-shadow-md">
                    {displayMinutes}
                  </span>
                  <AnimatePresence>
                    {isEditing && (
                      <motion.button
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        onClick={() => adjustTime('minutes', -1)}
                        className="bg-[#BE185D]/10 p-2 rounded-full text-[#BE185D] hover:bg-[#BE185D]/20 transition-colors"
                      >
                        <Minus size={32} />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-2">
                <span className="text-4xl font-display text-[#F472B6]">:{displaySeconds}</span>
                <span className="bg-[#FBCFE8] px-4 py-1 rounded-full text-xl font-black text-[#BE185D] uppercase tracking-tighter">
                  {ampm}
                </span>
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex gap-4"
              >
                <button 
                  onClick={() => {
                    setOffsetMs(0);
                    setTime(new Date());
                    setIsEditing(false);
                  }}
                  className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-[#BE185D] text-[#BE185D] font-bold shadow-md hover:bg-[#BE185D] hover:text-white transition-all"
                >
                  Reset to Real Time
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Date Label */}
          <motion.div 
            className="bg-[#A7F3D0] px-8 py-4 rounded-full border-4 border-[#10B981] shadow-lg"
            animate={{ x: [-2, 2] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          >
            <p className="text-2xl font-bold text-[#064E3B] flex items-center gap-3">
              <Flower size={20} className="text-[#EC4899]" fill="#F9A8D4" />
              {formatDate(time)}
              <Wind size={20} className="text-[#60A5FA]" />
            </p>
          </motion.div>
        </div>
      </main>

      {/* Footer Area with Grass */}
      <footer className="mt-auto relative h-24 flex items-end justify-center pb-4">
        {/* Grass Blades */}
        <div className="absolute inset-0 flex items-end justify-around overflow-hidden px-4">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="w-4 bg-gradient-to-t from-[#166534] to-[#4ADE80] rounded-t-full"
              style={{ height: `${20 + Math.random() * 40}px` }}
              animate={{ skewX: [-5, 5, -5] }}
              transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
        
        <div className="relative z-10 flex items-center gap-6 px-10 py-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-[#166534] font-bold text-xs">
          <div className="flex items-center gap-2">
            <Music size={14} className="animate-bounce" />
            <span>Birds Chirping // Mode: Super Happy</span>
          </div>
          <div className="hidden sm:block h-3 w-px bg-[#166534]/20" />
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-2 h-2 bg-[#F472B6] rounded-full animate-ping" />
            <span>Spring in the Air!</span>
          </div>
        </div>
      </footer>

      {/* Interactive Floating Sprinkles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight + 100,
              opacity: 0.3 + Math.random() * 0.4
            }}
            animate={{ 
              y: -100, 
              rotate: 360,
              x: (Math.random() - 0.5) * 200 + (Math.random() * window.innerWidth)
            }}
            transition={{ 
              duration: 10 + Math.random() * 20, 
              repeat: Infinity, 
              delay: Math.random() * 20,
              ease: "linear"
            }}
          >
            <div className={`w-3 h-3 rounded-full ${['bg-pink-300', 'bg-blue-300', 'bg-yellow-300', 'bg-purple-300'][i % 4]}`} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
