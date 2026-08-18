import React from 'react';
import { generateVerticalBlobPath } from '../utils/blobPaths.ts';

interface SidebarBlobProps {
  height: number;
  lobes: number;
}

export const SidebarBlob: React.FC<SidebarBlobProps> = ({ height, lobes }) => {
  const d = generateVerticalBlobPath(64, height, lobes, 9, 20, 22);
  const filterId = `sidebar-glow-${lobes}`;

  return (
    <svg
      width={64}
      height={height}
      viewBox={`0 0 64 ${height}`}
      fill="none"
      className="absolute inset-0 pointer-events-none"
    >
      <defs>
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feFlood floodColor="white" floodOpacity="0.7" />
          <feComposite operator="in" in2="SourceGraphic" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite operator="in" in2="SourceGraphic" />
        </filter>
      </defs>
      {/* Base opaque glass layer */}
      <path d={d} fill="rgba(255, 255, 255, 0.92)" />
      {/* Glow layer */}
      <path d={d} fill="rgba(255, 255, 255, 0.5)" filter={`url(#${filterId})`} />
      {/* Stroke outline */}
      <path d={d} fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth={1} />
    </svg>
  );
};
