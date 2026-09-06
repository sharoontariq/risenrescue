import React, { useState } from 'react';
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
  branchCode: string;
  routingNumber: string;
  transferRef: string;
}

const INTL_BANK: IntlBankInfo = {
  bankName: 'Bank Alfalah',
  accountTitle: 'Sharoon Tariq Daim',
  iban: 'PK96 ALFH 0106 0010 1002 6840',
  swiftBic: 'ALFHPKKAXXX',
  routingNumber: '0106',
  bankCountry: 'United States',
  currencies: 'USD, EUR, GBP, CAD'
};

const LOCAL_BANK: LocalBankInfo = {
  bankName: 'Community First Bank of Colorado',
  accountTitle: 'Rise & Rescue Local Sanctuary Care',
  accountNumber: '8492-3019-4820-11',
  branchCode: '084-210',
  routingNumber: '102000076',
  transferRef: 'RESCUE-GIFT'
};

export const DonationAppealBox: React.FC<DonationAppealBoxProps> = ({
  activeAnimalName = 'rescued animals'
}) => {
  const [donationType, setDonationType] = useState<'international' | 'local'>('international');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div 
      id="donation-appeal-box" 
      className="w-full bg-white rounded-[22px] sm:rounded-[30px] border border-gray-100 shadow-[0_10px_25px_rgba(0,0,0,0.06)] p-4 sm:p-6 transition-all flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-green-100 text-[#15803D] rounded-xl flex items-center justify-center shrink-0">
              <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-[#15803D] text-[#15803D]" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-xl text-[#1A1A1A] tracking-tight leading-tight">
                Direct Bank Donation
              </h3>
              <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">
                Support {activeAnimalName}
              </p>
            </div>
          </div>

          <span className="text-[10.5px] font-bold text-[#15803D] bg-green-50 border border-green-200 px-3 py-1 rounded-full flex items-center gap-1 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            Official Account
          </span>
        </div>

        {/* 2 Primary Options: International vs Local Bank Transfer */}
        <div className="p-1 bg-gray-100 rounded-xl grid grid-cols-2 gap-1.5 mb-3 text-xs sm:text-sm font-bold">
          <button
            type="button"
            onClick={() => setDonationType('international')}
            className={`py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              donationType === 'international'
                ? 'bg-white text-[#15803D] shadow-xs font-black'
                : 'text-gray-600 hover:text-[#1A1A1A]'
            }`}
          >
            <Globe className="w-4 h-4 shrink-0" />
            <span>International</span>
          </button>

          <button
            type="button"
            onClick={() => setDonationType('local')}
            className={`py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              donationType === 'local'
                ? 'bg-white text-[#15803D] shadow-xs font-black'
                : 'text-gray-600 hover:text-[#1A1A1A]'
            }`}
          >
            <Building2 className="w-4 h-4 shrink-0" />
            <span>Local Donation</span>
          </button>
        </div>

        {/* Display Bank Account Details Card */}
        <div className="bg-gray-50 border border-gray-200/90 rounded-xl p-3.5 sm:p-4 mb-3 text-xs sm:text-sm space-y-2.5">
          <div className="flex items-center justify-between border-b border-gray-200/70 pb-2">
            <span className="font-black text-[#1A1A1A] flex items-center gap-1.5 text-sm sm:text-base">
              {donationType === 'international' ? (
                <>
                  <Globe className="w-3.5 h-3.5 text-[#15803D]" />
                  International Wire Transfer
                </>
              ) : (
                <>
                  <Building2 className="w-3.5 h-3.5 text-[#15803D]" />
                  Local Bank Deposit
                </>
              )}
            </span>
            <span className="text-[9.5px] font-bold text-[#15803D] bg-green-100 px-2 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-2.5 h-2.5" />
              Verified
            </span>
          </div>

          {donationType === 'international' ? (
            /* International Fields */
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-center text-[11.5px]">
                <span className="text-gray-500">Bank Name:</span>
                <span className="font-semibold text-gray-800 text-right">
                  {INTL_BANK.bankName}
                </span>
              </div>

              <div className="flex justify-between items-center text-[11.5px]">
                <span className="text-gray-500">Beneficiary:</span>
                <span className="font-semibold text-gray-800 text-right">
                  {INTL_BANK.accountTitle}
                </span>
              </div>

              <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-gray-200/80 shadow-2xs">
                <div>
                  <span className="text-[9px] text-gray-400 font-bold block">IBAN / ACCOUNT #</span>
                  <span className="font-mono font-bold text-gray-900 tracking-tight text-xs sm:text-sm">
                    {INTL_BANK.iban}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(INTL_BANK.iban, 'iban')}
                  className="p-1 rounded-md text-gray-500 hover:text-[#15803D] hover:bg-gray-100 transition-colors cursor-pointer"
                  title="Copy IBAN"
                >
                  {copiedField === 'iban' ? (
                    <Check className="w-3.5 h-3.5 text-[#15803D]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <div className="flex justify-between items-center bg-white p-1.5 rounded-lg border border-gray-200/80 shadow-2xs">
                  <div>
                    <span className="text-[8.5px] text-gray-400 font-bold block">SWIFT / BIC</span>
                    <span className="font-mono font-bold text-gray-900 text-xs">
                      {INTL_BANK.swiftBic}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(INTL_BANK.swiftBic, 'swift')}
                    className="p-1 rounded-md text-gray-500 hover:text-[#15803D] hover:bg-gray-100 transition-colors cursor-pointer"
                    title="Copy SWIFT code"
                  >
                    {copiedField === 'swift' ? (
                      <Check className="w-3 h-3 text-[#15803D]" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>

                <div className="flex justify-between items-center bg-white p-1.5 rounded-lg border border-gray-200/80 shadow-2xs">
                  <div>
                    <span className="text-[8.5px] text-gray-400 font-bold block">BRANCH CODE</span>
                    <span className="font-mono font-bold text-gray-900 text-xs">
                      {INTL_BANK.routingNumber}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(INTL_BANK.routingNumber, 'routing')}
                    className="p-1 rounded-md text-gray-500 hover:text-[#15803D] hover:bg-gray-100 transition-colors cursor-pointer"
                    title="Copy Branch Code"
                  >
                    {copiedField === 'routing' ? (
                      <Check className="w-3 h-3 text-[#15803D]" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center text-[10.5px] text-gray-500 pt-1 border-t border-gray-200/50">
                <span>Accepted: <strong className="text-gray-700">{INTL_BANK.currencies}</strong></span>
              </div>
            </div>
          ) : (
            /* Local Fields */
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-center text-[11.5px]">
                <span className="text-gray-500">Bank Name:</span>
                <span className="font-semibold text-gray-800 text-right">
                  {LOCAL_BANK.bankName}
                </span>
              </div>

              <div className="flex justify-between items-center text-[11.5px]">
                <span className="text-gray-500">Account Title:</span>
                <span className="font-semibold text-gray-800 text-right">
                  {LOCAL_BANK.accountTitle}
                </span>
              </div>

              <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-gray-200/80 shadow-2xs">
                <div>
                  <span className="text-[9px] text-gray-400 font-bold block">ACCOUNT NUMBER</span>
                  <span className="font-mono font-bold text-gray-900 tracking-tight text-xs sm:text-sm">
                    {LOCAL_BANK.accountNumber}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(LOCAL_BANK.accountNumber, 'account')}
                  className="p-1 rounded-md text-gray-500 hover:text-[#15803D] hover:bg-gray-100 transition-colors cursor-pointer"
                  title="Copy Account Number"
                >
                  {copiedField === 'account' ? (
                    <Check className="w-3.5 h-3.5 text-[#15803D]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <div className="flex justify-between items-center bg-white p-1.5 rounded-lg border border-gray-200/80 shadow-2xs">
                  <div>
                    <span className="text-[8.5px] text-gray-400 font-bold block">BRANCH CODE</span>
                    <span className="font-mono font-bold text-gray-900 text-xs">
                      {LOCAL_BANK.branchCode}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(LOCAL_BANK.branchCode, 'branch')}
                    className="p-1 rounded-md text-gray-500 hover:text-[#15803D] hover:bg-gray-100 transition-colors cursor-pointer"
                    title="Copy Branch Code"
                  >
                    {copiedField === 'branch' ? (
                      <Check className="w-3 h-3 text-[#15803D]" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>

                <div className="flex justify-between items-center bg-white p-1.5 rounded-lg border border-gray-200/80 shadow-2xs">
                  <div>
                    <span className="text-[8.5px] text-gray-400 font-bold block">ROUTING / ACH</span>
                    <span className="font-mono font-bold text-gray-900 text-xs">
                      {LOCAL_BANK.routingNumber}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(LOCAL_BANK.routingNumber, 'localrouting')}
                    className="p-1 rounded-md text-gray-500 hover:text-[#15803D] hover:bg-gray-100 transition-colors cursor-pointer"
                    title="Copy Routing Number"
                  >
                    {copiedField === 'localrouting' ? (
                      <Check className="w-3 h-3 text-[#15803D]" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center text-[10.5px] text-gray-500 pt-1 border-t border-gray-200/50">
                <span>Ref: <strong className="text-gray-800">{LOCAL_BANK.transferRef}</strong></span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(LOCAL_BANK.transferRef, 'ref')}
                  className="text-[10.5px] text-[#15803D] font-bold hover:underline cursor-pointer"
                >
                  {copiedField === 'ref' ? 'Copied!' : 'Copy Reference'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Transfer Instructions & Guidance */}
        <div className="bg-green-50/70 border border-green-200/70 rounded-xl p-2.5 text-[11px] text-gray-700 space-y-1">
          <div className="flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#15803D] shrink-0 mt-0.5" />
            <p className="leading-snug">
              Initiate a transfer directly via your online banking portal, mobile app, or branch counter.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Appeal Message */}
      <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-gray-600 font-medium text-center">
        <Heart className="w-3.5 h-3.5 text-[#15803D] shrink-0 fill-[#15803D]/20" />
        <span>Donate today. Save a life. Give an innocent soul a second chance.</span>
      </div>
    </div>
  );
};
