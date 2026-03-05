"use client";
import React, { useState, useEffect } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  getDocs,
  deleteDoc,
  doc,
  Timestamp
} from 'firebase/firestore';

import { db } from '@/firebase';
import { TopBar } from '@/components/TopBar';
import { Header } from '@/components/Header';
import { Navbar } from '@/components/Navbar';
import { BreakingNewsStrip } from '@/components/BreakingNewsStrip';
import { ArticleGrid } from '@/components/ArticleGrid';
import { AdCarousel } from '@/components/AdCarousel';
import { VideoGrid } from '@/components/VideoGrid';
import { Newsletter } from '@/components/Newsletter';
import { Footer } from '@/components/Footer';
import { AdminCMS } from '@/components/AdminCMS';
import { Article, Video, BreakingNews, BusinessAd, Language, LiveTv } from '@/types';
import { translations } from '@/translations';
import AdSense from '@/components/AdSense';

export default function App() {
  const [language, setLanguage] = useState<Language>('hi');
  const [isDark, setIsDark] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const [articles, setArticles] = useState<Article[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [breakingNews, setBreakingNews] = useState<BreakingNews[]>([]);
  const [businessAds, setBusinessAds] = useState<BusinessAd[]>([]);
  const [liveTv, setLiveTv] = useState<LiveTv[]>([]);

  const t = translations[language];

  /* ================================
     DELETE EXPIRED BREAKING NEWS
  ================================== */
  const deleteExpiredNews = async () => {
    try {
      const q = query(
        collection(db, "breakingNews"),
        where("expiresAt", "<=", Timestamp.now())
      );

      const snapshot = await getDocs(q);

      for (const item of snapshot.docs) {
        await deleteDoc(doc(db, "breakingNews", item.id));
      }

      console.log("Expired news cleaned");
    } catch (error) {
      console.error("Cleanup error:", error);
    }
  };

  /* ================================
     DARK MODE
  ================================== */
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  /* ================================
     RUN CLEANUP ON LOAD
  ================================== */
  useEffect(() => {
    deleteExpiredNews();
  }, []);

  /* ================================
     AUTO CLEANUP EVERY 1 HOUR
  ================================== */
  useEffect(() => {
    const interval = setInterval(() => {
      deleteExpiredNews();
    }, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  /* ================================
     FIRESTORE REALTIME LISTENERS
  ================================== */
  useEffect(() => {

    const articlesQuery = query(
      collection(db, 'articles'),
      orderBy('createdAt', 'desc')
    );

    const videosQuery = query(
      collection(db, 'videos'),
      orderBy('createdAt', 'desc')
    );

    const breakingQuery = query(
      collection(db, 'breakingNews'),
      orderBy('createdAt', 'desc')
    );

    const adsQuery = query(
      collection(db, 'businessAds'),
      orderBy('createdAt', 'desc')
    );

    const unsubArticles = onSnapshot(articlesQuery, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Article[];

      setArticles(data);
    });

    const unsubVideos = onSnapshot(videosQuery, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Video[];

      setVideos(data);
    });

    const unsubBreaking = onSnapshot(breakingQuery, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BreakingNews[];

      setBreakingNews(data);
    });

    const unsubAds = onSnapshot(adsQuery, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BusinessAd[];

      setBusinessAds(data);
    });
    const liveTvQuery = query(
  collection(db, 'liveTv'),
  orderBy('createdAt', 'desc')
);

const unsubLiveTv = onSnapshot(liveTvQuery, (snapshot) => {
  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as LiveTv[];

  setLiveTv(data);
});

    return () => {
      unsubArticles();
      unsubVideos();
      unsubBreaking();
      unsubAds();
      unsubLiveTv();
    };

  }, []);

  const filteredArticles =
    activeCategory === 'all'
      ? articles
      : articles.filter(a => a.category === activeCategory);

   const getYoutubeEmbedUrl = (url: string) => {
  if (!url) return null;

  try {
    const parsed = new URL(url.trim());

    // 🚫 Block root youtube.com
    if (
      parsed.hostname.includes("youtube.com") &&
      (parsed.pathname === "/" || parsed.pathname === "")
    ) {
      return null;
    }

    // youtu.be
    if (parsed.hostname === "youtu.be") {
      return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
    }

    // watch?v=
    if (parsed.searchParams.get("v")) {
      return `https://www.youtube.com/embed/${parsed.searchParams.get("v")}`;
    }

    // channel link
    if (parsed.pathname.startsWith("/channel/")) {
      const channelId = parsed.pathname.split("/channel/")[1];
      return `https://www.youtube.com/embed/live_stream?channel=${channelId}`;
    }

    // already embed
    if (parsed.pathname.includes("/embed/")) {
      return url;
    }

    return null;
  } catch {
    return null;
  }
};   

  return (
    <div className="min-h-screen flex flex-col font-sans">

      <TopBar
        language={language}
        setLanguage={setLanguage}
        isDark={isDark}
        setIsDark={setIsDark}
      />

      <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} t={t} />

      <Navbar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        t={t}
      />

      <BreakingNewsStrip news={breakingNews} label={t.breakingNews} />

      <main className="flex-grow">

        {/* Articles */}
        <section className="max-w-7xl mx-auto py-8">
          <div className="px-6 mb-6">
            <h2 className="text-3xl font-black uppercase italic border-l-8 border-brand-red pl-4">
              {t.latest} <span className="text-brand-red">{t.news}</span>
            </h2>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg font-semibold">
                No Articles Available
              </p>
            </div>
          ) : (
            <ArticleGrid articles={filteredArticles} t={t} />
          )}
        </section>

        {/* Business Ads */}
{businessAds.length === 0 ? (
  <section className="max-w-7xl mx-auto py-12 px-6">
    <div className="bg-yellow-400 text-black rounded-2xl p-8 text-center shadow-lg border-4 border-yellow-500">
      <h2 className="text-2xl font-black uppercase tracking-widest mb-3">
        Advertise With Us
      </h2>
      <p className="text-sm font-semibold">
        Apna business promote karna hai?  
        Hamare platform par advertisement ke liye contact kare.
      </p>
      <div className="mt-4 font-bold text-lg">
        📞 Contact: +91-99199 30320
      </div>
    </div>
  </section>
) : (
  <AdCarousel ads={businessAds} t={t} />
)}
{/* Live TV Section - CLS Optimized */}
<section id="live-tv" className="max-w-7xl mx-auto py-12 px-6 mt-20">
  <h2 className="text-2xl font-black uppercase border-l-8 border-brand-red pl-4 mb-6">
    Live TV
  </h2>

  {liveTv.length === 0 ? (
    // Skeleton box jo pehle se jagah gher lega (CLS fix)
    <div className="grid md:grid-cols-2 gap-6">
      <div className="aspect-video bg-zinc-100 animate-pulse rounded-xl" />
      <div className="aspect-video bg-zinc-100 animate-pulse rounded-xl" />
    </div>
  ) : (
    <div className="grid md:grid-cols-2 gap-6">
      {liveTv.map(channel => {
        const safeUrl = getYoutubeEmbedUrl(channel.url);
        if (!safeUrl) return null;

        return (
          <div key={channel.id} className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
            <iframe
              src={safeUrl}
              title={channel.title}
              className="absolute top-0 left-0 w-full h-full"
              allowFullScreen
              loading="lazy" // Sirf screen par aane par load hoga
            />
          </div>
        );
      })}
    </div>
  )}
</section>
        {/* Videos */}
        {videos.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg font-semibold">
              No Videos Available
            </p>
          </div>
        ) : (
          <VideoGrid videos={videos} t={t} />
        )}
       

        {/* AdSense */}
<section className="max-w-7xl mx-auto py-12 px-6">
  <div className="w-full min-h-[100px] bg-zinc-50 border border-dashed rounded-xl flex items-center justify-center">
    {/* Apna asli slot ID yahan likhein */}
    <AdSense slot="9876543210" /> 
  </div>
</section>

        <Newsletter t={t} />

        {isAdmin && (
          <AdminCMS
            articles={articles}
            videos={videos}
            breakingNews={breakingNews}
            businessAds={businessAds}
            liveTv={liveTv}
          />
        )}

      </main>

      <Footer t={t} />
    </div>
  );
}

