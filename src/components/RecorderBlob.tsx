import React from 'react';
import { generateRecorderBlobPath } from '../utils/blobPaths.ts';

export const RecorderBlob: React.FC = () => {
  const d = generateRecorderBlobPath(280, 56, 224, 8, 20, 22);

  return (
    <svg
      width={280}
      height={56}
      viewBox="0 0 280 56"
      fill="none"
      className="absolute inset-0 pointer-events-none"
    >
      <defs>
        <filter id="recorder-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feFlood floodColor="white" floodOpacity="0.7" />
          <feComposite operator="in" in2="SourceGraphic" />
          <feGaussianBlur stdDeviation="3" />
          <feComposite operator="in" in2="SourceGraphic" />
        </filter>
      </defs>
      {/* Base glass fill */}
      <path d={d} fill="rgba(255, 255, 255, 0.82)" />
      {/* Glow layer */}
      <path d={d} fill="rgba(255, 255, 255, 0.5)" filter="url(#recorder-glow)" />
      {/* Stroke outline */}
      <path d={d} fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth={1} />
    </svg>
  );
};
