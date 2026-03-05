import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { BreakingNews } from '../types';
import { cn } from '../lib/utils';

interface BreakingNewsStripProps {
  news: BreakingNews[];
  label: string;
}

export const BreakingNewsStrip: React.FC<BreakingNewsStripProps> = ({ news, label }) => {
  const [isPaused, setIsPaused] = useState(false);

  if (news.length === 0) return null;

  return (
    <div 
      className="bg-brand-yellow flex items-center h-10 overflow-hidden border-y border-brand-gold shadow-sm cursor-pointer"
      onClick={() => setIsPaused(!isPaused)}
      title="Click to pause/play"
    >
      <div className="bg-brand-red text-white px-4 h-full flex items-center font-black text-sm italic relative z-10 shadow-[5px_0_15px_rgba(0,0,0,0.3)] shrink-0">
        <Zap size={16} className="mr-2 animate-bounce" />
        {label}
      </div>
      <div className="flex-1 marquee-container">
        <div className={cn("marquee-content animate-marquee py-2", isPaused && "pause-animation")}>
          {news.map((item) => (
            <span key={item.id} className="text-brand-navy font-bold mx-8 text-sm uppercase">
              • {item.text}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {news.map((item) => (
            <span key={`dup-${item.id}`} className="text-brand-navy font-bold mx-8 text-sm uppercase">
              • {item.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
