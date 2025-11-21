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
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group animate-fade-in-up border border-gray-100 flex flex-col h-full"
      style={{ animationDelay, animationFillMode: 'backwards' }}
      onClick={() => onSelect(home.id)}
    >
      <div className="relative overflow-hidden h-64">
        <img 
          src={home.images[0]} 
          alt={home.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
        
        {home.isFeatured && (
            <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                Featured
            </div>
        )}
        {home.promotion_enabled && home.discount_percentage && (
            <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                SAVE {home.discount_percentage}%
            </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">{home.name}</h3>
            <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">{home.description}</p>
        </div>
        
        <div className="grid grid-cols-3 gap-2 py-4 border-t border-gray-100 mt-2">
          <div className="flex flex-col items-center justify-center text-center">
            <BedIcon className="w-6 h-6 text-secondary mb-1" />
            <span className="text-xs text-gray-500 font-medium">{home.bedrooms} ห้องนอน</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center border-l border-gray-100">
            <BathIcon className="w-6 h-6 text-secondary mb-1" />
            <span className="text-xs text-gray-500 font-medium">{home.bathrooms} ห้องน้ำ</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center border-l border-gray-100">
            <AreaIcon className="w-6 h-6 text-secondary mb-1" />
            <span className="text-xs text-gray-500 font-medium">{home.area} ตร.ม.</span>
          </div>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onContactClick();
          }}
          className="w-full mt-4 bg-gray-50 text-primary font-bold py-3 px-4 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 border border-gray-200 hover:border-primary focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          ติดต่อสอบถาม
        </button>
      </div>
    </div>
  );
};

export default HomeCard;