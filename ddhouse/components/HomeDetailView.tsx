

'use client';
import React, { useState } from 'react';
import { HomeDesign } from '@/lib/types';
import { BedIcon, BathIcon, AreaIcon } from './Icon';

interface HomeDetailViewProps {
  home: HomeDesign;
  onBack: () => void;
  onContactClick: () => void;
}

const HomeDetailView: React.FC<HomeDetailViewProps> = ({ home, onBack, onContactClick }) => {
  const [mainImage, setMainImage] = useState(home.images[0]);

  return (
    <div className="bg-white p-4 sm:p-8 rounded-xl shadow-2xl animate-fade-in">
      <button
        onClick={onBack}
        className="mb-6 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-primary transition-colors duration-300 flex items-center space-x-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        <span>กลับไปที่แกลเลอรี</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <div className="mb-4">
            <img src={mainImage} alt={home.name} className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg" />
          </div>
          <div className="flex space-x-2 overflow-x-auto p-2">
            {home.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${home.name} view ${index + 1}`}
                onClick={() => setMainImage(img)}
                className={`w-24 h-24 object-cover rounded-md cursor-pointer border-4 ${mainImage === img ? 'border-primary' : 'border-transparent'} hover:border-secondary transition-all duration-300 hover:scale-105 hover:shadow-md`}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold text-primary mb-4">{home.name}</h1>
          <p className="text-gray-700 leading-relaxed mb-6">{home.description}</p>
          
          <div className="bg-gray-100 p-6 rounded-lg animate-fade-in-up" style={{animationDelay: '200ms'}}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">รายละเอียด</h2>
            <ul className="space-y-3">
              <li className="flex items-center text-lg">
                <AreaIcon className="w-6 h-6 mr-3 text-secondary" />
                <strong>พื้นที่:</strong><span className="ml-auto">{home.area} ตร.ม.</span>
              </li>
              <li className="flex items-center text-lg">
                <BedIcon className="w-6 h-6 mr-3 text-secondary" />
                <strong>ห้องนอน:</strong><span className="ml-auto">{home.bedrooms}</span>
              </li>
              <li className="flex items-center text-lg">
                <BathIcon className="w-6 h-6 mr-3 text-secondary" />
                <strong>ห้องน้ำ:</strong><span className="ml-auto">{home.bathrooms}</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onContactClick}
            className="w-full mt-6 bg-secondary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            ติดต่อเราเพื่อสอบถามข้อมูล
          </button>

        </div>
      </div>
    </div>
  );
};

export default HomeDetailView;