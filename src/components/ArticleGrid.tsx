import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Clock, Share2 } from 'lucide-react';
import { Article } from '../types';
import { cn } from '../lib/utils';


interface ArticleCardProps {
  article: Article;
  t: any;
}



export const ArticleCard: React.FC<{ article: Article; t: any; index: number }> = ({ article, t, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Time ago function same rahega...
  const getTimeAgo = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const hours = Math.floor(seconds / 3600);
    if (hours < 24) return `${hours} ${t.hoursAgo}`;
    const days = Math.floor(hours / 24);
    return `${days} ${t.daysAgo}`;
  };
  const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": article.title,
  "image": [article.image],
  "datePublished": article.createdAt.toDate().toISOString(),
  "author": {
    "@type": "Organization",
    "name": "Prime Bharat News"
  }
};

// Return mein kahin bhi ye chipka dein:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>

  return (
    <motion.div 
      layout
      className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-md border border-zinc-200 dark:border-zinc-800 group"
    >
      <div className="relative overflow-hidden aspect-video bg-zinc-200 dark:bg-zinc-800">
        {/* 🚀 LCP FIX: Pehle 2 articles ko fetchpriority="high" dena hai */}
        <img
          src={article.image} 
          alt={article.title}
          // @ts-ignore - fetchpriority Next.js standard images ke liye naya hai
          fetchPriority={index < 2 ? "high" : "low"}
          loading={index < 2 ? "eager" : "lazy"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 left-2 bg-brand-red text-white text-[10px] font-black px-2 py-1 rounded uppercase">
          {article.category}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center text-zinc-500 dark:text-zinc-400 text-[10px] mb-2 space-x-3">
          <span className="flex items-center"><Clock size={10} className="mr-1" />{getTimeAgo(article.createdAt)}</span>
          <button className="hover:text-brand-navy transition-colors"><Share2 size={10} /></button>
        </div>
        
        <h3 className="text-lg font-bold leading-tight mb-3 text-brand-navy dark:text-white line-clamp-2">
          {article.title}
        </h3>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-xs font-bold text-brand-navy dark:text-brand-gold hover:underline"
        >
          {isExpanded ? t.readLess : t.readMore}
          {isExpanded ? <ChevronUp size={14} className="ml-1" /> : <ChevronDown size={14} className="ml-1" />}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800 pt-3">
                {article.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const ArticleGrid: React.FC<{ articles: Article[]; t: any }> = ({ articles, t }) => {
  const [visibleCount, setVisibleCount] = useState(6);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {articles
          .slice(0, visibleCount)
          .map((article, index) => (
            // Index pass karna zaroori hai LCP ke liye
            <ArticleCard key={article.id} article={article} t={t} index={index} />
          ))}
      </div>

      {visibleCount < articles.length && (
        <div className="flex justify-center mt-6 mb-6">
          <button
            onClick={() => setVisibleCount(prev => prev + 6)}
            className="px-6 py-2 text-sm font-bold rounded-full bg-brand-red text-white hover:bg-brand-navy transition-all"
          >
            {t.more || "More"}
          </button>
        </div>
      )}
    </>
  );
};
