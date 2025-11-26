
'use client';
import React, { useState } from 'react';
import { GalleryAlbum } from '@/lib/types';

interface GalleryViewProps {
  albums: GalleryAlbum[];
}

const GalleryView: React.FC<GalleryViewProps> = ({ albums }) => {
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryAlbum | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (selectedAlbum) {
    return (
      <div className="animate-fade-in">
        <button 
            onClick={() => setSelectedAlbum(null)}
            className="mb-6 flex items-center gap-2 text-primary font-medium hover:underline transition-all"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            ย้อนกลับไปดูอัลบั้มทั้งหมด
        </button>
        
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{selectedAlbum.title}</h1>
            <p className="text-gray-500">{selectedAlbum.description}</p>
            <p className="text-sm text-gray-400 mt-2">วันที่: {new Date(selectedAlbum.date).toLocaleDateString('th-TH')}</p>
        </div>

        <div className="columns-1 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {selectedAlbum.images.map((img, idx) => (
                <div key={idx} className="break-inside-avoid rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group" onClick={() => setSelectedImage(img)}>
                    <img src={img} alt={`Image ${idx}`} className="w-full h-auto group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
            ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
            <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
                <img src={selectedImage} alt="Full size" className="max-w-full max-h-full rounded shadow-2xl" />
                <button className="absolute top-4 right-4 text-white text-4xl font-bold">&times;</button>
            </div>
        )}
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">แกลเลอรีรูปภาพ</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">ประมวลภาพความประทับใจ ผลงานก่อสร้าง และกิจกรรมต่างๆ ของเรา</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {albums.map((album) => (
          <div 
            key={album.id} 
            onClick={() => setSelectedAlbum(album)}
            className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group hover:-translate-y-2 transition-all duration-300"
          >
            <div className="relative h-64 overflow-hidden">
                <img src={album.coverImage} alt={album.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white font-medium">ดู {album.images.length} รูปภาพ</span>
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">{album.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{album.description}</p>
                <p className="text-xs text-gray-400 mt-4 text-right">{new Date(album.date).toLocaleDateString('th-TH')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryView;