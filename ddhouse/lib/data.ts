import { sql } from '@vercel/postgres';
import {
  HomeDesign,
  Banner,
  Article,
  CustomPage,
  PromoCard,
  Testimonial,
  SiteNotification,
  PopupModalContent,
  SiteInfo,
  PortfolioProject,
  Lead
} from './types';
import { unstable_noStore as noStore } from 'next/cache';

// Helper to cast row data to a specific type
function cast<T>(data: any): T {
    return data as T;
}

export async function fetchHomes() {
  noStore();
  try {
    const data = await sql<HomeDesign>`
      SELECT 
        id, name, description, area, bedrooms, bathrooms, images, is_featured AS "isFeatured", seo, parking,
        price_popular_original AS "price_popular_original",
        price_popular_discounted AS "price_popular_discounted",
        price_signature_original AS "price_signature_original",
        price_signature_discounted AS "price_signature_discounted",
        discount_percentage AS "discount_percentage",
        promotion_enabled AS "promotion_enabled"
      FROM homes ORDER BY name ASC`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch homes data.');
  }
}

export async function fetchBanners() {
    noStore();
    try {
        const data = await sql`SELECT id, image_url AS "imageUrl" FROM banners`;
        return cast<Banner[]>(data.rows);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch banners data.');
    }
}

export async function fetchArticles() {
    noStore();
    try {
        const data = await sql`
            SELECT 
                id, slug, title, content, excerpt, image_url AS "imageUrl", author, 
                published_date AS "publishedDate", tags, seo
            FROM articles ORDER BY published_date DESC
        `;
        return cast<Article[]>(data.rows);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch articles data.');
    }
}

export async function fetchCustomPages() {
    noStore();
    try {
        const data = await sql`SELECT id, slug, title, content, seo FROM custom_pages`;
        return cast<CustomPage[]>(data.rows);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch custom pages data.');
    }
}

export async function fetchPromoCards() {
    noStore();
    try {
        const data = await sql`
            SELECT id, title, subtitle, image_url AS "imageUrl", link_type AS "linkType",
                   link_value AS "linkValue", size, "order"
            FROM promo_cards ORDER BY "order" ASC
        `;
        return cast<PromoCard[]>(data.rows);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch promo cards data.');
    }
}

export async function fetchTestimonials() {
    noStore();
    try {
        const data = await sql`
            SELECT id, title, image_url AS "imageUrl", video_url AS "videoUrl", "order", is_featured AS "isFeatured"
            FROM testimonials ORDER BY "order" ASC
        `;
        return cast<Testimonial[]>(data.rows);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch testimonials data.');
    }
}

export async function fetchPortfolioProjects() {
    noStore();
    try {
        const data = await sql`
            SELECT id, slug, title, category, cover_image AS "coverImage", images, description, location, area
            FROM portfolio_projects
        `;
        return cast<PortfolioProject[]>(data.rows);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch portfolio projects data.');
    }
}

export async function fetchLeads() {
    noStore();
    try {
        const data = await sql`
            SELECT id, first_name as "firstName", last_name as "lastName", phone, email, 
                   land_size as "landSize", province, district, budget, construction_date as "constructionDate",
                   timestamp, status, notes
            FROM leads ORDER BY timestamp DESC
        `;
        return cast<Lead[]>(data.rows);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch leads data.');
    }
}


async function fetchSiteConfigValue<T>(key: string): Promise<T | null> {
    noStore();
    try {
        const data = await sql`SELECT value FROM site_config WHERE key = ${key}`;
        return data.rows.length > 0 ? cast<T>(data.rows[0].value) : null;
    } catch (error) {
        console.error(`Database Error fetching site_config for key ${key}:`, error);
        throw new Error(`Failed to fetch ${key} data.`);
    }
}

export async function fetchNotifications() {
    return await fetchSiteConfigValue<SiteNotification[]>('notifications') || [];
}

export async function fetchPopupModalContent() {
    return await fetchSiteConfigValue<PopupModalContent>('popupModal');
}

export async function fetchSiteInfo() {
    return await fetchSiteConfigValue<SiteInfo>('siteInfo');
}
