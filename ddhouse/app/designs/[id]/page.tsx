'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import HomeDetailView from '@/components/HomeDetailView';

export default function HomeDetailPage() {
    const router = useRouter();
    const params = useParams();
    const { homes } = useAppContext();
    
    const id = typeof params.id === 'string' ? params.id : '';
    const selectedHome = homes.find(home => home.id === id);

    const handleContactClick = () => {
        router.push('/appointment');
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
            onBack={() => router.push('/designs')} 
            // FIX: Pass the required onContactClick prop to HomeDetailView.
            onContactClick={handleContactClick}
        />
    );
}