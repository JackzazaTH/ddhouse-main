
'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import HomeDetailView from '@/components/HomeDetailView';
import HomeDetailSkeleton from '@/components/HomeDetailSkeleton';

export default function HomeDetailPage() {
    const router = useRouter();
    const params = useParams();
    const { homes } = useAppContext();
    const [loading, setLoading] = useState(true);
    
    const id = typeof params.id === 'string' ? params.id : '';
    const selectedHome = homes.find(home => home.id === id);

    useEffect(() => {
        // Simulate a short loading delay to show off the skeleton
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const handleContactClick = () => {
        router.push('/appointment');
    };

    if (loading) {
        return <HomeDetailSkeleton />;
    }

    if (!selectedHome) {
        return <div className="text-center py-20">
            <h1 className="text-2xl font-bold">Home Not Found</h1>
            <p className="text-gray-600 mt-2">The home design you are looking for does not exist.</p>
            <button 
                onClick={() => router.push('/designs')}
                className="mt-4 text-primary hover:underline"
            >
                Back to Designs
            </button>
        </div>;
    }

    return (
        <HomeDetailView 
            home={selectedHome} 
            onBack={() => router.push('/designs')} 
            onContactClick={handleContactClick}
        />
    );
}
