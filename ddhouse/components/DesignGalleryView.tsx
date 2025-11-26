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
  parkingFilter: string;
  onParkingChange: (value: string) => void;
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
  parkingFilter,
  onParkingChange,
  areaRange,
  onAreaChange,
  onResetFilters,
  allHomes,
  onContactClick,
}) => {
  const bedroomOptions = useMemo(() => {
    const beds = new Set(allHomes.map(h => h.bedrooms));
    // FIX: Add explicit types to sort callback parameters to prevent arithmetic operation error.
    return Array.from(beds).sort((a: number, b: number) => a - b);
  }, [allHomes]);

  const bathroomOptions = useMemo(() => {
    const baths = new Set(allHomes.map(h => h.bathrooms));
    // FIX: Add explicit types to sort callback parameters to prevent arithmetic operation error.
    return Array.from(baths).sort((a: number, b: number) => a - b);
  }, [allHomes]);

  const parkingOptions = useMemo(() => {
    const parks = new Set(allHomes.map(h => h.parking).filter(p => p !== undefined && p > 0) as number[]);
    // FIX: Add explicit types to sort callback parameters to prevent arithmetic operation error.
    return Array.from(parks).sort((a: number, b: number) => a - b);
  }, [allHomes]);


  const inputClasses = "p-3 bg-white text-gray-800 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-accent focus:border-accent outline-none placeholder-gray-500 transition-colors";

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12 animate-fade-in-down">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">แบบบ้านทั้งหมด</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">ค้นหาและเลือกสรรแบบบ้านที่ใช่สำหรับคุณ จากคอลเลกชันทั้งหมดของเรา</p>
      </div>

      {/* Filter Section */}
      <div className="bg-gray-50 p-6 rounded-lg mb-12 shadow-md animate-fade-in-down" style={{ animationDelay: '200ms' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">ค้นหาชื่อแบบบ้าน</label>
            <input
              type="text"
              id="search"
              placeholder="e.g., The Serene Villa"
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
          <div>
            <label htmlFor="parking" className="block text-sm font-medium text-gray-700 mb-1">ที่จอดรถ (ขั้นต่ำ)</label>
            <select
              id="parking"
              value={parkingFilter}
              onChange={(e) => onParkingChange(e.target.value)}
              className={inputClasses}
            >
              <option value="any">ทั้งหมด</option>
               {parkingOptions.map(option => (
                <option key={option} value={option}>{option} คัน</option>
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
               <label htmlFor="max-area" className="block text-sm font-medium text-gray-700 mb-1 invisible">Max</label>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
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
        <div className="text-center py-16 animate-fade-in">
          <h2 className="text-2xl font-semibold text-gray-700">ไม่พบแบบบ้านที่ตรงกับเงื่อนไข</h2>
          <p className="text-gray-500 mt-2">กรุณาลองปรับเปลี่ยนการค้นหาหรือตัวกรองของคุณ</p>
        </div>
      )}
    </div>
  );
};

export default DesignGalleryView;