import { FeaturesSection } from "@/components/HomePage/FeaturesSection";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/HomePage/HeroSection";
import { EasyToUseSection } from "@/components/HomePage/EasyToUseSection";
import { TestimonialsSection } from "@/components/HomePage/TestimonialsSection";
import { FAQSection } from "@/components/HomePage/FAQSection";
import { ContactSection } from "@/components/HomePage/ContactSection";
import { Footer } from "@/components/Footer";


export default function Home() {
  return (
    <>
      <div className="relative flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <FeaturesSection />
          <EasyToUseSection />
          <TestimonialsSection />
          <FAQSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
