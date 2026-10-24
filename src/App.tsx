import { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { KineticTicker } from './components/KineticTicker';
import { ServicesSection } from './components/ServicesSection';
import { MenuSection } from './components/MenuSection';
import { GallerySection } from './components/GallerySection';
import { AboutSection } from './components/AboutSection';
import { EnquiryForm } from './components/EnquiryForm';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';

export function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [preselectedEventType, setPreselectedEventType] = useState<string>('');
  const handleSelectServiceForEnquiry = (serviceTitle: string) => {
    setPreselectedEventType(serviceTitle);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1F2421] flex flex-col selection:bg-[#F36C21] selection:text-white">
      {/* 1. Animated Moving Loading Screen */}
      {!loadingComplete && (
        <LoadingScreen onComplete={() => setLoadingComplete(true)} />
      )}

      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero with Interactive Three.js Feast & Floating Spices */}
        <Hero3D />

        {/* 3D Kinetic Ticker Marquee Strip */}
        <KineticTicker />

        {/* 2. Catering Services Showcase */}
        <ServicesSection onSelectServiceForEnquiry={handleSelectServiceForEnquiry} />

        {/* 3. Sample Culinary Menu Showcase with 3D Royal Book View */}
        <MenuSection />

        {/* 4. Food & Event Gallery with Accessible Lightbox */}
        <GallerySection />

        {/* 5. About Singhal Food Catering & Local Heritage */}
        <AboutSection />

        {/* 6. Event Enquiry Form & Direct WhatsApp Quotation */}
        <EnquiryForm 
          preselectedEventType={preselectedEventType}
        />

        {/* 7. Direct Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Call & WhatsApp Actions */}
      <FloatingActions />
    </div>
  );
}

export default App;
