import React from 'react';

interface RiseAndRescueLogoProps {
  className?: string;
  inverted?: boolean;
}

export const RiseAndRescueLogo: React.FC<RiseAndRescueLogoProps> = ({
  className = 'w-9 h-9',
  inverted = false,
}) => {
  const primary = inverted ? '#FFFFFF' : '#043E49';
  const detail = inverted ? '#043E49' : '#FFFFFF';

  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Rise &amp; Rescue Animal Welfare Emblem"
    >
      {/* Outer Heart Framing Border */}
      <path
        d="M 250,142
           C 216,68 114,50 68,124
           C 24,198 64,298 250,436
           C 436,298 476,198 432,124
           C 386,50 284,68 250,142 Z"
        stroke={primary}
        strokeWidth="24"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Main Integrated Silhouette: Dog on Left & Cradling Hand */}
      <path
        d="M 172,108
           C 130,126 96,168 78,230
           C 82,280 104,326 142,370
           C 186,404 250,436 250,436
           C 280,420 310,395 336,362
           C 348,325 340,310 320,300
           C 290,305 265,318 245,312
           C 220,292 195,270 182,245
           C 188,220 205,210 220,204
           C 250,192 274,182 274,172
           C 268,164 250,155 225,142
           C 200,126 186,112 172,108 Z"
        fill={primary}
      />

      {/* Cat Silhouette on Right */}
      <path
        d="M 348,325
           C 372,258 392,212 398,170
           C 382,142 362,168 356,172
           C 344,138 328,172 302,198
           C 284,212 272,218 272,218
           C 280,228 288,234 300,252
           C 318,278 324,305 320,335
           C 336,362 348,325 348,325 Z"
        fill={primary}
      />

      {/* Dog Eye Dot */}
      <circle cx="198" cy="150" r="6" fill={detail} />

      {/* Dog Floppy Ear Contour Loop */}
      <path
        d="M 162,126
           C 172,155 170,192 158,212
           C 148,218 136,206 138,178
           C 140,154 150,132 162,126"
        stroke={detail}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Cat Eye Dot */}
      <circle cx="312" cy="210" r="5.5" fill={detail} />

      {/* Human Cradling Hand Finger Separation Lines */}
      <path
        d="M 312,352 C 285,364 252,364 224,346"
        stroke={detail}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 288,382 C 265,392 242,390 226,375"
        stroke={detail}
        strokeWidth="5.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 268,406 C 250,412 235,408 224,398"
        stroke={detail}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};
