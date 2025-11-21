

import React from 'react';
import { Testimonial } from '@/lib/types';

interface TestimonialSectionProps {
  testimonials: Testimonial[];
  onPlayVideo: (videoUrl: string) => void;
  onViewAll: () => void;
  viewAllLabel: string;
}

const PlayIcon = () => (
  <svg className="w-12 h-12 md:w-16 md:h-16 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
  </svg>
);

const TestimonialSection: React.FC<TestimonialSectionProps> = ({ testimonials, onPlayVideo, onViewAll, viewAllLabel }) => {
  const featuredTestimonial = testimonials.find(t => t.isFeatured);
  const otherTestimonials = testimonials.filter(t => !t.isFeatured).sort((a, b) => a.order - b.order);

  return (
    <div className="bg-primary text-white p-6 md:p-8 rounded-xl shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">รีวิวจากลูกค้าของเรา</h2>
        <button
          onClick={onViewAll}
          className="text-white hover:text-accent font-semibold transition-colors duration-300 flex items-center"
        >
          {viewAllLabel} <span className="ml-1">&gt;</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Featured Video */}
        {featuredTestimonial && (
          <div className="lg:w-2/3">
            <div 
              className="relative rounded-lg overflow-hidden cursor-pointer group shadow-lg"
              onClick={() => onPlayVideo(featuredTestimonial.videoUrl)}
            >
              <img src={featuredTestimonial.imageUrl} alt={featuredTestimonial.title} className="w-full h-auto object-cover aspect-video transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                 <div className="transform transition-transform duration-300 group-hover:scale-110">
                   <PlayIcon />
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Videos */}
        <div className="lg:w-1/3 flex flex-col gap-4">
          {otherTestimonials.slice(0, 3).map(testimonial => (
            <div 
              key={testimonial.id}
              className="relative rounded-lg overflow-hidden cursor-pointer group shadow-md"
              onClick={() => onPlayVideo(testimonial.videoUrl)}
            >
              <img src={testimonial.imageUrl} alt={testimonial.title} className="w-full h-auto object-cover aspect-[16/9] transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center p-2">
                 <div className="absolute inset-0 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 opacity-80 group-hover:opacity-100">
                    <PlayIcon />
                 </div>
                 <h3 className="absolute bottom-2 left-3 text-white text-sm font-semibold drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">{testimonial.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;