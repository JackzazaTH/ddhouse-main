'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import HomeDetailView from '@/components/HomeDetailView';
import { HomeDesign } from '@/lib/types';

export default function HomeDetailPage() {
    const router = useRouter();
    const params = useParams();
    const { addToast } = useAppContext();
    const [selectedHome, setSelectedHome] = React.useState<HomeDesign | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    
    const id = typeof params.id === 'string' ? params.id : '';
    
    React.useEffect(() => {
        const getHome = async () => {
             try {
                // This is a placeholder for an API call
                const { INITIAL_HOMES } = await import('@/lib/constants');
                const home = INITIAL_HOMES.find(h => h.id === id);
                if (home) {
                    setSelectedHome(home);
                }
            } catch (e) {
                addToast('Failed to load home design details', 'error');
            } finally {
                setIsLoading(false);
            }
        };
        if(id) {
            getHome();
        }
    }, [id, addToast]);


    const handleContactClick = () => {
        router.push('/appointment');
    };
    
    if (isLoading) {
        return <div className="text-center py-20">Loading...</div>;
    }

    if (!selectedHome) {
        return <div className="text-center py-20">
            <h1 className="text-2xl font-bold">ไม่พบแบบบ้าน</h1>
            <p className="text-gray-600 mt-2">ไม่พบแบบบ้านที่คุณกำลังค้นหา</p>
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
