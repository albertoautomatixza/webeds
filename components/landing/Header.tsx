'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Services', href: '#servicios' },
  { name: 'Benefits', href: '#proyectos' },
  { name: 'Clients', href: '#clientes' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-xl border-b border-yellow-400/20'
          : 'bg-black/50 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-3"
          >
            <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center border-2 border-black">
              <span className="text-black font-black text-xl leading-none">EDS</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xs text-gray-400 uppercase tracking-wider">Engineering</span>
              <span className="text-sm font-bold text-white">Design & Solutions</span>
            </div>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="px-5 py-2 rounded-lg text-sm font-medium text-white transition-colors hover:bg-yellow-400/10 hover:text-yellow-400"
              >
                {item.name}
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              className="hidden md:flex bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full px-6"
              onClick={() => {
                document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact Us
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-yellow-400/20"
          >
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors hover:bg-yellow-400/10 hover:text-yellow-400"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
