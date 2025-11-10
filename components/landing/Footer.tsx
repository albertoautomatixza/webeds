'use client';

import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const footerLinks = {
  company: {
    title: 'Company',
    links: [
      { name: 'About Us', href: '#hero' },
      { name: 'Services', href: '#servicios' },
      { name: 'Benefits', href: '#proyectos' },
      { name: 'Clients', href: '#clientes' },
    ],
  },
  services: {
    title: 'Services',
    links: [
      { name: 'Electrical Projects', href: '#servicios' },
      { name: 'Automation', href: '#servicios' },
      { name: 'Engineering 4.0', href: '#servicios' },
      { name: 'Consulting', href: '#servicios' },
    ],
  },
};

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black text-white overflow-hidden border-t border-zinc-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center border-2 border-black">
                <span className="text-black font-black text-xl leading-none">EDS</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xs text-gray-400 uppercase tracking-wider">Engineering</span>
                <span className="text-sm font-bold text-white">Design & Solutions</span>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Engineering solutions for the automotive industry with over 10 years of experience.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-zinc-900 hover:bg-yellow-400 flex items-center justify-center transition-all group"
                >
                  <social.icon className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {Object.entries(footerLinks).map(([key, section], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
            >
              <h3 className="text-lg font-bold mb-4 text-yellow-400">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-yellow-400 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-zinc-800 py-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Engineering DS. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Legal
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400" />
    </footer>
  );
}
