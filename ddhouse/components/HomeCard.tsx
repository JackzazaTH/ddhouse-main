

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
      className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer group animate-fade-in-up"
      style={{ animationDelay, animationFillMode: 'backwards' }}
      onClick={() => onSelect(home.id)}
    >
      <div className="relative overflow-hidden">
        <img 
          src={home.images[0]} 
          alt={home.name} 
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-primary mb-2">{home.name}</h3>
        <p className="text-gray-600 mb-4 h-20 overflow-hidden text-ellipsis">{home.description}</p>
        <div className="flex justify-around items-center text-gray-700 border-t pt-4">
          <div className="flex items-center space-x-2">
            <BedIcon className="w-5 h-5 text-secondary" />
            <span>{home.bedrooms} Beds</span>
          </div>
          <div className="flex items-center space-x-2">
            <BathIcon className="w-5 h-5 text-secondary" />
            <span>{home.bathrooms} Baths</span>
          </div>
          <div className="flex items-center space-x-2">
            <AreaIcon className="w-5 h-5 text-secondary" />
            <span>{home.area} m²</span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onContactClick();
          }}
          className="w-full bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary transition-colors duration-300 mt-4"
        >
          ติดต่อเรา
        </button>
      </div>
    </div>
  );
};

export default HomeCard;