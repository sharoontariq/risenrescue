import { CarouselSlide, WhatWeDoItem, StoryCardItem, GalleryItem } from './types';
export type { CarouselSlide, WhatWeDoItem, StoryCardItem, GalleryItem };
import { CAROUSEL_SLIDES } from './data/carouselData';
import { WHAT_WE_DO_ITEMS } from './data/whatWeDoData';
import { STORIES_DATA } from './data/storiesData';
import { INITIAL_GALLERY_ITEMS } from './data/galleryData';

// --- Header & Navigation Types ---
export interface HeaderContent {
  brandName: string;
  brandTagline: string;
  rescuePhone: string;
  donateButtonText: string;
  navLinks: {
    home: string;
    about: string;
    goals: string;
    gallery: string;
  };
}

// --- Footer Types ---
export interface FooterContent {
  brandName: string;
  description: string;
  rescuePhone: string;
  rescuePhoneLabel: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  mapLink: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  tiktokUrl: string;
  copyrightText: string;
}

// --- Home: Hero Appeal / Bank Details Types ---
export interface BankAccountDetails {
  intlBank: {
    bankName: string;
    accountTitle: string;
    iban: string;
    swiftBic: string;
    routingNumber: string;
    bankCountry: string;
    currencies: string;
  };
  localBank: {
    bankName: string;
    accountTitle: string;
    accountNumber: string;
  };
  footerNotice: string;
}

// --- Home: What We Do Section Header ---
export interface WhatWeDoHeaderContent {
  badge: string;
  title: string;
  description: string;
}

// --- Home: Stories Section Header ---
export interface StoriesHeaderContent {
  badge: string;
  title: string;
  description: string;
}

// --- About Us Page Content Types ---
export interface AboutTeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  badge: string;
}

export interface AboutMissionVisionCard {
  id: string;
  badge?: string;
  heading: string;
  description: string;
  imageUrl?: string;
  bullets?: string[];
}

export interface AboutUsContent {
  // Breadcrumb bar
  pageTitle: string;
  nonProfitBadge: string;
  supportButtonText: string;
  // Hero Story section
  heroBadge: string;
  heroHeading: string;
  heroParagraph1: string;
  heroParagraph2: string;
  heroImageUrl: string;
  heroImageAlt: string;
  heroImageBadge: string;
  heroImageCaption: string;
  // Trust metrics
  trustBadge1: string;
  trustBadge2: string;
  trustBadge3: string;
  // Mission Card
  missionBadge: string;
  missionHeading: string;
  missionDescription: string;
  missionBullets: string[];
  missionMandateLabel: string;
  missionMandateValue: string;
  // Vision Card
  visionBadge: string;
  visionHeading: string;
  visionDescription: string;
  visionBullets: string[];
  visionHorizonLabel: string;
  visionHorizonValue: string;
  // Dynamic Mission & Vision & Pillar Cards
  missionVisionCards?: AboutMissionVisionCard[];
  // Team Section
  teamBadge: string;
  teamHeading: string;
  teamDescription: string;
  teamMembers: AboutTeamMember[];
  // CTA Banner
  ctaHeading: string;
  ctaDescription: string;
  ctaDonateButtonText: string;
  ctaGalleryButtonText: string;
}

// --- Future Goals Page Content Types ---
export interface FutureGoalItem {
  id: string;
  tag: string;
  targetYear: string;
  heading: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  highlights: string[];
}

export interface FutureGoalsContent {
  pageTitle: string;
  introBadge: string;
  introHeading: string;
  introDescription: string;
  goals: FutureGoalItem[];
  // CTA Banner
  ctaHeading: string;
  ctaDescription: string;
  ctaDonateButtonText: string;
  ctaGalleryButtonText: string;
}

// --- Gallery Page Content Types ---
export interface GalleryContent {
  pageTitle: string;
  emptyStateHeading: string;
  emptyStateDescription: string;
  categories: string[];
}

// --- Complete Site Content Tree ---
export interface SiteContent {
  header: HeaderContent;
  footer: FooterContent;
  home: {
    heroSlides: CarouselSlide[];
    bankDetails: BankAccountDetails;
    whatWeDoHeader: WhatWeDoHeaderContent;
    whatWeDoItems: WhatWeDoItem[];
    storiesHeader: StoriesHeaderContent;
    storiesItems: StoryCardItem[];
  };
  about: AboutUsContent;
  goals: FutureGoalsContent;
  gallery: GalleryContent;
}

