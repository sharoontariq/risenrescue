export interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  story: string;
  animalName: string;
  category: string;
  location: string;
  impactFact: string;
  urgencyLevel?: 'Immediate Care' | 'Critical Need' | 'Sustained Recovery' | 'Permanent Sanctuary';
  imageUrl: string;
  imageAlt: string;
}

export interface DonationTier {
  amount: number;
  label: string;
  impact: string;
  dailyEquivalent?: string;
  popular?: boolean;
}

export type DonationFrequency = 'once' | 'monthly';

export interface WhatWeDoItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  metricNumber?: string;
  metricLabel?: string;
}

export interface DonationSubmission {
  amount: number;
  frequency: DonationFrequency;
  fund: string;
  donorName: string;
  donorEmail: string;
  isTribute: boolean;
  tributeName?: string;
  coverFees: boolean;
  paymentMethod: string;
  timestamp: string;
  receiptNumber: string;
}
