

import React, { useState, useEffect, useCallback } from 'react';
import { PromotionSlide } from '@/lib/types';

interface PromotionSliderProps {
  promotionSlides: PromotionSlide[];
}

const PromotionSlider: React.FC<PromotionSliderProps> = ({ promotionSlides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    if (promotionSlides.length > 1) {
      setCurrentIndex(prevIndex => (prevIndex === promotionSlides.length - 1 ? 0 : prevIndex + 1));
    }
  }, [promotionSlides.length]);

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? promotionSlides.length - 1 : prevIndex - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  }

  useEffect(() => {
    const timer = setTimeout(goToNext, 4000); // Shorter interval
    return () => clearTimeout(timer);
  }, [currentIndex, goToNext]);

  if (!promotionSlides || promotionSlides.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-40 md:h-56 rounded-lg overflow-hidden shadow-xl">
      <div className="w-full h-full flex transition-transform ease-in-out duration-700" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {promotionSlides.map((slide) => (
          <div key={slide.id} className="relative w-full flex-shrink-0 h-full">
            <div className="absolute inset-0 overflow-hidden">
              <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start text-left text-white p-8">
              <h2 className="text-2xl md:text-3xl font-bold drop-shadow-lg animate-fade-in-down">{slide.title}</h2>
              <p className="mt-1 text-sm md:text-base drop-shadow-lg animate-fade-in-up">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {promotionSlides.length > 1 && (
        <>
          <button onClick={goToPrevious} className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 text-primary p-1 rounded-full shadow-md z-10 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={goToNext} className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 text-primary p-1 rounded-full shadow-md z-10 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {promotionSlides.map((_, index) => (
              <button key={index} onClick={() => goToSlide(index)} className={`w-2.5 h-2.5 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-white/50'} transition-all duration-300`}></button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PromotionSlider;