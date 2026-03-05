import React from 'react';
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin, Award, LucideYoutube } from 'lucide-react';


interface FooterProps {
  t: any;
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-black text-white pt-16 pb-8 px-6 border-t-4 border-brand-red">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Left Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="rotating-logo-container">
    <div className="rotating-logo-inner">
      <img
        src="https://yielding-silver-7lbswgmn7e.edgeone.app/p.jpg"
        alt="Prime Bharat News"
        className="rotating-logo-front"
      />
      <img
        src="https://yielding-silver-7lbswgmn7e.edgeone.app/p.jpg"
        alt="Prime Bharat News"
        className="rotating-logo-back"
      />
    </div>
  </div>
            <h2 className="text-2xl font-black italic uppercase">
              Prime <span className="text-brand-red">भारत</span> News
            </h2>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {t.aboutDesc}
          </p>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/profile.php?id=61565375480511" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-red transition-all"><Facebook size={20} /></a>
            <a href="https://www.instagram.com/primebharatnews/" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-red transition-all"><Instagram size={20} /></a>
            <a href="https://www.youtube.com/@PrimeBharatNews.01" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-red transition-all"><LucideYoutube size={20} /></a>
          </div>
        </div>

        {/* Center Section */}
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <div className="bg-brand-red 900/50 p-6 rounded-2xl border border-white/10 w-full overflow-hidden">
            <Award className="mx-auto text-brand-gold mb-4" size={48} />
            <div className="marquee-container">
              <div className="marquee-content animate-marquee-slow whitespace-nowrap will-change-transform">
                <span className="text-brand-gold font-black text-lg uppercase tracking-widest mx-10">
                  {t.certifiedInstitute}
                </span>
                <span className="text-brand-gold font-black text-lg uppercase tracking-widest mx-10">
                  {t.trustedByMillions}
                </span>
                <span className="text-brand-gold font-black text-lg uppercase tracking-widest mx-10">
                  {t.excellenceJournalism}
                </span>
                {/* Duplicate for seamless loop */}
                <span className="text-brand-gold font-black text-lg uppercase tracking-widest mx-10">
                  {t.certifiedInstitute}
                </span>
                <span className="text-brand-gold font-black text-lg uppercase tracking-widest mx-10">
                  {t.trustedByMillions}
                </span>
                <span className="text-brand-gold font-black text-lg uppercase tracking-widest mx-10">
                  {t.excellenceJournalism}
                </span>
              </div>
            </div>
          </div>
          <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em]">
            {t.officialMediaPartner}
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-black uppercase border-b-2 border-brand-red inline-block pb-1">{t.contact}</h3>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3 text-zinc-400 hover:text-white transition-colors">
              <MapPin size={20} className="text-brand-red mt-1 shrink-0" />
              <span className="text-sm">Flat NO. 4, Second floor Ramanand Market , Sitapur Road , Lucknow </span>
            </li>
            <li className="flex items-center space-x-3 text-zinc-400 hover:text-white transition-colors">
              <Phone size={20} className="text-brand-red shrink-0" />
              <span className="text-sm font-bold">+91 99199 30320</span>
            </li>
            <li className="flex items-center space-x-3 text-zinc-400 hover:text-white transition-colors">
              <Mail size={20} className="text-brand-red shrink-0" />
              <span className="text-sm">Primebharatnews1@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
          &copy; {currentYear} Prime Bharat News. {t.rightsReserved}
        </p>
        <div className="flex space-x-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">
          <a href="#" className="hover:text-white transition-colors">{t.privacyPolicy}</a>
          <a href="#" className="hover:text-white transition-colors">{t.termsOfService}</a>
          <a href="#" className="hover:text-white transition-colors">{t.cookiePolicy}</a>
        </div>
      </div>
    </footer>
  );
};
