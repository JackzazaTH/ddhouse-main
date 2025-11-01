import { HomeDesign, Banner, Article, CustomPage, PromoCard, Testimonial, SiteNotification, PopupModalContent, SiteInfo, PortfolioProject } from '@/lib/types';
import { INITIAL_HOMES, INITIAL_BANNERS, INITIAL_ARTICLES, INITIAL_CUSTOM_PAGES, INITIAL_PROMO_CARDS, INITIAL_TESTIMONIALS, INITIAL_NOTIFICATIONS, INITIAL_POPUP_MODAL, INITIAL_SITE_INFO, INITIAL_PORTFOLIO_PROJECTS } from '@/lib/constants';

const SIMULATED_DELAY = 500; // ms

const fetchData = <T>(data: T): Promise<T> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(data);
        }, SIMULATED_DELAY);
    });
};

export const getHomes = (): Promise<HomeDesign[]> => fetchData(INITIAL_HOMES);
export const getBanners = (): Promise<Banner[]> => fetchData(INITIAL_BANNERS);
export const getArticles = (): Promise<Article[]> => fetchData(INITIAL_ARTICLES);
export const getCustomPages = (): Promise<CustomPage[]> => fetchData(INITIAL_CUSTOM_PAGES);
export const getPromoCards = (): Promise<PromoCard[]> => fetchData(INITIAL_PROMO_CARDS);
export const getTestimonials = (): Promise<Testimonial[]> => fetchData(INITIAL_TESTIMONIALS);
export const getPortfolioProjects = (): Promise<PortfolioProject[]> => fetchData(INITIAL_PORTFOLIO_PROJECTS);
export const getNotifications = (): Promise<SiteNotification[]> => fetchData(INITIAL_NOTIFICATIONS);
export const getPopupModalContent = (): Promise<PopupModalContent> => fetchData(INITIAL_POPUP_MODAL);
export const getSiteInfo = (): Promise<SiteInfo> => fetchData(INITIAL_SITE_INFO);
