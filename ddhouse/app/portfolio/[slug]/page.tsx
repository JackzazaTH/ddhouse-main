'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import PortfolioDetailView from '@/components/PortfolioDetailView';

export default function PortfolioDetailPage() {
    const params = useParams();
    const { portfolioProjects } = useAppContext();
    
    const slug = typeof params.slug === 'string' ? params.slug : '';
    const project = portfolioProjects.find(p => p.slug === slug);

    if (!project) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold">Project Not Found</h1>
                <p className="text-gray-600 mt-2">The project you are looking for does not exist.</p>
            </div>
        );
    }

    return <PortfolioDetailView project={project} />;
}
