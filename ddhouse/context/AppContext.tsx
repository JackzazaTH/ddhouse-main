'use client';

import React, { createContext, useState, useCallback, useMemo, useContext, ReactNode, useEffect } from 'react';
import { HomeDesign, Banner, Lead, Article, CustomPage, PromoCard, Testimonial, SiteNotification, PopupModalContent, SiteInfo, Toast, PortfolioProject } from '@/lib/types';
import { getHomes, getBanners, getArticles, getCustomPages, getPromoCards, getTestimonials, getPortfolioProjects, getNotifications, getPopupModalContent, getSiteInfo } from '@/services/dataService';


interface AppContextType {
  homes: HomeDesign[];
  banners: Banner[];
  articles: Article[];
  customPages: CustomPage[];
  promoCards: PromoCard[];
  testimonials: Testimonial[];
  portfolioProjects: PortfolioProject[];
  notifications: SiteNotification[];
  popupModalContent: PopupModalContent | null;
  siteInfo: SiteInfo | null;
  leads: Lead[];
  toasts: Toast[];
  isLoading: boolean;

  videoModalUrl: string | null;
  isMainPopupOpen: boolean;
  showNotification: boolean;

  handleAddHome: (newHome: Omit<HomeDesign, 'id'>) => void;
  handleUpdateHome: (updatedHome: HomeDesign) => void;
  handleDeleteHome: (id: string) => void;
  handleAddBanner: (newBanner: Omit<Banner, 'id'>) => void;
  handleUpdateBanner: (updatedBanner: Banner) => void;
  handleDeleteBanner: (id: string) => void;
  handleAddArticle: (newArticle: Omit<Article, 'id'>) => void;
  handleUpdateArticle: (updatedArticle: Article) => void;
  handleDeleteArticle: (id: string) => void;
  handleAddCustomPage: (newPage: Omit<CustomPage, 'id'>) => void;
  handleUpdateCustomPage: (updatedPage: CustomPage) => void;
  handleDeleteCustomPage: (id: string) => void;
  handleAddPromoCard: (newCard: Omit<PromoCard, 'id'>) => void;
  handleUpdatePromoCard: (updatedCard: PromoCard) => void;
  handleDeletePromoCard: (id: string) => void;
  handleAddTestimonial: (newTestimonial: Omit<Testimonial, 'id'>) => void;
  handleUpdateTestimonial: (updatedTestimonial: Testimonial) => void;
  handleDeleteTestimonial: (id: string) => void;
  handleAddPortfolioProject: (newProject: Omit<PortfolioProject, 'id'>) => void;
  handleUpdatePortfolioProject: (updatedProject: PortfolioProject) => void;
  handleDeletePortfolioProject: (id: string) => void;
  handleAddNotification: (newNotification: Omit<SiteNotification, 'id'>) => void;
  handleUpdateNotification: (updatedNotification: SiteNotification) => void;
  handleDeleteNotification: (id: string) => void;
  handleUpdatePopupModal: (newContent: PopupModalContent) => void;
  handleUpdateSiteInfo: (newInfo: SiteInfo) => void;
  handleAddLead: (newLeadData: Omit<Lead, 'id' | 'timestamp'>) => void;
  
  setVideoModalUrl: (url: string | null) => void;
  setIsMainPopupOpen: (isOpen: boolean) => void;
  setShowNotification: (show: boolean) => void;

  addToast: (message: string, type: Toast['type']) => void;
  removeToast: (id: number) => void;

  activeNotification: SiteNotification | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [homes, setHomes] = useState<HomeDesign[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [customPages, setCustomPages] = useState<CustomPage[]>([]);
  const [promoCards, setPromoCards] = useState<PromoCard[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>([]);
  const [notifications, setNotifications] = useState<SiteNotification[]>([]);
  const [popupModalContent, setPopupModalContent] = useState<PopupModalContent | null>(null);
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);

  const [videoModalUrl, setVideoModalUrl] = useState<string | null>(null);
  const [isMainPopupOpen, setIsMainPopupOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  
  const removeToast = useCallback((id: number) => {
    setToasts(currentToasts => currentToasts.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: Toast['type']) => {
    const id = Date.now();
    setToasts(toasts => [...toasts, { id, message, type }]);
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          homesData,
          bannersData,
          articlesData,
          customPagesData,
          promoCardsData,
          testimonialsData,
          portfolioProjectsData,
          notificationsData,
          popupModalContentData,
          siteInfoData,
        ] = await Promise.all([
          getHomes(),
          getBanners(),
          getArticles(),
          getCustomPages(),
          getPromoCards(),
          getTestimonials(),
          getPortfolioProjects(),
          getNotifications(),
          getPopupModalContent(),
          getSiteInfo(),
        ]);

        setHomes(homesData);
        setBanners(bannersData);
        setArticles(articlesData);
        setCustomPages(customPagesData);
        setPromoCards(promoCardsData);
        setTestimonials(testimonialsData);
        setPortfolioProjects(portfolioProjectsData);
        setNotifications(notificationsData);
        setPopupModalContent(popupModalContentData);
        setSiteInfo(siteInfoData);

      } catch (error) {
        console.error("Failed to fetch initial data", error);
        addToast("Failed to load site data. Please refresh.", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [addToast]);

  useEffect(() => {
    if (!isLoading && popupModalContent?.isEnabled) {
      const hasSeenPopup = sessionStorage.getItem('ddhouse_popup_seen');
      if (!hasSeenPopup) {
        setIsMainPopupOpen(true);
        sessionStorage.setItem('ddhouse_popup_seen', 'true');
      }
    }
  }, [popupModalContent, isLoading]);

  const activeNotification = useMemo(() => notifications.find(n => n.isActive), [notifications]);
  
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

  const handleAddPortfolioProject = useCallback((newProject: Omit<PortfolioProject, 'id'>) => {
    setPortfolioProjects(prev => [
      { ...newProject, slug: newProject.slug || `proj-${Date.now()}`, id: `proj-${Date.now()}` },
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
    setNotifications(prev => {
      let items = prev.map(item => {
        if (item.id === updatedNotification.id) {
          return updatedNotification;
        }
        return item;
      });
      if (updatedNotification.isActive) {
        items = items.map(item => item.id === updatedNotification.id ? item : {...item, isActive: false});
      }
      return items;
    });
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

  const value = {
    homes, banners, articles, customPages, promoCards, testimonials, portfolioProjects, notifications, popupModalContent, siteInfo, leads, toasts,
    isLoading,
    videoModalUrl, isMainPopupOpen, showNotification,
    handleAddHome, handleUpdateHome, handleDeleteHome,
    handleAddBanner, handleUpdateBanner, handleDeleteBanner,
    handleAddArticle, handleUpdateArticle, handleDeleteArticle,
    handleAddCustomPage, handleUpdateCustomPage, handleDeleteCustomPage,
    handleAddPromoCard, handleUpdatePromoCard, handleDeletePromoCard,
    handleAddTestimonial, handleUpdateTestimonial, handleDeleteTestimonial,
    handleAddPortfolioProject, handleUpdatePortfolioProject, handleDeletePortfolioProject,
    handleAddNotification, handleUpdateNotification, handleDeleteNotification,
    handleUpdatePopupModal,
    handleUpdateSiteInfo,
    handleAddLead,
    setVideoModalUrl, setIsMainPopupOpen, setShowNotification,
    addToast, removeToast,
    activeNotification,
  };

  return <AppContext.Provider value={value as AppContextType}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
