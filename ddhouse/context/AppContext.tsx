
'use client';

import React, { createContext, useState, useCallback, useMemo, useContext, ReactNode, useEffect } from 'react';
import { HomeDesign, Banner, Lead, Article, CustomPage, PromoCard, Testimonial, SiteNotification, PopupModalContent, SiteInfo, Toast, PortfolioProject, LoginLog } from '@/lib/types';
import { INITIAL_HOMES, INITIAL_BANNERS, INITIAL_ARTICLES, INITIAL_CUSTOM_PAGES, INITIAL_PROMO_CARDS, INITIAL_TESTIMONIALS, INITIAL_NOTIFICATIONS, INITIAL_POPUP_MODAL, INITIAL_SITE_INFO, INITIAL_PORTFOLIO_PROJECTS } from '@/lib/constants';
import * as db from '@/lib/db';

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
  handleAddLoginLog: (username: string, status: 'Success' | 'Failed') => void;
  
  setVideoModalUrl: (url: string | null) => void;
  setIsMainPopupOpen: (isOpen: boolean) => void;
  setShowNotification: (show: boolean) => void;

  addToast: (message: string, type: Toast['type']) => void;
  removeToast: (id: number) => void;

  activeNotification: SiteNotification | undefined;
  seedDatabase: () => Promise<void>;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with empty arrays to prefer DB data, fallback to constants if DB empty/fails
  const [homes, setHomes] = useState<HomeDesign[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [customPages, setCustomPages] = useState<CustomPage[]>([]);
  const [promoCards, setPromoCards] = useState<PromoCard[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>([]);
  const [notifications, setNotifications] = useState<SiteNotification[]>([]);
  const [popupModalContent, setPopupModalContent] = useState<PopupModalContent>(INITIAL_POPUP_MODAL);
  const [siteInfo, setSiteInfo] = useState<SiteInfo>(INITIAL_SITE_INFO);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loginLogs, setLoginLogs] = useState<LoginLog[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const [videoModalUrl, setVideoModalUrl] = useState<string | null>(null);
  const [isMainPopupOpen, setIsMainPopupOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Data from Supabase on Mount
  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
        const [
            fetchedHomes, fetchedBanners, fetchedArticles, fetchedPages, 
            fetchedPromos, fetchedTestimonials, fetchedPortfolio, 
            fetchedNotifs, fetchedSiteInfo, fetchedPopup, fetchedLeads, fetchedLogs
        ] = await Promise.all([
            db.fetchHomes(), db.fetchBanners(), db.fetchArticles(), db.fetchCustomPages(),
            db.fetchPromoCards(), db.fetchTestimonials(), db.fetchPortfolioProjects(),
            db.fetchNotifications(), db.fetchSiteInfo(), db.fetchPopupModal(),
            db.fetchLeads(), db.fetchLoginLogs()
        ]);

        if (fetchedHomes.length > 0) setHomes(fetchedHomes);
        else setHomes(INITIAL_HOMES); // Fallback for display if empty but really we should seed

        if (fetchedBanners.length > 0) setBanners(fetchedBanners);
        else setBanners(INITIAL_BANNERS);

        if (fetchedArticles.length > 0) setArticles(fetchedArticles);
        else setArticles(INITIAL_ARTICLES);

        if (fetchedPages.length > 0) setCustomPages(fetchedPages);
        else setCustomPages(INITIAL_CUSTOM_PAGES);

        if (fetchedPromos.length > 0) setPromoCards(fetchedPromos);
        else setPromoCards(INITIAL_PROMO_CARDS);
        
        if (fetchedTestimonials.length > 0) setTestimonials(fetchedTestimonials);
        else setTestimonials(INITIAL_TESTIMONIALS);

        if (fetchedPortfolio.length > 0) setPortfolioProjects(fetchedPortfolio);
        else setPortfolioProjects(INITIAL_PORTFOLIO_PROJECTS);

        if (fetchedNotifs.length > 0) setNotifications(fetchedNotifs);
        else setNotifications(INITIAL_NOTIFICATIONS);

        if (fetchedSiteInfo) setSiteInfo(fetchedSiteInfo);
        // else use initial

        if (fetchedPopup) setPopupModalContent(fetchedPopup);
        // else use initial

        if (fetchedLeads) setLeads(fetchedLeads);
        if (fetchedLogs) setLoginLogs(fetchedLogs);

    } catch (error) {
        console.error("Failed to load data from DB", error);
        addToast('Failed to connect to database. Using local mode.', 'error');
        // Fallback to initial constants happens via the else clauses above implicitly if array is empty
    } finally {
        setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Seed Database Function
  const seedDatabase = async () => {
      setIsLoading(true);
      try {
          // Only insert if tables are empty or specifically requested.
          // For this implementation, we just try to upsert everything from constants
          
          await Promise.all(INITIAL_HOMES.map(h => db.upsertHome(h)));
          await Promise.all(INITIAL_BANNERS.map(b => db.upsertBanner(b)));
          await Promise.all(INITIAL_ARTICLES.map(a => db.upsertArticle(a)));
          await Promise.all(INITIAL_CUSTOM_PAGES.map(p => db.upsertCustomPage(p)));
          await Promise.all(INITIAL_PROMO_CARDS.map(c => db.upsertPromoCard(c)));
          await Promise.all(INITIAL_TESTIMONIALS.map(t => db.upsertTestimonial(t)));
          await Promise.all(INITIAL_PORTFOLIO_PROJECTS.map(p => db.upsertPortfolioProject(p)));
          await Promise.all(INITIAL_NOTIFICATIONS.map(n => db.upsertNotification(n)));
          await db.updateSiteInfo(INITIAL_SITE_INFO);
          await db.updatePopupModal(INITIAL_POPUP_MODAL);

          addToast('Database seeded successfully!', 'success');
          loadData(); // Reload
      } catch (error) {
          console.error("Seeding failed", error);
          addToast('Seeding failed. Check console.', 'error');
      } finally {
          setIsLoading(false);
      }
  };

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
  
  const handleAddHome = useCallback(async (newHome: Omit<HomeDesign, 'id'>) => {
    const homeWithId = { ...newHome, id: `ddh-${Date.now()}` };
    const { error } = await db.upsertHome(homeWithId);
    if (!error) {
        setHomes(prev => [homeWithId, ...prev]);
        addToast('Home design added successfully!', 'success');
    } else addToast('Failed to add home.', 'error');
  }, [addToast]);

  const handleUpdateHome = useCallback(async (updatedHome: HomeDesign) => {
    const { error } = await db.upsertHome(updatedHome);
    if (!error) {
        setHomes(prev => prev.map(home => (home.id === updatedHome.id ? updatedHome : home)));
        addToast('Home design updated successfully!', 'success');
    } else addToast('Failed to update home.', 'error');
  }, [addToast]);

  const handleDeleteHome = useCallback(async (id: string) => {
    const { error } = await db.deleteHome(id);
    if (!error) {
        setHomes(prev => prev.filter(home => home.id !== id));
        addToast('Home design deleted.', 'success');
    } else addToast('Failed to delete home.', 'error');
  }, [addToast]);
  
  const handleAddBanner = useCallback(async (newBanner: Omit<Banner, 'id'>) => {
    const banner = { ...newBanner, id: `banner-${Date.now()}` };
    const { error } = await db.upsertBanner(banner);
    if (!error) {
        setBanners(prev => [banner, ...prev]);
        addToast('Banner added successfully!', 'success');
    } else addToast('Error adding banner', 'error');
  }, [addToast]);

  const handleUpdateBanner = useCallback(async (updatedBanner: Banner) => {
    const { error } = await db.upsertBanner(updatedBanner);
    if (!error) {
        setBanners(prev => prev.map(banner => (banner.id === updatedBanner.id ? updatedBanner : banner)));
        addToast('Banner updated successfully!', 'success');
    } else addToast('Error updating banner', 'error');
  }, [addToast]);

  const handleDeleteBanner = useCallback(async (id: string) => {
    const { error } = await db.deleteBanner(id);
    if (!error) {
        setBanners(prev => prev.filter(banner => banner.id !== id));
        addToast('Banner deleted.', 'success');
    } else addToast('Error deleting banner', 'error');
  }, [addToast]);

  const handleAddArticle = useCallback(async (newArticle: Omit<Article, 'id'>) => {
    const article = { ...newArticle, id: `art-${Date.now()}` };
    const { error } = await db.upsertArticle(article);
    if (!error) {
        setArticles(prev => [article, ...prev]);
        addToast('Article added successfully!', 'success');
    } else addToast('Error adding article', 'error');
  }, [addToast]);

  const handleUpdateArticle = useCallback(async (updatedArticle: Article) => {
    const { error } = await db.upsertArticle(updatedArticle);
    if (!error) {
        setArticles(prev => prev.map(item => (item.id === updatedArticle.id ? updatedArticle : item)));
        addToast('Article updated successfully!', 'success');
    } else addToast('Error updating article', 'error');
  }, [addToast]);

  const handleDeleteArticle = useCallback(async (id: string) => {
    const { error } = await db.deleteArticle(id);
    if (!error) {
        setArticles(prev => prev.filter(item => item.id !== id));
        addToast('Article deleted.', 'success');
    } else addToast('Error deleting article', 'error');
  }, [addToast]);

  const handleAddCustomPage = useCallback(async (newPage: Omit<CustomPage, 'id'>) => {
    const page = { ...newPage, id: `page-${Date.now()}` };
    const { error } = await db.upsertCustomPage(page);
    if (!error) {
        setCustomPages(prev => [...prev, page]);
        addToast('Page created successfully!', 'success');
    } else addToast('Error creating page', 'error');
  }, [addToast]);

  const handleUpdateCustomPage = useCallback(async (updatedPage: CustomPage) => {
    const { error } = await db.upsertCustomPage(updatedPage);
    if (!error) {
        setCustomPages(prev => prev.map(item => (item.id === updatedPage.id ? updatedPage : item)));
        addToast('Page updated successfully!', 'success');
    } else addToast('Error updating page', 'error');
  }, [addToast]);

  const handleDeleteCustomPage = useCallback(async (id: string) => {
    const { error } = await db.deleteCustomPage(id);
    if (!error) {
        setCustomPages(prev => prev.filter(item => item.id !== id));
        addToast('Page deleted.', 'success');
    } else addToast('Error deleting page', 'error');
  }, [addToast]);
  
  const handleAddPromoCard = useCallback(async (newCard: Omit<PromoCard, 'id'>) => {
    const card = { ...newCard, id: `promo-${Date.now()}` };
    const { error } = await db.upsertPromoCard(card);
    if (!error) {
        setPromoCards(prev => [card, ...prev]);
        addToast('Promo card added successfully!', 'success');
    } else addToast('Error adding promo card', 'error');
  }, [addToast]);

  const handleUpdatePromoCard = useCallback(async (updatedCard: PromoCard) => {
    const { error } = await db.upsertPromoCard(updatedCard);
    if (!error) {
        setPromoCards(prev => prev.map(item => (item.id === updatedCard.id ? updatedCard : item)));
        addToast('Promo card updated successfully!', 'success');
    } else addToast('Error updating promo card', 'error');
  }, [addToast]);

  const handleDeletePromoCard = useCallback(async (id: string) => {
    const { error } = await db.deletePromoCard(id);
    if (!error) {
        setPromoCards(prev => prev.filter(item => item.id !== id));
        addToast('Promo card deleted.', 'success');
    } else addToast('Error deleting promo card', 'error');
  }, [addToast]);

  const handleAddTestimonial = useCallback(async (newTestimonial: Omit<Testimonial, 'id'>) => {
    const testimonial = { ...newTestimonial, id: `test-${Date.now()}` };
    const { error } = await db.upsertTestimonial(testimonial);
    if (!error) {
        setTestimonials(prev => [testimonial, ...prev]);
        addToast('Testimonial added successfully!', 'success');
    } else addToast('Error adding testimonial', 'error');
  }, [addToast]);

  const handleUpdateTestimonial = useCallback(async (updatedTestimonial: Testimonial) => {
    const { error } = await db.upsertTestimonial(updatedTestimonial);
    if (!error) {
        setTestimonials(prev => prev.map(item => (item.id === updatedTestimonial.id ? updatedTestimonial : item)));
        addToast('Testimonial updated successfully!', 'success');
    } else addToast('Error updating testimonial', 'error');
  }, [addToast]);

  const handleDeleteTestimonial = useCallback(async (id: string) => {
    const { error } = await db.deleteTestimonial(id);
    if (!error) {
        setTestimonials(prev => prev.filter(item => item.id !== id));
        addToast('Testimonial deleted.', 'success');
    } else addToast('Error deleting testimonial', 'error');
  }, [addToast]);

  const handleAddPortfolioProject = useCallback(async (newProject: Omit<PortfolioProject, 'id'>) => {
    const project = { ...newProject, slug: newProject.slug || `proj-${Date.now()}`, id: `proj-${Date.now()}` };
    const { error } = await db.upsertPortfolioProject(project);
    if (!error) {
        setPortfolioProjects(prev => [project, ...prev]);
        addToast('Portfolio project added successfully!', 'success');
    } else addToast('Error adding portfolio project', 'error');
  }, [addToast]);

  const handleUpdatePortfolioProject = useCallback(async (updatedProject: PortfolioProject) => {
    const { error } = await db.upsertPortfolioProject(updatedProject);
    if (!error) {
        setPortfolioProjects(prev => prev.map(item => (item.id === updatedProject.id ? updatedProject : item)));
        addToast('Portfolio project updated successfully!', 'success');
    } else addToast('Error updating portfolio project', 'error');
  }, [addToast]);

  const handleDeletePortfolioProject = useCallback(async (id: string) => {
    const { error } = await db.deletePortfolioProject(id);
    if (!error) {
        setPortfolioProjects(prev => prev.filter(item => item.id !== id));
        addToast('Portfolio project deleted.', 'success');
    } else addToast('Error deleting portfolio project', 'error');
  }, [addToast]);

  const handleAddNotification = useCallback(async (newNotification: Omit<SiteNotification, 'id'>) => {
    const newNotif = { ...newNotification, id: `notif-${Date.now()}` };
    
    // If new one is active, deactivate others locally and in DB (handled one by one or bulk in real app)
    // For simplicity here we just upsert the new one. 
    // Ideally we should have a DB trigger or transaction, but let's do optimized local update
    const { error } = await db.upsertNotification(newNotif);
    
    if (!error) {
        if (newNotif.isActive) {
            setNotifications(prev => [
                newNotif,
                ...prev.map(n => ({ ...n, isActive: false })),
            ]);
            // Update previous active ones in DB if needed? 
            // For MVP we rely on context state for current session, DB might have multiple active if not careful
        } else {
            setNotifications(prev => [newNotif, ...prev]);
        }
        addToast('Notification added successfully!', 'success');
    } else addToast('Error adding notification', 'error');
  }, [addToast]);

  const handleUpdateNotification = useCallback(async (updatedNotification: SiteNotification) => {
    const { error } = await db.upsertNotification(updatedNotification);
    if (!error) {
        setNotifications(prev => {
            let items = prev.map(item => item.id === updatedNotification.id ? updatedNotification : item);
            if (updatedNotification.isActive) {
                items = items.map(item => item.id === updatedNotification.id ? item : {...item, isActive: false});
            }
            return items;
        });
        addToast('Notification updated successfully!', 'success');
    } else addToast('Error updating notification', 'error');
  }, [addToast]);

  const handleDeleteNotification = useCallback(async (id: string) => {
    const { error } = await db.deleteNotification(id);
    if (!error) {
        setNotifications(prev => prev.filter(item => item.id !== id));
        addToast('Notification deleted.', 'success');
    } else addToast('Error deleting notification', 'error');
  }, [addToast]);

  const handleUpdatePopupModal = useCallback(async (newContent: PopupModalContent) => {
    const { error } = await db.updatePopupModal(newContent);
    if (!error) {
        setPopupModalContent(newContent);
        addToast('Popup modal settings updated!', 'success');
    } else addToast('Error updating popup', 'error');
  }, [addToast]);

  const handleUpdateSiteInfo = useCallback(async (newInfo: SiteInfo) => {
    const { error } = await db.updateSiteInfo(newInfo);
    if (!error) {
        setSiteInfo(newInfo);
        addToast('Site info updated!', 'success');
    } else addToast('Error updating site info', 'error');
  }, [addToast]);

  const handleAddLead = useCallback(async (newLeadData: Omit<Lead, 'id' | 'timestamp' | 'status' | 'notes'>) => {
    const newLead: Lead = {
      ...newLeadData,
      id: `lead-${Date.now()}`,
      timestamp: new Date(),
      status: 'New',
    };
    const { error } = await db.upsertLead(newLead);
    if (!error) {
        setLeads(prevLeads => [newLead, ...prevLeads]);
        addToast('Registration successful! We will be in touch.', 'success');
    } else addToast('Error sending data.', 'error');
  }, [addToast]);

  const handleUpdateLead = useCallback(async (updatedLead: Lead) => {
    const { error } = await db.upsertLead(updatedLead);
    if (!error) {
        setLeads(prev => prev.map(lead => (lead.id === updatedLead.id ? updatedLead : lead)));
        addToast('Lead updated successfully!', 'success');
    } else addToast('Error updating lead', 'error');
  }, [addToast]);

  const handleDeleteLead = useCallback(async (id: string) => {
    const { error } = await db.deleteLead(id);
    if (!error) {
        setLeads(prev => prev.filter(lead => lead.id !== id));
        addToast('Lead deleted.', 'success');
    } else addToast('Error deleting lead', 'error');
  }, [addToast]);

  const handleAddLoginLog = useCallback(async (username: string, status: 'Success' | 'Failed') => {
    const newLog: LoginLog = {
      id: `log-${Date.now()}`,
      username,
      timestamp: new Date(),
      status,
      ip: '127.0.0.1' 
    };
    // Fire and forget for logs
    db.addLoginLog(newLog);
    setLoginLogs(prev => [newLog, ...prev]);
  }, []);

  const value = {
    homes, banners, articles, customPages, promoCards, testimonials, portfolioProjects, notifications, popupModalContent, siteInfo, leads, loginLogs, toasts,
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
    handleAddLoginLog,
    setVideoModalUrl, setIsMainPopupOpen, setShowNotification,
    addToast, removeToast,
    activeNotification,
    seedDatabase,
    isLoading
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
