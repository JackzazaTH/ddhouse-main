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
    const timer = setTimeout(goToNext, 6000);
    return () => clearTimeout(timer);
  }, [currentIndex, goToNext]);

  if (!featuredHomes || featuredHomes.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-[400px] md:h-[550px] rounded-2xl overflow-hidden shadow-2xl group">
      {featuredHomes.map((home, index) => (
        <div 
          key={home.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out cursor-pointer ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          onClick={() => onSelect(home.id)}
        >
           <div className="absolute inset-0 overflow-hidden">
              <img 
                src={home.images[0]} 
                alt={home.name} 
                className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-linear ${index === currentIndex ? 'scale-110' : 'scale-100'}`} 
              />
           </div>
           {/* Refined Gradient Overlay */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-12 text-white">
              <div className={`transform transition-all duration-700 delay-100 ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full">FEATURED</span>
                    {home.promotion_enabled && <span className="bg-white text-primary text-xs font-bold px-3 py-1 rounded-full">PROMO</span>}
                  </div>
                  <h2 className="text-4xl md:text-6xl font-bold mb-2 text-shadow-lg tracking-tight">{home.name}</h2>
                  <p className="text-gray-200 max-w-2xl mb-6 line-clamp-2 text-lg shadow-black drop-shadow-md">{home.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-6 mb-6 text-sm md:text-base font-medium">
                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg">
                        <AreaIcon className="w-5 h-5" />
                        <span>{home.area} ตร.ม.</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg">
                        <BedIcon className="w-5 h-5" />
                        <span>{home.bedrooms} ห้องนอน</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg">
                        <BathIcon className="w-5 h-5" />
                        <span>{home.bathrooms} ห้องน้ำ</span>
                      </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onContactClick();
                    }}
                    className="bg-white text-primary font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-white/20 hover:scale-105 active:scale-95"
                  >
                    สอบถามข้อมูล
                  </button>
              </div>
           </div>
        </div>
      ))}

      {featuredHomes.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); goToPrevious(); }} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-md text-white p-3 rounded-full shadow-lg z-20 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={(e) => { e.stopPropagation(); goToNext(); }} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-md text-white p-3 rounded-full shadow-lg z-20 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="absolute bottom-6 right-6 md:right-12 flex space-x-3 z-20">
            {featuredHomes.map((_, index) => (
              <button 
                key={index} 
                onClick={(e) => { e.stopPropagation(); goToSlide(index); }} 
                className={`h-1.5 rounded-full transition-all duration-500 ${currentIndex === index ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'}`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeSlider;