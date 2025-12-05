
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
            className="w-[85vw] xs:w-[280px] md:w-[340px] flex-shrink-0 bg-white rounded-2xl shadow-soft-xl overflow-hidden cursor-pointer snap-center md:snap-start transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-white/50 group"
        >
            <div className="h-52 sm:h-64 overflow-hidden relative">
                 <img 
                    src={home.images[0]} 
                    alt={home.name} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                 {home.discount_percentage && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-primary text-sm font-bold px-3 py-1 rounded-full shadow-lg z-10 animate-float">
                        Save {home.discount_percentage}%
                    </div>
                )}
            </div>

            <div className="p-5 sm:p-6 relative">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors truncate">{home.name}</h3>
                
                <div className="flex justify-between items-center text-xs text-gray-500 mb-5 pb-5 border-b border-gray-100">
                    <div className="flex items-center gap-1.5"><AreaIcon className="w-4 h-4 text-gray-400" /> {home.area} ม²</div>
                    <div className="flex items-center gap-1.5"><BedIcon className="w-4 h-4 text-gray-400" /> {home.bedrooms} นอน</div>
                    <div className="flex items-center gap-1.5"><BathIcon className="w-4 h-4 text-gray-400" /> {home.bathrooms} น้ำ</div>
                </div>

                {/* Pricing */}
                <div className="space-y-3">
                    <div className="bg-gray-50 rounded-xl p-3 flex justify-between items-center border border-gray-100/80 hover:border-gray-200 transition-colors">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Popular</span>
                        <div className="text-right flex flex-col items-end leading-tight">
                           {popularDiscount > 0 && <span className="text-[10px] line-through text-gray-400 mb-0.5">{formatPrice(home.price_popular_original)}</span>}
                           <span className="font-bold text-base text-gray-900">{formatPrice(home.price_popular_discounted)}</span>
                        </div>
                    </div>
                    <div className="bg-red-50/50 rounded-xl p-3 flex justify-between items-center border border-red-100/80 hover:border-red-200 transition-colors">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">Signature</span>
                        <div className="text-right flex flex-col items-end leading-tight">
                            {signatureDiscount > 0 && <span className="text-[10px] line-through text-red-300 mb-0.5">{formatPrice(home.price_signature_original)}</span>}
                            <span className="font-bold text-base text-primary">{formatPrice(home.price_signature_discounted)}</span>
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
            const scrollAmount = direction === 'left' ? -380 : 380;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (promotionHomes.length === 0) {
        return null;
    }

    return (
        <section className="bg-gradient-to-br from-primary to-primaryDark py-16 md:py-24 relative overflow-hidden">
             {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-black/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none"></div>

            <div className="container mx-auto relative z-10 px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end text-white mb-10 md:mb-16 gap-6">
                    <div className="items-start flex flex-col max-w-2xl">
                         <span className="inline-block py-1.5 px-4 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold tracking-widest mb-4 border border-white/20 shadow-sm">HOT DEALS</span>
                        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4 text-shadow-lg">
                            โปรโมชั่นประจำเดือน
                        </h2>
                        <p className="text-white/80 text-lg font-light">
                            พบกับข้อเสนอสุดพิเศษสำหรับแบบบ้านยอดนิยม ที่คัดสรรมาเพื่อคุณโดยเฉพาะ
                        </p>
                    </div>
                    <button 
                        onClick={() => router.push('/designs')} 
                        className="group flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg border border-white/10"
                    >
                        <span className="font-medium">ดูทั้งหมด</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </div>
                
                <div className="relative group/slider">
                     <button 
                        onClick={() => scroll('left')} 
                        className="hidden md:flex absolute top-1/2 -left-6 transform -translate-y-1/2 z-30 bg-white text-primary w-14 h-14 rounded-full shadow-xl border border-gray-100 hover:scale-110 active:scale-95 transition-all duration-300 items-center justify-center opacity-0 group-hover/slider:opacity-100 translate-x-4 group-hover/slider:translate-x-0"
                        aria-label="Previous"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                     <button 
                        onClick={() => scroll('right')} 
                        className="hidden md:flex absolute top-1/2 -right-6 transform -translate-y-1/2 z-30 bg-white text-primary w-14 h-14 rounded-full shadow-xl border border-gray-100 hover:scale-110 active:scale-95 transition-all duration-300 items-center justify-center opacity-0 group-hover/slider:opacity-100 -translate-x-4 group-hover/slider:translate-x-0"
                        aria-label="Next"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <div 
                        ref={scrollContainerRef} 
                        className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-12 pt-4 no-scrollbar items-stretch -mx-4 px-4 md:mx-0 md:px-0"
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