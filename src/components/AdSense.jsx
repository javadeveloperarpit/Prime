import { useEffect } from "react";

export default function AdSense({ slot }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <ins
      className="adsbygoogle block my-6"
      style={{ display: "block" }}
      data-ad-client="ca-pub-4065768781392485"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}