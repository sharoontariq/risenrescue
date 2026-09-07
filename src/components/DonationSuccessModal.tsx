import React, { useState } from 'react';
import { CheckCircle2, Heart, Download, Share2, X, ShieldCheck, Copy, Check } from 'lucide-react';
import { DonationSubmission } from '../types';

interface DonationSuccessModalProps {
  submission: DonationSubmission | null;
  onClose: () => void;
}

export const DonationSuccessModal: React.FC<DonationSuccessModalProps> = ({
  submission,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!submission) return null;

  const handleCopyReceipt = () => {
    navigator.clipboard.writeText(
      `PawHaven Animal Sanctuary Tax Receipt: ${submission.receiptNumber} | $${submission.amount} to ${submission.fund}. Thank you for saving lives!`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        id="donation-success-modal"
        className="w-full max-w-lg bg-white border border-gray-100 rounded-[24px] sm:rounded-[32px] shadow-[0_25px_60px_rgba(0,0,0,0.2)] overflow-hidden relative text-[#1A1A1A] my-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-2 text-gray-400 hover:text-gray-900 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer touch-manipulation z-10"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Top Celebration Header */}
        <div className="bg-[#F8F9FA] p-5 sm:p-8 text-center border-b border-gray-100">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#043E49]/10 border border-[#043E49]/20 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm">
            <Heart className="w-7 h-7 sm:w-8 sm:h-8 fill-[#043E49] text-[#043E49]" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-[#043E49]/10 text-[#043E49] uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Gift Confirmed & Tax Deductible
          </span>
          <h2 className="text-xl sm:text-3xl font-black text-[#1A1A1A]">
            Thank You, {submission.donorName}!
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-md mx-auto leading-relaxed">
            Your generous gift of{' '}
            <strong className="text-[#043E49] font-black">${submission.amount.toFixed(2)}</strong>{' '}
            {submission.frequency === 'monthly' ? 'per month' : ''} directly provides veterinary medicine, surgery, and sanctuary care for rescued animals.
          </p>
        </div>

        {/* Official Receipt Details */}
        <div className="p-4 sm:p-8 space-y-4">
          <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-3.5 sm:p-4 text-xs space-y-2.5">
            <div className="flex justify-between items-center border-b border-gray-200/60 pb-2 gap-2">
              <span className="text-gray-500 font-medium">Official Tax Receipt #:</span>
              <span className="font-mono font-bold text-[#043E49] truncate">{submission.receiptNumber}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200/60 pb-2 gap-2">
              <span className="text-gray-500 font-medium">Designated Cause:</span>
              <span className="font-bold text-[#1A1A1A] text-right truncate max-w-[150px] xs:max-w-[200px]">{submission.fund}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200/60 pb-2 gap-2">
              <span className="text-gray-500 font-medium">Giving Frequency:</span>
              <span className="font-bold text-[#1A1A1A] capitalize">{submission.frequency === 'monthly' ? 'Monthly Guardian Pledge' : 'One-Time Direct Gift'}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200/60 pb-2 gap-2">
              <span className="text-gray-500 font-medium">Tax ID / EIN:</span>
              <span className="font-mono font-semibold text-gray-700">82-9401928 (501(c)(3))</span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <span className="text-gray-500 font-medium">Receipt Sent To:</span>
              <span className="text-[#1A1A1A] font-bold truncate max-w-[160px] xs:max-w-[200px]">{submission.donorEmail}</span>
            </div>
            {submission.isTribute && submission.tributeName && (
              <div className="mt-2 pt-2 border-t border-gray-200/60 text-orange-600 font-bold">
                Honorary Tribute: {submission.tributeName}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3">
            <button
              onClick={handleCopyReceipt}
              className="w-full sm:flex-1 py-2.5 sm:py-3 px-4 rounded-2xl text-xs font-bold bg-gray-100 hover:bg-gray-200 text-[#1A1A1A] border border-gray-200 transition-all flex items-center justify-center gap-2 cursor-pointer touch-manipulation"
            >
              {copied ? <Check className="w-4 h-4 text-[#043E49]" /> : <Copy className="w-4 h-4 text-gray-500" />}
              <span>{copied ? 'Copied Receipt' : 'Copy Receipt Summary'}</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:flex-1 py-2.5 sm:py-3 px-4 rounded-2xl text-xs font-black bg-[#043E49] hover:bg-[#032f38] text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md touch-manipulation"
            >
              <span>Return to Sanctuary</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[10.5px] sm:text-[11px] text-gray-500 text-center font-medium">
            <ShieldCheck className="w-4 h-4 text-[#043E49] shrink-0" />
            <span>A certified 501(c)(3) tax receipt confirmation has been issued.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
