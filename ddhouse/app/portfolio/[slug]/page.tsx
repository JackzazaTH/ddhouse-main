'use client';
import React from 'react';
import { useAppContext } from '@/context/AppContext';
import PortfolioDetailView from '@/components/PortfolioDetailView';
import { View } from '@/lib/types';

interface PortfolioDetailPageProps {
    params: { slug: string };
    onNavigate: (view: View, slug?: string) => void;
}


export default function PortfolioDetailPage({ params, onNavigate }: PortfolioDetailPageProps) {
    const { portfolioProjects } = useAppContext();
    
    const slug = params.slug;
    const project = portfolioProjects.find(p => p.slug === slug);

    if (!project) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold">Project Not Found</h1>
                <p className="text-gray-600 mt-2">The project you are looking for does not exist.</p>
            </div>
        );
    }

    return <PortfolioDetailView 
        project={project} 
        onBack={() => onNavigate('portfolio')}
        onContactClick={() => onNavigate('customPage', 'appointment')}
        />;
}
