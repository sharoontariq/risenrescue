import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Lock, 
  Globe, 
  Building2, 
  Copy, 
  Check, 
  ShieldCheck,
  Info
} from 'lucide-react';
import { DonationSubmission } from '../types';

interface DonationAppealBoxProps {
  onSuccessfulDonation?: (submission: DonationSubmission) => void;
  activeAnimalName?: string;
}

interface IntlBankInfo {
  bankName: string;
  accountTitle: string;
  iban: string;
  swiftBic: string;
  routingNumber: string;
  bankCountry: string;
  currencies: string;
}

interface LocalBankInfo {
  bankName: string;
  accountTitle: string;
  accountNumber: string;
}

const INTL_BANK: IntlBankInfo = {
  bankName: 'Bank Alfalah',
  accountTitle: 'Sharoon Tariq Daim',
  iban: 'PK96 ALFH 0106 0010 1002 6840',
  swiftBic: 'ALFHPKKAXXX',
  routingNumber: '0106',
  bankCountry: 'Pakistan',
  currencies: 'USD, EUR, GBP, CAD'
};

const LOCAL_BANK: LocalBankInfo = {
  bankName: 'Easy Paisa',
  accountTitle: 'Sharoon Tariq',
  accountNumber: '0311 7432755'
};

const MOTIVATIONAL_WORDS = [
  'Give Hope',
  'Save Lives',
  'Be Their Voice'
];

