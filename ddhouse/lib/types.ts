
// FIX: Add a shared View type to be used across the application.
export type View = 'list' | 'detail' | 'admin' | 'articles' | 'articleDetail' | 'designs' | 'customPage' | 'portfolio' | 'portfolioDetail' | 'calendar' | 'gallery';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

export interface HomeDesign {
  id: string;
  name: string;
  description: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  isFeatured: boolean;
  seo?: SEOData;
  parking?: number;
  price_popular_original?: number;
  price_popular_discounted?: number;
  price_signature_original?: number;
  price_signature_discounted?: number;
  discount_percentage?: number;
  promotion_enabled?: boolean;
  style?: string; // New field
  dimensions?: string; // New field: e.g., "15.5 x 18.0 ม."
}

export interface Banner {
  id: string;
  imageUrl: string;
}

export type LeadStatus = 'New' | 'Contacted' | 'Follow-up' | 'Closed';

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  landSize: number;
  province: string;
  district: string;
  budget: number;
  constructionDate: string;
  timestamp: Date;
  status: LeadStatus;
  notes?: string;
}

export interface LoginLog {
  id: string;
  username: string;
  timestamp: Date;
  status: 'Success' | 'Failed';
  ip?: string; // Optional simulation of IP
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  publishedDate: string;
  tags?: string[];
  seo?: SEOData;
}

export interface CustomPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  imageUrl?: string;
  seo?: SEOData;
  menuLocation: 'primary' | 'service_submenu' | 'none'; // New field for menu placement
  order: number; // New field for sorting
}

export interface PromoCard {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  linkType: 'page' | 'view' | 'url';
  linkValue: string;
  size: '1x1' | '2x1' | '3x1';
  order: number;
}

export interface Testimonial {
  id:string;
  title: string;
  imageUrl: string;
  videoUrl: string;
  order: number;
  isFeatured: boolean;
}

// FIX: Add PortfolioProject interface to support portfolio management in the Admin Panel.
export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: 'บ้านชั้นเดียว' | 'บ้านสองชั้น' | 'สไตล์โมเดิร์น' | 'สไตล์ร่วมสมัย';
  coverImage: string;
  images: string[];
  description: string;
  location: string;
  area: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  type: 'construction' | 'handover' | 'holiday' | 'meeting';
  description?: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  description?: string;
  coverImage: string;
  images: string[];
  date: string;
}

// FIX: Added missing PromotionSlide interface.
export interface PromotionSlide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface SiteNotification {
  id: string;
  message: string;
  isActive: boolean;
  link?: string;
  linkLabel?: string;
}

export interface PopupModalContent {
  id: string;
  isEnabled: boolean;
  imageUrl: string;
  title: string;
  description: string;
  ctaText: string;
  linkType: 'page' | 'view' | 'url';
  linkValue: string;
}

export interface SocialLinks {
  facebook: string;
  youtube: string;
  tiktok: string;
  line: string;
  whatsapp: string;
}

export interface ButtonLabels {
  viewAllHomes: string;
  viewAllArticles: string;
  viewAllTestimonials: string;
}

export interface GlobalSEO {
  titleTemplate: string;
  defaultDescription: string;
  defaultKeywords: string;
}

export interface ServiceArea {
  title: string;
  content: string;
}

export interface SiteInfo {
  siteName: string;
  siteTagline: string;
  logoUrl?: string;
  phone: string;
  officeHours: string;
  socials: SocialLinks;
  promoFormImageUrl: string;
  buttonLabels: ButtonLabels;
  globalSeo: GlobalSEO;
  serviceArea: ServiceArea;
}

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}
