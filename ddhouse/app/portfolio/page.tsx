'use client';
import React from 'react';
import { useAppContext } from '@/context/AppContext';
import PortfolioPage from '@/components/PortfolioPage';
import { View } from '@/lib/types';

interface PortfolioRoutePageProps {
     onNavigate: (view: View, slug?: string) => void;
}

export default function PortfolioRoutePage({ onNavigate }: PortfolioRoutePageProps) {
    const { portfolioProjects, testimonials, setVideoModalUrl } = useAppContext();

    return <PortfolioPage 
        projects={portfolioProjects}
        testimonials={testimonials}
        onPlayVideo={setVideoModalUrl}
        onNavigate={onNavigate}
    />;
}
