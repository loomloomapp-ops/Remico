import About from "@/components/About";
import Benefits from "@/components/Benefits";
import Certificates from "@/components/Certificates";
import FinalForm from "@/components/FinalForm";
import FloatingWidget from "@/components/FloatingWidget";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MidForm from "@/components/MidForm";
import PopupForm from "@/components/PopupForm";
import { PopupProvider } from "@/components/PopupContext";
import ProductBand from "@/components/ProductBand";
import StickyMobileCTA from "@/components/StickyMobileCTA";

export default function HomePage() {
  return (
    <PopupProvider>
      <Header />
      <main id="main">
        <Hero />
        <ProductBand />
        <About />
        <MidForm />
        <Benefits />
        <Certificates />
        <FinalForm />
      </main>
      <Footer />
      <StickyMobileCTA />
      <FloatingWidget />
      <PopupForm />
    </PopupProvider>
  );
}
