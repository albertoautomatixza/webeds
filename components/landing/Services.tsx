'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const services = [
  {
    title: 'HOBS FELSOMAT RETOOL',
    items: [
      'ASI Automation Integration.',
      'Retool Schunk Gripper.',
      'Sensor relocation.',
      'Reprogramming FANUC Robot.',
      'Redesign NOK & SPC Drawers.',
      'PLC Programming.',
      'HMI Interface Readapted.',
      'Structure Painting.',
    ],
  },
  {
    title: 'NAGEL AUTOMATION OP70_OP80',
    items: [
      'Automation Integration.',
      'Retool Schunk Gripper.',
      'Sensor relocation.',
      'Reprogramming GANTRY.',
      'Alignment GANTRY.',
      'Redesign NOK & SPC Drawers.',
      'HMI Interface Readapted.',
      'Oil Whizzer Enabling.',
      'PLC Programming.',
    ],
  },
  {
    title: 'ELECTRICAL PROJECTS',
    items: [
      'High voltage systems.',
      'Low voltage installations.',
      'Industrial wiring.',
      'Power distribution.',
      'Control panels.',
      'Cable management.',
      'Testing & commissioning.',
      'Maintenance services.',
    ],
  },
  {
    title: 'INDUSTRIAL AUTOMATION',
    items: [
      'PLC Programming.',
      'SCADA Systems.',
      'HMI Development.',
      'Robot Integration.',
      'Sensor Networks.',
      'Process Control.',
      'Data Acquisition.',
      'System Integration.',
    ],
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="servicios" className="py-32 bg-black relative overflow-hidden grid-bg">
      <div className="absolute top-20 right-10 decorative-box w-64 h-96 opacity-30" />
      <div className="absolute bottom-32 left-20 decorative-box w-96 h-64 opacity-20" />
      <div className="absolute top-1/2 right-1/4 decorative-box w-48 h-48 opacity-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-6 text-yellow-400 uppercase tracking-tight yellow-glow">
            Services
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              className="glass-box glass-box-hover p-8"
            >
              <h3 className="text-3xl font-black mb-6 text-yellow-400 uppercase tracking-tight">
                {service.title}
              </h3>
              <ul className="space-y-3">
                {service.items.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + itemIndex * 0.05 }}
                    className="flex items-start text-white/90 text-lg font-light italic"
                  >
                    <span className="mr-3 mt-1.5 w-2 h-2 rounded-full bg-white flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