export const DonationAppealBox: React.FC<DonationAppealBoxProps> = ({
  activeAnimalName = 'rescued animals'
}) => {
  const [donationType, setDonationType] = useState<'international' | 'local'>('international');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % MOTIVATIONAL_WORDS.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div 
      id="donation-appeal-box" 
      className="w-full bg-white rounded-[20px] xs:rounded-[22px] sm:rounded-[30px] border border-gray-100 shadow-[0_10px_25px_rgba(0,0,0,0.06)] p-3.5 sm:p-6 transition-all flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#043E49]/10 text-[#043E49] rounded-xl flex items-center justify-center shrink-0">
              <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-[#043E49] text-[#043E49]" />
            </div>
            <div className="min-w-0">
              <h3 className="font-black text-base sm:text-xl text-[#1A1A1A] tracking-tight leading-tight truncate">
                Direct Bank Donation
              </h3>
              <div className="text-xs sm:text-[12.5px] text-[#043E49] font-bold tracking-normal mt-0.5 flex items-center gap-1.5 h-5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                <div className="relative inline-flex items-center h-5 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIndex}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="inline-block whitespace-nowrap text-[#043E49]"
                    >
                      {MOTIVATIONAL_WORDS[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          <span className="text-[10px] sm:text-[10.5px] font-bold text-[#043E49] bg-[#043E49]/10 border border-[#043E49]/20 px-2.5 sm:px-3 py-1 rounded-full flex items-center gap-1 shadow-2xs shrink-0">
            <ShieldCheck className="w-3.5 h-3.5" />
            Official Account
          </span>
        </div>

        {/* 2 Primary Options: International vs Local Bank Transfer */}
        <div className="p-1 bg-gray-100 rounded-xl grid grid-cols-2 gap-1.5 mb-3 text-xs sm:text-sm font-bold">
          <button
            type="button"
            onClick={() => setDonationType('international')}
            className={`py-2 px-2.5 sm:px-3 rounded-lg transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer touch-manipulation ${
              donationType === 'international'
                ? 'bg-white text-[#043E49] shadow-xs font-black'
                : 'text-gray-600 hover:text-[#1A1A1A]'
            }`}
          >
            <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate">International</span>
          </button>

          <button
            type="button"
            onClick={() => setDonationType('local')}
            className={`py-2 px-2.5 sm:px-3 rounded-lg transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer touch-manipulation ${
              donationType === 'local'
                ? 'bg-white text-[#043E49] shadow-xs font-black'
                : 'text-gray-600 hover:text-[#1A1A1A]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate">Local Donation</span>
          </button>
        </div>

        {/* Display Bank Account Details Card */}
        <div className="bg-gray-50 border border-gray-200/90 rounded-xl p-3 sm:p-4 mb-3 text-xs sm:text-sm space-y-2.5">
          <div className="flex items-center justify-between border-b border-gray-200/70 pb-2">
            <span className="font-black text-[#1A1A1A] flex items-center gap-1.5 text-xs sm:text-base">
              {donationType === 'international' ? (
                <>
                  <Globe className="w-3.5 h-3.5 text-[#043E49] shrink-0" />
                  International Wire Transfer
                </>
              ) : (
                <>
                  <Building2 className="w-3.5 h-3.5 text-[#043E49] shrink-0" />
                  Local Bank Deposit
                </>
              )}
            </span>
            <span className="text-[9.5px] font-bold text-[#043E49] bg-[#043E49]/10 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
              <ShieldCheck className="w-2.5 h-2.5" />
              Verified
            </span>
          </div>

          {donationType === 'international' ? (
            /* International Fields */
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-center text-[11px] sm:text-[11.5px]">
                <span className="text-gray-500">Bank Name:</span>
                <span className="font-semibold text-gray-800 text-right">
                  {INTL_BANK.bankName}
                </span>
              </div>

              <div className="flex justify-between items-center text-[11px] sm:text-[11.5px]">
                <span className="text-gray-500">Beneficiary:</span>
                <span className="font-semibold text-gray-800 text-right">
                  {INTL_BANK.accountTitle}
                </span>
              </div>

              <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-gray-200/80 shadow-2xs gap-1.5">
                <div className="min-w-0">
                  <span className="text-[8.5px] sm:text-[9px] text-gray-400 font-bold block">IBAN / ACCOUNT #</span>
                  <span className="font-mono font-bold text-gray-900 tracking-tight text-[11px] xs:text-xs sm:text-sm break-all select-all">
                    {INTL_BANK.iban}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(INTL_BANK.iban, 'iban')}
                  className="p-1.5 rounded-md text-gray-500 hover:text-[#043E49] hover:bg-gray-100 transition-colors cursor-pointer shrink-0 touch-manipulation"
                  title="Copy IBAN"
                >
                  {copiedField === 'iban' ? (
                    <Check className="w-3.5 h-3.5 text-[#043E49]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-1.5">
                <div className="flex justify-between items-center bg-white p-1.5 sm:p-2 rounded-lg border border-gray-200/80 shadow-2xs gap-1">
                  <div className="min-w-0">
                    <span className="text-[8px] sm:text-[8.5px] text-gray-400 font-bold block">SWIFT / BIC</span>
                    <span className="font-mono font-bold text-gray-900 text-[11px] sm:text-xs truncate block">
                      {INTL_BANK.swiftBic}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(INTL_BANK.swiftBic, 'swift')}
                    className="p-1.5 rounded-md text-gray-500 hover:text-[#043E49] hover:bg-gray-100 transition-colors cursor-pointer shrink-0 touch-manipulation"
                    title="Copy SWIFT code"
                  >
                    {copiedField === 'swift' ? (
                      <Check className="w-3 h-3 text-[#043E49]" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>

                <div className="flex justify-between items-center bg-white p-1.5 sm:p-2 rounded-lg border border-gray-200/80 shadow-2xs gap-1">
                  <div className="min-w-0">
                    <span className="text-[8px] sm:text-[8.5px] text-gray-400 font-bold block">BRANCH CODE</span>
                    <span className="font-mono font-bold text-gray-900 text-[11px] sm:text-xs truncate block">
                      {INTL_BANK.routingNumber}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(INTL_BANK.routingNumber, 'routing')}
                    className="p-1.5 rounded-md text-gray-500 hover:text-[#043E49] hover:bg-gray-100 transition-colors cursor-pointer shrink-0 touch-manipulation"
                    title="Copy Branch Code"
                  >
                    {copiedField === 'routing' ? (
                      <Check className="w-3 h-3 text-[#043E49]" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] sm:text-[10.5px] text-gray-500 pt-1 border-t border-gray-200/50">
                <span>Accepted: <strong className="text-gray-700">{INTL_BANK.currencies}</strong></span>
              </div>
            </div>
          ) : (
            /* Local Fields */
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-center text-[11px] sm:text-[11.5px]">
                <span className="text-gray-500">Bank Name:</span>
                <span className="font-semibold text-gray-800 text-right">
                  {LOCAL_BANK.bankName}
                </span>
              </div>

              <div className="flex justify-between items-center text-[11px] sm:text-[11.5px]">
                <span className="text-gray-500">Account Title:</span>
                <span className="font-semibold text-gray-800 text-right">
                  {LOCAL_BANK.accountTitle}
                </span>
              </div>

              <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-gray-200/80 shadow-2xs gap-1.5">
                <div className="min-w-0">
                  <span className="text-[8.5px] sm:text-[9px] text-gray-400 font-bold block">ACCOUNT / MOBILE #</span>
                  <span className="font-mono font-bold text-gray-900 tracking-tight text-[11px] xs:text-xs sm:text-sm break-all select-all">
                    {LOCAL_BANK.accountNumber}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(LOCAL_BANK.accountNumber, 'account')}
                  className="p-1.5 rounded-md text-gray-500 hover:text-[#043E49] hover:bg-gray-100 transition-colors cursor-pointer shrink-0 touch-manipulation"
                  title="Copy Account Number"
                >
                  {copiedField === 'account' ? (
                    <Check className="w-3.5 h-3.5 text-[#043E49]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Transfer Instructions & Guidance */}
        <div className="bg-[#043E49]/5 border border-[#043E49]/15 rounded-xl p-2.5 text-[11px] text-gray-700 space-y-1">
          <div className="flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#043E49] shrink-0 mt-0.5" />
            <p className="leading-snug">
              Initiate a transfer directly via your online banking portal, mobile app, or branch counter.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Appeal Message */}
      <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-gray-600 font-medium text-center">
        <Heart className="w-3.5 h-3.5 text-[#043E49] shrink-0 fill-[#043E49]/20" />
        <span>Donate today. Save a life. Give an innocent soul a second chance.</span>
      </div>
    </div>
  );
};
