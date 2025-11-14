

'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { HomeDesign } from '@/lib/types';
import { BedIcon, BathIcon, AreaIcon } from './Icon';

interface HomeSliderProps {
  homes: HomeDesign[];
  onSelect: (id: string) => void;
  onContactClick: () => void;
}

const HomeSlider: React.FC<HomeSliderProps> = ({ homes, onSelect, onContactClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredHomes = homes.filter(home => home.isFeatured);

  const goToNext = useCallback(() => {
    if (featuredHomes.length > 1) {
      setCurrentIndex(prevIndex => (prevIndex === featuredHomes.length - 1 ? 0 : prevIndex + 1));
    }
  }, [featuredHomes.length]);

  const goToPrevious = () => {
    if (featuredHomes.length > 1) {
      setCurrentIndex(prevIndex => (prevIndex === 0 ? featuredHomes.length - 1 : prevIndex - 1));
    }
  };
  
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  }

  useEffect(() => {
    const timer = setTimeout(goToNext, 5000);
    return () => clearTimeout(timer);
  }, [currentIndex, goToNext]);

  if (!featuredHomes || featuredHomes.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-2xl">
      <div className="w-full h-full flex transition-transform ease-in-out duration-700" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {featuredHomes.map((home) => (
          <div 
            key={home.id} 
            className="relative w-full flex-shrink-0 h-full cursor-pointer group"
            onClick={() => onSelect(home.id)}
          >
            <div className="absolute inset-0 overflow-hidden">
              <img src={home.images[0]} alt={home.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end text-white p-8">
              <h2 className="text-3xl md:text-4xl font-bold drop-shadow-lg animate-fade-in-up">{home.name}</h2>
              <div className="flex items-center space-x-6 mt-2 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                  <div className="flex items-center space-x-2">
                    <AreaIcon className="w-5 h-5" />
                    <span>{home.area} m²</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BedIcon className="w-5 h-5" />
                    <span>{home.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BathIcon className="w-5 h-5" />
                    <span>{home.bathrooms} Baths</span>
                  </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onContactClick();
                }}
                className="mt-4 bg-white/20 backdrop-blur-sm text-white font-bold py-2 px-6 rounded-lg hover:bg-white/30 transition-colors duration-300 self-start"
              >
                ติดต่อเรา
              </button>
            </div>
          </div>
        ))}
      </div>

      {featuredHomes.length > 1 && (
        <>
          <button onClick={goToPrevious} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 text-primary p-2 rounded-full shadow-md z-10 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={goToNext} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 text-primary p-2 rounded-full shadow-md z-10 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {featuredHomes.map((_, index) => (
              <button key={index} onClick={() => goToSlide(index)} className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-white/50'} transition-all duration-300`}></button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeSlider;