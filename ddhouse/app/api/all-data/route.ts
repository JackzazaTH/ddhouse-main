import {
  fetchHomes,
  fetchBanners,
  fetchArticles,
  fetchCustomPages,
  fetchPromoCards,
  fetchTestimonials,
  fetchPortfolioProjects,
  fetchNotifications,
  fetchPopupModalContent,
  fetchSiteInfo,
  fetchLeads
} from '@/lib/data';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [
      homes,
      banners,
      articles,
      customPages,
      promoCards,
      testimonials,
      portfolioProjects,
      notifications,
      popupModalContent,
      siteInfo,
      leads
    ] = await Promise.all([
      fetchHomes(),
      fetchBanners(),
      fetchArticles(),
      fetchCustomPages(),
      fetchPromoCards(),
      fetchTestimonials(),
      fetchPortfolioProjects(),
      fetchNotifications(),
      fetchPopupModalContent(),
      fetchSiteInfo(),
      fetchLeads()
    ]);

    return NextResponse.json({
      homes,
      banners,
      articles,
      customPages,
      promoCards,
      testimonials,
      portfolioProjects,
      notifications,
      popupModalContent,
      siteInfo,
      leads
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Failed to fetch data' }, { status: 500 });
  }
}
