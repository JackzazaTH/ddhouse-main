import React from 'react';
import PortfolioDetailView from '@/components/PortfolioDetailView';
import { INITIAL_PORTFOLIO_PROJECTS } from '@/lib/constants';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return INITIAL_PORTFOLIO_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default function PortfolioDetailPage({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    const project = INITIAL_PORTFOLIO_PROJECTS.find(p => p.slug === slug);

    if (!project) {
        notFound();
    }

    return <PortfolioDetailView project={project} />;
}