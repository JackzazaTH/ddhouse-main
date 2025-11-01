import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
// FIX: Import PortfolioProject type.
import { HomeDesign, Banner, Lead, Article, SEOData, View, CustomPage, PromoCard, Testimonial, SiteNotification, PopupModalContent, SiteInfo, Toast, PortfolioProject } from './lib/types';
import { INITIAL_HOMES, INITIAL_BANNERS, INITIAL_ARTICLES, INITIAL_CUSTOM_PAGES, INITIAL_PROMO_CARDS, INITIAL_TESTIMONIALS, INITIAL_NOTIFICATIONS, INITIAL_POPUP_MODAL, INITIAL_SITE_INFO, INITIAL_PORTFOLIO_PROJECTS } from './lib/constants';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeCard from './components/HomeCard';
import HomeDetailView from './components/HomeDetailView';
import AdminPanel from './components/AdminPanel';
import BannerSlider from './components/BannerSlider';
import PromotionForm from './components/PromotionForm';
import HomeSlider from './components/HomeSlider';
import ArticleListView from './components/ArticleListView';
import ArticleDetailView from './components/ArticleDetailView';
import ArticleCard from './components/ArticleCard';
import PasswordModal from './components/PasswordModal';
import DesignGalleryView from './components/DesignGalleryView';
import CustomPageView from './components/CustomPageView';
import PromoGrid from './components/PromoGrid';
import TestimonialSection from './components/TestimonialSection';
import VideoModal from './components/VideoModal';
import NotificationBanner from './components/NotificationBanner';
import MainPopupModal from './components/MainPopupModal';
import ToastContainer from './components/ToastContainer';
import PortfolioPage from './components/PortfolioPage';
import PortfolioDetailView from './components/PortfolioDetailView';


