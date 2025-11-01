'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import BannerSlider from '@/components/BannerSlider';
import PromotionForm from '@/components/PromotionForm';
import HomeSlider from '@/components/HomeSlider';
import HomeCard from '@/components/HomeCard';
import PromoGrid from '@/components/PromoGrid';
import TestimonialSection from '@/components/TestimonialSection';
import ArticleCard from '@/components/ArticleCard';

export default function HomePage() {
  const router = useRouter();
  const { 
    homes, 
    banners, 
    articles, 
    promoCards, 
    testimonials, 
    siteInfo,
    handleAddLead, 
    setVideoModalUrl 
  } = useAppContext();
  
  const handleSelectHome = (id: string) => {
    router.push(`/designs/${id}`);
  };

  const handleSelectArticle = (slug: string) => {
    router.push(`/articles/${slug}`);
  };

  const handleContactClick = () => {
    router.push('/appointment');
  };
  
  if (!siteInfo) return null;

  return (
    <div>
      <BannerSlider banners={banners} />
      
      <PromotionForm onAddLead={handleAddLead} imageUrl={siteInfo.promoFormImageUrl} />

      <div className="my-12 md:my-16">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center">ค้นหาแบบบ้านที่ตรงใจ</h2>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto">เลือกชมแบบบ้านแนะนำของเราในสไลด์โชว์ หรือเลื่อนลงเพื่อดูแบบบ้านทั้งหมดในแกลเลอรี</p>
        {/* FIX: Pass the required onContactClick prop to HomeSlider. */}
        <HomeSlider homes={homes} onSelect={handleSelectHome} onContactClick={handleContactClick} />
      </div>

      <div className="mb-12">
         <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">แกลเลอรีแบบบ้าน</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {homes.slice(0, 6).map((home, index) => (
            <HomeCard 
              key={home.id} 
              home={home} 
              onSelect={handleSelectHome}
              // FIX: Pass the required onContactClick prop to HomeCard.
              onContactClick={handleContactClick}
              animationDelay={`${index * 100}ms`}
            />
          ))}
        </div>
         <div className="text-center mt-12">
          <button
            onClick={() => router.push('/designs')}
            className="bg-secondary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            ดูแบบบ้านทั้งหมด
          </button>
        </div>
      </div>

      <div className="my-12 md:my-16">
        <PromoGrid cards={promoCards} />
      </div>
      
      <div className="my-12 md:my-16">
        <TestimonialSection 
          testimonials={testimonials} 
          onPlayVideo={setVideoModalUrl} 
          onViewAll={() => router.push('/articles')} 
        />
      </div>

      <div className="my-12 md:my-16">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">บทความล่าสุด</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article, index) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              onSelect={handleSelectArticle}
              animationDelay={`${index * 100}ms`}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <button
            onClick={() => router.push('/articles')}
            className="bg-secondary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            ดูบทความทั้งหมด
          </button>
        </div>
      </div>
    </div>
  );
}
