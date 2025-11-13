'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PortfolioProject } from '@/lib/types';
import { AreaIcon, LocationIcon, CategoryIcon } from './Icon';

interface PortfolioDetailViewProps {
  project: PortfolioProject;
  onBack?: () => void;
  onContactClick?: () => void;
}

const PortfolioDetailView: React.FC<PortfolioDetailViewProps> = ({ project, onBack, onContactClick }) => {
  const allImages = [project.coverImage, ...project.images].filter((v, i, a) => a.indexOf(v) === i);
  const [mainImage, setMainImage] = useState(allImages[0]);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleThumbnailClick = (img: string) => {
    if (img !== mainImage) {
      setIsImageLoading(true);
      setMainImage(img);
    }
  };

  const ContactButton = () => {
    const commonClasses = "w-full mt-6 bg-secondary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1";

    if (onContactClick) {
      return (
        <button onClick={onContactClick} className={commonClasses}>
          สอบถามเกี่ยวกับโครงการนี้
        </button>
      );
    }

    const NextContactButton = () => {
      const router = useRouter();
      return (
        <button onClick={() => router.push('/appointment')} className={commonClasses}>
          สอบถามเกี่ยวกับโครงการนี้
        </button>
      );
    };

    return <NextContactButton />;
  };

  const BackButton = () => {
    const commonClasses = "mb-6 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-primary transition-colors duration-300 flex items-center space-x-2 w-max";
    const content = (
      <>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        <span>Back to Portfolio</span>
      </>
    );

    if (onBack) {
      return <button onClick={onBack} className={commonClasses}>{content}</button>;
    }
    return <Link href="/portfolio" className={commonClasses}>{content}</Link>;
  };

  return (
    <div className="bg-white p-4 sm:p-8 rounded-xl shadow-2xl animate-fade-in">
      <BackButton />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <div className="mb-4 relative">
             <img 
              src={mainImage} 
              alt={project.title} 
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
            {allImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${project.title} view ${index + 1}`}
                onClick={() => handleThumbnailClick(img)}
                className={`w-24 h-24 object-cover rounded-md cursor-pointer border-4 ${mainImage === img ? 'border-primary' : 'border-transparent'} hover:border-secondary transition-all duration-300 hover:scale-105 hover:shadow-md`}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold text-primary mb-4">{project.title}</h1>
          <p className="text-gray-700 leading-relaxed mb-6">{project.description}</p>
          
          <div className="bg-gray-100 p-6 rounded-lg animate-fade-in-up" style={{animationDelay: '200ms'}}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Project Details</h2>
            <ul className="space-y-3">
              <li className="flex items-center text-lg">
                <CategoryIcon className="w-6 h-6 mr-3 text-secondary" />
                <strong>Category:</strong><span className="ml-auto">{project.category}</span>
              </li>
              <li className="flex items-center text-lg">
                <LocationIcon className="w-6 h-6 mr-3 text-secondary" />
                <strong>Location:</strong><span className="ml-auto">{project.location}</span>
              </li>
              <li className="flex items-center text-lg">
                <AreaIcon className="w-6 h-6 mr-3 text-secondary" />
                <strong>Area:</strong><span className="ml-auto">{project.area} m²</span>
              </li>
            </ul>
          </div>

          <ContactButton />
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetailView;