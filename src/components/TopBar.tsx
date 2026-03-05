import React, { useState, useEffect } from 'react';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Phone, 
  Moon, 
  Sun, 
  Globe,
  MessageCircle,
  LucideYoutube
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Language } from '../types';

interface TopBarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ language, setLanguage, isDark, setIsDark }) => {
  return (
    <div className="bg-brand-black text-white py-2 px-4 flex flex-col md:flex-row justify-between items-center text-sm">
      <div className="flex items-center space-x-4 mb-2 md:mb-0">
        <a href="https://www.facebook.com/profile.php?id=61565375480511" className="hover:text-brand-gold transition-colors"><Facebook size={16} /></a>
        <a href="https://www.instagram.com/primebharatnews/" className="hover:text-brand-gold transition-colors"><Instagram size={16} /></a>
        <a href="https://www.youtube.com/@PrimeBharatNews.01" className="hover:text-brand-gold transition-colors"><LucideYoutube size={16} /></a>
        <a href="https://whatsapp.com/channel/0029Vap0Wa6Jf05jTg8jRy1L" className="hover:text-brand-gold transition-colors"><MessageCircle size={16} /></a>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Phone size={14} className="text-brand-gold" />
          <span>+91 99199 30320</span>
        </div>
        
        <div className="flex items-center space-x-4 border-l border-white/20 pl-4">
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
            title={isDark ? "Light Mode" : "Dark Mode"}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          
          <div className="flex items-center space-x-1">
            <Globe size={14} className="text-brand-gold" />
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent border-none focus:ring-0 cursor-pointer text-xs uppercase font-bold"
            >
              <option value="hi" className="text-black">Hindi</option>
              <option value="en" className="text-black">English</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
