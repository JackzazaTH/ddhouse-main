
'use client';
import React, { useState } from 'react';
import { HomeDesign } from '@/lib/types';
import { BedIcon, BathIcon, AreaIcon, ParkingIcon } from './Icon';
import MortgageCalculator from './MortgageCalculator';

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
          
          <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">ข้อมูลจำเพาะ</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center text-lg border-b border-gray-200 pb-2">
                <AreaIcon className="w-6 h-6 mr-3 text-secondary" />
                <strong className="w-24">พื้นที่ใช้สอย:</strong><span className="ml-auto font-medium">{home.area} ตร.ม.</span>
              </li>
              <li className="flex items-center text-lg border-b border-gray-200 pb-2">
                <BedIcon className="w-6 h-6 mr-3 text-secondary" />
                <strong className="w-24">ห้องนอน:</strong><span className="ml-auto font-medium">{home.bedrooms}</span>
              </li>
              <li className="flex items-center text-lg border-b border-gray-200 pb-2">
                <BathIcon className="w-6 h-6 mr-3 text-secondary" />
                <strong className="w-24">ห้องน้ำ:</strong><span className="ml-auto font-medium">{home.bathrooms}</span>
              </li>
              {home.parking && (
                <li className="flex items-center text-lg border-b border-gray-200 pb-2">
                  <ParkingIcon className="w-6 h-6 mr-3 text-secondary" />
                  <strong className="w-24">ที่จอดรถ:</strong><span className="ml-auto font-medium">{home.parking} คัน</span>
                </li>
              )}
              {home.style && (
                 <li className="flex items-center text-lg border-b border-gray-200 pb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                    <strong className="w-24">สไตล์:</strong><span className="ml-auto font-medium">{home.style}</span>
                 </li>
              )}
              {home.dimensions && (
                 <li className="flex items-center text-lg pb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4h4m12 4V4h-4M4 16v4h4m12-4v4h-4M8 12h8"/></svg>
                    <strong className="w-24">ขนาดที่ดิน:</strong><span className="ml-auto font-medium">{home.dimensions}</span>
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

      {/* Additional Info Sections */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          {/* Floor Plans (Placeholder) */}
          <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-1.447-.894L15 7m0 13V7m0 0L9.553 4.553A1 1 0 009 7v13" /></svg>
                  แบบแปลนบ้าน
              </h3>
              <div className="space-y-4">
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center">
                          <span className="block text-gray-400 text-4xl mb-2">1F</span>
                          <span className="text-gray-500 font-medium">แปลนชั้น 1 (ตัวอย่าง)</span>
                      </div>
                  </div>
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center">
                          <span className="block text-gray-400 text-4xl mb-2">2F</span>
                          <span className="text-gray-500 font-medium">แปลนชั้น 2 (ตัวอย่าง)</span>
                      </div>
                  </div>
              </div>
          </div>

          {/* Standard Specifications */}
          <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  รายการวัสดุมาตรฐาน
              </h3>
              <ul className="space-y-4">
                  {[
                      { title: 'โครงสร้าง', detail: 'คอนกรีตเสริมเหล็ก รับประกันโครงสร้าง 20 ปี' },
                      { title: 'หลังคา', detail: 'กระเบื้องหลังคา SCG รุ่น Prestige หรือเทียบเท่า พร้อมแผ่นสะท้อนความร้อน' },
                      { title: 'ฝ้าเพดาน', detail: 'ยิปซั่มบอร์ดฉาบเรียบ ตราช้าง พร้อมฉนวนกันความร้อน' },
                      { title: 'ผนัง', detail: 'อิฐมวลเบา Q-CON ช่วยกันความร้อนและเก็บเสียง' },
                      { title: 'วัสดุปูพื้น', detail: 'กระเบื้องแกรนิตโต้ 60x60 เกรด A (ชั้นล่าง), ลามิเนต 8 มม. (ชั้นบน)' },
                      { title: 'สุขภัณฑ์', detail: 'American Standard / Cotto หรือเทียบเท่า' },
                      { title: 'สี', detail: 'TOA 4 Season หรือเทียบเท่า เช็ดล้างได้' },
                      { title: 'ประตู-หน้าต่าง', detail: 'อลูมิเนียมอบขาว กระจกเขียวตัดแสง' },
                  ].map((spec, index) => (
                      <li key={index} className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <div>
                              <strong className="block text-gray-900">{spec.title}</strong>
                              <span className="text-gray-600 text-sm">{spec.detail}</span>
                          </div>
                      </li>
                  ))}
              </ul>
          </div>
      </div>

      {/* Mortgage Calculator Section */}
      <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <MortgageCalculator initialPrice={home.price_popular_discounted || home.price_popular_original || 2000000} />
      </div>
    </div>
  );
};

export default HomeDetailView;
