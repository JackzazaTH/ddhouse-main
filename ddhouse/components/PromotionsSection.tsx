'use client';
import React, { useRef } from 'react';
import { HomeDesign, View } from '@/lib/types';
import { AreaIcon, BathIcon, BedIcon, ParkingIcon } from '@/components/Icon';

interface SPAProps {
    onNavigate: (view: View, slug?: string) => void;
}

const PromotionHomeCard: React.FC<{ home: HomeDesign; onSelect: (id: string) => void; }> = ({ home, onSelect }) => {
    const formatPrice = (price?: number | string) => {
        if (price === null || price === undefined || price === '') return 'N/A';
        const num = Number(price);
        if (isNaN(num)) return 'N/A';
        return `฿${num.toLocaleString()}`;
    };
    
    const calculateDiscount = (original?: number, discounted?: number) => {
        if (!original || !discounted || original <= discounted) return 0;
        return Math.round(((original - discounted) / original) * 100);
    }
    
    const popularDiscount = calculateDiscount(home.price_popular_original, home.price_popular_discounted);
    const signatureDiscount = calculateDiscount(home.price_signature_original, home.price_signature_discounted);

    return (
        <div 
            onClick={() => onSelect(home.id)}
            className="w-[330px] flex-shrink-0 bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer snap-start transform transition-transform hover:-translate-y-2 border-2 border-secondary"
        >
            <div className="p-4 relative">
                {home.discount_percentage && (
                    <div className="absolute top-0 left-0 bg-gradient-to-r from-orange-500 to-red-600 text-white text-lg font-bold px-4 py-3 rounded-br-2xl shadow-md">
                        {home.discount_percentage}%
                    </div>
                )}
                <h3 className="text-center text-2xl font-bold mt-12">{home.name}</h3>
                <div className="grid grid-cols-4 gap-2 text-center text-sm text-gray-600 my-3">
                    <div className="flex flex-col items-center"><AreaIcon className="w-5 h-5 mb-1 text-gray-500" /> {home.area} ตร.ม.</div>
                    <div className="flex flex-col items-center"><BedIcon className="w-5 h-5 mb-1 text-gray-500" /> {home.bedrooms} ห้องนอน</div>
                    <div className="flex flex-col items-center"><BathIcon className="w-5 h-5 mb-1 text-gray-500" /> {home.bathrooms} ห้องน้ำ</div>
                    <div className="flex flex-col items-center"><ParkingIcon className="w-5 h-5 mb-1 text-gray-500" /> {home.parking} คัน</div>
                </div>

                {/* Pricing */}
                <div className="space-y-1">
                    <div className="bg-gray-800 text-white rounded-lg p-2 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                           <span className="font-bold text-lg">Popular</span>
                           {popularDiscount > 0 && <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-md">-{popularDiscount}%</span>}
                        </div>
                        <div className="text-right">
                           <p className="font-bold text-xl">{formatPrice(home.price_popular_discounted)}</p>
                           {popularDiscount > 0 && <p className="text-sm line-through opacity-70">{formatPrice(home.price_popular_original)}</p>}
                        </div>
                    </div>
                    <div className="bg-red-700 text-white rounded-lg p-2 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-lg">Signature</span>
                            {signatureDiscount > 0 && <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-md">-{signatureDiscount}%</span>}
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-xl">{formatPrice(home.price_signature_discounted)}</p>
                            {signatureDiscount > 0 && <p className="text-sm line-through opacity-70">{formatPrice(home.price_signature_original)}</p>}
                        </div>
                    </div>
                </div>
            </div>
            <img src={home.images[0]} alt={home.name} className="w-full h-48 object-cover" />
        </div>
    );
};

const PromotionsSection: React.FC<{ homes: HomeDesign[] } & Partial<SPAProps>> = ({ homes, onNavigate }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const promotionHomes = homes.filter(h => h.promotion_enabled);
    
    const handleNavigation = (path: string) => {
        const [view, slug] = path.split('/').filter(Boolean);
        if (onNavigate && view) {
            onNavigate(view as View, slug);
        }
    }

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -346 : 346;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (promotionHomes.length === 0) {
        return null;
    }

    return (
        <section className="bg-gradient-to-br from-primary via-red-700 to-secondary py-10 md:py-12 shadow-inner">
            <div className="container mx-auto">
                <div className="flex justify-between items-center text-white mb-8 px-4">
                    <h2 className="text-2xl md:text-3xl font-bold">
                        โปรโมชั่น
                    </h2>
                    <button 
                        onClick={() => handleNavigation('/designs')}
                        className="font-semibold hover:underline text-lg"
                    >
                        ดูทั้งหมด &gt;
                    </button>
                </div>
                
                <div className="relative">
                     <button onClick={() => scroll('left')} className="absolute top-1/2 -left-4 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-lg hidden md:flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                     <button onClick={() => scroll('right')} className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-lg hidden md:flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <div 
                        ref={scrollContainerRef} 
                        className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-4 pb-4"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
                    >
                        {promotionHomes.map(home => (
                            <PromotionHomeCard 
                                key={home.id} 
                                home={home} 
                                onSelect={(id) => handleNavigation(`/detail/${id}`)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PromotionsSection;
