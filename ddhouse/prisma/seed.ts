
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');
  console.warn('Seeding skipped: Prisma Client is not generated or available.');

  /*
  // 1. Seed Site Info (Default ID 1)
  await prisma.siteInfo.upsert({
    where: { id: 1 },
    update: {},
    create: {
        siteName: 'DDHOUSE',
        siteTagline: '',
        logoUrl: 'https://i.ibb.co/wFCmP663/logo.jpg',
        phone: '097 978 7459',
        officeHours: 'ทำการทุกวัน 08:00 - 17:30 น.',
        socials: {
            facebook: 'https://facebook.com',
            youtube: 'https://youtube.com',
            tiktok: 'https://tiktok.com',
            line: 'https://line.me',
            whatsapp: 'https://wa.me/'
        },
        promoFormImageUrl: 'https://i.ibb.co/wFCmP663/logo.jpg',
        buttonLabels: {
            viewAllHomes: 'ดูแบบบ้านทั้งหมด',
            viewAllArticles: 'ดูบทความทั้งหมด',
            viewAllTestimonials: 'ดูทั้งหมด',
        },
        globalSeo: {
            titleTemplate: '%s | DDHOUSE',
            defaultDescription: 'ศูนย์รับสร้างบ้าน บ้านดีดีวิศวกรรม รับสร้างบ้านคุณภาพ',
            defaultKeywords: 'home design, build house, construction',
        },
        serviceArea: {
            title: 'รับสร้างบ้านทั่วไทย พร้อมดูแลพื้นที่ อุบลราชธานี ศรีสะเกษ ยโสธร อำนาจเจริญ',
            content: 'DDHOUSE ศูนย์รับสร้างบ้านอันดับ 1 ที่คุณไว้วางใจ'
        }
    }
  });
  console.log('Seeded SiteInfo');

  // 2. Seed Banners
  const bannerCount = await prisma.banner.count();
  if (bannerCount === 0) {
    await prisma.banner.createMany({
        data: [
        { imageUrl: 'https://i.ibb.co/n8Rzc0gF/banner-1.png' },
        { imageUrl: 'https://picsum.photos/seed/banner3/1200/500' },
        ],
    });
    console.log('Seeded Banners');
  }

  // 3. Seed Homes
  const homeCount = await prisma.homeDesign.count();
  if (homeCount === 0) {
      await prisma.homeDesign.create({
        data: {
            name: 'LONDON',
            description: 'A masterpiece of modern architecture.',
            area: 597,
            bedrooms: 5,
            bathrooms: 6,
            parking: 4,
            images: [
                'https://picsum.photos/seed/london-house/800/600',
                'https://picsum.photos/seed/villa2/800/600',
            ],
            isFeatured: true,
            promotion_enabled: true,
            discount_percentage: 22,
            price_popular_original: 22250000,
            price_popular_discounted: 17280000,
            price_signature_original: 26700000,
            price_signature_discounted: 20820000,
            seo: {
                title: 'The Serene Villa - Modern Family Home | DDHOUSE',
                description: 'Discover The Serene Villa'
            }
        }
      });
      console.log('Seeded Homes');
  }

  // 4. Seed Articles
  const articleCount = await prisma.article.count();
  if (articleCount === 0) {
      await prisma.article.create({
        data: {
            slug: '5-tips-for-choosing-the-perfect-home-design',
            title: '5 เคล็ดลับในการเลือกแบบบ้านที่ใช่สำหรับคุณ',
            content: 'การเลือกแบบบ้านเป็นหนึ่งในการตัดสินใจที่สำคัญที่สุด...',
            excerpt: 'การเลือกแบบบ้านเป็นการตัดสินใจครั้งใหญ่ ค้นพบ 5 เคล็ดลับสำคัญ',
            imageUrl: 'https://picsum.photos/seed/article1/800/600',
            author: 'DDHOUSE Staff',
            publishedDate: '2023-10-26',
            tags: ['เคล็ดลับ', 'การเลือกบ้าน', 'ออกแบบบ้าน'],
            seo: {
                title: '5 เคล็ดลับเลือกแบบบ้านที่ใช่สำหรับคุณ | DDHOUSE',
                description: 'คู่มือฉบับสมบูรณ์! อ่าน 5 เคล็ดลับสำคัญ'
            }
        }
      });
      console.log('Seeded Articles');
  }

  // 5. Seed Popup
  await prisma.popupModalContent.upsert({
      where: { id: 1 },
      update: {},
      create: {
          isEnabled: true,
          imageUrl: 'https://picsum.photos/seed/popup/600/400',
          title: 'โปรโมชันพิเศษ!',
          description: 'ลงทะเบียนวันนี้ รับส่วนลดพิเศษ',
          ctaText: 'ดูโปรโมชัน',
          linkType: 'view',
          linkValue: 'designs'
      }
  });
  console.log('Seeded Popup');
  */

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // await prisma.$disconnect();
  });
