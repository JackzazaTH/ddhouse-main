'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import CustomPageView from '@/components/CustomPageView';

export default function CustomPageSlug() {
    const params = useParams();
    const { customPages } = useAppContext();
    
    const slug = typeof params.slug === 'string' ? params.slug : '';

    const selectedPage = customPages.find(page => page.slug === slug);
    
    if (!selectedPage) {
        return null;
    }

    return <CustomPageView page={selectedPage} />;
}
