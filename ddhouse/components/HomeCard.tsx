import React from 'react';
import { HomeDesign } from '@/lib/types';
import { BedIcon, BathIcon, AreaIcon } from './Icon';

interface HomeCardProps {
  home: HomeDesign;
  onSelect: (id: string) => void;
  onContactClick: () => void;
  animationDelay?: string;
}

const HomeCard: React.FC<HomeCardProps> = ({ home, onSelect, onContactClick, animationDelay }) => {
  return (
    <div 
      className="bg-white rounded-2xl shadow-soft-lg hover:shadow-soft-xl transition-all duration-500 cursor-pointer group animate-fade-in-up overflow-hidden flex flex-col h-full border border-gray-100/50 hover:border-primary/20 hover:-translate-y-2"
      style={{ animationDelay, animationFillMode: 'backwards' }}
      onClick={() => onSelect(home.id)}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img 
          src={home.images[0]} 
          alt={home.name} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
        
        {/* Tags */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
            {home.isFeatured && (
                <span className="bg-accent/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wider transform transition-transform group-hover:scale-105">
                    Featured
                </span>
            )}
            {home.promotion_enabled && home.discount_percentage && (
                <span className="bg-primary/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wider transform transition-transform group-hover:scale-105">
                    Save {home.discount_percentage}%
                </span>
            )}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow relative">
        <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-1">{home.name}</h3>
            <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{home.description}</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4 py-5 border-t border-gray-100 mt-auto">
          <div className="flex flex-col items-center text-center group/icon">
            <span className="text-gray-400 mb-1 group-hover/icon:text-primary transition-colors"><BedIcon className="w-5 h-5" /></span>
            <span className="text-xs font-semibold text-gray-600">{home.bedrooms} นอน</span>
          </div>
          <div className="flex flex-col items-center text-center border-l border-gray-100 group/icon">
            <span className="text-gray-400 mb-1 group-hover/icon:text-primary transition-colors"><BathIcon className="w-5 h-5" /></span>
            <span className="text-xs font-semibold text-gray-600">{home.bathrooms} น้ำ</span>
          </div>
          <div className="flex flex-col items-center text-center border-l border-gray-100 group/icon">
            <span className="text-gray-400 mb-1 group-hover/icon:text-primary transition-colors"><AreaIcon className="w-5 h-5" /></span>
            <span className="text-xs font-semibold text-gray-600">{home.area} ตร.ม.</span>
          </div>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onContactClick();
          }}
          className="w-full mt-5 bg-gray-50 text-gray-800 font-bold py-3.5 px-4 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 border border-gray-200 hover:border-primary shadow-sm hover:shadow-glow text-sm tracking-wide"
        >
          ติดต่อสอบถาม
        </button>
      </div>
    </div>
  );
};

export default HomeCard;