
'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PortfolioProject, View, Testimonial, CustomPage } from '@/lib/types';
import TestimonialSection from './TestimonialSection';

interface PortfolioPageProps {
  projects: PortfolioProject[];
  testimonials: Testimonial[];
  onNavigate?: (view: View, slug?: string) => void;
  onPlayVideo: (videoUrl: string) => void;
  viewAllTestimonialsLabel: string;
  pageContent?: CustomPage;
}

const CardContent: React.FC<{ project: PortfolioProject }> = ({ project }) => (
    <>
    <img
      alt={project.title}
      src={project.coverImage}
      className="absolute inset-0 h-full w-full object-cover opacity-75 transition-all duration-500 group-hover:opacity-50 group-hover:scale-105"
    />
    <div className="relative p-4 sm:p-6 lg:p-8 h-full flex flex-col justify-end">
      <p className="text-sm font-medium uppercase tracking-widest text-accent drop-shadow-md">
        {project.location}
      </p>
      <p className="text-xl font-bold text-white sm:text-2xl drop-shadow-md">{project.title}</p>
      <div className="mt-4">
        <div className="translate-y-8 transform opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-sm text-white">
            {project.description.length > 120 ? `${project.description.substring(0, 120)}...` : project.description}
          </p>
        </div>
      </div>
    </div>
  </>
);

const NextJsPortfolioCard: React.FC<{ project: PortfolioProject }> = ({ project }) => (
  <Link 
    href={`/portfolio/${project.slug}`}
    className="group relative block bg-black rounded-lg shadow-lg overflow-hidden cursor-pointer animate-fade-in-up h-96"
  >
    <CardContent project={project} />
  </Link>
);

const SpaPortfolioCard: React.FC<{ project: PortfolioProject; onNavigate: (view: View, slug?: string) => void; }> = ({ project, onNavigate }) => (
  <div 
    onClick={() => onNavigate('portfolioDetail', project.slug)}
    className="group relative block bg-black rounded-lg shadow-lg overflow-hidden cursor-pointer animate-fade-in-up h-96"
  >
    <CardContent project={project} />
  </div>
);

const PortfolioPage: React.FC<PortfolioPageProps> = ({ projects, testimonials, onNavigate, onPlayVideo, viewAllTestimonialsLabel, pageContent }) => {
  const [activeFilter, setActiveFilter] = useState<string>('ทั้งหมด');

  const categories = useMemo(() => {
    const allCategories = projects.map(p => p.category);
    return ['ทั้งหมด', ...Array.from(new Set(allCategories))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ทั้งหมด') {
      return projects;
    }
    return projects.filter(p => p.category === activeFilter);
  }, [projects, activeFilter]);
  
  const CtaButton = () => {
    const commonClasses = "bg-secondary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1";
    if (onNavigate) {
      return (
        <button
          onClick={() => onNavigate('customPage', 'appointment')}
          className={commonClasses}
        >
          นัดหมายปรึกษาสถาปนิก
        </button>
      );
    }
    
    // This component will only be rendered in Next.js env, so it can use hooks.
    const NextCtaButton = () => {
      const router = useRouter();
      return (
        <button
          onClick={() => router.push('/appointment')}
          className={commonClasses}
        >
          นัดหมายปรึกษาสถาปนิก
        </button>
      );
    }
    return <NextCtaButton />;
  };

  const TestimonialSectionWrapper: React.FC = () => {
      if (onNavigate) {
          return (
              <TestimonialSection
                  testimonials={testimonials}
                  onPlayVideo={onPlayVideo}
                  onViewAll={() => onNavigate('articles')}
                  viewAllLabel={viewAllTestimonialsLabel}
              />
          );
      }

      // This component will only be rendered in Next.js env, so it can use hooks.
      const NextJsComponent = () => {
          const router = useRouter();
          return (
              <TestimonialSection
                  testimonials={testimonials}
                  onPlayVideo={onPlayVideo}
                  onViewAll={() => router.push('/articles')}
                  viewAllLabel={viewAllTestimonialsLabel}
              />
          );
      };
      return <NextJsComponent />;
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative bg-gray-800 py-20 sm:py-24 md:py-32 rounded-xl overflow-hidden mb-12">
        <img 
            src={pageContent?.imageUrl || "https://picsum.photos/seed/portfolio-hero/1600/800"} 
            className="absolute inset-0 w-full h-full object-cover opacity-30" 
            alt="Portfolio background" 
        />
        <div className="relative text-center mx-auto max-w-3xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-down">
            {pageContent ? pageContent.title : 'ผลงานของเรา'}
          </h1>
          <div 
            className="text-lg text-gray-300 animate-fade-in-up [&>p]:mb-4" 
            style={{ animationDelay: '200ms' }}
          >
             {pageContent ? (
                 <div dangerouslySetInnerHTML={{ __html: pageContent.content }} />
             ) : (
                 <p>ชมผลงานการสร้างสรรค์บ้านคุณภาพ ที่เราภาคภูมิใจส่งมอบให้กับลูกค้าทุกท่าน</p>
             )}
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
              activeFilter === category
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          onNavigate 
            ? <SpaPortfolioCard key={project.id} project={project} onNavigate={onNavigate} />
            : <NextJsPortfolioCard key={project.id} project={project} />
        ))}
      </div>
      
      {/* Testimonial Section */}
      <div className="mt-20">
        <TestimonialSectionWrapper />
      </div>

       {/* CTA Section */}
      <div className="mt-20 py-16 bg-gray-100 rounded-lg text-center px-4">
        <h2 className="text-3xl font-bold text-primary mb-4">พร้อมสร้างบ้านในฝันของคุณแล้วหรือยัง?</h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">ติดต่อเราเพื่อรับคำปรึกษาจากทีมงานผู้เชี่ยวชาญของเราได้แล้ววันนี้</p>
        <CtaButton />
      </div>
    </div>
  );
};

export default PortfolioPage;