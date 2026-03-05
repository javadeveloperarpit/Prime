import React, { useState } from 'react';
import { Play, Youtube, Clock } from 'lucide-react';
import { Video } from '../types';

interface VideoGridProps {
  videos: Video[];
  t: any;

}

export const VideoGrid: React.FC<VideoGridProps> = ({ videos, t }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const getTimeAgo = (timestamp: any) => {
  if (!timestamp) return '';

  const date = timestamp.toDate();
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  const hours = Math.floor(seconds / 3600);
  if (hours < 24) return `${hours} ${t.hoursAgo}`;

  const days = Math.floor(hours / 24);
  return `${days} ${t.daysAgo}`;
};

  const getYoutubeEmbedUrl = (url: string): string | null => {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname === "youtu.be") {
      return `https://www.youtube.com/embed${parsedUrl.pathname}`;
    }

    if (parsedUrl.hostname.includes("youtube.com")) {
      const videoId = parsedUrl.searchParams.get("v");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      if (parsedUrl.pathname.includes("/shorts/")) {
        const id = parsedUrl.pathname.split("/shorts/")[1];
        return `https://www.youtube.com/embed/${id}`;
      }

      if (parsedUrl.pathname.includes("/embed/")) {
        return `https://www.youtube.com/embed/${parsedUrl.pathname.split("/embed/")[1]}`;
      }
    }

    return null;
  } catch {
    return null;
  }
};
  return (
    <section className=" bg-brand-black py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-white uppercase italic flex items-center">
            <Youtube className="mr-3 text-brand-red" size={32} />
            {t.news} <span className="text-brand-yellow ml-2">{t.videos}</span>
          </h2>
          <div className="h-1 flex-1 mx-6 bg-white/10 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {videos
  .slice(0, visibleCount)
  .map((video) => {
    const embedUrl = getYoutubeEmbedUrl(video.youtubeUrl);

    return (
      <div
        key={video.id}
        className="bg-white/5 rounded-xl overflow-hidden border border-white/10 group hover:border-brand-yellow transition-all"
      >
        <div className="aspect-video relative">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={video.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <p className="text-red-500 p-4">Invalid Video URL</p>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center text-white/40 text-[10px] mb-2">
            <Clock size={10} className="mr-1" /> {getTimeAgo(video.createdAt)}
          </div>
          <h3 className="text-white font-bold text-md line-clamp-2 group-hover:text-brand-yellow transition-colors">
            {video.title}
          </h3>
        </div>
      </div>
    );
  })}
</div>
{visibleCount < videos.length && (
  <div className="flex justify-center mt-8">
    <button
      onClick={() => setVisibleCount(prev => prev + 6)}
      className="
        px-6 py-2 
        text-sm font-bold 
        rounded-full 
        bg-brand-red 
        text-white 
        hover:bg-brand-yellow 
        hover:text-black
        transition-all
      "
    >
      {t.more || "More"}
    </button>
  </div>
)}
      </div>
      
    </section>
  );
};
