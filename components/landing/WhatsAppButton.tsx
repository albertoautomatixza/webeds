'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const whatsappNumber = '5218112345678';
  const message = encodeURIComponent('Hi, I would like to get more information about your services.');

  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#C5E86C] hover:bg-[#B8DB5F] rounded-full shadow-2xl flex items-center justify-center group"
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle className="w-8 h-8 text-black" strokeWidth={2.5} />

      <motion.span
        initial={{ width: 0, opacity: 0 }}
        whileHover={{ width: 'auto', opacity: 1 }}
        className="absolute right-20 bg-black text-white px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap overflow-hidden"
      >
        Whatsapp
      </motion.span>

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 rounded-full bg-[#C5E86C]"
      />
    </motion.a>
  );
}
