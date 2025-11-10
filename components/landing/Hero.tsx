'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black grid-bg"
    >
      <div className="absolute inset-0 bg-black">
        <div className="relative h-full w-full">
          <Image
            src="https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Industrial manufacturing equipment"
            fill
            priority
            className="object-cover opacity-30"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      <div className="absolute top-32 left-10 decorative-box w-96 h-72 opacity-20" />
      <div className="absolute top-1/4 right-20 decorative-box w-64 h-80 opacity-15" />
      <div className="absolute bottom-32 right-1/4 decorative-box w-80 h-56 opacity-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen py-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-box p-10"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 leading-tight text-white uppercase tracking-tight"
            >
              We are a company with{' '}
              <span className="text-yellow-400 yellow-glow">10+ years</span> of experience
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-white/80 mb-6 leading-relaxed font-light italic"
            >
              Our goal is to provide the foremost solutions with the most
              knowledgeable engineers.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl text-white/80 mb-10 leading-relaxed font-light italic"
            >
              We are commited in offering reliable technics for innovation and
              workplace machinery, besides the constat support of our technicians
              and specialized engineers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <Button
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-black rounded-full px-12 py-7 text-lg uppercase tracking-wide"
                onClick={() => {
                  document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                More information
              </Button>
            </motion.div>
          </motion.div>

          <div className="hidden lg:grid grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="decorative-box h-80 opacity-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="decorative-box h-96 opacity-30"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="decorative-box h-72 opacity-25"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="decorative-box h-64 opacity-35"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
