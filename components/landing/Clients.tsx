'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const clients = [
  { name: 'PEMEX', logo: 'https://via.placeholder.com/150x80/FFD700/000000?text=PEMEX' },
  { name: 'CFE', logo: 'https://via.placeholder.com/150x80/FFD700/000000?text=CFE' },
  { name: 'Grupo Bimbo', logo: 'https://via.placeholder.com/150x80/FFD700/000000?text=BIMBO' },
  { name: 'Nissan', logo: 'https://via.placeholder.com/150x80/FFD700/000000?text=NISSAN' },
  { name: 'Coca-Cola FEMSA', logo: 'https://via.placeholder.com/150x80/FFD700/000000?text=FEMSA' },
  { name: 'Cemex', logo: 'https://via.placeholder.com/150x80/FFD700/000000?text=CEMEX' },
  { name: 'Schneider Electric', logo: 'https://via.placeholder.com/150x80/FFD700/000000?text=SCHNEIDER' },
  { name: 'ABB', logo: 'https://via.placeholder.com/150x80/FFD700/000000?text=ABB' },
];

export default function Clients() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="clientes" className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl sm:text-6xl font-bold mb-6 text-white">
            Clients
          </h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6" />
          <p className="text-xl text-gray-400">
            Companies that trust our engineering solutions
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

          <motion.div
            animate={{
              x: [0, -1200],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 30,
                ease: 'linear',
              },
            }}
            className="flex gap-12 items-center"
          >
            {[...clients, ...clients].map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1 * (index % clients.length) }}
                className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <div className="w-40 h-20 flex items-center justify-center bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-yellow-400/50 rounded-lg transition-all p-4">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
