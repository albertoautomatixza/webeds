'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            duration: 1,
          }}
          className="mb-8"
        >
          <div className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-[1.5rem]">
            <div className="pointer-events-none absolute -inset-[6px] rounded-[inherit] border border-white/25" />
            <div
              className="pointer-events-none absolute -inset-[6px] rounded-[inherit] opacity-80"
              style={{
                maskImage:
                  'radial-gradient(farthest-side, transparent calc(100% - 4px), black calc(100% - 0px))',
                WebkitMaskImage:
                  'radial-gradient(farthest-side, transparent calc(100% - 4px), black calc(100% - 0px))',
              }}
            >
              <div className="h-full w-full animate-[spin_5s_linear_infinite] rounded-[inherit] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(255,255,255,0.9)_120deg,transparent_240deg)]" />
            </div>
            <div className="relative flex h-full w-full items-center justify-center rounded-[inherit] bg-yellow-400 shadow-2xl">
              <span className="text-7xl font-black text-black">EDS</span>
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-2xl font-bold text-white mb-1"
        >
          Engineering Design & Solutions
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-gray-400 text-sm mb-8"
        >
          Loading experience...
        </motion.p>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '200px' }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="h-1 bg-zinc-800 rounded-full mx-auto overflow-hidden"
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: 'linear',
            }}
            className="h-full w-1/2 bg-yellow-400 rounded-full"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
