import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BusinessAd } from '../types';
import { doc, updateDoc, increment, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface AdCarouselProps {
  ads: BusinessAd[];
  t: any;
}

export const AdCarousel: React.FC<AdCarouselProps> = ({ ads, t }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (ads.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 10000); // 10 seconds as requested

    return () => clearInterval(timer);
  }, [ads.length]);

  if (ads.length === 0) return null;
  const handleAdClick = (ad: BusinessAd) => {
  const adRef = doc(db, "businessAds", ad.id);

  // Fire and forget (no await)
  updateDoc(adRef, {
    totalClicks: increment(1)
  }).catch(() => {});

  // Instant redirect
  window.open(ad.link, "_blank", "noopener,noreferrer");
};

  return (
    <div className="bg-zinc-100 dark:bg-zinc-800 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-black text-zinc-400 uppercase tracking-widest border-l-4 border-brand-gold pl-2">
            {t.businessPartners}
          </h2>
          <div className="flex space-x-1">
            {ads.map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-brand-gold w-4' : 'bg-zinc-300'}`}
              />
            ))}
          </div>
        </div>
        
        <div className="relative w-full min-h-[150px] md:min-h-[250px] overflow-hidden rounded-2xl shadow-inner border-4 border-white dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.a
              key={ads[currentIndex].id}
             onClick={() => handleAdClick(ads[currentIndex])}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 block"
            >
              <img 
  src={ads[currentIndex].imageUrl}
  alt={ads[currentIndex].title}
  className="max-h-full max-w-full object-contain"
  referrerPolicy="no-referrer"
/>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white font-bold text-xl">{ads[currentIndex].title}</h3>
                <p className="text-brand-gold text-sm font-medium">{t.businessPartners}</p>
              </div>
            </motion.a>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