// --- Initial Default Content directly reflecting existing code ---
export const DEFAULT_SITE_CONTENT: SiteContent = {
  header: {
    brandName: 'RISE & RESCUE ANIMAL WELFARE',
    brandTagline: 'Stray Animal Care & Rehabilitation',
    rescuePhone: '+92-320-7482952',
    donateButtonText: 'Donate',
    navLinks: {
      home: 'Home',
      about: 'About Us',
      goals: 'Future Goals',
      gallery: 'Gallery'
    }
  },
  footer: {
    brandName: 'Rise & Rescue Animal Welfare',
    description: 'Dedicated to stray animal care, compassionate veterinary rescue, and lifelong rehabilitation.',
    rescuePhone: '+92-320-7482952',
    rescuePhoneLabel: '24/7 Rescue Line',
    email: 'rise.rescuefsd@gmail.com',
    addressLine1: '224 RB Wazirkhan Wali, St #4',
    addressLine2: 'Gosiyabad, Faisalabad, 38000',
    mapLink: 'https://maps.google.com/?q=224+RB+Wazirkhan+Wali+Faisalabad',
    instagramUrl: 'https://instagram.com',
    facebookUrl: 'https://facebook.com',
    youtubeUrl: 'https://youtube.com',
    tiktokUrl: 'https://tiktok.com/@riseandrescue',
    copyrightText: '© ' + new Date().getFullYear() + ' Rise & Rescue Animal Welfare. All rights reserved.'
  },
  home: {
    heroSlides: CAROUSEL_SLIDES,
    bankDetails: {
      intlBank: {
        bankName: 'Bank Alfalah',
        accountTitle: 'Sharoon Tariq Daim',
        iban: 'PK96 ALFH 0106 0010 1002 6840',
        swiftBic: 'ALFHPKKAXXX',
        routingNumber: '0106',
        bankCountry: 'Pakistan',
        currencies: 'USD, EUR, GBP, CAD'
      },
      localBank: {
        bankName: 'Easy Paisa',
        accountTitle: 'Sharoon Tariq',
        accountNumber: '0311 7432755'
      },
      footerNotice: 'Donate today. Save a life. Give an innocent soul a second chance.'
    },
    whatWeDoHeader: {
      badge: 'Our Core Pillars',
      title: 'What We Do',
      description: 'From frontline medical rescue to expansive lifelong sanctuaries, discover how our dedicated programs heal, protect, and advocate for every vulnerable animal.'
    },
    whatWeDoItems: WHAT_WE_DO_ITEMS,
    storiesHeader: {
      badge: 'Rescues & Second Chances',
      title: 'Stories',
      description: 'Every animal that enters our care carries a journey of survival. Discover the real stories made possible through timely medical rescue, nurturing rehabilitation, and compassionate community support.'
    },
    storiesItems: STORIES_DATA
  },
  about: {
    pageTitle: 'About Us',
    nonProfitBadge: '501(c)(3) Non-Profit',
    supportButtonText: 'Support Our Cause',
    heroBadge: 'Our Story & Commitment',
    heroHeading: 'Giving Every Injured & Abandoned Animal a Fighting Chance',
    heroParagraph1: 'At Rise & Rescue Animal Welfare, we believe every living creature deserves freedom from cruelty, immediate veterinary intervention in trauma, and a safe, permanent sanctuary where they can flourish.',
    heroParagraph2: 'Established in 2011 in the Boulder Foothills, our accredited sanctuary provides round-the-clock emergency field dispatch, advanced orthopedic surgery, neonatal nurseries, and 350+ acres of protected natural habitats.',
    heroImageUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80',
    heroImageAlt: 'Veterinary team providing compassionate care to rescued animal',
    heroImageBadge: 'Sanctuary Hospital',
    heroImageCaption: 'On-site state-of-the-art wildlife hospital & triage center',
    trustBadge1: 'Charity Navigator 4-Star (98.6%)',
    trustBadge2: 'GuideStar Platinum Transparency',
    trustBadge3: 'Boulder Foothills, CO',
    missionBadge: 'Action Today',
    missionHeading: 'Our Mission',
    missionDescription: 'To provide immediate, round-the-clock emergency medical rescue, compassionate trauma surgery, and lifelong sanctuary for injured, orphaned, and displaced animals—restoring dignity and health through ethical rehabilitation and wild release.',
    missionBullets: [
      'Rapid 24/7 mobile field dispatch for acute animal emergencies and wildfire evacuation.',
      'State-of-the-art diagnostic imaging, orthopedic surgery, and specialized thermal nurseries.',
      'Humane community education and transparent, donor-accountable rescue operations.'
    ],
    missionMandateLabel: 'Operational Mandate',
    missionMandateValue: 'Rescuing 24/7/365',
    visionBadge: 'The Horizon Tomorrow',
    visionHeading: 'Our Vision',
    visionDescription: 'A compassionate world where every animal lives free from cruelty, suffering, and exploitation; where protected native habitats thrive, and where human communities actively co-exist with and advocate for vulnerable wildlife.',
    visionBullets: [
      'Zero preventable animal casualties caused by habitat disruption or human-wildlife conflict.',
      'Expanding protected foothill sanctuary acreage to provide endless safe havens for permanent residents.',
      'Empowering the next generation with empathy, conservation science, and respect for all living beings.'
    ],
    visionHorizonLabel: 'Long-Term Future',
    visionHorizonValue: 'Harmonious Coexistence',
    missionVisionCards: [
      {
        id: 'card-mission',
        badge: 'Action Today',
        heading: 'Our Mission',
        description: 'To provide immediate, round-the-clock emergency medical rescue, compassionate trauma surgery, and lifelong sanctuary for injured, orphaned, and displaced animals—restoring dignity and health through ethical rehabilitation and wild release.',
        imageUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80',
        bullets: [
          'Rapid 24/7 mobile field dispatch for acute animal emergencies and wildfire evacuation.',
          'State-of-the-art diagnostic imaging, orthopedic surgery, and specialized thermal nurseries.',
          'Humane community education and transparent, donor-accountable rescue operations.'
        ]
      },
      {
        id: 'card-vision',
        badge: 'The Horizon Tomorrow',
        heading: 'Our Vision',
        description: 'A compassionate world where every animal lives free from cruelty, suffering, and exploitation; where protected native habitats thrive, and where human communities actively co-exist with and advocate for vulnerable wildlife.',
        imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=800&q=80',
        bullets: [
          'Zero preventable animal casualties caused by habitat disruption or human-wildlife conflict.',
          'Expanding protected foothill sanctuary acreage to provide endless safe havens for permanent residents.',
          'Empowering the next generation with empathy, conservation science, and respect for all living beings.'
        ]
      }
    ],
    teamBadge: 'Compassionate Caretakers',
    teamHeading: 'Meet Our Dedicated Team',
    teamDescription: 'Surgeons, field rescuers, and sanctuary ethologists devoted to animal healing.',
    teamMembers: [
      {
        id: 'team-1',
        name: 'Dr. Elena Vance, DVM',
        role: 'Founder & Chief Wildlife Surgeon',
        bio: 'Board-certified veterinarian with 18 years dedicated to complex orthopedic trauma surgeries and wildlife rehabilitation.',
        imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
        badge: 'Veterinary Leadership'
      },
      {
        id: 'team-2',
        name: 'Marcus Thorne',
        role: 'Director of Rapid Field Rescue',
        bio: 'Former wilderness search & rescue specialist leading our 24/7 rapid emergency mobile animal extraction units.',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        badge: 'Field Operations'
      },
      {
        id: 'team-3',
        name: 'Dr. Priya Patel, PhD',
        role: 'Sanctuary Director & Animal Ethologist',
        bio: 'Leading behavioral therapy and natural habitat design to ensure trauma recovery for permanently resident sanctuary animals.',
        imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
        badge: 'Sanctuary Care'
      },
      {
        id: 'team-4',
        name: 'Sarah Lin',
        role: 'Head of Wildlife Nursery & Rewilding',
        bio: 'Specialist in critical neonatal care, specialized thermal incubation, and wild habitat soft-release programs.',
        imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
        badge: 'Rehabilitation'
      }
    ],
    ctaHeading: 'Join Us in Protecting Vulnerable Lives',
    ctaDescription: 'Whether through a monthly sponsorship, emergency surgery donation, or visiting our photo showcase, you give injured animals a safe place to heal.',
    ctaDonateButtonText: 'Make a Tax-Deductible Gift',
    ctaGalleryButtonText: 'View Photo Showcase Gallery'
  },
  goals: {
    pageTitle: 'Future Goals',
    introBadge: 'Strategic Horizon 2026–2030',
    introHeading: 'Our Strategic Initiatives for Wildlife & Sanctuary Protection',
    introDescription: 'Discover the six core pillars shaping the future of Rise & Rescue. Each initiative addresses long-term habitat preservation, clinical emergency capabilities, and community stewardship across Colorado.',
    goals: [
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
    ],
    ctaHeading: 'Help Us Turn These Goals into Reality',
    ctaDescription: 'Every contribution directly aids injured, orphaned, and resident sanctuary animals. Join us in building permanent foothill havens and advanced trauma care.',
    ctaDonateButtonText: 'Make a Future Goals Contribution',
    ctaGalleryButtonText: 'View Animal Gallery'
  },
  gallery: {
    pageTitle: 'Gallery',
    emptyStateHeading: 'No pictures uploaded yet',
    emptyStateDescription: 'Check back soon for photo updates from our animal sanctuary and rescue missions.',
    categories: ['Sanctuary Life', 'Feline Care', 'Wildlife Rehabilitation', 'Veterinary Care', 'Events', 'Projects', 'Other']
  }
};

