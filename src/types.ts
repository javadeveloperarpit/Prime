export type Language = 'hi' | 'en';

export interface Article {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  createdAt: any; // Firestore Timestamp
}

export interface Video {
  id: string;
  title: string;
  youtubeUrl: string;
  createdAt?: any; // Firestore Timestamp
}

export interface BreakingNews {
  id: string;
  text: string;
  createdAt: any;
}

export interface BusinessAd {
  id: string
  title: string
  imageUrl: string
  link: string
  totalClicks?: number   
  createdAt?: any
}
export interface LiveTv {
  id: string;
  title: string;
  url: string;
}
