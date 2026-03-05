import React, { useState } from 'react';
import { Home, Newspaper, Tv, Phone, Menu, X, Globe, TrendingUp, Trophy, Film } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavbarProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  t: any;
}

export const Navbar: React.FC<NavbarProps> = ({ activeCategory, setActiveCategory, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleLiveTvClick = () => {
  const section = document.getElementById("live-tv");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

  const categories = [
    { id: 'all', name: t.home, icon: Home },
    { id: 'national', name: t.national, icon: Newspaper },
    { id: 'international', name: t.international, icon: Globe },
    { id: 'business', name: t.business, icon: TrendingUp },
    { id: 'sports', name: t.sports, icon: Trophy },
    { id: 'entertainment', name: t.entertainment, icon: Film },
  ];

  return (
    <nav className="bg-brand-red  text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-4 py-4 text-sm font-bold flex items-center space-x-2 transition-all border-b-2 border-transparent hover:bg-white/10",
                  activeCategory === cat.id ? "border-brand-yellow text-brand-yellow bg-white/5" : "text-white"
                )}
              >
                <cat.icon size={16} />
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
  onClick={handleLiveTvClick}
  className="flex items-center space-x-2 bg-brand-red px-4 py-2 rounded-full text-sm font-black animate-pulse"
>
              <Tv size={16} />
              <span>{t.liveTv}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-brand-yellow transition-colors text-sm font-bold">
              <a
  href="tel:+919876543210"
  className="flex items-center space-x-2 hover:text-brand-yellow transition-colors text-sm font-bold"
>
  <Phone size={16} />
  <span>{t.contact}</span>
</a>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center justify-between w-full">
            <button
  onClick={() => {
    handleLiveTvClick();
    setIsOpen(false);
  }}
  className="flex items-center space-x-2 bg-brand-red px-3 py-1 rounded-full text-xs font-black"
>
              <Tv size={14} />
              <span>{t.liveTv}</span>
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-brand-red border-t border-white/10 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-md text-base font-bold flex items-center space-x-3",
                  activeCategory === cat.id ? "bg-brand-yellow text-brand-red" : "text-white hover:bg-white/10"
                )}
              >
                <cat.icon size={20} />
                <span>{cat.name}</span>
              </button>
            ))}
            <button className="w-full text-left px-4 py-3 text-white hover:bg-white/10 font-bold flex items-center space-x-3">
             <a
  href="tel:+919876543210"
  className="w-full text-left px-4 py-3 text-white hover:bg-white/10 font-bold flex items-center space-x-3"
>
  <Phone size={20} />
  <span>{t.contact}</span>
</a>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
