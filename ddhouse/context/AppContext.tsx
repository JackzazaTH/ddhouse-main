'use client';

import React, { createContext, useState, useCallback, useMemo, useContext, ReactNode, useEffect } from 'react';
import { HomeDesign, Banner, Lead, Article, CustomPage, PromoCard, Testimonial, SiteNotification, PopupModalContent, SiteInfo, Toast, PortfolioProject, LeadStatus } from '@/lib/types';

interface AppContextType {
  homes: HomeDesign[];
  banners: Banner[];
  articles: Article[];
  customPages: CustomPage[];
  promoCards: PromoCard[];
  testimonials: Testimonial[];
  portfolioProjects: PortfolioProject[];
  notifications: SiteNotification[];
  popupModalContent: PopupModalContent | null; // Can be null until loaded
  siteInfo: SiteInfo | null; // Can be null until loaded
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

  // Fetch all initial data from the database via the API
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await fetch('/api/all-data');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setHomes(data.homes);
        setBanners(data.banners);
        setArticles(data.articles);
        setCustomPages(data.customPages);
        setPromoCards(data.promoCards);
        setTestimonials(data.testimonials);
        setPortfolioProjects(data.portfolioProjects);
        setNotifications(data.notifications);
        setPopupModalContent(data.popupModalContent);
        setSiteInfo(data.siteInfo);
        setLeads(data.leads);
      } catch (error) {
        console.error("Could not fetch initial data:", error);
        addToast("Failed to load site data. Please try refreshing.", "error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, []);

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
  
  const removeToast = useCallback((id: number) => {
    setToasts(currentToasts => currentToasts.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: Toast['type']) => {
    const id = Date.now();
    setToasts(toasts => [...toasts, { id, message, type }]);
  }, []);
  
  // --- REFACTORED CRUD OPERATIONS ---

  const handleAddHome = useCallback(async (newHome: Omit<HomeDesign, 'id'>) => {
    try {
      const response = await fetch('/api/homes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newHome),
      });
      if (!response.ok) throw new Error('Failed to add home');
      const createdHome = await response.json();
      setHomes(prevHomes => [createdHome, ...prevHomes]);
      addToast('Home design added successfully!', 'success');
    } catch (error) {
      addToast('Error adding home design.', 'error');
    }
  }, [addToast]);

  const handleUpdateHome = useCallback(async (updatedHome: HomeDesign) => {
     try {
      const response = await fetch(`/api/homes/${updatedHome.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedHome),
      });
      if (!response.ok) throw new Error('Failed to update home');
      const savedHome = await response.json();
      setHomes(prevHomes => prevHomes.map(home => (home.id === savedHome.id ? savedHome : home)));
      addToast('Home design updated successfully!', 'success');
    } catch (error) {
      addToast('Error updating home design.', 'error');
    }
  }, [addToast]);

  const handleDeleteHome = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/homes/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete home');
      setHomes(prevHomes => prevHomes.filter(home => home.id !== id));
      addToast('Home design deleted.', 'success');
    } catch (error) {
      addToast('Error deleting home design.', 'error');
    }
  }, [addToast]);

  const handleAddLead = useCallback(async (newLeadData: Omit<Lead, 'id' | 'timestamp' | 'status' | 'notes'>) => {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLeadData),
      });
      if (!response.ok) throw new Error('Failed to submit lead');
      const createdLead = await response.json();
      setLeads(prevLeads => [createdLead, ...prevLeads]);
      addToast('Registration successful! We will be in touch.', 'success');
    } catch (error) {
      addToast('Error submitting registration.', 'error');
    }
  }, [addToast]);

  const handleUpdateLead = useCallback(async (updatedLead: Lead) => {
    try {
      const response = await fetch(`/api/leads/${updatedLead.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedLead),
      });
      if (!response.ok) throw new Error('Failed to update lead');
      const savedLead = await response.json();
      setLeads(prev => prev.map(lead => (lead.id === savedLead.id ? savedLead : lead)));
      addToast('Lead updated successfully!', 'success');
    } catch (error) {
      addToast('Error updating lead.', 'error');
    }
  }, [addToast]);

  const handleDeleteLead = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete lead');
      setLeads(prev => prev.filter(lead => lead.id !== id));
      addToast('Lead deleted.', 'success');
    } catch (error) {
      addToast('Error deleting lead.', 'error');
    }
  }, [addToast]);

  // --- PLACEHOLDER CRUD OPERATIONS ---
  // NOTE: The following handlers still manipulate local state.
  // In a real application, they should be refactored to use API calls
  // similar to handleAddHome, handleUpdateHome, etc.
  
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