'use client';
import React from 'react';
import { useAppContext } from '@/context/AppContext';
import HomeDetailView from '@/components/HomeDetailView';
import { View } from '@/lib/types';

interface HomeDetailPageProps {
    params: { id: string };
    onNavigate: (view: View, slug?: string) => void;
}

export default function HomeDetailPage({ params, onNavigate }: HomeDetailPageProps) {
    const { homes } = useAppContext();
    
    const id = params.id;
    const selectedHome = homes.find(home => home.id === id);

    const handleContactClick = () => {
        onNavigate('customPage', 'appointment');
    };

    if (!selectedHome) {
        return <div className="text-center py-20">
            <h1 className="text-2xl font-bold">Home Not Found</h1>
            <p className="text-gray-600 mt-2">The home design you are looking for does not exist.</p>
        </div>;
    }

    return (
        <HomeDetailView 
            home={selectedHome} 
            onBack={() => onNavigate('designs')} 
            onContactClick={handleContactClick}
        />
    );
}
