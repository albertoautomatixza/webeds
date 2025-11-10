'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    content: '+52 (81) 1234-5678',
    href: 'tel:+528112345678',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'contact@engineeringds.com',
    href: 'mailto:contact@engineeringds.com',
  },
  {
    icon: MapPin,
    title: 'Location',
    content: 'Monterrey, Nuevo León, México',
    href: 'https://maps.google.com',
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: 'Message sent!',
      description: 'We will contact you soon.',
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contacto" className="py-32 bg-black relative overflow-hidden grid-bg">
      <div className="absolute top-20 left-10 decorative-box w-80 h-72 opacity-20" />
      <div className="absolute bottom-20 right-20 decorative-box w-64 h-96 opacity-15" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-6 text-yellow-400 uppercase tracking-tight yellow-glow">
            Contact Us
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="glass-box p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-white"
                >
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-400 rounded-xl"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-white"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-400 rounded-xl"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-2 text-white"
                >
                  Phone
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+52 123 456 7890"
                  className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-yellow-400 rounded-xl"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-white"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Tell us about your project..."
                  rows={5}
                  className="w-full bg-zinc-900 border-zinc-800 text-white placeholder:text-gray-500 focus:border-yellow-400 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black rounded-full py-7 text-lg uppercase tracking-wide"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-8"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-start space-x-4 p-6 glass-box glass-box-hover group"
              >
                <div className="w-14 h-14 rounded-xl bg-yellow-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <info.icon className="w-7 h-7 text-black" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-white group-hover:text-yellow-400 transition-colors">
                    {info.title}
                  </h3>
                  <p className="text-gray-400">
                    {info.content}
                  </p>
                </div>
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
              className="rounded-2xl overflow-hidden border-4 border-yellow-400/20 h-64"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230564.96989436457!2d-100.45498139453125!3d25.651390599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662bef860525a8f%3A0xd6d4e9c1c3c1c1c1!2sMonterrey%2C%20N.L.%2C%20Mexico!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(90%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
