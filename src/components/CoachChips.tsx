import React from 'react';
import { GlassCard } from './GlassCard.tsx';
import { Coach } from '../types.ts';

const COACHES: Coach[] = [
  {
    id: 'isabella',
    name: 'Isabella Collins',
    role: 'Language Coach',
    avatar:
      'https://framerusercontent.com/images/CyLJLVV8UGC7ng7KqoUZvwF9q0.png?width=224&height=224',
  },
  {
    id: 'liam',
    name: 'Liam Johnson',
    role: 'Speaking Mentor',
    avatar:
      'https://framerusercontent.com/images/vLCwMzYDl3zUQZdwzLwiHOtkTs.png',
  },
];

export const CoachChips: React.FC = () => {
  return (
    <div className="flex flex-row items-center gap-2 sm:gap-3 flex-shrink-0" id="coach-chips-group">
      {COACHES.map((coach) => (
        <GlassCard
          key={coach.id}
          id={`coach-card-${coach.id}`}
          className="flex-1 sm:flex-initial flex items-center gap-3 p-1.5 pr-5 transition-transform hover:scale-[1.02] cursor-pointer"
        >
          <div className="w-10 h-10 rounded-[12px] overflow-hidden flex-shrink-0 bg-gray-100 shadow-sm">
            <img
              src={coach.avatar}
              alt={coach.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-semibold text-black leading-none whitespace-nowrap">
              {coach.name}
            </span>
            <span className="text-[12px] text-[#a0a0a0] font-medium whitespace-nowrap mt-1">
              {coach.role}
            </span>
          </div>
        </GlassCard>
      ))}
    </div>
  );
};
