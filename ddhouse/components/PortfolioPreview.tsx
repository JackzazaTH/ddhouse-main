'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PortfolioProject } from '../lib/types';

interface PortfolioCardProps {
  project: PortfolioProject;
  onSelect: (slug: string) => void;
  animationDelay: string;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ project, onSelect, animationDelay }) => (
  <div 
    onClick={() => onSelect(project.slug)} 
    className="group cursor-pointer animate-fade-in-up"
    style={{ animationDelay, animationFillMode: 'backwards' }}
  >
    <div className="overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
      <img src={project.coverImage} alt={project.title} className="w-full h-64 object-cover" />
    </div>
    <p className="mt-4 text-center text-gray-700 font-semibold group-hover:text-primary transition-colors">
      ผลงานก่อสร้างแบบบ้าน {project.title} | {project.location}
    </p>
  </div>
);

interface PortfolioPreviewProps {
  projects: PortfolioProject[];
}

const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({ projects }) => {
  const router = useRouter();
  const previewProjects = projects.slice(0, 3);

  const handleSelect = (slug: string) => {
    router.push(`/portfolio/${slug}`);
  };

  const handleViewAll = () => {
    router.push('/portfolio');
  };

  return (
    <div className="bg-gray-50 my-12 md:my-16 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            ผลงาน<span className="text-primary">ของ</span>เรา
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {previewProjects.map((project, index) => (
            <PortfolioCard 
              key={project.id} 
              project={project} 
              onSelect={handleSelect}
              animationDelay={`${index * 100}ms`}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <button
            onClick={handleViewAll}
            className="bg-secondary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            ดูผลงานทั้งหมด
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPreview;