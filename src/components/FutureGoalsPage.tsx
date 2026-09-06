import React from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  CheckCircle2, 
  Heart, 
  Sparkles, 
  ArrowUpRight 
} from 'lucide-react';

interface FutureGoalsPageProps {
  onBackToHome?: () => void;
  onNavigateAbout?: () => void;
  onNavigateGallery?: () => void;
  onDonateClick?: () => void;
}

interface GoalSection {
  id: string;
  tag: string;
  targetYear: string;
  heading: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  highlights: string[];
}

const FUTURE_GOALS: GoalSection[] = [
  {
    id: 'goal-1',
    tag: 'Land & Habitats',
    targetYear: 'Target: 2027',
    heading: '500-Acre Protected Wildlife Migration Corridor',
    description:
      'Expanding our sanctuary by acquiring and permanently protecting 500 contiguous acres in the Boulder Foothills. This corridor will establish safe, unfragmented migratory routes for native species—such as elk, black bears, and bobcats—preventing fatal roadway collisions through dedicated wildlife overpasses and protected natural water buffers.',
    imageUrl:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Vast scenic mountain forest corridor for wildlife sanctuary',
    highlights: [
      'Connects fragmented alpine habitats with perpetual conservation easements',
      'Engineered wildlife underpasses and overpasses crossing high-speed highway barriers',
      '24/7 non-invasive solar telemetry for ecological preservation and herd monitoring'
    ]
  },
  {
    id: 'goal-2',
    tag: 'Advanced Medicine',
    targetYear: 'Target: 2028',
    heading: 'State-of-the-Art Wildlife CT & Hyperbaric Trauma Suite',
    description:
      "Constructing the region's first specialized veterinary emergency imaging wing equipped with low-stress large-bore CT scanners and hyperbaric oxygen chambers. Designed specifically to treat animals surviving catastrophic wildfires, complex pelvic fractures, and severe smoke inhalation, cutting soft-tissue recovery timelines in half.",
    imageUrl:
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Modern veterinary medical trauma and surgical facility',
    highlights: [
      'Rapid 3D bone and trauma reconstruction for raptors and large mammals',
      'Pressurized hyperbaric chambers to accelerate recovery from severe burn injuries',
      'Specialized zero-radiation containment protocols tailored for sensitive wildlife'
    ]
  },
  {
    id: 'goal-3',
    tag: 'Eco-Mobility',
    targetYear: 'Target: 2026',
    heading: '100% Electric Solar-Powered Mobile Rescue Fleet',
    description:
      'Converting our four active field rescue vehicles into purpose-built, all-terrain electric ambulances powered by roof-integrated solar arrays. These zero-emission vehicles enable silent approaches during delicate backcountry extractions, drastically reducing stress for injured or trapped animals while maintaining continuous power for neonatal warming incubators.',
    imageUrl:
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Rugged all-terrain rescue ambulance vehicle navigating mountain trails',
    highlights: [
      'Silent electric drive eliminates acoustic stress during high-risk field captures',
      'Roof-mounted photovoltaic systems power incubators indefinitely in backcountry zones',
      'Eliminates over 32 tons of vehicle carbon emissions across Colorado foothill patrols'
    ]
  },
  {
    id: 'goal-4',
    tag: 'Education & Community',
    targetYear: 'Target: 2028',
    heading: 'Colorado Youth Wildlife Empathy & Rewilding Academy',
    description:
      'Building a dedicated nature education center and outdoor laboratory on sanctuary grounds to host over 15,000 K-12 students and veterinary interns annually. The academy will offer interactive workshops on compassionate coexistence, injured animal first-response, and ecological stewardship to empower future conservation leaders.',
    imageUrl:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Students and educators outdoors exploring wildlife ecology and nature',
    highlights: [
      'Fully funded scholarships for rural and Title I public school classrooms',
      'Elevated observation walkways overlooking expansive natural rehabilitation pastures',
      'Accredited wildlife medicine clinical rotations for aspiring veterinary scholars'
    ]
  },
  {
    id: 'goal-5',
    tag: 'Conservation Science',
    targetYear: 'Target: 2029',
    heading: 'Regional Wildlife Genetic Bio-Bank & Disease Defense',
    description:
      'Establishing an academic partnership and cryo-preservation facility to ethically archive and sequence genetic data from threatened indigenous species. This genomic shield allows conservationists to monitor emerging pathogens, study climate adaptation, and protect endangered regional populations against catastrophic disease die-offs.',
    imageUrl:
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Bio-conservation laboratory with diagnostic sequencing equipment',
    highlights: [
      '100% non-invasive tissue sampling conducted strictly during clinical patient care',
      'Open-access genomic repository shared with non-profit conservation biologists',
      'Early-warning surveillance network tracking regional wildlife zoonotic threats'
    ]
  },
  {
    id: 'goal-6',
    tag: 'Sustainable Sanctuary',
    targetYear: 'Target: 2029',
    heading: 'Net-Zero Renewable Sanctuary Microgrid',
    description:
      'Transitioning our entire surgical hospital, intensive care nurseries, and heated rehabilitation enclosures to a 120kW dual-axis solar canopy backed by 400kWh battery storage. This ensures 100% uninterrupted life support during extreme Colorado winter blizzards and wildfires while redirecting thousands of utility dollars back into patient medical care.',
    imageUrl:
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Clean solar renewable microgrid powering sanctuary facilities',
    highlights: [
      'Unbroken emergency power for neonatal incubators and intensive surgery units',
      'Saves $45,000 in commercial utility expenses each year to fund animal rescues',
      'Complete off-grid operational independence during catastrophic mountain power outages'
    ]
  }
];

export const FutureGoalsPage: React.FC<FutureGoalsPageProps> = ({
  onBackToHome,
  onNavigateAbout,
  onNavigateGallery,
  onDonateClick
}) => {
  return (
    <div className="w-full bg-[#F8F9FA] min-h-screen pb-14">
      {/* Top Header Breadcrumb Bar */}
      <div className="w-full bg-white border-b border-gray-200 sticky top-[57px] sm:top-[61px] z-20 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
            <div className="flex items-center gap-2.5">
              {onBackToHome && (
                <button
                  id="future-goals-back-btn"
                  onClick={onBackToHome}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#043E49] transition-colors cursor-pointer bg-gray-50 hover:bg-[#043E49]/10 border border-gray-200 px-3 py-1.5 rounded-full shadow-2xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Home</span>
                </button>
              )}
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-black text-[#1A1A1A] tracking-tight">
                  Future Goals
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5">
              {onNavigateAbout && (
                <button
                  onClick={onNavigateAbout}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-200 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                >
                  <span>About Us</span>
                </button>
              )}

              {onDonateClick && (
                <button
                  onClick={onDonateClick}
                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#043E49] hover:bg-[#032f38] text-white px-3.5 py-1.5 rounded-full transition-colors cursor-pointer shadow-2xs"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>Support Goals</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: 6 Horizontal Sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 space-y-6 sm:space-y-8">
        {/* Intro Header */}
        <div className="max-w-3xl space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#043E49] bg-[#043E49]/10 px-2.5 py-0.5 rounded-full border border-[#043E49]/20">
            <Sparkles className="w-3 h-3" />
            <span>Strategic Horizon 2026–2030</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#1A1A1A] tracking-tight">
            Our Strategic Initiatives for Wildlife & Sanctuary Protection
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Discover the six core pillars shaping the future of Rise & Rescue. Each initiative addresses long-term habitat preservation, clinical emergency capabilities, and community stewardship across Colorado.
          </p>
        </div>

        {/* 6 Horizontal Goal Sections */}
        <div className="space-y-4 sm:space-y-6">
          {FUTURE_GOALS.map((goal, index) => (
            <section
              key={goal.id}
              id={`future-goal-section-${index + 1}`}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs hover:shadow-sm transition-all duration-300 flex flex-col lg:flex-row items-stretch"
            >
              {/* Left Side: Picture */}
              <div className="w-full lg:w-5/12 xl:w-5/12 shrink-0 relative min-h-[220px] sm:min-h-[250px] lg:min-h-[280px] bg-gray-100 overflow-hidden">
                <img
                  src={goal.imageUrl}
                  alt={goal.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform hover:scale-104 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 left-3 bg-black/65 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-white/20">
                  Goal #{index + 1}
                </div>
              </div>

              {/* Right Side: Heading & Text Description */}
              <div className="flex-1 p-4 sm:p-6 lg:p-7 flex flex-col justify-between space-y-3.5">
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#043E49] bg-[#043E49]/10 border border-[#043E49]/20 px-2.5 py-0.5 rounded-full">
                      {goal.tag}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-gray-500 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full">
                      <Calendar className="w-2.5 h-2.5 text-gray-400" />
                      {goal.targetYear}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-[#1A1A1A] tracking-tight leading-snug">
                    {goal.heading}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {goal.description}
                  </p>

                  {/* Highlight Bullets */}
                  <div className="pt-1 space-y-1.5">
                    {goal.highlights.map((highlight, hIndex) => (
                      <div key={hIndex} className="flex items-start gap-2 text-xs text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#043E49] shrink-0 mt-0.5" />
                        <span className="leading-snug">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Row */}
                {onDonateClick && (
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] text-gray-400 font-medium hidden sm:inline">
                      Tax-deductible 501(c)(3) capital initiative
                    </span>
                    <button
                      onClick={onDonateClick}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#043E49] hover:text-[#032f38] hover:underline transition-colors cursor-pointer"
                    >
                      <span>Sponsor this initiative</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>

        {/* Footer Support Banner */}
        <section className="bg-[#111827] text-white rounded-2xl p-5 sm:p-7 text-center space-y-3 border border-gray-800">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-black tracking-tight">
            Help Us Turn These Goals into Reality
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            Every contribution directly aids injured, orphaned, and resident sanctuary animals. Join us in building permanent foothill havens and advanced trauma care.
          </p>
          <div className="flex items-center justify-center gap-2.5 pt-1">
            {onDonateClick && (
              <button
                onClick={onDonateClick}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#043E49] hover:bg-[#032f38] text-white shadow-2xs transition-colors cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>Make a Future Goals Contribution</span>
              </button>
            )}
            {onNavigateGallery && (
              <button
                onClick={onNavigateGallery}
                className="inline-flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-bold bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 transition-colors cursor-pointer"
              >
                <span>View Animal Gallery</span>
              </button>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};
