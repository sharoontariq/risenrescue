import React from 'react';
import { 
  Heart, 
  ShieldCheck, 
  Award, 
  MapPin, 
  ArrowLeft, 
  Users, 
  Sparkles, 
  ArrowUpRight,
  Target,
  Eye,
  CheckCircle2
} from 'lucide-react';

interface AboutUsPageProps {
  onBackToHome: () => void;
  onNavigateGallery: () => void;
  onNavigateGoals?: () => void;
  onDonateClick: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onBackToHome,
  onNavigateGallery,
  onNavigateGoals,
  onDonateClick,
}) => {
  const teamMembers = [
    {
      name: 'Dr. Elena Vance, DVM',
      role: 'Founder & Chief Wildlife Surgeon',
      bio: 'Board-certified veterinarian with 18 years dedicated to complex orthopedic trauma surgeries and wildlife rehabilitation.',
      imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
      badge: 'Veterinary Leadership'
    },
    {
      name: 'Marcus Thorne',
      role: 'Director of Rapid Field Rescue',
      bio: 'Former wilderness search & rescue specialist leading our 24/7 rapid emergency mobile animal extraction units.',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      badge: 'Field Operations'
    },
    {
      name: 'Dr. Priya Patel, PhD',
      role: 'Sanctuary Director & Animal Ethologist',
      bio: 'Leading behavioral therapy and natural habitat design to ensure trauma recovery for permanently resident sanctuary animals.',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      badge: 'Sanctuary Care'
    },
    {
      name: 'Sarah Lin',
      role: 'Head of Wildlife Nursery & Rewilding',
      bio: 'Specialist in critical neonatal care, specialized thermal incubation, and wild habitat soft-release programs.',
      imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
      badge: 'Rehabilitation'
    }
  ];

  return (
    <div className="w-full bg-[#F8F9FA] min-h-screen pb-24">
      {/* Top Header Breadcrumb Bar */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={onBackToHome}
                className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-[#15803D] transition-colors cursor-pointer bg-gray-50 hover:bg-green-50 border border-gray-200 px-3.5 py-2 rounded-full"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Home</span>
              </button>
              <h1 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight">
                About Us
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {onNavigateGoals && (
                <button
                  onClick={onNavigateGoals}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-200 px-3.5 py-2 rounded-full transition-colors cursor-pointer"
                >
                  <span>Future Goals</span>
                </button>
              )}
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-green-50 text-[#15803D] border border-green-200 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-[#15803D]" />
                501(c)(3) Non-Profit
              </span>
              <button
                onClick={onDonateClick}
                className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#15803D] hover:bg-green-800 text-white px-4 py-2 rounded-full transition-colors cursor-pointer shadow-sm"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>Support Our Cause</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-12">
        {/* Hero Mission Section */}
        <section className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#15803D] bg-green-50 border border-green-200 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-[#15803D]" />
                Our Story & Commitment
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] tracking-tight leading-tight">
                Giving Every Injured & Abandoned Animal a Fighting Chance
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                At <strong>Rise & Rescue Animal Welfare</strong>, we believe every living creature deserves freedom from cruelty, immediate veterinary intervention in trauma, and a safe, permanent sanctuary where they can flourish.
              </p>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                Established in 2011 in the Boulder Foothills, our accredited sanctuary provides round-the-clock emergency field dispatch, advanced orthopedic surgery, neonatal nurseries, and 350+ acres of protected natural habitats.
              </p>

              {/* Trust Metric Pills */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-gray-700">
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3.5 py-2 rounded-xl">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Charity Navigator 4-Star (98.6%)</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3.5 py-2 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-[#15803D]" />
                  <span>GuideStar Platinum Transparency</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3.5 py-2 rounded-xl">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span>Boulder Foothills, CO</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-gray-100 border border-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80"
                  alt="Veterinary team providing compassionate care to rescued animal"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-[#15803D] px-2.5 py-0.5 rounded-full inline-block mb-1">
                    Sanctuary Hospital
                  </span>
                  <p className="text-xs font-semibold text-gray-200">
                    On-site state-of-the-art wildlife hospital & triage center
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Vision & Our Mission */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15803D] bg-green-50 px-3 py-1 rounded-full border border-green-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Guiding Horizon & Daily Commitment</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight">
              Our Vision & Our Mission
            </h3>
            <p className="text-sm text-gray-500">
              The ethical compass driving our day-to-day rescues and steering our lifelong advocacy for all animal life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Our Mission Card */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-green-50 text-[#15803D] border border-green-200 flex items-center justify-center font-bold">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-[#15803D]">
                    Action Today
                  </span>
                  <h4 className="text-2xl font-black text-[#1A1A1A] tracking-tight mt-1">
                    Our Mission
                  </h4>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  To provide immediate, round-the-clock emergency medical rescue, compassionate trauma surgery, and lifelong sanctuary for injured, orphaned, and displaced animals—restoring dignity and health through ethical rehabilitation and wild release.
                </p>

                <div className="pt-2 space-y-2.5">
                  <div className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                    <span>Rapid 24/7 mobile field dispatch for acute animal emergencies and wildfire evacuation.</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                    <span>State-of-the-art diagnostic imaging, orthopedic surgery, and specialized thermal nurseries.</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                    <span>Humane community education and transparent, donor-accountable rescue operations.</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-500">
                <span>Operational Mandate</span>
                <span className="text-[#15803D] font-bold">Rescuing 24/7/365</span>
              </div>
            </div>

            {/* Our Vision Card */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-[#15803D]">
                    The Horizon Tomorrow
                  </span>
                  <h4 className="text-2xl font-black text-[#1A1A1A] tracking-tight mt-1">
                    Our Vision
                  </h4>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  A compassionate world where every animal lives free from cruelty, suffering, and exploitation; where protected native habitats thrive, and where human communities actively co-exist with and advocate for vulnerable wildlife.
                </p>

                <div className="pt-2 space-y-2.5">
                  <div className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Zero preventable animal casualties caused by habitat disruption or human-wildlife conflict.</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Expanding protected foothill sanctuary acreage to provide endless safe havens for permanent residents.</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Empowering the next generation with empathy, conservation science, and respect for all living beings.</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-500">
                <span>Long-Term Future</span>
                <span className="text-emerald-700 font-bold">Harmonious Coexistence</span>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership & Veterinary Team */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15803D] bg-green-50 px-3 py-1 rounded-full border border-green-200">
              <Users className="w-3.5 h-3.5" />
              <span>Compassionate Caretakers</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight">
              Meet Our Dedicated Team
            </h3>
            <p className="text-sm text-gray-500">
              Surgeons, field rescuers, and sanctuary ethologists devoted to animal healing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-gray-800 px-2.5 py-0.5 rounded-full shadow-sm">
                    {member.badge}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-grow space-y-2">
                  <h4 className="text-sm font-bold text-[#1A1A1A]">
                    {member.name}
                  </h4>
                  <p className="text-xs font-semibold text-[#15803D]">
                    {member.role}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed flex-grow">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="bg-gradient-to-r from-[#15803D] to-green-900 text-white rounded-3xl p-8 sm:p-12 text-center shadow-lg space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Join Us in Protecting Vulnerable Lives
            </h3>
            <p className="text-sm sm:text-base text-green-100 leading-relaxed">
              Whether through a monthly sponsorship, emergency surgery donation, or visiting our photo showcase, you give injured animals a safe place to heal.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onDonateClick}
              className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-white text-[#15803D] hover:bg-green-50 shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-[#15803D]" />
              <span>Make a Tax-Deductible Gift</span>
            </button>

            <button
              onClick={onNavigateGallery}
              className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-green-800/80 hover:bg-green-800 text-white border border-green-600 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>View Photo Showcase Gallery</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
