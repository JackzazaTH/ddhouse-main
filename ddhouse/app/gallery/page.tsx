
'use client';
import React from 'react';
import { useAppContext } from '@/context/AppContext';
import GalleryView from '@/components/GalleryView';

export default function GalleryPage() {
  const { galleryAlbums } = useAppContext();

  return (
    <div className="container mx-auto px-4 py-8">
      <GalleryView albums={galleryAlbums} />
    </div>
  );
}