'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import DesignGalleryView from '@/components/DesignGalleryView';
import { HomeDesign } from '@/lib/types';

export default function DesignsPage() {
    const { addToast } = useAppContext();
    const router = useRouter();
    const [allHomes, setAllHomes] = useState<HomeDesign[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // This is a temporary solution to fetch data on the client side
        // until we fetch it from the server component.
        // In a real app, this data would be passed as props from a server component.
        const getHomes = async () => {
            try {
                // This is a placeholder for an API call
                // For now, it just simulates fetching
                const { INITIAL_HOMES } = await import('@/lib/constants');
                setAllHomes(INITIAL_HOMES);
            } catch (e) {
                addToast('Failed to load home designs', 'error');
            } finally {
                setIsLoading(false);
            }
        };
        getHomes();
    }, [addToast]);

    const [searchTerm, setSearchTerm] = useState('');
    const [bedroomsFilter, setBedroomsFilter] = useState<string>('any');
    const [bathroomsFilter, setBathroomsFilter] = useState<string>('any');
    const [areaRange, setAreaRange] = useState({ min: '', max: '' });

    const handleSelectHome = (id: string) => {
        router.push(`/designs/${id}`);
    };

    const handleContactClick = () => {
        router.push('/appointment');
    };

    const handleResetFilters = () => {
        setSearchTerm('');
        setBedroomsFilter('any');
        setBathroomsFilter('any');
        setAreaRange({ min: '', max: '' });
    };

    const filteredHomes = useMemo(() => {
        return allHomes.filter(home => {
            const minArea = areaRange.min === '' ? 0 : Number(areaRange.min);
            const maxArea = areaRange.max === '' ? Infinity : Number(areaRange.max);

            const matchesSearch = home.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesBedrooms = bedroomsFilter === 'any' || home.bedrooms >= Number(bedroomsFilter);
            const matchesBathrooms = bathroomsFilter === 'any' || home.bathrooms >= Number(bathroomsFilter);
            const matchesArea = home.area >= minArea && home.area <= maxArea;

            return matchesSearch && matchesBedrooms && matchesBathrooms && matchesArea;
        });
    }, [allHomes, searchTerm, bedroomsFilter, bathroomsFilter, areaRange]);

    if(isLoading) {
        return <div className="text-center py-20">Loading...</div>
    }

    return (
        <DesignGalleryView
            homes={filteredHomes}
            onSelectHome={handleSelectHome}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            bedroomsFilter={bedroomsFilter}
            onBedroomsChange={setBedroomsFilter}
            bathroomsFilter={bathroomsFilter}
            onBathroomsChange={setBathroomsFilter}
            areaRange={areaRange}
            onAreaChange={setAreaRange}
            onResetFilters={handleResetFilters}
            allHomes={allHomes}
            onContactClick={handleContactClick}
        />
    );
}
