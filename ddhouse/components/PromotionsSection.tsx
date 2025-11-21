
'use client';
import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { HomeDesign } from '@/lib/types';
import { AreaIcon, BathIcon, BedIcon } from '@/components/Icon';

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
            className="w-[80vw] xs:w-[280px] md:w-[340px] flex-shrink-0 bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer snap-center md:snap-start transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 group"
        >
            <div className="h-48 sm:h-60 overflow-hidden relative">
                 <img 
                    src={home.images[0]} 
                    alt={home.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                 {home.discount_percentage && (
                    <div className="absolute top-0 right-0 bg-gradient-to-bl from-yellow-400 to-orange-500 text-white text-sm sm:text-lg font-bold px-3 py-1 sm:px-4 sm:py-2 rounded-bl-2xl shadow-sm z-10">
                        -{home.discount_percentage}%
                    </div>
                )}
            </div>

            <div className="p-4 sm:p-6 relative">
                <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors truncate">{home.name}</h3>
                
                <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-1"><AreaIcon className="w-4 h-4" /> {home.area} ม²</div>
                    <div className="flex items-center gap-1"><BedIcon className="w-4 h-4" /> {home.bedrooms} นอน</div>
                    <div className="flex items-center gap-1"><BathIcon className="w-4 h-4" /> {home.bathrooms} น้ำ</div>
                </div>

                {/* Pricing */}
                <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-2 sm:p-3 flex justify-between items-center border border-gray-100">
                        <span className="text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-wider">Popular</span>
                        <div className="text-right flex flex-col items-end leading-tight">
                           {popularDiscount > 0 && <span className="text-[10px] sm:text-xs line-through text-gray-400">{formatPrice(home.price_popular_original)}</span>}
                           <span className="font-bold text-sm sm:text-lg text-gray-800">{formatPrice(home.price_popular_discounted)}</span>
                        </div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-2 sm:p-3 flex justify-between items-center border border-red-100">
                        <span className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-wider">Signature</span>
                        <div className="text-right flex flex-col items-end leading-tight">
                            {signatureDiscount > 0 && <span className="text-[10px] sm:text-xs line-through text-red-300">{formatPrice(home.price_signature_original)}</span>}
                            <span className="font-bold text-sm sm:text-lg text-primary">{formatPrice(home.price_signature_discounted)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PromotionsSection: React.FC<{ homes: HomeDesign[] }> = ({ homes }) => {
    const router = useRouter();
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const promotionHomes = homes.filter(h => h.promotion_enabled);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -360 : 360;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (promotionHomes.length === 0) {
        return null;
    }

    return (
        <section className="bg-gradient-to-b from-primary to-red-900 py-12 md:py-20 relative overflow-hidden">
             {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

            <div className="container mx-auto relative z-10 px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end text-white mb-8 md:mb-12 px-2 gap-4">
                    <div className="items-start flex flex-col">
                         <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold tracking-wider mb-3 border border-white/10">HOT DEALS</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-shadow-lg">
                            โปรโมชั่นประจำเดือน
                        </h2>
                    </div>
                    <button 
                        onClick={() => router.push('/designs')} 
                        className="font-medium hover:text-yellow-300 transition-colors flex items-center gap-2 group text-sm md:text-lg bg-white/10 px-4 py-2 rounded-full hover:bg-white/20"
                    >
                        ดูทั้งหมด <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </div>
                
                <div className="relative group/slider md:px-16"> {/* Reduced padding for mobile */}
                     <button 
                        onClick={() => scroll('left')} 
                        className="hidden md:flex absolute top-1/2 -left-4 transform -translate-y-1/2 z-30 bg-white text-primary w-12 h-12 rounded-full shadow-xl border-2 border-gray-100 hover:scale-110 active:scale-95 transition-all duration-200 items-center justify-center opacity-100"
                        aria-label="Previous"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                     <button 
                        onClick={() => scroll('right')} 
                        className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-30 bg-white text-primary w-12 h-12 rounded-full shadow-xl border-2 border-gray-100 hover:scale-110 active:scale-95 transition-all duration-200 items-center justify-center opacity-100"
                        aria-label="Next"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <div 
                        ref={scrollContainerRef} 
                        className="flex gap-4 md:gap-12 overflow-x-auto snap-x snap-mandatory pb-10 md:pb-12 pt-4 no-scrollbar items-stretch -mx-4 px-4 md:mx-0 md:px-0" // Negative margin breakout for mobile
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
                    >
                        {promotionHomes.map(home => (
                            <PromotionHomeCard 
                                key={home.id} 
                                home={home} 
                                onSelect={(id) => router.push(`/designs/${id}`)} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PromotionsSection;
