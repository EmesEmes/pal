import React from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  priceStart: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}