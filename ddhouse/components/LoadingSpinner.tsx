import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
    </div>
  );
};

const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex flex-col justify-center items-center z-[200]">
        <LoadingSpinner />
        <p className="mt-4 text-lg text-primary font-semibold">Loading Data...</p>
    </div>
  )
}

export default PageLoader;
