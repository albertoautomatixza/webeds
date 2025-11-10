import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Services from '@/components/landing/Services';
import Projects from '@/components/landing/Projects';
import Clients from '@/components/landing/Clients';
import Contact from '@/components/landing/Contact';
import Footer from '@/components/landing/Footer';
import WhatsAppButton from '@/components/landing/WhatsAppButton';
import LoadingScreen from '@/components/landing/LoadingScreen';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Header />
      <main className="overflow-x-hidden">
        <Hero />
        <Services />
        <Projects />
        <Clients />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
