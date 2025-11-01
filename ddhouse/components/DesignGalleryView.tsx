

'use client';
import React, { useMemo } from 'react';
import { HomeDesign } from '@/lib/types';
import HomeCard from './HomeCard';

interface DesignGalleryViewProps {
  homes: HomeDesign[];
  onSelectHome: (id: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  bedroomsFilter: string;
  onBedroomsChange: (value: string) => void;
  bathroomsFilter: string;
  onBathroomsChange: (value: string) => void;
  areaRange: { min: string; max: string };
  onAreaChange: (range: { min: string; max: string }) => void;
  onResetFilters: () => void;
  allHomes: HomeDesign[];
  onContactClick: () => void;
}

const DesignGalleryView: React.FC<DesignGalleryViewProps> = ({
  homes,
  onSelectHome,
  searchTerm,
  onSearchChange,
  bedroomsFilter,
  onBedroomsChange,
  bathroomsFilter,
  onBathroomsChange,
  areaRange,
  onAreaChange,
  onResetFilters,
  allHomes,
  onContactClick,
}) => {
  const bedroomOptions = useMemo(() => {
    const beds = new Set(allHomes.map(h => h.bedrooms));
    return Array.from(beds).sort((a, b) => a - b);
  }, [allHomes]);

  const bathroomOptions = useMemo(() => {
    const baths = new Set(allHomes.map(h => h.bathrooms));
    return Array.from(baths).sort((a, b) => a - b);
  }, [allHomes]);

  const inputClasses = "p-3 bg-gray-50 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-accent focus:border-accent outline-none placeholder-gray-500 transition-colors text-gray-800";

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">แบบบ้านทั้งหมด</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">ค้นหาและเลือกสรรแบบบ้านที่ใช่สำหรับคุณ จากคอลเลกชันทั้งหมดของเรา</p>
      </div>

      {/* Filter Section */}
      <div className="bg-gray-50 p-6 rounded-lg mb-12 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div className="lg:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">ค้นหาชื่อแบบบ้าน</label>
            <input
              type="text"
              id="search"
              placeholder="เช่น, เดอะ ซีรีน วิลล่า"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">ห้องนอน (ขั้นต่ำ)</label>
            <select
              id="bedrooms"
              value={bedroomsFilter}
              onChange={(e) => onBedroomsChange(e.target.value)}
              className={inputClasses}
            >
              <option value="any">ทั้งหมด</option>
              {bedroomOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">ห้องน้ำ (ขั้นต่ำ)</label>
            <select
              id="bathrooms"
              value={bathroomsFilter}
              onChange={(e) => onBathroomsChange(e.target.value)}
              className={inputClasses}
            >
              <option value="any">ทั้งหมด</option>
               {bathroomOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
           <div className="flex items-center space-x-2">
            <div>
              <label htmlFor="min-area" className="block text-sm font-medium text-gray-700 mb-1">พื้นที่ (ตร.ม.)</label>
              <input
                type="number"
                id="min-area"
                placeholder="ต่ำสุด"
                value={areaRange.min}
                onChange={(e) => onAreaChange({ ...areaRange, min: e.target.value })}
                className={inputClasses}
              />
            </div>
             <div>
               <label htmlFor="max-area" className="block text-sm font-medium text-gray-700 mb-1 invisible">สูงสุด</label>
              <input
                type="number"
                id="max-area"
                placeholder="สูงสุด"
                value={areaRange.max}
                onChange={(e) => onAreaChange({ ...areaRange, max: e.target.value })}
                className={inputClasses}
              />
            </div>
          </div>
          <button
            onClick={onResetFilters}
            className="w-full bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-300"
          >
            ล้างตัวกรอง
          </button>
        </div>
      </div>

      {/* Homes Grid */}
      {homes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {homes.map((home, index) => (
            <HomeCard
              key={home.id}
              home={home}
              onSelect={onSelectHome}
              onContactClick={onContactClick}
              animationDelay={`${index * 100}ms`}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-700">ไม่พบแบบบ้านที่ตรงกับเงื่อนไข</h2>
          <p className="text-gray-500 mt-2">กรุณาลองปรับเปลี่ยนการค้นหาหรือตัวกรองของคุณ</p>
        </div>
      )}
    </div>
  );
};

export default DesignGalleryView;