import React from 'react';
import { Mail, Send } from 'lucide-react';

interface NewsletterProps {
  t: any;
}

export const Newsletter: React.FC<NewsletterProps> = ({ t }) => {
  return (
    <section className="bg-brand-gold py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block p-3 bg-brand-red 900 rounded-full mb-6 text-white">
          <Mail size={32} />
        </div>
        <h2 className="text-4xl font-black text-brand-red 900 uppercase mb-4 tracking-tighter">
          {t.stayUpdated}
        </h2>
        <p className="text-brand-red 900/80 font-medium mb-8 max-w-xl mx-auto">
          {t.newsletterDesc}
        </p>
        
        <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
          <input 
            type="email" 
            placeholder={t.enterEmail}
            className="flex-1 px-6 py-4 rounded-full bg-white border-2 border-brand-red 900/10 focus:border-brand-red 900 outline-none font-bold text-brand-red 900 shadow-lg"
            required
          />
          <button 
            type="submit"
            className="bg-brand-red 900 hover:bg-brand-red text-white px-8 py-4 rounded-full font-black uppercase tracking-widest transition-all flex items-center justify-center shadow-lg hover:scale-105 active:scale-95"
          >
            {t.subscribe} <Send size={18} className="ml-2" />
          </button>
        </form>
        
        <p className="mt-6 text-[10px] text-brand-red 900/60 font-bold uppercase tracking-widest">
          {t.joinSubscribers}
        </p>
      </div>
    </section>
  );
};