const App: React.FC = () => {
  const [homes, setHomes] = useState<HomeDesign[]>(INITIAL_HOMES);
  const [banners, setBanners] = useState<Banner[]>(INITIAL_BANNERS);
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [customPages, setCustomPages] = useState<CustomPage[]>(INITIAL_CUSTOM_PAGES);
  const [promoCards, setPromoCards] = useState<PromoCard[]>(INITIAL_PROMO_CARDS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  // FIX: Add state for portfolio projects to be managed in the Admin Panel.
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>(INITIAL_PORTFOLIO_PROJECTS);
  const [notifications, setNotifications] = useState<SiteNotification[]>(INITIAL_NOTIFICATIONS);
  const [popupModalContent, setPopupModalContent] = useState<PopupModalContent>(INITIAL_POPUP_MODAL);
  const [siteInfo, setSiteInfo] = useState<SiteInfo>(INITIAL_SITE_INFO);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const [currentView, setCurrentView] = useState<View>('list');
  const [selectedHomeId, setSelectedHomeId] = useState<string | null>(null);
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);
  const [selectedPageSlug, setSelectedPageSlug] = useState<string | null>(null);
  const [selectedPortfolioSlug, setSelectedPortfolioSlug] = useState<string | null>(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [videoModalUrl, setVideoModalUrl] = useState<string | null>(null);
  const [isMainPopupOpen, setIsMainPopupOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [bedroomsFilter, setBedroomsFilter] = useState<string>('any');
  const [bathroomsFilter, setBathroomsFilter] = useState<string>('any');
  const [areaRange, setAreaRange] = useState({ min: '', max: '' });

  const activeNotification = useMemo(() => notifications.find(n => n.isActive), [notifications]);
  
  // FIX: Initialize useRef with null to resolve a potential static analysis error.
  const prevViewRef = useRef<View | null>(null);
  
  const removeToast = useCallback((id: number) => {
    setToasts(currentToasts => currentToasts.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: Toast['type']) => {
    const id = Date.now();
    setToasts(toasts => [...toasts, { id, message, type }]);
  }, []);

  useEffect(() => {
    const prevView = prevViewRef.current;
    // Show popup every time the user navigates TO the homepage, if it's enabled.
    // It won't re-open if closed manually because this effect only runs when `currentView` changes.
    if (currentView === 'list' && prevView !== 'list' && popupModalContent.isEnabled) {
      setIsMainPopupOpen(true);
    }
    // Update prevView for the next run
    prevViewRef.current = currentView;
  }, [currentView, popupModalContent.isEnabled]);


  const handleSelectHome = (id: string) => {
    setSelectedHomeId(id);
    setCurrentView('detail');
    window.scrollTo(0, 0);
  };
  
  const handleSelectArticle = (slug: string) => {
    setSelectedArticleSlug(slug);
    setCurrentView('articleDetail');
    window.scrollTo(0, 0);
  };

  const navigateTo = (view: View, slug?: string) => {
    setSelectedHomeId(null);
    setSelectedArticleSlug(null);
    setSelectedPageSlug(null);
    setSelectedPortfolioSlug(null);

    if (view === 'customPage') setSelectedPageSlug(slug || null);
    if (view === 'portfolioDetail') setSelectedPortfolioSlug(slug || null);

    setCurrentView(view);
    window.scrollTo(0, 0);
  };
  
  const handleContactClick = () => {
    navigateTo('customPage', 'appointment');
  };

  const handleToggleAdminView = () => {
    if (currentView === 'admin') {
      setCurrentView('list');
    } else {
      setIsPasswordModalOpen(true);
    }
  };

  const handleAdminLoginAttempt = (password: string) => {
    if (password === '1234') {
        setCurrentView('admin');
        setIsPasswordModalOpen(false);
        addToast('Login successful!', 'success');
    } else {
        addToast('Incorrect password.', 'error');
    }
  };

  const handleAddHome = useCallback((newHome: Omit<HomeDesign, 'id'>) => {
    setHomes(prevHomes => [
      { ...newHome, id: `ddh-${Date.now()}` },
      ...prevHomes,
    ]);
    addToast('Home design added successfully!', 'success');
  }, [addToast]);

  const handleUpdateHome = useCallback((updatedHome: HomeDesign) => {
    setHomes(prevHomes => 
      prevHomes.map(home => (home.id === updatedHome.id ? updatedHome : home))
    );
    addToast('Home design updated successfully!', 'success');
  }, [addToast]);

  const handleDeleteHome = useCallback((id: string) => {
    setHomes(prevHomes => prevHomes.filter(home => home.id !== id));
    addToast('Home design deleted.', 'success');
  }, [addToast]);
  
  const handleAddBanner = useCallback((newBanner: Omit<Banner, 'id'>) => {
    setBanners(prevBanners => [
      { ...newBanner, id: `banner-${Date.now()}` },
      ...prevBanners
    ]);
    addToast('Banner added successfully!', 'success');
  }, [addToast]);

  const handleUpdateBanner = useCallback((updatedBanner: Banner) => {
    setBanners(prevBanners =>
      prevBanners.map(banner => (banner.id === updatedBanner.id ? updatedBanner : banner))
    );
    addToast('Banner updated successfully!', 'success');
  }, [addToast]);

  const handleDeleteBanner = useCallback((id: string) => {
    setBanners(prevBanners => prevBanners.filter(banner => banner.id !== id));
    addToast('Banner deleted.', 'success');
  }, [addToast]);

  const handleAddArticle = useCallback((newArticle: Omit<Article, 'id'>) => {
    setArticles(prev => [
      { ...newArticle, id: `art-${Date.now()}` },
      ...prev,
    ]);
    addToast('Article added successfully!', 'success');
  }, [addToast]);

  const handleUpdateArticle = useCallback((updatedArticle: Article) => {
    setArticles(prev => 
      prev.map(item => (item.id === updatedArticle.id ? updatedArticle : item))
    );
    addToast('Article updated successfully!', 'success');
  }, [addToast]);

  const handleDeleteArticle = useCallback((id: string) => {
    setArticles(prev => prev.filter(item => item.id !== id));
    addToast('Article deleted.', 'success');
  }, [addToast]);

  const handleAddCustomPage = useCallback((newPage: Omit<CustomPage, 'id'>) => {
    setCustomPages(prev => [
      { ...newPage, id: `page-${Date.now()}` },
      ...prev,
    ]);
    addToast('Page added successfully!', 'success');
  }, [addToast]);

  const handleUpdateCustomPage = useCallback((updatedPage: CustomPage) => {
    setCustomPages(prev => 
      prev.map(item => (item.id === updatedPage.id ? updatedPage : item))
    );
    addToast('Page updated successfully!', 'success');
  }, [addToast]);

  const handleDeleteCustomPage = useCallback((id: string) => {
    setCustomPages(prev => prev.filter(item => item.id !== id));
    addToast('Page deleted.', 'success');
  }, [addToast]);
  
  const handleAddPromoCard = useCallback((newCard: Omit<PromoCard, 'id'>) => {
    setPromoCards(prev => [
      { ...newCard, id: `promo-${Date.now()}` },
      ...prev,
    ]);
    addToast('Promo card added successfully!', 'success');
  }, [addToast]);

  const handleUpdatePromoCard = useCallback((updatedCard: PromoCard) => {
    setPromoCards(prev => 
      prev.map(item => (item.id === updatedCard.id ? updatedCard : item))
    );
    addToast('Promo card updated successfully!', 'success');
  }, [addToast]);

  const handleDeletePromoCard = useCallback((id: string) => {
    setPromoCards(prev => prev.filter(item => item.id !== id));
    addToast('Promo card deleted.', 'success');
  }, [addToast]);

  const handleAddTestimonial = useCallback((newTestimonial: Omit<Testimonial, 'id'>) => {
    setTestimonials(prev => [
      { ...newTestimonial, id: `test-${Date.now()}` },
      ...prev,
    ]);
    addToast('Testimonial added successfully!', 'success');
  }, [addToast]);

  const handleUpdateTestimonial = useCallback((updatedTestimonial: Testimonial) => {
    setTestimonials(prev => 
      prev.map(item => (item.id === updatedTestimonial.id ? updatedTestimonial : item))
    );
    addToast('Testimonial updated successfully!', 'success');
  }, [addToast]);

  const handleDeleteTestimonial = useCallback((id: string) => {
    setTestimonials(prev => prev.filter(item => item.id !== id));
    addToast('Testimonial deleted.', 'success');
  }, [addToast]);

  // FIX: Add handlers for portfolio project management.
  const handleAddPortfolioProject = useCallback((newProject: Omit<PortfolioProject, 'id'>) => {
    setPortfolioProjects(prev => [
      { ...newProject, id: `proj-${Date.now()}` },
      ...prev,
    ]);
    addToast('Portfolio project added successfully!', 'success');
  }, [addToast]);

  const handleUpdatePortfolioProject = useCallback((updatedProject: PortfolioProject) => {
    setPortfolioProjects(prev =>
      prev.map(item => (item.id === updatedProject.id ? updatedProject : item))
    );
    addToast('Portfolio project updated successfully!', 'success');
  }, [addToast]);

  const handleDeletePortfolioProject = useCallback((id: string) => {
    setPortfolioProjects(prev => prev.filter(item => item.id !== id));
    addToast('Portfolio project deleted.', 'success');
  }, [addToast]);

  const handleAddNotification = useCallback((newNotification: Omit<SiteNotification, 'id'>) => {
    const newNotif = { ...newNotification, id: `notif-${Date.now()}` };
    if (newNotif.isActive) {
      setNotifications(prev => [
        newNotif,
        ...prev.map(n => ({ ...n, isActive: false })),
      ]);
    } else {
      setNotifications(prev => [newNotif, ...prev]);
    }
    addToast('Notification added successfully!', 'success');
  }, [addToast]);

  const handleUpdateNotification = useCallback((updatedNotification: SiteNotification) => {
    setNotifications(prev => 
      prev.map(item => {
        if (item.id === updatedNotification.id) {
          return updatedNotification;
        }
        // If the updated one is now active, deactivate all others
        if (updatedNotification.isActive) {
          return { ...item, isActive: false };
        }
        return item;
      })
    );
    addToast('Notification updated successfully!', 'success');
  }, [addToast]);

  const handleDeleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(item => item.id !== id));
    addToast('Notification deleted.', 'success');
  }, [addToast]);

  const handleUpdatePopupModal = useCallback((newContent: PopupModalContent) => {
    setPopupModalContent(newContent);
    addToast('Popup modal settings updated!', 'success');
  }, [addToast]);

  const handleUpdateSiteInfo = useCallback((newInfo: SiteInfo) => {
    setSiteInfo(newInfo);
    addToast('Site info updated!', 'success');
  }, [addToast]);

  const handleAddLead = useCallback((newLeadData: Omit<Lead, 'id' | 'timestamp'>) => {
    const newLead: Lead = {
      ...newLeadData,
      id: `lead-${Date.now()}`,
      timestamp: new Date(),
    };
    setLeads(prevLeads => [newLead, ...prevLeads]);
    addToast('Registration successful! We will be in touch.', 'success');
  }, [addToast]);

  const selectedHome = homes.find(home => home.id === selectedHomeId);
  const selectedArticle = articles.find(article => article.slug === selectedArticleSlug);
  const selectedPage = customPages.find(page => page.slug === selectedPageSlug);
  const selectedPortfolioProject = useMemo(() => portfolioProjects.find(p => p.slug === selectedPortfolioSlug), [portfolioProjects, selectedPortfolioSlug]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setBedroomsFilter('any');
    setBathroomsFilter('any');
    setAreaRange({ min: '', max: '' });
  };

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


  useEffect(() => {
    const updateMetaTags = (seo?: SEOData, defaultTitle?: string, defaultDescription?: string) => {
      const title = seo?.title || defaultTitle || 'DDHOUSE - Modern Home Designs';
      const description = seo?.description || defaultDescription || 'Explore our exclusive collection of modern home designs.';
      
      document.getElementById('meta-title')!.textContent = title;
      document.getElementById('meta-description')!.setAttribute('content', description);
      document.getElementById('og-title')!.setAttribute('content', title);
      document.getElementById('og-description')!.setAttribute('content', description);

      // Optionally update og:image
      const ogImageTag = document.getElementById('og-image');
      if (ogImageTag) {
        if (seo?.ogImage) {
          ogImageTag.setAttribute('content', seo.ogImage);
        } else if (currentView === 'detail' && selectedHome) {
           ogImageTag.setAttribute('content', selectedHome.images[0]);
        } else if (currentView === 'articleDetail' && selectedArticle) {
          ogImageTag.setAttribute('content', selectedArticle.imageUrl);
        }
      }
    };

    if (currentView === 'detail' && selectedHome) {
      updateMetaTags(selectedHome.seo, selectedHome.name, selectedHome.description.substring(0, 160));
    } else if (currentView === 'articleDetail' && selectedArticle) {
       updateMetaTags(selectedArticle.seo, selectedArticle.title, selectedArticle.excerpt);
    } else if (currentView === 'customPage' && selectedPage) {
       updateMetaTags(selectedPage.seo, selectedPage.title, selectedPage.content.substring(0, 160));
    } else {
      updateMetaTags(undefined, 'DDHOUSE - Modern Home Designs', 'A modern web application to showcase beautiful home designs, articles, and more.');
    }
  }, [currentView, selectedHome, selectedArticle, selectedPage]);

  const renderContent = () => {
    switch (currentView) {
      case 'detail':
        return selectedHome && <HomeDetailView home={selectedHome} onBack={() => navigateTo('designs')} onContactClick={handleContactClick} />;
      case 'articles':
        return <ArticleListView articles={articles} onSelectArticle={handleSelectArticle} />;
      case 'articleDetail':
        return selectedArticle && <ArticleDetailView article={selectedArticle} onBack={() => navigateTo('articles')} />;
      case 'customPage':
        return selectedPage && <CustomPageView page={selectedPage} onAddLead={handleAddLead} />;
      case 'portfolio':
        return <PortfolioPage projects={portfolioProjects} onNavigate={navigateTo} />;
      case 'portfolioDetail':
        return selectedPortfolioProject && <PortfolioDetailView project={selectedPortfolioProject} onBack={() => navigateTo('portfolio')} onContactClick={handleContactClick} />;
      case 'designs':
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
            allHomes={homes}
            onContactClick={handleContactClick}
          />
        );
      case 'admin':
        return (
          <AdminPanel 
            homes={homes}
            onAddHome={handleAddHome}
            onUpdateHome={handleUpdateHome}
            onDeleteHome={handleDeleteHome}
            banners={banners}
            onAddBanner={handleAddBanner}
            onUpdateBanner={handleUpdateBanner}
            onDeleteBanner={handleDeleteBanner}
            articles={articles}
            onAddArticle={handleAddArticle}
            onUpdateArticle={handleUpdateArticle}
            onDeleteArticle={handleDeleteArticle}
            pages={customPages}
            onAddPage={handleAddCustomPage}
            onUpdatePage={handleUpdateCustomPage}
            onDeletePage={handleDeleteCustomPage}
            promoCards={promoCards}
            onAddPromoCard={handleAddPromoCard}
            onUpdatePromoCard={handleUpdatePromoCard}
            onDeletePromoCard={handleDeletePromoCard}
            testimonials={testimonials}
            onAddTestimonial={handleAddTestimonial}
            onUpdateTestimonial={handleUpdateTestimonial}
            onDeleteTestimonial={handleDeleteTestimonial}
            // FIX: Pass portfolio project props to AdminPanel.
            portfolioProjects={portfolioProjects}
            onAddPortfolioProject={handleAddPortfolioProject}
            onUpdatePortfolioProject={handleUpdatePortfolioProject}
            onDeletePortfolioProject={handleDeletePortfolioProject}
            notifications={notifications}
            onAddNotification={handleAddNotification}
            onUpdateNotification={handleUpdateNotification}
            onDeleteNotification={handleDeleteNotification}
            popupModalContent={popupModalContent}
            onUpdatePopupModal={handleUpdatePopupModal}
            siteInfo={siteInfo}
            onUpdateSiteInfo={handleUpdateSiteInfo}
            leads={leads}
          />
        );
      case 'list':
      default:
        return (
          <div>
            <BannerSlider banners={banners} />
            
            <PromotionForm onAddLead={handleAddLead} imageUrl={siteInfo.promoFormImageUrl} />

            <div className="my-12 md:my-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center">ค้นหาแบบบ้านที่ตรงใจ</h2>
              <p className="text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto">เลือกชมแบบบ้านแนะนำของเราในสไลด์โชว์ หรือเลื่อนลงเพื่อดูแบบบ้านทั้งหมดในแกลเลอรี</p>
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
                    onContactClick={handleContactClick}
                    animationDelay={`${index * 100}ms`}
                  />
                ))}
              </div>
               <div className="text-center mt-12">
                <button
                  onClick={() => navigateTo('designs')}
                  className="bg-secondary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  ดูแบบบ้านทั้งหมด
                </button>
              </div>
            </div>

            <div className="my-12 md:my-16">
              <PromoGrid cards={promoCards} onNavigate={navigateTo} />
            </div>
            
            <div className="my-12 md:my-16">
              <TestimonialSection 
                testimonials={testimonials} 
                onPlayVideo={setVideoModalUrl} 
                onViewAll={() => navigateTo('articles')} 
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
                  onClick={() => navigateTo('articles')}
                  className="bg-secondary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  ดูบทความทั้งหมด
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
       {activeNotification && showNotification && (
        <NotificationBanner
          notification={activeNotification}
          onClose={() => setShowNotification(false)}
        />
      )}
      <Header 
        onNavigate={navigateTo}
        currentView={currentView}
        selectedPageSlug={selectedPageSlug}
      />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {renderContent()}
      </main>
      <Footer onAdminClick={handleToggleAdminView} isAdminView={currentView === 'admin'} siteInfo={siteInfo} />
      {isPasswordModalOpen && (
        <PasswordModal 
          onClose={() => setIsPasswordModalOpen(false)}
          onSubmit={handleAdminLoginAttempt}
        />
      )}
      {videoModalUrl && (
        <VideoModal videoUrl={videoModalUrl} onClose={() => setVideoModalUrl(null)} />
      )}
      {isMainPopupOpen && (
        <MainPopupModal
          content={popupModalContent}
          onClose={() => setIsMainPopupOpen(false)}
          onNavigate={navigateTo}
        />
      )}
    </div>
  );
};

export default App;
