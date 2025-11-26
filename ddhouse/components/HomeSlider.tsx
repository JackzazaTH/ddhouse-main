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
    <div className="relative w-full h-[500px] md:h-[650px] rounded-3xl overflow-hidden shadow-2xl group mx-auto max-w-[1920px]">
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
                className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-linear ${index === currentIndex ? 'scale-110' : 'scale-100'}`} 
              />
           </div>
           
           {/* Modern Gradient Overlay */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8 md:p-16 text-white">
              <div className={`transform transition-all duration-700 delay-100 ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-accent text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">Featured Collection</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-white leading-tight drop-shadow-xl">{home.name}</h2>
                  <p className="text-gray-200 max-w-2xl mb-8 line-clamp-2 text-lg md:text-xl font-light drop-shadow-md">{home.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 text-sm md:text-base font-medium">
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                        <AreaIcon className="w-5 h-5" />
                        <span>{home.area} ตร.ม.</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                        <BedIcon className="w-5 h-5" />
                        <span>{home.bedrooms} นอน</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                        <BathIcon className="w-5 h-5" />
                        <span>{home.bathrooms} น้ำ</span>
                      </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onContactClick();
                    }}
                    className="bg-white text-gray-900 font-bold py-3.5 px-8 rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
                  >
                    สอบถามข้อมูลเพิ่มเติม
                  </button>
              </div>
           </div>
        </div>
      ))}

      {featuredHomes.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); goToPrevious(); }} className="hidden md:flex absolute top-1/2 left-8 transform -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-md text-white p-4 rounded-full shadow-lg z-20 transition-all duration-300 border border-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={(e) => { e.stopPropagation(); goToNext(); }} className="hidden md:flex absolute top-1/2 right-8 transform -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-md text-white p-4 rounded-full shadow-lg z-20 transition-all duration-300 border border-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="absolute bottom-8 right-8 md:right-16 flex space-x-3 z-20">
            {featuredHomes.map((_, index) => (
              <button 
                key={index} 
                onClick={(e) => { e.stopPropagation(); goToSlide(index); }} 
                className={`h-2 rounded-full transition-all duration-500 shadow-sm ${currentIndex === index ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/80'}`}
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