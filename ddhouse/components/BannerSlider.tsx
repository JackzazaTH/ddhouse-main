'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Banner } from '@/lib/types';

interface BannerSliderProps {
  banners: Banner[];
}

const BannerSlider: React.FC<BannerSliderProps> = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    if (banners.length > 1) {
      setCurrentIndex(prevIndex => (prevIndex === banners.length - 1 ? 0 : prevIndex + 1));
    }
  }, [banners.length]);

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  }

  useEffect(() => {
    const timer = setTimeout(goToNext, 5000);
    return () => clearTimeout(timer);
  }, [currentIndex, goToNext]);

  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full aspect-[12/5] rounded-lg overflow-hidden shadow-2xl mb-12">
      <div className="w-full h-full flex transition-transform ease-in-out duration-700" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {banners.map((banner, index) => (
          <div key={banner.id} className="relative w-full flex-shrink-0 h-full">
            <div className="absolute inset-0 overflow-hidden">
              <img src={banner.imageUrl} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </div>

      {banners.length > 1 && (
        <>
          <button onClick={goToPrevious} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 text-primary p-2 rounded-full shadow-md z-10 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={goToNext} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 text-primary p-2 rounded-full shadow-md z-10 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {banners.map((_, index) => (
              <button key={index} onClick={() => goToSlide(index)} className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-white/50'} transition-all duration-300`}></button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BannerSlider;