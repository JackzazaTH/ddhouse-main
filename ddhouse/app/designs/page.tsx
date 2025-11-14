'use client';
import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useAppContext } from '@/context/AppContext';
import DesignGalleryView from '@/components/DesignGalleryView';
import { View } from '@/lib/types';

interface DesignsPageProps {
    onNavigate: (view: View, slug?: string) => void;
    queryParams: URLSearchParams;
}

// This component uses useSearchParams, so it must be wrapped in Suspense.
function Gallery({ onNavigate, queryParams }: DesignsPageProps) {
    const { homes } = useAppContext();
    const querySearchTerm = queryParams.get('q') || '';

    const [searchTerm, setSearchTerm] = useState<string>(querySearchTerm);
    const [bedroomsFilter, setBedroomsFilter] = useState<string>('any');
    const [bathroomsFilter, setBathroomsFilter] = useState<string>('any');
    const [areaRange, setAreaRange] = useState({ min: '', max: '' });
    
    useEffect(() => {
        setSearchTerm(querySearchTerm);
    }, [querySearchTerm]);

    const handleSelectHome = (id: string) => {
        onNavigate('detail', id);
    };

    const handleContactClick = () => {
        onNavigate('customPage', 'appointment');
    };

    const handleResetFilters = () => {
        setSearchTerm('');
        setBedroomsFilter('any');
        setBathroomsFilter('any');
        setAreaRange({ min: '', max: '' });
        // In a real SPA, this would clear the query params from the URL hash
    };
    
    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
        // This would update the URL hash query params in a full implementation
    }

    const filteredHomes = useMemo(() => {
        return homes.filter(home => {
            const minArea = areaRange.min === '' ? 0 : Number(areaRange.min);
            const maxArea = areaRange.max === '' ? Infinity : Number(areaRange.max);

            const matchesSearch = home.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesBedrooms = bedroomsFilter === 'any' || home.bedrooms >= Number(bedroomsFilter);
            const matchesBathrooms = bathroomsFilter === 'any' || home.bathrooms >= Number(bathroomsFilter);
            const matchesArea = home.area >= minArea && home.area <= maxArea;

            return matchesSearch && matchesBedrooms && matchesBathrooms && matchesArea;
        });
    }, [homes, searchTerm, bedroomsFilter, bathroomsFilter, areaRange]);

    return (
        <DesignGalleryView
            homes={filteredHomes}
            onSelectHome={handleSelectHome}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            bedroomsFilter={bedroomsFilter}
            onBedroomsChange={setBedroomsFilter}
            bathroomsFilter={bathroomsFilter}
            onBathroomsChange={setBathroomsFilter}
            areaRange={areaRange}
            onAreaChange={setAreaRange}
            onResetFilters={handleResetFilters}
            allHomes={homes}
            onContactClick={handleContactClick}
        />
    );
}

const GallerySkeleton = () => {
    const FilterSkeleton = () => (
        <div className="bg-gray-100 p-6 rounded-lg mb-12 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                <div className="lg:col-span-2 h-12 bg-gray-200 rounded-md"></div>
                <div className="h-12 bg-gray-200 rounded-md"></div>
                <div className="h-12 bg-gray-200 rounded-md"></div>
                <div className="flex items-center space-x-2">
                    <div className="h-12 bg-gray-200 rounded-md w-full"></div>
                    <div className="h-12 bg-gray-200 rounded-md w-full"></div>
                </div>
                <div className="h-12 bg-gray-300 rounded-md"></div>
            </div>
        </div>
    );

    const CardSkeleton = () => (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="w-full h-56 bg-gray-200"></div>
            <div className="p-6">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="flex justify-around items-center border-t pt-4">
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="w-full h-10 bg-gray-300 rounded-lg mt-4"></div>
            </div>
        </div>
    );

    return (
        <div className="animate-pulse">
            <div className="text-center mb-12">
                <div className="h-12 bg-gray-300 rounded-md w-1/2 mx-auto mb-4"></div>
                <div className="h-6 bg-gray-200 rounded-md w-3/4 mx-auto"></div>
            </div>
            <FilterSkeleton />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </div>
        </div>
    );
};

export default function DesignsPage(props: DesignsPageProps) {
    return (
        <Suspense fallback={<GallerySkeleton />}>
            <Gallery {...props} />
        </Suspense>
    );
}
