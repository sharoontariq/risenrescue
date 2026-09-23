import React from 'react';
import { 
  Heart, 
  ArrowLeft, 
  Users, 
  Sparkles, 
  ArrowUpRight,
  Target,
  Eye,
  CheckCircle2
} from 'lucide-react';

import { AboutUsContent } from '../siteContent';

interface AboutUsPageProps {
  content?: AboutUsContent;
  onBackToHome: () => void;
  onNavigateGallery: () => void;
  onNavigateGoals?: () => void;
  onDonateClick: () => void;
}

const DEFAULT_TEAM_MEMBERS = [
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

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  content,
  onBackToHome,
  onNavigateGallery,
  onNavigateGoals,
  onDonateClick,
}) => {
  const pageTitle = content?.pageTitle || 'About Us';
  const nonProfitBadge = content?.nonProfitBadge || '501(c)(3) Non-Profit';
  const supportButtonText = content?.supportButtonText || 'Support Our Cause';
  const heroBadge = content?.heroBadge || 'Our Story & Commitment';
  const storyHeading = content?.heroHeading || 'Giving Every Injured & Abandoned Animal a Fighting Chance';
  const storyParagraph1 = content?.heroParagraph1 || 'At Rise & Rescue Animal Welfare, we believe every living creature deserves freedom from cruelty, immediate veterinary intervention in trauma, and a safe, permanent sanctuary where they can flourish.';
  const storyParagraph2 = content?.heroParagraph2 || 'Established in 2011 in the Boulder Foothills, our accredited sanctuary provides round-the-clock emergency field dispatch, advanced orthopedic surgery, neonatal nurseries, and 350+ acres of protected natural habitats.';
  const storyImage = content?.heroImageUrl || 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80';
  const storyImageBadge = content?.heroImageBadge || 'Sanctuary Hospital';
  const storyImageCaption = content?.heroImageCaption || 'On-site state-of-the-art wildlife hospital & triage center';
  
  const trustBadge1 = content?.trustBadge1 || 'Charity Navigator 4-Star (98.6%)';
  const trustBadge2 = content?.trustBadge2 || 'GuideStar Platinum Transparency';
  const trustBadge3 = content?.trustBadge3 || 'Boulder Foothills, CO';

  const missionBadge = content?.missionBadge || 'Action Today';
  const missionHeading = content?.missionHeading || 'Our Mission';
  const missionText = content?.missionDescription || 'To provide immediate, round-the-clock emergency medical rescue, compassionate trauma surgery, and lifelong sanctuary for injured, orphaned, and displaced animals—restoring dignity and health through ethical rehabilitation and wild release.';
  const missionPoints = (content?.missionBullets && content.missionBullets.length > 0)
    ? content.missionBullets
    : [
        'Rapid 24/7 mobile field dispatch for acute animal emergencies and wildfire evacuation.',
        'State-of-the-art diagnostic imaging, orthopedic surgery, and specialized thermal nurseries.',
        'Humane community education and transparent, donor-accountable rescue operations.'
      ];
  const missionMandateLabel = content?.missionMandateLabel || 'Operational Mandate';
  const missionMandateValue = content?.missionMandateValue || 'Rescuing 24/7/365';

  const visionBadge = content?.visionBadge || 'The Horizon Tomorrow';
  const visionHeading = content?.visionHeading || 'Our Vision';
  const visionText = content?.visionDescription || 'A compassionate world where every animal lives free from cruelty, suffering, and exploitation; where protected native habitats thrive, and where human communities actively co-exist with and advocate for vulnerable wildlife.';
  const visionPoints = (content?.visionBullets && content.visionBullets.length > 0)
    ? content.visionBullets
    : [
        'Zero preventable animal casualties caused by habitat disruption or human-wildlife conflict.',
        'Expanding protected foothill sanctuary acreage to provide endless safe havens for permanent residents.',
        'Empowering the next generation with empathy, conservation science, and respect for all living beings.'
      ];
  const visionHorizonLabel = content?.visionHorizonLabel || 'Long-Term Future';
  const visionHorizonValue = content?.visionHorizonValue || 'Harmonious Coexistence';

  const teamBadge = content?.teamBadge || 'Compassionate Caretakers';
  const teamHeading = content?.teamHeading || 'Meet Our Dedicated Team';
  const teamDescription = content?.teamDescription || 'Surgeons, field rescuers, and sanctuary ethologists devoted to animal healing.';
  const teamMembers = (content?.teamMembers && content.teamMembers.length > 0)
    ? content.teamMembers
    : DEFAULT_TEAM_MEMBERS;

  const ctaHeading = content?.ctaHeading || 'Join Us in Protecting Vulnerable Lives';
  const ctaDescription = content?.ctaDescription || 'Whether through a monthly sponsorship, emergency surgery donation, or visiting our photo showcase, you give injured animals a safe place to heal.';
  const ctaDonateButtonText = content?.ctaDonateButtonText || 'Make a Tax-Deductible Gift';
  const ctaGalleryButtonText = content?.ctaGalleryButtonText || 'View Photo Showcase Gallery';

  return (
    <div className="w-full bg-[#F8F9FA] min-h-screen pb-16">
      {/* Top Header Breadcrumb Bar */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={onBackToHome}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#043E49] transition-colors cursor-pointer bg-gray-50 hover:bg-[#043E49]/10 border border-gray-200 px-3 py-1.5 rounded-full"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Home</span>
              </button>
              <h1 className="text-xl sm:text-2xl font-black text-[#1A1A1A] tracking-tight">
                {pageTitle}
              </h1>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={onDonateClick}
                className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#043E49] hover:bg-[#032f38] text-white px-3.5 py-1.5 rounded-full transition-colors cursor-pointer shadow-xs"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>{supportButtonText}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 sm:mt-6 space-y-8 sm:space-y-10">
        {/* Hero Mission Section */}
        <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-4 sm:p-6 lg:p-8">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#043E49] bg-[#043E49]/10 border border-[#043E49]/20 px-2.5 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3 text-[#043E49]" />
                {heroBadge}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight leading-tight">
                {storyHeading}
              </h2>
              <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed">
                {storyParagraph1}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                {storyParagraph2}
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-xl overflow-hidden shadow-md aspect-[4/3] bg-gray-100 border border-gray-200">
                <img
                  src={storyImage}
                  alt="Veterinary team providing compassionate care to rescued animal"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Vision & Our Mission */}
        <section className="space-y-4 sm:space-y-5">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#043E49] bg-[#043E49]/10 px-2.5 py-0.5 rounded-full border border-[#043E49]/20">
              <Sparkles className="w-3 h-3" />
              <span>Guiding Horizon & Daily Commitment</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#1A1A1A] tracking-tight">
              Our Vision & Our Mission
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              The ethical compass driving our day-to-day rescues and steering our lifelong advocacy for all animal life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Our Mission Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-2xs flex flex-col justify-between hover:shadow-sm transition-shadow relative overflow-hidden">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#043E49]/10 text-[#043E49] border border-[#043E49]/20 flex items-center justify-center font-bold">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#043E49]">
                    {missionBadge}
                  </span>
                  <h4 className="text-xl font-black text-[#1A1A1A] tracking-tight mt-0.5">
                    {missionHeading}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {missionText}
                </p>

                <div className="pt-1 space-y-2">
                  {missionPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#043E49] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-gray-500">
                <span>{missionMandateLabel}</span>
                <span className="text-[#043E49] font-bold">{missionMandateValue}</span>
              </div>
            </div>

            {/* Our Vision Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-2xs flex flex-col justify-between hover:shadow-sm transition-shadow relative overflow-hidden">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#043E49]/10 text-[#043E49] border border-[#043E49]/20 flex items-center justify-center font-bold">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#043E49]">
                    {visionBadge}
                  </span>
                  <h4 className="text-xl font-black text-[#1A1A1A] tracking-tight mt-0.5">
                    {visionHeading}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {visionText}
                </p>

                <div className="pt-1 space-y-2">
                  {visionPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#043E49] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-gray-500">
                <span>{visionHorizonLabel}</span>
                <span className="text-[#043E49] font-bold">{visionHorizonValue}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership & Veterinary Team */}
        <section className="space-y-4 sm:space-y-5">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#043E49] bg-[#043E49]/10 px-2.5 py-0.5 rounded-full border border-[#043E49]/20">
              <Users className="w-3 h-3" />
              <span>{teamBadge}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#1A1A1A] tracking-tight">
              {teamHeading}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              {teamDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {teamMembers.map((member, idx) => (
              <div
                key={member.id || idx}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-2xs hover:shadow-sm transition-shadow flex flex-col"
              >
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 text-[9px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-0.5 rounded-full shadow-xs">
                    {member.badge}
                  </span>
                </div>
                <div className="p-3.5 sm:p-4 flex flex-col flex-grow space-y-1.5">
                  <h4 className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
                    {member.name}
                  </h4>
                  <p className="text-[11px] font-semibold text-[#043E49]">
                    {member.role}
                  </p>
                  <p className="text-[11px] text-gray-500 leading-relaxed flex-grow">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="bg-gradient-to-r from-[#043E49] to-[#02232a] text-white rounded-2xl p-6 sm:p-8 text-center shadow-md space-y-4">
          <div className="max-w-2xl mx-auto space-y-2">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              {ctaHeading}
            </h3>
            <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
              {ctaDescription}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <button
              onClick={onDonateClick}
              className="px-4.5 py-2 rounded-full text-xs sm:text-[13px] font-bold bg-white text-[#043E49] hover:bg-[#043E49]/10 shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 fill-[#043E49]" />
              <span>{ctaDonateButtonText}</span>
            </button>

            <button
              onClick={onNavigateGallery}
              className="px-4.5 py-2 rounded-full text-xs sm:text-[13px] font-bold bg-[#043E49]/80 hover:bg-[#043E49] text-white border border-[#043E49]/60 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>{ctaGalleryButtonText}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
