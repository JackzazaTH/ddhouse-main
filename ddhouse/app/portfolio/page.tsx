'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import PortfolioPage from '@/components/PortfolioPage';

export default function PortfolioRoutePage() {
    const router = useRouter();
    const { portfolioProjects } = useAppContext();

    return <PortfolioPage projects={portfolioProjects} />;
}