import { useState, useEffect, useRef, type FC, type FormEvent } from 'react';
import confetti from 'canvas-confetti';
import { siteConfig } from '../config/siteConfig';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Phone, 
  User, 
  Utensils, 
  FileText, 
  Send, 
  MessageCircle, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Sparkles,
  Copy,
  Check
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, EASE } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

interface EnquiryFormProps {
  preselectedEventType?: string;
  preselectedMenuDishes?: string[];
}

interface FormState {
  fullName: string;
  phoneNumber: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  venueLocation: string;
  menuPreferences: string;
  additionalNotes: string;
}

export const EnquiryForm: FC<EnquiryFormProps> = ({
  preselectedEventType = '',
  preselectedMenuDishes = []
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    phoneNumber: '',
    eventType: preselectedEventType || 'Wedding Reception',
    eventDate: '',
    guestCount: '150',
    venueLocation: 'Ganaur / Sonipat',
    menuPreferences: preselectedMenuDishes.length > 0 ? preselectedMenuDishes.join(', ') : 'Pure Vegetarian, Live Chaat Counter',
    additionalNotes: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const [prevProps, setPrevProps] = useState({
    eventType: preselectedEventType,
    menuKey: preselectedMenuDishes.join(',')
  });

  const currentMenuKey = preselectedMenuDishes.join(',');
  if (
    (preselectedEventType && preselectedEventType !== prevProps.eventType) ||
    (preselectedMenuDishes.length > 0 && currentMenuKey !== prevProps.menuKey)
  ) {
    setPrevProps({ eventType: preselectedEventType, menuKey: currentMenuKey });
    setFormData(prev => ({
      ...prev,
      ...(preselectedEventType ? { eventType: preselectedEventType } : {}),
      ...(preselectedMenuDishes.length > 0 ? { menuPreferences: preselectedMenuDishes.join(', ') } : {})
    }));
  }

  const eventTypeOptions = [
    'Wedding Reception',
    'Engagement / Roka Ceremony',
    'Birthday Celebration',
    'Family Function / Griha Pravesh',
    'Corporate Luncheon / Event',
    'Festival Celebration / Puja',
    'Outdoor Lawn / Farmhouse Catering',
    'High-Tea & Special Counters',
    'Other Custom Gathering'
  ];

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please provide your full name.';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required for quote consultation.';
    } else if (!/^[0-9+\s\-()]{8,15}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Please enter a valid phone number (at least 8-10 digits).';
    }

    if (!formData.eventDate) {
      newErrors.eventDate = 'Please select your anticipated event date.';
    }

    if (!formData.guestCount || parseInt(formData.guestCount) < 10) {
      newErrors.guestCount = 'Approximate guest count must be at least 10.';
    }

    if (!formData.venueLocation.trim()) {
      newErrors.venueLocation = 'Please mention your venue city or locality.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generate structured WhatsApp message
  const getWhatsAppMessage = (): string => {
    return `Namaste Singhal Food Catering!
I would like to request a catering quote for my upcoming event in Ganaur/Sonipat:

• Name: ${formData.fullName}
• Phone: ${formData.phoneNumber}
• Event Type: ${formData.eventType}
• Event Date: ${formData.eventDate}
• Approx Guests: ${formData.guestCount}
• Venue / City: ${formData.venueLocation}
• Menu Preferences: ${formData.menuPreferences || 'Standard North Indian Pure Veg'}
${formData.additionalNotes ? `• Additional Requirements: ${formData.additionalNotes}` : ''}

Please confirm availability and discuss our customized menu. Thank you!`;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate reliable enquiry formulation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmittedSuccess(true);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F36C21', '#FFB300', '#4E9F3D', '#D90429']
      });
    }, 600);
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(getWhatsAppMessage());
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handleOpenWhatsAppDirectly = (targetNumber = siteConfig.contact.whatsappNumber) => {
    const waUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(getWhatsAppMessage())}`;
    const a = document.createElement('a');
    a.href = waUrl;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.click();
  };

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.enquiry-header-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 28,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: EASE.editorial
      });

      if (formCardRef.current) {
        gsap.from(formCardRef.current, {
          scrollTrigger: {
            trigger: formCardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: EASE.luxury
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="enquire" 
      className="py-20 lg:py-28 bg-gradient-to-b from-[#FFFDF9] via-[#FFF6EE] to-[#FDFBF7] relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="enquiry-header-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F36C21]/10 border border-[#F36C21]/20 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F36C21]">
            <Calendar className="w-4 h-4" />
            <span>Direct Catering Quotation</span>
          </div>

          <h2 className="enquiry-header-item font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2421] tracking-tight">
            Plan Your Event with <span className="text-gradient-saffron">Singhal Food Catering</span>
          </h2>

          <p className="enquiry-header-item text-base sm:text-lg text-[#565C58] max-w-2xl mx-auto font-normal leading-relaxed">
            Fill out your celebration details below. Our team in Ganaur will review your guest count and date, prepare a customised menu proposal, and reach out directly via call and WhatsApp.
          </p>
        </div>

        {/* Main Form Container Card */}
        <div 
          ref={formCardRef}
          className="bg-white rounded-3xl shadow-xl border border-[#F36C21]/20 overflow-hidden"
        >
          
          {/* Top Banner Notice */}
          <div className="bg-[#4A0E17] text-white px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FFB300] shrink-0" />
              <span className="font-medium">
                Serving Ganaur, Sonipat City, Murthal, Rai, Kundli & surrounding NCR regions.
              </span>
            </div>
            <div className="text-white/80 font-mono text-xs">
              Fast Response Guaranteed
            </div>
          </div>

          {!isSubmittedSuccess ? (
            /* Active Form State */
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1F2421]">
                    <User className="w-3.5 h-3.5 text-[#F36C21]" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Ramesh Singhal"
                    className={`w-full px-4 py-3 rounded-xl bg-stone-50 border text-sm text-[#1F2421] focus:outline-none transition-all ${
                      errors.fullName 
                        ? 'border-[#D90429] bg-[#D90429]/5 ring-1 ring-[#D90429]' 
                        : 'border-stone-200 focus:border-[#F36C21] focus:ring-1 focus:ring-[#F36C21]'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-[#D90429] flex items-center gap-1 mt-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label htmlFor="phoneNumber" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1F2421]">
                    <Phone className="w-3.5 h-3.5 text-[#F36C21]" />
                    <span>Contact Phone Number *</span>
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="e.g. 98123 45678"
                    className={`w-full px-4 py-3 rounded-xl bg-stone-50 border text-sm text-[#1F2421] focus:outline-none transition-all ${
                      errors.phoneNumber 
                        ? 'border-[#D90429] bg-[#D90429]/5 ring-1 ring-[#D90429]' 
                        : 'border-stone-200 focus:border-[#F36C21] focus:ring-1 focus:ring-[#F36C21]'
                    }`}
                  />
                  {errors.phoneNumber && (
                    <p className="text-xs text-[#D90429] flex items-center gap-1 mt-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.phoneNumber}</span>
                    </p>
                  )}
                </div>

                {/* Event Type */}
                <div className="space-y-1.5">
                  <label htmlFor="eventType" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1F2421]">
                    <Calendar className="w-3.5 h-3.5 text-[#F36C21]" />
                    <span>Occasion / Event Type *</span>
                  </label>
                  <select
                    id="eventType"
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm text-[#1F2421] focus:outline-none focus:border-[#F36C21] focus:ring-1 focus:ring-[#F36C21]"
                  >
                    {eventTypeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Event Date */}
                <div className="space-y-1.5">
                  <label htmlFor="eventDate" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1F2421]">
                    <Clock className="w-3.5 h-3.5 text-[#F36C21]" />
                    <span>Anticipated Event Date *</span>
                  </label>
                  <input
                    id="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-stone-50 border text-sm text-[#1F2421] focus:outline-none transition-all ${
                      errors.eventDate 
                        ? 'border-[#D90429] bg-[#D90429]/5 ring-1 ring-[#D90429]' 
                        : 'border-stone-200 focus:border-[#F36C21] focus:ring-1 focus:ring-[#F36C21]'
                    }`}
                  />
                  {errors.eventDate && (
                    <p className="text-xs text-[#D90429] flex items-center gap-1 mt-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.eventDate}</span>
                    </p>
                  )}
                </div>

                {/* Guest Count */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="guestCount" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1F2421]">
                      <Users className="w-3.5 h-3.5 text-[#F36C21]" />
                      <span>Approximate Guest Count *</span>
                    </label>
                  </div>
                  <input
                    id="guestCount"
                    type="number"
                    min="10"
                    step="10"
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    placeholder="e.g. 250"
                    className={`w-full px-4 py-3 rounded-xl bg-stone-50 border text-sm text-[#1F2421] focus:outline-none transition-all ${
                      errors.guestCount 
                        ? 'border-[#D90429] bg-[#D90429]/5 ring-1 ring-[#D90429]' 
                        : 'border-stone-200 focus:border-[#F36C21] focus:ring-1 focus:ring-[#F36C21]'
                    }`}
                  />
                  {/* Quick Guest Count Selection Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {['50', '150', '300', '500', '1000+'].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setFormData({ ...formData, guestCount: count.replace('+', '') })}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-colors ${
                          formData.guestCount === count.replace('+', '')
                            ? 'bg-[#F36C21] text-white'
                            : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                        }`}
                      >
                        {count} guests
                      </button>
                    ))}
                  </div>
                  {errors.guestCount && (
                    <p className="text-xs text-[#D90429] flex items-center gap-1 mt-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.guestCount}</span>
                    </p>
                  )}
                </div>

                {/* Venue or Location */}
                <div className="space-y-1.5">
                  <label htmlFor="venueLocation" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1F2421]">
                    <MapPin className="w-3.5 h-3.5 text-[#F36C21]" />
                    <span>Event Venue or Locality *</span>
                  </label>
                  <input
                    id="venueLocation"
                    type="text"
                    value={formData.venueLocation}
                    onChange={(e) => setFormData({ ...formData, venueLocation: e.target.value })}
                    placeholder="e.g. Ganaur Grand Lawn / Sonipat Banquets"
                    className={`w-full px-4 py-3 rounded-xl bg-stone-50 border text-sm text-[#1F2421] focus:outline-none transition-all ${
                      errors.venueLocation 
                        ? 'border-[#D90429] bg-[#D90429]/5 ring-1 ring-[#D90429]' 
                        : 'border-stone-200 focus:border-[#F36C21] focus:ring-1 focus:ring-[#F36C21]'
                    }`}
                  />
                  {errors.venueLocation && (
                    <p className="text-xs text-[#D90429] flex items-center gap-1 mt-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.venueLocation}</span>
                    </p>
                  )}
                </div>

              </div>

              {/* Menu Preferences */}
              <div className="space-y-1.5">
                <label htmlFor="menuPreferences" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1F2421]">
                  <Utensils className="w-3.5 h-3.5 text-[#F36C21]" />
                  <span>Menu Preferences & Preferred Dishes</span>
                </label>
                <input
                  id="menuPreferences"
                  type="text"
                  value={formData.menuPreferences}
                  onChange={(e) => setFormData({ ...formData, menuPreferences: e.target.value })}
                  placeholder="e.g. Pure Veg, Live Chaat Counter, Dal Makhani, Saffron Jalebi, No Onion-Garlic options"
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm text-[#1F2421] focus:outline-none focus:border-[#F36C21] focus:ring-1 focus:ring-[#F36C21]"
                />
                <span className="text-[11px] text-stone-400">
                  Tip: You can select dishes from our Menu section above to automatically include them here.
                </span>
              </div>

              {/* Additional Requirements */}
              <div className="space-y-1.5">
                <label htmlFor="additionalNotes" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1F2421]">
                  <FileText className="w-3.5 h-3.5 text-[#F36C21]" />
                  <span>Additional Details or Timings (Optional)</span>
                </label>
                <textarea
                  id="additionalNotes"
                  rows={3}
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  placeholder="e.g. Evening dinner around 7:30 PM, need dedicated uniformed servers, mocktail bar setup required."
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm text-[#1F2421] focus:outline-none focus:border-[#F36C21] focus:ring-1 focus:ring-[#F36C21]"
                />
              </div>

              {/* Submit Buttons Strip */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-stone-100">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-3d-cta sheen-effect inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-white font-bold text-base focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F36C21]/40 disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Formulating Proposal...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 drop-shadow-xs" />
                      <span>Request a Catering Quote</span>
                    </>
                  )}
                </button>

                <div className="text-center sm:text-right">
                  <span className="text-xs text-[#565C58] block">
                    Prefer direct messaging?
                  </span>
                  <button
                    type="button"
                    onClick={() => handleOpenWhatsAppDirectly()}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#128C7E] hover:underline mt-0.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>Send details via WhatsApp instead →</span>
                  </button>
                </div>
              </div>

            </form>
          ) : (
            /* Submission Success State */
            <div className="p-8 sm:p-12 text-center space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-[#4E9F3D]/15 text-[#4E9F3D] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#1F2421]">
                  Enquiry Prepared Successfully!
                </h3>
                <p className="text-sm text-[#565C58] leading-relaxed">
                  Thank you, <strong className="text-[#4A0E17]">{formData.fullName}</strong>. Your enquiry for <strong className="text-[#F36C21]">{formData.eventType}</strong> on <strong className="text-[#1F2421]">{formData.eventDate}</strong> (~{formData.guestCount} guests in {formData.venueLocation}) has been structured.
                </p>
              </div>

              {/* Action Buttons to connect immediately */}
              <div className="max-w-md mx-auto space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleOpenWhatsAppDirectly(siteConfig.contact.whatsappNumber)}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>WhatsApp: {siteConfig.contact.displayPhone}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenWhatsAppDirectly(siteConfig.contact.secondaryWhatsappNumber)}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>WhatsApp: {siteConfig.contact.displaySecondaryPhone}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs uppercase tracking-wider transition-colors"
                >
                  {copiedSummary ? <Check className="w-4 h-4 text-[#4E9F3D]" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedSummary ? 'Copied to Clipboard!' : 'Copy Enquiry Details'}</span>
                </button>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-[#4A0E17]">
                  <span>Or call us directly:</span>
                  <a
                    href={`tel:${siteConfig.contact.phoneNumber}`}
                    className="hover:text-[#F36C21] underline font-mono"
                  >
                    {siteConfig.contact.displayPhone}
                  </a>
                  <span className="text-stone-300">•</span>
                  <a
                    href={`tel:${siteConfig.contact.secondaryPhone}`}
                    className="hover:text-[#F36C21] underline font-mono"
                  >
                    {siteConfig.contact.displaySecondaryPhone}
                  </a>
                </div>
              </div>

              {/* Reset to make another enquiry */}
              <div className="pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsSubmittedSuccess(false)}
                  className="text-xs text-stone-400 hover:text-stone-600 transition-colors"
                >
                  Edit details or submit another inquiry
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
