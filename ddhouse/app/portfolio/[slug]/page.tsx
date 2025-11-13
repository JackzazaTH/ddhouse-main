import React from 'react';
import PortfolioDetailView from '@/components/PortfolioDetailView';
import { fetchPortfolioProjects } from '@/lib/data';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const projects = await fetchPortfolioProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function PortfolioDetailPage({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    // In a real app, you'd fetch one: await fetchPortfolioProjectBySlug(slug);
    const projects = await fetchPortfolioProjects();
    const project = projects.find(p => p.slug === slug);

    if (!project) {
        notFound();
    }

    return <PortfolioDetailView project={project} />;
}