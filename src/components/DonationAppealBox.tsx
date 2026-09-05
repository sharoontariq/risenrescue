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
      className="w-full bg-white rounded-[28px] sm:rounded-[32px] border border-gray-100 shadow-[0_15px_35px_rgba(0,0,0,0.07)] p-5 sm:p-6 lg:p-7 transition-all"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-3 sm:mb-4">
        <div className="w-9 h-9 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Heart className="w-4 h-4 fill-orange-600 text-orange-600" />
        </div>
        <div>
          <h3 className="font-black text-lg sm:text-xl text-[#1A1A1A] tracking-tight leading-tight">
            Fuel Our Mission
          </h3>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
            Donation Appeal
          </p>
        </div>
      </div>

      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
        Your support provides emergency surgery, meals, and sanctuary care for {activeAnimalName} in need.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
        {/* Simple Frequency Toggle */}
        <div className="bg-gray-100 p-1 rounded-xl grid grid-cols-2 gap-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => setFrequency('monthly')}
            className={`py-2 rounded-lg transition-all cursor-pointer ${
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
            className={`py-2 rounded-lg transition-all cursor-pointer ${
              frequency === 'once'
                ? 'bg-white text-[#15803D] shadow-sm font-black'
                : 'text-gray-500 hover:text-[#1A1A1A]'
            }`}
          >
            Give One-Time
          </button>
        </div>

        {/* Preset Amounts Grid */}
        <div className="grid grid-cols-4 gap-2">
          {PRESET_AMOUNTS.map((amt) => {
            const isSelected = !isCustom && selectedAmount === amt;
            return (
              <button
                key={amt}
                type="button"
                onClick={() => handleSelectPreset(amt)}
                className={`py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-black transition-all cursor-pointer border-2 ${
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
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs sm:text-sm">
            $
          </span>
          <input
            type="text"
            placeholder="Custom Amount"
            value={customAmount}
            onChange={handleCustomChange}
            className={`w-full pl-7 pr-3.5 py-2.5 sm:py-3 bg-gray-50 rounded-xl text-xs sm:text-sm font-semibold transition-all text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 ${
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
            className="w-full px-3.5 py-2.5 sm:py-3 bg-gray-50 rounded-xl text-xs sm:text-sm font-medium border border-gray-200 text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#15803D]/20"
          />
        </div>

        {errorMessage && (
          <p className="text-xs text-rose-600 font-semibold text-center">
            {errorMessage}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || currentAmount < 5}
          className="w-full bg-[#F97316] hover:bg-orange-600 active:scale-[0.98] text-white py-3 sm:py-3.5 rounded-xl font-black text-sm sm:text-base shadow-[0_6px_16px_rgba(249,115,22,0.25)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Processing...</span>
            </div>
          ) : (
            <span>
              Donate ${currentAmount > 0 ? currentAmount : '0'} {frequency === 'monthly' ? '/ Month' : 'Now'}
            </span>
          )}
        </button>

        {/* Minimal Footer */}
        <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider pt-0.5">
          <Lock className="w-3 h-3 text-[#15803D]" />
          <span>Secure & Encrypted • 100% Tax-Deductible</span>
        </div>
      </form>
    </div>
  );
};
