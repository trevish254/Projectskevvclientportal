import React, { useId, ReactNode } from 'react';
import { generateHorizontalBlobPath } from '../utils/blobPaths.ts';

interface BlobContainerProps {
  width: number;
  lobes: number;
  height?: number;
  bg?: string;
  blur?: boolean;
  children: ReactNode;
  className?: string;
  id?: string;
}

export const BlobContainer: React.FC<BlobContainerProps> = ({
  width,
  lobes,
  height = 60,
  bg = 'rgba(255, 255, 255, 0.60)',
  blur = true,
  children,
  className = '',
  id,
}) => {
  const rawId = useId();
  const clipId = `blob-clip-${rawId.replace(/[^a-zA-Z0-9-_]/g, '')}`;
  const d = generateHorizontalBlobPath(width, lobes, height);

  return (
    <div
      id={id}
      className={`relative flex items-center ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        maxWidth: '100%',
      }}
    >
      {/* Hidden SVG with ClipPath */}
      <svg width={0} height={0} className="absolute pointer-events-none">
        <defs>
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            <path d={d} />
          </clipPath>
        </defs>
      </svg>

      {/* Glass / Backdrop fill layer */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: `url(#${clipId})`,
          WebkitClipPath: `url(#${clipId})`,
          background: bg,
          backdropFilter: blur ? 'blur(24px)' : undefined,
          WebkitBackdropFilter: blur ? 'blur(24px)' : undefined,
        }}
      />

      {/* 1px subtle stroke border overlay */}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="absolute inset-0 pointer-events-none w-full h-full"
      >
        <path d={d} fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth={1} />
      </svg>

      {/* Inner interactive content */}
      <div
        className="relative flex items-center w-full h-full z-10"
        style={{
          clipPath: `url(#${clipId})`,
          WebkitClipPath: `url(#${clipId})`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
