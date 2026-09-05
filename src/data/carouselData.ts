import { CarouselSlide, DonationTier } from '../types';

export const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: 'slide-1',
    animalName: 'Barnaby',
    category: 'Trauma & Shelter Rescue',
    location: 'Pine Ridge Shelter & Clinic',
    title: 'Every wounded paw deserves a safe place to heal',
    subtitle: 'From neglected roadside rescue to pain-free recovery and a warm bed.',
    story: 'Found malnourished and suffering from severe orthopedic injury, Barnaby received emergency surgery and 4 months of physical rehabilitation. Today, he greets every newcomer with gentle thumps of his tail.',
    impactFact: '1,840 companion animals rescued & rehomed this year',
    urgencyLevel: 'Immediate Care',
    imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=2000&q=85',
    imageAlt: 'A rescued golden dog looking upward with soulful trusting eyes in a sunlit sanctuary'
  },
  {
    id: 'slide-2',
    animalName: 'Fern',
    category: 'Wildlife Rehabilitation',
    location: 'Cascade Mountain Sanctuary',
    title: 'Protecting wild lives caught in habitat loss and fires',
    subtitle: 'Specialized 24/7 neonatal medical care for orphaned wildlife.',
    story: 'Displaced during late summer forest fires, Fern was admitted at just two weeks old with smoke inhalation. Our wildlife veterinarians provided around-the-clock oxygen therapy, bottle-feeding, and soft-release preparation.',
    impactFact: '92% successful wildlife release rate into protected reserves',
    urgencyLevel: 'Critical Need',
    imageUrl: 'https://images.unsplash.com/photo-1574063413132-355dbfd83e12?auto=format&fit=crop&w=2000&q=85',
    imageAlt: 'A rehabilitated young deer resting peacefully in a lush green protected wildlife refuge'
  },
  {
    id: 'slide-3',
    animalName: 'Pip & Clover',
    category: 'Neonatal Feline Nursery',
    location: 'Metro Kitten Rescue Center',
    title: 'Giving the most vulnerable kittens a fighting chance',
    subtitle: 'Incubators, antibiotic care, and round-the-clock foster teams.',
    story: 'Found abandoned during a freezing rainstorm, these newborn siblings weighed under 180 grams. Thanks to thermal incubators and our volunteer foster circle, they are now vibrant, healthy, and thriving.',
    impactFact: '620 neonatal kittens bottle-fed & saved from euthanasia',
    urgencyLevel: 'Sustained Recovery',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=2000&q=85',
    imageAlt: 'A warm ginger cat resting in peaceful sunlight in an animal rehabilitation sanctuary'
  },
  {
    id: 'slide-4',
    animalName: 'Maya & The Herd',
    category: 'Ethical Sanctuary & Anti-Poaching',
    location: 'Valley Wildlife Preserve',
    title: 'Lifelong freedom for retired and rescued giants',
    subtitle: 'Expansive natural acreage where endangered animals roam without fear.',
    story: 'After decades of forced tourist labor, Maya took her first step onto natural earth at our protected reserve. She now spends her days grazing alongside a multi-generational matriarchal family.',
    impactFact: '450 acres of permanently safeguarded natural corridor',
    urgencyLevel: 'Permanent Sanctuary',
    imageUrl: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=2000&q=85',
    imageAlt: 'Rescued elephants moving freely through natural open sanctuary reserve at sunset'
  }
];

export const DONATION_TIERS: DonationTier[] = [
  {
    amount: 25,
    label: '$25',
    impact: 'Provides 2 weeks of nutritious recovery food and gentle clean bedding for a rescued animal.',
    dailyEquivalent: '~$0.83 / day'
  },
  {
    amount: 50,
    label: '$50',
    popular: true,
    impact: 'Funds an emergency triage kit, core vaccines, pain relief, and microchip registration.',
    dailyEquivalent: '~$1.65 / day'
  },
  {
    amount: 100,
    label: '$100',
    impact: 'Sponsors emergency veterinary diagnostics, wound treatment, or sterile spay/neuter surgery.',
    dailyEquivalent: '~$3.30 / day'
  },
  {
    amount: 250,
    label: '$250',
    impact: 'Covers full intensive care rehabilitation, medications, and shelter for one critically injured animal.',
    dailyEquivalent: '~$8.20 / day'
  }
];

export const DONATION_FUNDS = [
  { id: 'urgent', name: 'Where the Need is Greatest (Urgent Triage & Rescue)' },
  { id: 'medical', name: 'Emergency Veterinary Surgery & Medication Fund' },
  { id: 'wildlife', name: 'Wildlife Rehabilitation & Habitat Protection' },
  { id: 'neonatal', name: 'Orphaned Kitten & Puppy Nursery Incubators' },
  { id: 'sanctuary', name: 'Permanent Senior & Disabled Sanctuary Care' }
];
