import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface FutureGoalsPageProps {
  onBackToHome?: () => void;
  onNavigateAbout?: () => void;
  onNavigateGallery?: () => void;
  onDonateClick?: () => void;
}

export const FutureGoalsPage: React.FC<FutureGoalsPageProps> = ({
  onBackToHome
}) => {
  return (
    <div className="w-full bg-[#F8F9FA] min-h-[60vh] flex flex-col">
      {/* Top Header Breadcrumb Bar */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center gap-3">
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-[#15803D] transition-colors cursor-pointer bg-gray-50 hover:bg-green-50 border border-gray-200 px-3.5 py-2 rounded-full"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Home</span>
              </button>
            )}
            <h1 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight">
              Future Goals
            </h1>
          </div>
        </div>
      </div>

      {/* Empty page content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
      </main>
    </div>
  );
};
