import React, { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  id,
  style = {},
}) => {
  return (
    <div
      id={id}
      className={`relative rounded-[18px] ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.6)',
        boxShadow: 'inset 0px 0px 5px rgba(221, 221, 221, 0.5)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        ...style,
      }}
    >
      {/* 1.5px Gradient Border Mask Overlay */}
      <div
        className="absolute inset-0 rounded-[18px] pointer-events-none"
        style={{
          padding: '1.5px',
          background:
            'linear-gradient(162deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.2) 100%)',
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {children}
    </div>
  );
};
