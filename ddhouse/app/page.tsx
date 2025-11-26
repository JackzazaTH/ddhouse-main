
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
import PromotionsSection from '@/components/PromotionsSection';
import PortfolioPreview from '@/components/PortfolioPreview';

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
    setVideoModalUrl,
    portfolioProjects
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

  return (
    <div className="space-y-12 md:space-y-20">
      <BannerSlider banners={banners} />
      
      <div className="animate-slide-in-up" style={{ animationDelay: '100ms' }}><PromotionsSection homes={homes} /></div>

      <div className="animate-slide-in-up" style={{ animationDelay: '200ms' }}><PromotionForm onAddLead={handleAddLead} imageUrl={siteInfo.promoFormImageUrl} /></div>

      <div className="animate-slide-in-up" style={{ animationDelay: '300ms' }}>
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center">ค้นหาแบบบ้านที่ตรงใจ</h2>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto">เลือกชมแบบบ้านแนะนำของเราในสไลด์โชว์ หรือเลื่อนลงเพื่อดูแบบบ้านทั้งหมดในแกลเลอรี</p>
        <HomeSlider homes={homes} onSelect={handleSelectHome} onContactClick={handleContactClick} />
      </div>

      <div className="animate-slide-in-up" style={{ animationDelay: '400ms' }}>
         <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">แกลเลอรีแบบบ้าน</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {homes.slice(0, 6).map((home, index) => (
            <HomeCard 
              key={home.id} 
              home={home} 
              onSelect={handleSelectHome}
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
            {siteInfo.buttonLabels.viewAllHomes}
          </button>
        </div>
      </div>

      <div className="animate-slide-in-up" style={{ animationDelay: '500ms' }}>
        <PortfolioPreview projects={portfolioProjects} />
      </div>

      <div className="animate-slide-in-up" style={{ animationDelay: '600ms' }}>
        <PromoGrid cards={promoCards} />
      </div>
      
      <div className="animate-slide-in-up" style={{ animationDelay: '700ms' }}>
        <TestimonialSection 
          testimonials={testimonials} 
          onPlayVideo={setVideoModalUrl} 
          onViewAll={() => router.push('/portfolio')}
          viewAllLabel={siteInfo.buttonLabels.viewAllTestimonials}
        />
      </div>

      <div className="animate-slide-in-up" style={{ animationDelay: '800ms' }}>
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
            {siteInfo.buttonLabels.viewAllArticles}
          </button>
        </div>
      </div>

      {/* Service Area Description Section */}
      <div className="animate-slide-in-up bg-white py-12 rounded-xl shadow-sm border border-gray-100" style={{ animationDelay: '900ms' }}>
        <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{siteInfo.serviceArea.title}</h2>
            <p className="text-gray-600 leading-relaxed text-lg">{siteInfo.serviceArea.content}</p>
        </div>
      </div>
    </div>
  );
}