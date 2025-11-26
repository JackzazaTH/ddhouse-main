
'use client';

import React, { createContext, useState, useCallback, useMemo, useContext, ReactNode, useEffect } from 'react';
// FIX: Import LeadStatus to be used in types.
import { HomeDesign, Banner, Lead, Article, CustomPage, PromoCard, Testimonial, SiteNotification, PopupModalContent, SiteInfo, Toast, PortfolioProject, LeadStatus, LoginLog, CalendarEvent, GalleryAlbum } from '@/lib/types';
import { INITIAL_HOMES, INITIAL_BANNERS, INITIAL_ARTICLES, INITIAL_CUSTOM_PAGES, INITIAL_PROMO_CARDS, INITIAL_TESTIMONIALS, INITIAL_NOTIFICATIONS, INITIAL_POPUP_MODAL, INITIAL_SITE_INFO, INITIAL_PORTFOLIO_PROJECTS, INITIAL_CALENDAR_EVENTS, INITIAL_GALLERY_ALBUMS } from '@/lib/constants';

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
  loginLogs: LoginLog[];
  calendarEvents: CalendarEvent[];
  galleryAlbums: GalleryAlbum[];
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
  handleAddLoginLog: (username: string, status: 'Success' | 'Failed') => void;
  
  handleAddCalendarEvent: (newEvent: Omit<CalendarEvent, 'id'>) => void;
  handleUpdateCalendarEvent: (updatedEvent: CalendarEvent) => void;
  handleDeleteCalendarEvent: (id: string) => void;

  handleAddGalleryAlbum: (newAlbum: Omit<GalleryAlbum, 'id'>) => void;
  handleUpdateGalleryAlbum: (updatedAlbum: GalleryAlbum) => void;
  handleDeleteGalleryAlbum: (id: string) => void;

  setVideoModalUrl: (url: string | null) => void;
  setIsMainPopupOpen: (isOpen: boolean) => void;
  setShowNotification: (show: boolean) => void;

  addToast: (message: string, type: Toast['type']) => void;
  removeToast: (id: number) => void;

  activeNotification: SiteNotification | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [homes, setHomes] = useState<HomeDesign[]>(INITIAL_HOMES);
  const [banners, setBanners] = useState<Banner[]>(INITIAL_BANNERS);
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  
  // Initialize with default, but will try to load from localStorage in useEffect
  const [customPages, setCustomPages] = useState<CustomPage[]>(INITIAL_CUSTOM_PAGES);
  
  const [promoCards, setPromoCards] = useState<PromoCard[]>(INITIAL_PROMO_CARDS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>(INITIAL_PORTFOLIO_PROJECTS);
  const [notifications, setNotifications] = useState<SiteNotification[]>(INITIAL_NOTIFICATIONS);
  const [popupModalContent, setPopupModalContent] = useState<PopupModalContent>(INITIAL_POPUP_MODAL);
  const [siteInfo, setSiteInfo] = useState<SiteInfo>(INITIAL_SITE_INFO);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loginLogs, setLoginLogs] = useState<LoginLog[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(INITIAL_CALENDAR_EVENTS);
  const [galleryAlbums, setGalleryAlbums] = useState<GalleryAlbum[]>(INITIAL_GALLERY_ALBUMS);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const [videoModalUrl, setVideoModalUrl] = useState<string | null>(null);
  const [isMainPopupOpen, setIsMainPopupOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load Custom Pages from LocalStorage on mount to fix persistence issue
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPages = localStorage.getItem('ddhouse_custom_pages');
      if (storedPages) {
        try {
          const parsedPages = JSON.parse(storedPages);
          // Merge with initial pages to ensure system pages (calendar, gallery) exist
          const initialSlugs = INITIAL_CUSTOM_PAGES.map(p => p.slug);
          const mergedPages = [...parsedPages];
          INITIAL_CUSTOM_PAGES.forEach(p => {
              if (!mergedPages.find(mp => mp.slug === p.slug)) {
                  mergedPages.push(p);
              }
          });
          setCustomPages(mergedPages);
        } catch (e) {
          console.error("Failed to load pages from storage", e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Save Custom Pages to LocalStorage whenever they change
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('ddhouse_custom_pages', JSON.stringify(customPages));
    }
  }, [customPages, isLoaded]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (popupModalContent.isEnabled) {
        const hasSeenPopup = sessionStorage.getItem('ddhouse_popup_seen');
        if (!hasSeenPopup) {
          setIsMainPopupOpen(true);
          sessionStorage.setItem('ddhouse_popup_seen', 'true');
        }
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [popupModalContent]);

  const activeNotification = useMemo(() => notifications.find(n => n.isActive), [notifications]);
  
  const removeToast = useCallback((id: number) => {
    setToasts(currentToasts => currentToasts.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: Toast['type']) => {
    const id = Date.now();
    setToasts(toasts => [...toasts, { id, message, type }]);
  }, []);
  
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
    const pageWithId = { ...newPage, id: `page-${Date.now()}` };
    setCustomPages(prev => [
      ...prev,
      pageWithId,
    ]);
    addToast('Page created successfully! Check the "Service" menu.', 'success');
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
  }, [addToast]);

  // FIX: Add handleUpdateLead to manage lead status and details.
  const handleUpdateLead = useCallback((updatedLead: Lead) => {
    setLeads(prev =>
      prev.map(lead => (lead.id === updatedLead.id ? updatedLead : lead))
    );
    addToast('Lead updated successfully!', 'success');
  }, [addToast]);

  // FIX: Add handleDeleteLead to remove leads.
  const handleDeleteLead = useCallback((id: string) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
    addToast('Lead deleted.', 'success');
  }, [addToast]);

  const handleAddLoginLog = useCallback((username: string, status: 'Success' | 'Failed') => {
    const newLog: LoginLog = {
      id: `log-${Date.now()}`,
      username,
      timestamp: new Date(),
      status,
      ip: '127.0.0.1' // Simulated IP since we are client-side only
    };
    setLoginLogs(prev => [newLog, ...prev]);
  }, []);

  const handleAddCalendarEvent = useCallback((newEvent: Omit<CalendarEvent, 'id'>) => {
    setCalendarEvents(prev => [
      { ...newEvent, id: `ev-${Date.now()}` },
      ...prev
    ]);
    addToast('Event added!', 'success');
  }, [addToast]);

  const handleUpdateCalendarEvent = useCallback((updatedEvent: CalendarEvent) => {
    setCalendarEvents(prev => prev.map(ev => ev.id === updatedEvent.id ? updatedEvent : ev));
    addToast('Event updated!', 'success');
  }, [addToast]);

  const handleDeleteCalendarEvent = useCallback((id: string) => {
    setCalendarEvents(prev => prev.filter(ev => ev.id !== id));
    addToast('Event deleted.', 'success');
  }, [addToast]);

  const handleAddGalleryAlbum = useCallback((newAlbum: Omit<GalleryAlbum, 'id'>) => {
    setGalleryAlbums(prev => [
      { ...newAlbum, id: `album-${Date.now()}` },
      ...prev
    ]);
    addToast('Album added!', 'success');
  }, [addToast]);

  const handleUpdateGalleryAlbum = useCallback((updatedAlbum: GalleryAlbum) => {
    setGalleryAlbums(prev => prev.map(a => a.id === updatedAlbum.id ? updatedAlbum : a));
    addToast('Album updated!', 'success');
  }, [addToast]);

  const handleDeleteGalleryAlbum = useCallback((id: string) => {
    setGalleryAlbums(prev => prev.filter(a => a.id !== id));
    addToast('Album deleted.', 'success');
  }, [addToast]);

  const value = {
    homes, banners, articles, customPages, promoCards, testimonials, portfolioProjects, notifications, popupModalContent, siteInfo, leads, loginLogs, calendarEvents, galleryAlbums, toasts,
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
    handleAddLoginLog,
    handleAddCalendarEvent, handleUpdateCalendarEvent, handleDeleteCalendarEvent,
    handleAddGalleryAlbum, handleUpdateGalleryAlbum, handleDeleteGalleryAlbum,
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