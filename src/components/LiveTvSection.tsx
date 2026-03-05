import React from "react";

interface LiveTvSectionProps {
  embedUrl?: string;
}

const getYoutubeEmbedUrl = (url: string): string | null => {
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

    // ✅ youtu.be short link
    if (parsed.hostname === "youtu.be") {
      const videoId = parsed.pathname.slice(1);
      return videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : null;
    }

    // ✅ watch?v=
    if (parsed.searchParams.get("v")) {
      return `https://www.youtube.com/embed/${parsed.searchParams.get("v")}`;
    }

    // ✅ Already embed link
    if (parsed.pathname.includes("/embed/")) {
      return url;
    }

    // ✅ Channel link
    if (parsed.pathname.startsWith("/channel/")) {
      const channelId = parsed.pathname.split("/channel/")[1];
      return `https://www.youtube.com/embed/live_stream?channel=${channelId}`;
    }

    // ✅ @handle link
    if (parsed.pathname.startsWith("/@")) {
      const handle = parsed.pathname.replace("/", "");
      return `https://www.youtube.com/${handle}/live`;
    }

    // ✅ /live page
    if (parsed.pathname.endsWith("/live")) {
      return `${url}`;
    }

    return null;
  } catch (error) {
    return null;
  }
};

const LiveTvSection: React.FC<LiveTvSectionProps> = ({ embedUrl }) => {
  const finalUrl = embedUrl ? getYoutubeEmbedUrl(embedUrl) : null;

  return (
    <div className="w-full bg-black">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-white text-2xl font-bold mb-4">
          🔴 LIVE TV
        </h2>

        {finalUrl ? (
          <div className="relative w-full pb-[56.25%] bg-black rounded-xl overflow-hidden">
            <iframe
              src={finalUrl}
              title="Live TV"
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="text-white text-center py-10 bg-gray-900 rounded-xl">
            No Live Stream Available
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveTvSection;