import React, { useState } from 'react';
import { Heart, Lock } from 'lucide-react';
import { DonationFrequency, DonationSubmission } from '../types';

interface DonationAppealBoxProps {
  onSuccessfulDonation: (submission: DonationSubmission) => void;
  activeAnimalName?: string;
}

const PRESET_AMOUNTS = [15, 35, 75, 150];

export const DonationAppealBox: React.FC<DonationAppealBoxProps> = ({
  onSuccessfulDonation,
  activeAnimalName = 'rescued animals'
}) => {
  const [frequency, setFrequency] = useState<DonationFrequency>('monthly');
  const [selectedAmount, setSelectedAmount] = useState<number>(35);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentAmount = isCustom ? (parseFloat(customAmount) || 0) : selectedAmount;

  const handleSelectPreset = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustom(false);
    setCustomAmount('');
    setErrorMessage(null);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9.]/g, '');
    setCustomAmount(val);
    setIsCustom(true);
    setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAmount < 5) {
      setErrorMessage('Please enter a minimum donation of $5.');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const submission: DonationSubmission = {
        amount: currentAmount,
        frequency,
        fund: 'Emergency Medical & Sanctuary Fund',
        donorName: 'Compassionate Supporter',
        donorEmail: donorEmail.trim() || 'supporter@pawhaven.org',
        isTribute: false,
        coverFees: true,
        paymentMethod: 'Credit Card',
        timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        receiptNumber: `PH-${Math.floor(100000 + Math.random() * 900000)}`
      };
      onSuccessfulDonation(submission);
    }, 600);
  };

  return (
    <div 
      id="donation-appeal-box" 
      className="w-full bg-white rounded-[32px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-6 sm:p-8 lg:p-10 transition-all"
    >
      {/* Header */}
      <div className="flex items-center gap-3.5 mb-5">
        <div className="w-11 h-11 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0">
          <Heart className="w-5 h-5 fill-orange-600 text-orange-600" />
        </div>
        <div>
          <h3 className="font-black text-xl sm:text-2xl text-[#1A1A1A] tracking-tight">
            Fuel Our Mission
          </h3>
          <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">
            Donation Appeal
          </p>
        </div>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        Your support provides emergency surgery, nutritious meals, and permanent sanctuary care for {activeAnimalName} in need.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Simple Frequency Toggle */}
        <div className="bg-gray-100 p-1.5 rounded-2xl grid grid-cols-2 gap-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => setFrequency('monthly')}
            className={`py-2.5 rounded-xl transition-all cursor-pointer ${
              frequency === 'monthly'
                ? 'bg-white text-[#15803D] shadow-sm font-black'
                : 'text-gray-500 hover:text-[#1A1A1A]'
            }`}
          >
            Give Monthly
          </button>
          <button
            type="button"
            onClick={() => setFrequency('once')}
            className={`py-2.5 rounded-xl transition-all cursor-pointer ${
              frequency === 'once'
                ? 'bg-white text-[#15803D] shadow-sm font-black'
                : 'text-gray-500 hover:text-[#1A1A1A]'
            }`}
          >
            Give One-Time
          </button>
        </div>

        {/* Preset Amounts Grid */}
        <div className="grid grid-cols-4 gap-2.5">
          {PRESET_AMOUNTS.map((amt) => {
            const isSelected = !isCustom && selectedAmount === amt;
            return (
              <button
                key={amt}
                type="button"
                onClick={() => handleSelectPreset(amt)}
                className={`py-3.5 rounded-2xl text-base font-black transition-all cursor-pointer border-2 ${
                  isSelected
                    ? 'border-[#15803D] bg-green-50 text-[#15803D] shadow-sm scale-[1.02]'
                    : 'border-gray-100 bg-white text-[#1A1A1A] hover:border-[#15803D] hover:text-[#15803D]'
                }`}
              >
                ${amt}
              </button>
            );
          })}
        </div>

        {/* Custom Amount Input */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">
            $
          </span>
          <input
            type="text"
            placeholder="Custom Amount"
            value={customAmount}
            onChange={handleCustomChange}
            className={`w-full pl-8 pr-4 py-3.5 bg-gray-50 rounded-2xl text-sm font-semibold transition-all text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 ${
              isCustom ? 'border-2 border-[#15803D] bg-green-50/40' : 'border border-gray-200'
            }`}
          />
        </div>

        {/* Email Input for Tax Receipt */}
        <div>
          <input
            type="email"
            placeholder="Email for official tax receipt"
            value={donorEmail}
            onChange={(e) => setDonorEmail(e.target.value)}
            className="w-full px-4 py-3.5 bg-gray-50 rounded-2xl text-sm font-medium border border-gray-200 text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15803D]/20"
          />
        </div>

        {errorMessage && (
          <p className="text-xs text-rose-600 font-semibold text-center">
            {errorMessage}
          </p>
        )}

        {/* Big Orange Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || currentAmount < 5}
          className="w-full bg-[#F97316] hover:bg-orange-600 active:scale-[0.98] text-white py-4 sm:py-4.5 rounded-2xl font-black text-base sm:text-lg shadow-[0_8px_20px_rgba(249,115,22,0.28)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Processing...</span>
            </div>
          ) : (
            <span>
              Donate ${currentAmount > 0 ? currentAmount : '0'} {frequency === 'monthly' ? '/ Month' : 'Now'}
            </span>
          )}
        </button>

        {/* Minimal Footer */}
        <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest pt-1">
          <Lock className="w-3.5 h-3.5 text-[#15803D]" />
          <span>Secure & Encrypted • 100% Tax-Deductible</span>
        </div>
      </form>
    </div>
  );
};
