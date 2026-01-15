import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import "./globals.css"

export default function Home() {
  return (
    <div className="min-h-screen bg-venom-dark text-white font-sans selection:bg-venom-green selection:text-black">
      <Navigation />
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}