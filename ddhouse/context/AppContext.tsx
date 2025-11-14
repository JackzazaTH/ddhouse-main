'use client';

import React, { createContext, useState, useCallback, useMemo, useContext, ReactNode, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
// FIX: Import LeadStatus to be used in types.
import { HomeDesign, Banner, Lead, Article, CustomPage, PromoCard, Testimonial, SiteNotification, PopupModalContent, SiteInfo, Toast, PortfolioProject, LeadStatus } from '@/lib/types';
import { INITIAL_HOMES, INITIAL_BANNERS, INITIAL_ARTICLES, INITIAL_CUSTOM_PAGES, INITIAL_PROMO_CARDS, INITIAL_TESTIMONIALS, INITIAL_NOTIFICATIONS, INITIAL_POPUP_MODAL, INITIAL_SITE_INFO, INITIAL_PORTFOLIO_PROJECTS } from '@/lib/constants';

interface AppContextType {
  homes: HomeDesign[];
  banners: Banner[];
  articles: Article[];
  customPages: CustomPage[];
  promoCards: PromoCard[];
  testimonials: Testimonial[];
  portfolioProjects: PortfolioProject[];
  notifications: SiteNotification[];
  popupModalContent: PopupModalContent;
  siteInfo: SiteInfo;
  leads: Lead[];
  toasts: Toast[];

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
  // FIX: Update signature for handleAddLead and add handlers for update/delete.
  handleAddLead: (newLeadData: Omit<Lead, 'id' | 'timestamp' | 'status' | 'notes'>) => void;
  handleUpdateLead: (updatedLead: Lead) => void;
  handleDeleteLead: (id: string) => void;
  
  setVideoModalUrl: (url: string | null) => void;
  setIsMainPopupOpen: (isOpen: boolean) => void;
  setShowNotification: (show: boolean) => void;

  addToast: (message: string, type: Toast['type']) => void;
  removeToast: (id: number) => void;

  activeNotification: SiteNotification | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [homes, setHomes] = useLocalStorage<HomeDesign[]>('ddhouse_homes', INITIAL_HOMES);
  const [banners, setBanners] = useLocalStorage<Banner[]>('ddhouse_banners', INITIAL_BANNERS);
  const [articles, setArticles] = useLocalStorage<Article[]>('ddhouse_articles', INITIAL_ARTICLES);
  const [customPages, setCustomPages] = useLocalStorage<CustomPage[]>('ddhouse_customPages', INITIAL_CUSTOM_PAGES);
  const [promoCards, setPromoCards] = useLocalStorage<PromoCard[]>('ddhouse_promoCards', INITIAL_PROMO_CARDS);
  const [testimonials, setTestimonials] = useLocalStorage<Testimonial[]>('ddhouse_testimonials', INITIAL_TESTIMONIALS);
  const [portfolioProjects, setPortfolioProjects] = useLocalStorage<PortfolioProject[]>('ddhouse_portfolioProjects', INITIAL_PORTFOLIO_PROJECTS);
  const [notifications, setNotifications] = useLocalStorage<SiteNotification[]>('ddhouse_notifications', INITIAL_NOTIFICATIONS);
  const [popupModalContent, setPopupModalContent] = useLocalStorage<PopupModalContent>('ddhouse_popupModalContent', INITIAL_POPUP_MODAL);
  const [siteInfo, setSiteInfo] = useLocalStorage<SiteInfo>('ddhouse_siteInfo', INITIAL_SITE_INFO);
  const [leads, setLeads] = useLocalStorage<Lead[]>('ddhouse_leads', []);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const [videoModalUrl, setVideoModalUrl] = useState<string | null>(null);
  const [isMainPopupOpen, setIsMainPopupOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    if (popupModalContent.isEnabled) {
      const hasSeenPopup = sessionStorage.getItem('ddhouse_popup_seen');
      if (!hasSeenPopup) {
        setIsMainPopupOpen(true);
        sessionStorage.setItem('ddhouse_popup_seen', 'true');
      }
    }
  }, [popupModalContent.isEnabled]);

  const activeNotification = useMemo(() => notifications.find(n => n.isActive), [notifications]);
  
  const removeToast = useCallback((id: number) => {
    setToasts(currentToasts => currentToasts.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: Toast['type']) => {
    const id = Date.now();
    setToasts(toasts => [...toasts, { id, message, type }]);
    setTimeout(() => removeToast(id), 5000);
  }, [removeToast]);
  
  const handleAddHome = useCallback((newHome: Omit<HomeDesign, 'id'>) => {
    setHomes(prevHomes => [
      { ...newHome, id: `ddh-${Date.now()}` },
      ...prevHomes,
    ]);
    addToast('Home design added successfully!', 'success');
  }, [addToast, setHomes]);

  const handleUpdateHome = useCallback((updatedHome: HomeDesign) => {
    setHomes(prevHomes => 
      prevHomes.map(home => (home.id === updatedHome.id ? updatedHome : home))
    );
    addToast('Home design updated successfully!', 'success');
  }, [addToast, setHomes]);

  const handleDeleteHome = useCallback((id: string) => {
    setHomes(prevHomes => prevHomes.filter(home => home.id !== id));
    addToast('Home design deleted.', 'success');
  }, [addToast, setHomes]);
  
  const handleAddBanner = useCallback((newBanner: Omit<Banner, 'id'>) => {
    setBanners(prevBanners => [
      { ...newBanner, id: `banner-${Date.now()}` },
      ...prevBanners
    ]);
     addToast('Banner added successfully!', 'success');
  }, [addToast, setBanners]);

  const handleUpdateBanner = useCallback((updatedBanner: Banner) => {
    setBanners(prevBanners =>
      prevBanners.map(banner => (banner.id === updatedBanner.id ? updatedBanner : banner))
    );
    addToast('Banner updated successfully!', 'success');
  }, [addToast, setBanners]);

  const handleDeleteBanner = useCallback((id: string) => {
    setBanners(prevBanners => prevBanners.filter(banner => banner.id !== id));
    addToast('Banner deleted.', 'success');
  }, [addToast, setBanners]);

  const handleAddArticle = useCallback((newArticle: Omit<Article, 'id'>) => {
    setArticles(prev => [
      { ...newArticle, id: `art-${Date.now()}` },
      ...prev,
    ]);
    addToast('Article added successfully!', 'success');
  }, [addToast, setArticles]);

  const handleUpdateArticle = useCallback((updatedArticle: Article) => {
    setArticles(prev => 
      prev.map(item => (item.id === updatedArticle.id ? updatedArticle : item))
    );
    addToast('Article updated successfully!', 'success');
  }, [addToast, setArticles]);

  const handleDeleteArticle = useCallback((id: string) => {
    setArticles(prev => prev.filter(item => item.id !== id));
    addToast('Article deleted.', 'success');
  }, [addToast, setArticles]);

  const handleAddCustomPage = useCallback((newPage: Omit<CustomPage, 'id'>) => {
    setCustomPages(prev => [
      { ...newPage, id: `page-${Date.now()}` },
      ...prev,
    ]);
    addToast('Page added successfully!', 'success');
  }, [addToast, setCustomPages]);

  const handleUpdateCustomPage = useCallback((updatedPage: CustomPage) => {
    setCustomPages(prev => 
      prev.map(item => (item.id === updatedPage.id ? updatedPage : item))
    );
    addToast('Page updated successfully!', 'success');
  }, [addToast, setCustomPages]);

  const handleDeleteCustomPage = useCallback((id: string) => {
    setCustomPages(prev => prev.filter(item => item.id !== id));
    addToast('Page deleted.', 'success');
  }, [addToast, setCustomPages]);
  
  const handleAddPromoCard = useCallback((newCard: Omit<PromoCard, 'id'>) => {
    setPromoCards(prev => [
      { ...newCard, id: `promo-${Date.now()}` },
      ...prev,
    ]);
    addToast('Promo card added successfully!', 'success');
  }, [addToast, setPromoCards]);

  const handleUpdatePromoCard = useCallback((updatedCard: PromoCard) => {
    setPromoCards(prev => 
      prev.map(item => (item.id === updatedCard.id ? updatedCard : item))
    );
    addToast('Promo card updated successfully!', 'success');
  }, [addToast, setPromoCards]);

  const handleDeletePromoCard = useCallback((id: string) => {
    setPromoCards(prev => prev.filter(item => item.id !== id));
    addToast('Promo card deleted.', 'success');
  }, [addToast, setPromoCards]);

  const handleAddTestimonial = useCallback((newTestimonial: Omit<Testimonial, 'id'>) => {
    setTestimonials(prev => [
      { ...newTestimonial, id: `test-${Date.now()}` },
      ...prev,
    ]);
    addToast('Testimonial added successfully!', 'success');
  }, [addToast, setTestimonials]);

  const handleUpdateTestimonial = useCallback((updatedTestimonial: Testimonial) => {
    setTestimonials(prev => 
      prev.map(item => (item.id === updatedTestimonial.id ? updatedTestimonial : item))
    );
    addToast('Testimonial updated successfully!', 'success');
  }, [addToast, setTestimonials]);

  const handleDeleteTestimonial = useCallback((id: string) => {
    setTestimonials(prev => prev.filter(item => item.id !== id));
    addToast('Testimonial deleted.', 'success');
  }, [addToast, setTestimonials]);

  const handleAddPortfolioProject = useCallback((newProject: Omit<PortfolioProject, 'id'>) => {
    setPortfolioProjects(prev => [
      { ...newProject, slug: newProject.slug || `proj-${Date.now()}`, id: `proj-${Date.now()}` },
      ...prev,
    ]);
    addToast('Portfolio project added successfully!', 'success');
  }, [addToast, setPortfolioProjects]);

  const handleUpdatePortfolioProject = useCallback((updatedProject: PortfolioProject) => {
    setPortfolioProjects(prev => 
      prev.map(item => (item.id === updatedProject.id ? updatedProject : item))
    );
    addToast('Portfolio project updated successfully!', 'success');
  }, [addToast, setPortfolioProjects]);

  const handleDeletePortfolioProject = useCallback((id: string) => {
    setPortfolioProjects(prev => prev.filter(item => item.id !== id));
    addToast('Portfolio project deleted.', 'success');
  }, [addToast, setPortfolioProjects]);

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
  }, [addToast, setNotifications]);

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
  }, [addToast, setNotifications]);

  const handleDeleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(item => item.id !== id));
    addToast('Notification deleted.', 'success');
  }, [addToast, setNotifications]);

  const handleUpdatePopupModal = useCallback((newContent: PopupModalContent) => {
    setPopupModalContent(newContent);
    addToast('Popup modal settings updated!', 'success');
  }, [addToast, setPopupModalContent]);

  const handleUpdateSiteInfo = useCallback((newInfo: SiteInfo) => {
    setSiteInfo(newInfo);
    addToast('Site info updated!', 'success');
  }, [addToast, setSiteInfo]);

  // FIX: Update handleAddLead to include status and align with new Lead type.
  const handleAddLead = useCallback((newLeadData: Omit<Lead, 'id' | 'timestamp' | 'status' | 'notes'>) => {
    const newLead: Lead = {
      ...newLeadData,
      id: `lead-${Date.now()}`,
      timestamp: new Date(),
      status: 'New',
    };
    setLeads(prevLeads => [newLead, ...prevLeads]);
    addToast('Registration successful! We will be in touch.', 'success');
  }, [addToast, setLeads]);

  // FIX: Add handleUpdateLead to manage lead status and details.
  const handleUpdateLead = useCallback((updatedLead: Lead) => {
    setLeads(prev =>
      prev.map(lead => (lead.id === updatedLead.id ? updatedLead : lead))
    );
    addToast('Lead updated successfully!', 'success');
  }, [addToast, setLeads]);

  // FIX: Add handleDeleteLead to remove leads.
  const handleDeleteLead = useCallback((id: string) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
    addToast('Lead deleted.', 'success');
  }, [addToast, setLeads]);

  const value = {
    homes, banners, articles, customPages, promoCards, testimonials, portfolioProjects, notifications, popupModalContent, siteInfo, leads, toasts,
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
    // FIX: Expose new lead handlers in context.
    handleUpdateLead,
    handleDeleteLead,
    setVideoModalUrl, setIsMainPopupOpen, setShowNotification,
    addToast, removeToast,
    activeNotification,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};