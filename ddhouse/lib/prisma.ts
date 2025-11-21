import { PrismaClient } from '@prisma/client';
import { 
  INITIAL_HOMES, 
  INITIAL_BANNERS, 
  INITIAL_ARTICLES, 
  INITIAL_CUSTOM_PAGES, 
  INITIAL_PROMO_CARDS, 
  INITIAL_TESTIMONIALS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_POPUP_MODAL, 
  INITIAL_SITE_INFO, 
  INITIAL_PORTFOLIO_PROJECTS 
} from '../lib/constants';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // 1. Seed Site Info
  await prisma.siteInfo.upsert({
    where: { id: 1 },
    update: {},
    create: {
        id: 1,
        ...INITIAL_SITE_INFO,
        socials: INITIAL_SITE_INFO.socials as any,
        buttonLabels: INITIAL_SITE_INFO.buttonLabels as any,
        globalSeo: INITIAL_SITE_INFO.globalSeo as any,
        serviceArea: INITIAL_SITE_INFO.serviceArea as any
    }
  });
  console.log('Seeded SiteInfo');

  // 2. Seed Popup
  await prisma.popupModalContent.upsert({
      where: { id: 1 },
      update: {},
      create: {
          id: 1,
          ...INITIAL_POPUP_MODAL
      }
  });
  console.log('Seeded Popup');

  // 3. Seed Banners
  const bannerCount = await prisma.banner.count();
  if (bannerCount === 0) {
    await prisma.banner.createMany({
        data: INITIAL_BANNERS.map(({ id, ...rest }) => rest),
    });
    console.log('Seeded Banners');
  }

  // 4. Seed Homes
  const homeCount = await prisma.homeDesign.count();
  if (homeCount === 0) {
      for (const home of INITIAL_HOMES) {
          const { id, seo, ...rest } = home;
          await prisma.homeDesign.create({
              data: {
                  ...rest,
                  seo: seo as any
              }
          });
      }
      console.log('Seeded Homes');
  }

  // 5. Seed Articles
  const articleCount = await prisma.article.count();
  if (articleCount === 0) {
      for (const article of INITIAL_ARTICLES) {
          const { id, seo, ...rest } = article;
          await prisma.article.create({
              data: {
                  ...rest,
                  seo: seo as any
              }
          });
      }
      console.log('Seeded Articles');
  }

  // 6. Seed Portfolio
  const portfolioCount = await prisma.portfolioProject.count();
  if (portfolioCount === 0) {
      for (const project of INITIAL_PORTFOLIO_PROJECTS) {
          const { id, ...rest } = project;
          await prisma.portfolioProject.create({
              data: rest
          });
      }
      console.log('Seeded Portfolio');
  }

  // 7. Seed Custom Pages
  const pageCount = await prisma.customPage.count();
  if (pageCount === 0) {
      for (const page of INITIAL_CUSTOM_PAGES) {
          const { id, seo, ...rest } = page;
          await prisma.customPage.create({
              data: {
                  ...rest,
                  seo: seo as any
              }
          });
      }
      console.log('Seeded Custom Pages');
  }

  // 8. Seed Promo Cards
  const promoCount = await prisma.promoCard.count();
  if (promoCount === 0) {
      await prisma.promoCard.createMany({
          data: INITIAL_PROMO_CARDS.map(({ id, ...rest }) => rest),
      });
      console.log('Seeded Promo Cards');
  }

  // 9. Seed Testimonials
  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
      await prisma.testimonial.createMany({
          data: INITIAL_TESTIMONIALS.map(({ id, ...rest }) => rest),
      });
      console.log('Seeded Testimonials');
  }

  // 10. Seed Notifications
  const notifCount = await prisma.siteNotification.count();
  if (notifCount === 0) {
      await prisma.siteNotification.createMany({
          data: INITIAL_NOTIFICATIONS.map(({ id, ...rest }) => rest),
      });
      console.log('Seeded Notifications');
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });