'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Target, Users, TrendingUp } from 'lucide-react';

const benefits = [
  {
    icon: Shield,
    title: 'Safety First',
    description:
      'All our projects comply with the highest safety standards in the industry.',
  },
  {
    icon: Target,
    title: 'Precision Engineering',
    description:
      'Detailed planning and execution with millimeter precision in every project.',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description:
      'Certified engineers and technicians with years of experience in the automotive sector.',
  },
  {
    icon: TrendingUp,
    title: 'Continuous Innovation',
    description:
      'We constantly implement the latest technologies to improve our processes.',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="proyectos" className="py-32 bg-black relative overflow-hidden grid-bg">
      <div className="absolute top-1/4 left-10 decorative-box w-72 h-96 opacity-15" />
      <div className="absolute bottom-1/4 right-10 decorative-box w-80 h-80 opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-6 text-yellow-400 uppercase tracking-tight yellow-glow">
            Benefits
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ type: 'spring', stiffness: 200, duration: 0.6 }}
                className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-6"
              >
                <benefit.icon className="w-10 h-10 text-black" strokeWidth={2} />
              </motion.div>

              <h3 className="text-xl font-bold mb-3 text-white">
                {benefit.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: '500+', label: 'Projects' },
              { number: '10+', label: 'Years' },
              { number: '100+', label: 'Clients' },
              { number: '100%', label: 'Satisfaction' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-yellow-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
