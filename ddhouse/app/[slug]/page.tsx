'use client';
import React from 'react';
import { useAppContext } from '@/context/AppContext';
import CustomPageView from '@/components/CustomPageView';
import { View } from '@/lib/types';

interface CustomPageSlugProps {
    params: { slug: string };
    onNavigate: (view: View, slug?: string) => void;
}

export default function CustomPageSlug({ params, onNavigate }: CustomPageSlugProps) {
    const { customPages, handleAddLead } = useAppContext();
    
    const slug = params.slug;

    const selectedPage = customPages.find(page => page.slug === slug);
    
    if (!selectedPage) {
        // You can render a 404 component here
        return <div className="text-center py-20">
            <h1 className="text-2xl font-bold">Page Not Found</h1>
            <p className="text-gray-600 mt-2">The page you are looking for does not exist.</p>
        </div>;
    }

    return <CustomPageView page={selectedPage} onAddLead={handleAddLead} />;
}
