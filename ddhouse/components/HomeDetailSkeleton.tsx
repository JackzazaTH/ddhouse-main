
import React from 'react';

const HomeDetailSkeleton: React.FC = () => {
  return (
    <div className="bg-white p-4 sm:p-8 rounded-xl shadow-2xl animate-pulse">
      {/* Back Button Skeleton */}
      <div className="mb-6 w-40 h-10 bg-gray-200 rounded-lg"></div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          {/* Main Image Skeleton */}
          <div className="mb-4 w-full h-[400px] bg-gray-300 rounded-lg"></div>
          {/* Thumbnails Skeleton */}
          <div className="flex space-x-2 overflow-x-auto p-2">
            <div className="w-24 h-24 bg-gray-200 rounded-md"></div>
            <div className="w-24 h-24 bg-gray-200 rounded-md"></div>
            <div className="w-24 h-24 bg-gray-200 rounded-md"></div>
            <div className="w-24 h-24 bg-gray-200 rounded-md"></div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {/* Title and Desc Skeleton */}
          <div className="space-y-4">
            <div className="h-10 w-3/4 bg-gray-300 rounded"></div>
            <div className="h-20 w-full bg-gray-200 rounded"></div>
          </div>
          
          {/* Specs Skeleton */}
          <div className="bg-gray-100 p-6 rounded-lg space-y-3">
            <div className="h-6 w-1/2 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          </div>

          {/* Promo Skeleton */}
          <div className="h-32 bg-gray-200 rounded-lg"></div>

          {/* CTA Button Skeleton */}
          <div className="h-12 w-full bg-gray-300 rounded-lg"></div>
        </div>
      </div>
      
      {/* Additional Details Skeleton */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-64 bg-gray-200 rounded-lg"></div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
};

export default HomeDetailSkeleton;
