// FIX: Add a shared View type to be used across the application.
export type View = 'list' | 'detail' | 'admin' | 'articles' | 'articleDetail' | 'designs' | 'customPage' | 'portfolio' | 'portfolioDetail';

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
}

export interface Banner {
  id: string;
  imageUrl: string;
}

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
  seo?: SEOData;
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
  line: string;
  tiktok: string;
  instagram: string;
}

export interface SiteInfo {
  phone: string;
  socials: SocialLinks;
  promoFormImageUrl: string;
}

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}
