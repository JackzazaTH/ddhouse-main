'use client';
import React, { useState } from 'react';
import { HomeDesign } from '@/lib/types';
import { BedIcon, BathIcon, AreaIcon, ParkingIcon } from './Icon';

interface HomeDetailViewProps {
  home: HomeDesign;
  onBack: () => void;
  onContactClick: () => void;
}

const HomeDetailView: React.FC<HomeDetailViewProps> = ({ home, onBack, onContactClick }) => {
  const [mainImage, setMainImage] = useState(home.images[0]);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleThumbnailClick = (img: string) => {
    if (img !== mainImage) {
      setIsImageLoading(true);
      setMainImage(img);
    }
  };

  const formatPrice = (price?: number | string) => {
    if (price === null || price === undefined || price === '') return 'N/A';
    const num = Number(price);
    if (isNaN(num)) return 'N/A';
    return `฿${num.toLocaleString()}`;
  };

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
        <div className="lg:col-span-3 animate-fade-in">
          <div className="mb-4 relative">
             <img 
              src={mainImage} 
              alt={home.name} 
              className={`w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg transition-opacity duration-300 ${isImageLoading ? 'opacity-50' : 'opacity-100'}`}
              onLoad={() => setIsImageLoading(false)}
              key={mainImage}
            />
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 rounded-lg">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          <div className="flex space-x-2 overflow-x-auto p-2">
            {home.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${home.name} view ${index + 1}`}
                onClick={() => handleThumbnailClick(img)}
                className={`w-24 h-24 object-cover rounded-md cursor-pointer border-4 ${mainImage === img ? 'border-primary' : 'border-transparent'} hover:border-secondary transition-all duration-300 hover:scale-105 hover:shadow-md`}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 animate-slide-in-up" style={{ animationDelay: '200ms' }}>
          <h1 className="text-4xl font-bold text-primary mb-4">{home.name}</h1>
          <p className="text-gray-700 leading-relaxed mb-6">{home.description}</p>
          
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">ข้อมูลจำเพาะ</h2>
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
              {home.parking && (
                <li className="flex items-center text-lg">
                  <ParkingIcon className="w-6 h-6 mr-3 text-secondary" />
                  <strong>ที่จอดรถ:</strong><span className="ml-auto">{home.parking} คัน</span>
                </li>
              )}
            </ul>
          </div>

          {home.promotion_enabled && (
            <div className="mt-6 bg-red-50 p-6 rounded-lg border-2 border-dashed border-accent animate-fade-in">
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                 โปรโมชั่นพิเศษ!
              </h2>
              <div className="space-y-3">
                <div className="bg-gray-800 text-white rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">แพ็คเกจ Popular</span>
                    <div className="text-right">
                      <p className="font-bold text-xl">{formatPrice(home.price_popular_discounted)}</p>
                      {home.price_popular_original && home.price_popular_discounted && home.price_popular_original > home.price_popular_discounted &&
                        <p className="text-sm line-through opacity-70">{formatPrice(home.price_popular_original)}</p>
                      }
                    </div>
                  </div>
                </div>
                <div className="bg-primary text-white rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">แพ็คเกจ Signature</span>
                    <div className="text-right">
                      <p className="font-bold text-xl">{formatPrice(home.price_signature_discounted)}</p>
                      {home.price_signature_original && home.price_signature_discounted && home.price_signature_original > home.price_signature_discounted &&
                        <p className="text-sm line-through opacity-70">{formatPrice(home.price_signature_original)}</p>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

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