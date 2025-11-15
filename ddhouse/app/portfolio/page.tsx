
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import PortfolioPage from '@/components/PortfolioPage';

export default function PortfolioRoutePage() {
    const router = useRouter();
    const { portfolioProjects, testimonials, setVideoModalUrl, siteInfo } = useAppContext();

    return <PortfolioPage 
        projects={portfolioProjects}
        testimonials={testimonials}
        onPlayVideo={setVideoModalUrl}
        viewAllTestimonialsLabel={siteInfo.buttonLabels.viewAllTestimonials}
    />;
}