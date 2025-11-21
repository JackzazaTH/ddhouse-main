
import { supabase } from './supabaseClient';
import { HomeDesign, Banner, Article, CustomPage, PromoCard, Testimonial, PortfolioProject, SiteNotification, Lead, SiteInfo, PopupModalContent, LoginLog } from './types';

// Helper to convert Supabase response to our types (handling nulls if necessary)
const handleResponse = async <T>(query: any): Promise<T[] | null> => {
    const { data, error } = await query;
    if (error) {
        console.error('Supabase Error:', error);
        return null;
    }
    return data as T[];
};

// --- HOMES ---
export const fetchHomes = async () => {
    const { data, error } = await supabase.from('homes').select('*').order('created_at', { ascending: false });
    if (error) console.error('Error fetching homes:', error);
    return (data || []) as HomeDesign[];
};

export const upsertHome = async (home: HomeDesign) => {
    return await supabase.from('homes').upsert(home).select();
};

export const deleteHome = async (id: string) => {
    return await supabase.from('homes').delete().eq('id', id);
};

// --- BANNERS ---
export const fetchBanners = async () => {
    const { data, error } = await supabase.from('banners').select('*').order('created_at', { ascending: false });
    if (error) console.error('Error fetching banners:', error);
    return (data || []) as Banner[];
};

export const upsertBanner = async (banner: Banner) => {
    return await supabase.from('banners').upsert(banner).select();
};

export const deleteBanner = async (id: string) => {
    return await supabase.from('banners').delete().eq('id', id);
};

// --- ARTICLES ---
export const fetchArticles = async () => {
    const { data, error } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
    if (error) console.error('Error fetching articles:', error);
    return (data || []) as Article[];
};

export const upsertArticle = async (article: Article) => {
    return await supabase.from('articles').upsert(article).select();
};

export const deleteArticle = async (id: string) => {
    return await supabase.from('articles').delete().eq('id', id);
};

// --- CUSTOM PAGES ---
export const fetchCustomPages = async () => {
    const { data, error } = await supabase.from('custom_pages').select('*').order('order', { ascending: true });
    if (error) console.error('Error fetching pages:', error);
    return (data || []) as CustomPage[];
};

export const upsertCustomPage = async (page: CustomPage) => {
    return await supabase.from('custom_pages').upsert(page).select();
};

export const deleteCustomPage = async (id: string) => {
    return await supabase.from('custom_pages').delete().eq('id', id);
};

// --- PROMO CARDS ---
export const fetchPromoCards = async () => {
    const { data, error } = await supabase.from('promo_cards').select('*').order('order', { ascending: true });
    if (error) console.error('Error fetching promo cards:', error);
    return (data || []) as PromoCard[];
};

export const upsertPromoCard = async (card: PromoCard) => {
    return await supabase.from('promo_cards').upsert(card).select();
};

export const deletePromoCard = async (id: string) => {
    return await supabase.from('promo_cards').delete().eq('id', id);
};

// --- TESTIMONIALS ---
export const fetchTestimonials = async () => {
    const { data, error } = await supabase.from('testimonials').select('*').order('order', { ascending: true });
    if (error) console.error('Error fetching testimonials:', error);
    return (data || []) as Testimonial[];
};

export const upsertTestimonial = async (testimonial: Testimonial) => {
    return await supabase.from('testimonials').upsert(testimonial).select();
};

export const deleteTestimonial = async (id: string) => {
    return await supabase.from('testimonials').delete().eq('id', id);
};

// --- PORTFOLIO ---
export const fetchPortfolioProjects = async () => {
    const { data, error } = await supabase.from('portfolio_projects').select('*').order('created_at', { ascending: false });
    if (error) console.error('Error fetching portfolio:', error);
    return (data || []) as PortfolioProject[];
};

export const upsertPortfolioProject = async (project: PortfolioProject) => {
    return await supabase.from('portfolio_projects').upsert(project).select();
};

export const deletePortfolioProject = async (id: string) => {
    return await supabase.from('portfolio_projects').delete().eq('id', id);
};

// --- NOTIFICATIONS ---
export const fetchNotifications = async () => {
    const { data, error } = await supabase.from('notifications').select('*').order('created_at', { ascending: false });
    if (error) console.error('Error fetching notifications:', error);
    return (data || []) as SiteNotification[];
};

export const upsertNotification = async (notif: SiteNotification) => {
    return await supabase.from('notifications').upsert(notif).select();
};

export const deleteNotification = async (id: string) => {
    return await supabase.from('notifications').delete().eq('id', id);
};

// --- LEADS ---
export const fetchLeads = async () => {
    const { data, error } = await supabase.from('leads').select('*').order('timestamp', { ascending: false });
    if (error) console.error('Error fetching leads:', error);
    
    // Convert timestamp string to Date object for app compatibility
    return (data || []).map((lead: any) => ({
        ...lead,
        timestamp: new Date(lead.timestamp)
    })) as Lead[];
};

export const upsertLead = async (lead: Lead) => {
    const { timestamp, ...rest } = lead;
    // Ensure timestamp is string for DB
    const leadForDb = {
        ...rest,
        timestamp: new Date(timestamp).toISOString() 
    };
    return await supabase.from('leads').upsert(leadForDb).select();
};

export const deleteLead = async (id: string) => {
    return await supabase.from('leads').delete().eq('id', id);
};

// --- SITE INFO (Single Row) ---
export const fetchSiteInfo = async () => {
    const { data, error } = await supabase.from('site_settings').select('*').single();
    if (error && error.code !== 'PGRST116') console.error('Error fetching site info:', error); // PGRST116 is "Row not found" which is ok initially
    return data as SiteInfo | null;
};

export const updateSiteInfo = async (info: SiteInfo) => {
    // Always use a static ID for singleton
    const infoWithId = { ...info, id: 'default_settings' };
    return await supabase.from('site_settings').upsert(infoWithId).select();
};

// --- POPUP MODAL (Single Row) ---
export const fetchPopupModal = async () => {
    const { data, error } = await supabase.from('popup_modals').select('*').single();
    if (error && error.code !== 'PGRST116') console.error('Error fetching popup:', error);
    return data as PopupModalContent | null;
};

export const updatePopupModal = async (content: PopupModalContent) => {
     const contentWithId = { ...content, id: 'default_popup' };
    return await supabase.from('popup_modals').upsert(contentWithId).select();
};

// --- LOGS ---
export const fetchLoginLogs = async () => {
    const { data, error } = await supabase.from('login_logs').select('*').order('timestamp', { ascending: false }).limit(50);
    if (error) console.error('Error fetching logs:', error);
     return (data || []).map((log: any) => ({
        ...log,
        timestamp: new Date(log.timestamp)
    })) as LoginLog[];
};

export const addLoginLog = async (log: LoginLog) => {
     const { timestamp, ...rest } = log;
     const logForDb = {
        ...rest,
        timestamp: new Date(timestamp).toISOString()
    };
    return await supabase.from('login_logs').insert(logForDb);
};
