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
import Products from "@/components/Products";
import StickyMobileCTA from "@/components/StickyMobileCTA";

export default function HomePage() {
  return (
    <PopupProvider>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Products />
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