const SITE_CONTENT_STORAGE_KEY = 'rise_rescue_site_content_v1';

export function loadSiteContent(): SiteContent {
  try {
    const raw = localStorage.getItem(SITE_CONTENT_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Merge with default in case of schema updates
      const savedCategories = (parsed.gallery && Array.isArray(parsed.gallery.categories) && parsed.gallery.categories.length > 0)
        ? parsed.gallery.categories
        : DEFAULT_SITE_CONTENT.gallery.categories;

      const mergedCategories = Array.from(new Set([
        ...savedCategories,
        'Sanctuary Life',
        'Feline Care',
        'Wildlife Rehabilitation',
        'Veterinary Care'
      ]));

      return {
        ...DEFAULT_SITE_CONTENT,
        ...parsed,
        header: { ...DEFAULT_SITE_CONTENT.header, ...(parsed.header || {}) },
        footer: { ...DEFAULT_SITE_CONTENT.footer, ...(parsed.footer || {}) },
        home: {
          ...DEFAULT_SITE_CONTENT.home,
          ...(parsed.home || {}),
          bankDetails: {
            ...DEFAULT_SITE_CONTENT.home.bankDetails,
            ...((parsed.home && parsed.home.bankDetails) || {}),
            intlBank: {
              ...DEFAULT_SITE_CONTENT.home.bankDetails.intlBank,
              ...((parsed.home && parsed.home.bankDetails && parsed.home.bankDetails.intlBank) || {})
            },
            localBank: {
              ...DEFAULT_SITE_CONTENT.home.bankDetails.localBank,
              ...((parsed.home && parsed.home.bankDetails && parsed.home.bankDetails.localBank) || {})
            }
          },
          whatWeDoHeader: { ...DEFAULT_SITE_CONTENT.home.whatWeDoHeader, ...((parsed.home && parsed.home.whatWeDoHeader) || {}) },
          storiesHeader: { ...DEFAULT_SITE_CONTENT.home.storiesHeader, ...((parsed.home && parsed.home.storiesHeader) || {}) },
        },
        about: {
          ...DEFAULT_SITE_CONTENT.about,
          ...(parsed.about || {}),
          missionVisionCards: (parsed.about && Array.isArray(parsed.about.missionVisionCards))
            ? parsed.about.missionVisionCards
            : DEFAULT_SITE_CONTENT.about.missionVisionCards,
        },
        goals: {
          ...DEFAULT_SITE_CONTENT.goals,
          ...(parsed.goals || {}),
        },
        gallery: {
          ...DEFAULT_SITE_CONTENT.gallery,
          ...(parsed.gallery || {}),
          categories: mergedCategories
        }
      };
    }
  } catch (err) {
    console.warn('Failed to load saved site content, falling back to default:', err);
  }
  return DEFAULT_SITE_CONTENT;
}

export function saveSiteContent(content: SiteContent): void {
  try {
    localStorage.setItem(SITE_CONTENT_STORAGE_KEY, JSON.stringify(content));
  } catch (err) {
    console.error('Failed to save site content to localStorage:', err);
  }
}
