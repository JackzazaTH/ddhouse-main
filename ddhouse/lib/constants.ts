// NOTE: This file is now used ONLY for seeding the database for the first time.
// The application's live data is fetched from the Vercel Postgres database.
// To add or change data, use the Admin Panel in the running application.

import { HomeDesign, Banner, Article, CustomPage, PromoCard, Testimonial, SiteNotification, PopupModalContent, SiteInfo, PortfolioProject } from './types';

export const INITIAL_HOMES: HomeDesign[] = [
  {
    id: 'ddh-001',
    name: 'LONDON',
    description: 'A masterpiece of modern architecture, The Serene Villa offers a tranquil escape with its open-plan living spaces, large glass walls, and a seamless connection to the surrounding nature. Perfect for families seeking both comfort and style.',
    area: 597,
    bedrooms: 5,
    bathrooms: 6,
    parking: 4,
    images: [
      'https://picsum.photos/seed/london-house/800/600',
      'https://picsum.photos/seed/villa2/800/600',
      'https://picsum.photos/seed/villa3/800/600',
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
      description: 'Discover The Serene Villa, a 250m² modern masterpiece with 4 bedrooms and 3 bathrooms. Experience tranquil living with open-plan spaces and nature integration.'
    }
  },
  {
    id: 'ddh-002',
    name: 'ANTONIO',
    description: 'Experience city living at its finest in the Urban Loft. Featuring industrial-chic design elements, a double-height ceiling in the living area, and a private rooftop terrace, this home is designed for the modern urbanite.',
    area: 505,
    bedrooms: 5,
    bathrooms: 6,
    parking: 4,
    images: [
      'https://picsum.photos/seed/antonio-house/800/600',
      'https://picsum.photos/seed/loft2/800/600',
      'https://picsum.photos/seed/loft3/800/600',
    ],
    isFeatured: true,
    promotion_enabled: true,
    discount_percentage: 18,
    price_popular_original: 14940000,
    price_popular_discounted: 12310000,
    price_signature_original: 17920000,
    price_signature_discounted: 14720000,
    seo: {
      title: 'Urban Loft - Industrial-Chic City Living | DDHOUSE',
      description: 'Explore the Urban Loft, a 180m² home with 2 bedrooms and a private rooftop terrace. Designed for the modern urbanite seeking style and function.'
    }
  },
  {
    id: 'ddh-003',
    name: 'RICHMOND',
    description: 'Wake up to the sound of waves in this stunning Coastal Retreat. With panoramic ocean views, light and airy interiors, and expansive decks for outdoor entertaining, it’s the ultimate beachside sanctuary.',
    area: 460,
    bedrooms: 6,
    bathrooms: 7,
    parking: 2,
    images: [
      'https://picsum.photos/seed/richmond-house/800/600',
      'https://picsum.photos/seed/coast2/800/600',
    ],
    isFeatured: true,
    promotion_enabled: true,
    discount_percentage: 22,
    price_popular_original: 16560000,
    price_popular_discounted: 12860000,
    price_signature_original: 19890000,
    price_signature_discounted: 15400000,
    seo: {
      title: 'Coastal Retreat - Beachside Sanctuary | DDHOUSE',
      description: 'The Coastal Retreat offers panoramic ocean views in a 220m² layout with 3 bedrooms. Your ultimate beachside sanctuary awaits.'
    }
  },
   {
    id: 'ddh-004',
    name: 'ADLER',
    description: 'Nestled in the mountains, this cozy chalet combines rustic charm with modern amenities. Features include a stone fireplace, exposed wood beams, and large windows that frame breathtaking mountain vistas.',
    area: 745,
    bedrooms: 4,
    bathrooms: 5,
    parking: 4,
    images: [
      'https://picsum.photos/seed/adler-house/800/600',
      'https://picsum.photos/seed/chalet2/800/600',
      'https://picsum.photos/seed/chalet3/800/600',
    ],
    isFeatured: false,
    promotion_enabled: true,
    discount_percentage: 29,
    price_popular_original: 25660000,
    price_popular_discounted: 18210000,
    price_signature_original: 30920000,
    price_signature_discounted: 22030000,
  },
  {
    id: 'ddh-005',
    name: 'PADDINGTON-S',
    description: 'A bold statement in minimalist design. The Cube House focuses on clean lines, geometric shapes, and a monochromatic palette to create a space that is both calming and intellectually stimulating.',
    area: 370,
    bedrooms: 4,
    bathrooms: 5,
    parking: 3,
    images: [
      'https://picsum.photos/seed/paddington-house/800/600',
      'https://picsum.photos/seed/cube2/800/600',
    ],
    isFeatured: false,
    promotion_enabled: true,
    discount_percentage: 28,
    price_popular_original: 13600000,
    price_popular_discounted: 9860000,
    price_signature_original: 16360000,
    price_signature_discounted: 11880000,
  },
  {
    id: 'ddh-006',
    name: 'Suburban Classic',
    description: 'The perfect family home, the Suburban Classic offers spacious rooms, a large backyard, and a timeless design. Its functional layout and warm, inviting atmosphere make it an ideal place to create lasting memories.',
    area: 280,
    bedrooms: 5,
    bathrooms: 4,
    parking: 2,
    images: [
      'https://picsum.photos/seed/suburb1/800/600',
      'https://picsum.photos/seed/suburb2/800/600',
      'https://picsum.photos/seed/suburb3/800/600',
    ],
    isFeatured: false,
    promotion_enabled: false,
  },
];

export const INITIAL_BANNERS: Banner[] = [
  {
    id: 'banner-001',
    imageUrl: 'https://picsum.photos/seed/banner1/1200/500',
  },
  {
    id: 'banner-002',
    imageUrl: 'https://picsum.photos/seed/banner2/1200/500',
  },
  {
    id: 'banner-003',
    imageUrl: 'https://picsum.photos/seed/banner3/1200/500',
  },
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-001',
    slug: '5-tips-for-choosing-the-perfect-home-design',
    title: '5 เคล็ดลับในการเลือกแบบบ้านที่ใช่สำหรับคุณ',
    content: `การเลือกแบบบ้านเป็นหนึ่งในการตัดสินใจที่สำคัญที่สุดในชีวิต นี่คือ 5 เคล็ดลับที่จะช่วยให้คุณตัดสินใจได้ง่ายขึ้น:

1. **กำหนดงบประมาณของคุณ:** ทราบว่าคุณสามารถจ่ายได้เท่าไหร่ ซึ่งจะช่วยจำกัดตัวเลือกของคุณให้แคบลง
2. **พิจารณาไลฟ์สไตล์ของคุณ:** คุณต้องการพื้นที่เปิดโล่งสำหรับความบันเทิง หรือต้องการห้องแยกสำหรับทำงาน?
3. **คิดถึงอนาคต:** ครอบครัวของคุณจะขยายใหญ่ขึ้นหรือไม่? คุณต้องการพื้นที่สำหรับงานอดิเรกใหม่ๆ หรือไม่?
4. **ทำเลที่ตั้ง:** ตรวจสอบให้แน่ใจว่าแบบบ้านที่คุณเลือกเหมาะสมกับที่ดินและสภาพแวดล้อม
5. **ปรึกษาผู้เชี่ยวชาญ:** สถาปนิกและผู้สร้างบ้านสามารถให้คำแนะนำที่มีค่าและช่วยให้คุณหลีกเลี่ยงข้อผิดพลาดที่มีค่าใช้จ่ายสูงได้`,
    excerpt: 'การเลือกแบบบ้านเป็นการตัดสินใจครั้งใหญ่ ค้นพบ 5 เคล็ดลับสำคัญที่จะช่วยให้คุณเลือกแบบบ้านในฝันที่เหมาะสมกับไลฟ์สไตล์และงบประมาณของคุณ',
    imageUrl: 'https://picsum.photos/seed/article1/800/600',
    author: 'DDHOUSE Staff',
    publishedDate: '2023-10-26',
    tags: ['เคล็ดลับ', 'การเลือกบ้าน', 'ออกแบบบ้าน'],
    seo: {
      title: '5 เคล็ดลับเลือกแบบบ้านที่ใช่สำหรับคุณ | DDHOUSE',
      description: 'คู่มือฉบับสมบูรณ์! อ่าน 5 เคล็ดลับสำคัญในการเลือกแบบบ้านที่ใช่ ทั้งด้านงบประมาณ ไลฟ์สไตล์ และการวางแผนเพื่ออนาคต'
    }
  },
  {
    id: 'art-002',
    slug: 'the-rise-of-sustainable-home-design',
    title: 'เทรนด์การออกแบบบ้านอย่างยั่งยืนที่กำลังมาแรง',
    content: `การออกแบบบ้านอย่างยั่งยืน หรือ "บ้านสีเขียว" กำลังได้รับความนิยมมากขึ้นเรื่อยๆ ไม่เพียงแต่จะดีต่อสิ่งแวดล้อม แต่ยังช่วยประหยัดค่าใช้จ่ายด้านพลังงานในระยะยาวอีกด้วย เทรนด์หลักๆ ประกอบด้วย:

- **การใช้พลังงานแสงอาทิตย์:** การติดตั้งแผงโซลาร์เซลล์เพื่อผลิตไฟฟ้าใช้เอง
- **การออกแบบที่รับลมและแสงธรรมชาติ:** ลดการใช้เครื่องปรับอากาศและไฟฟ้าส่องสว่าง
- **การเลือกใช้วัสดุที่เป็นมิตรต่อสิ่งแวดล้อม:** เช่น ไม้รีไซเคิล, ฉนวนกันความร้อนจากวัสดุธรรมชาติ
- **ระบบจัดการน้ำ:** การติดตั้งถังเก็บน้ำฝนเพื่อนำกลับมาใช้รดน้ำต้นไม้หรือทำความสะอาด`,
    excerpt: 'บ้านสีเขียวไม่ได้เป็นเพียงกระแส แต่เป็นการลงทุนเพื่ออนาคต เรียนรู้เกี่ยวกับเทรนด์การออกแบบบ้านอย่างยั่งยืนที่กำลังมาแรงและประโยชน์ที่ได้รับ',
    imageUrl: 'https://picsum.photos/seed/article2/800/600',
    author: 'Jane Doe',
    publishedDate: '2023-10-15',
    tags: ['บ้านยั่งยืน', 'บ้านสีเขียว', 'เทรนด์', 'ประหยัดพลังงาน'],
    seo: {
      title: 'เทรนด์การออกแบบบ้านอย่างยั่งยืนมาแรง | DDHOUSE',
      description: 'ค้นพบเทรนด์การออกแบบบ้านเพื่อความยั่งยืน ตั้งแต่การใช้พลังงานแสงอาทิตย์ไปจนถึงการเลือกใช้วัสดุที่เป็นมิตรต่อสิ่งแวดล้อม'
    }
  }
];

export const INITIAL_PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'proj-001',
    slug: 'modern-family-home-bangkok',
    title: 'บ้านโมเดิร์นของคุณสมชาย',
    category: 'บ้านสองชั้น',
    coverImage: 'https://picsum.photos/seed/proj1-cover/800/600',
    images: [
      'https://picsum.photos/seed/proj1-img1/1200/800',
      'https://picsum.photos/seed/proj1-img2/1200/800',
      'https://picsum.photos/seed/proj1-img3/1200/800',
    ],
    description: 'บ้านสไตล์โมเดิร์น 2 ชั้นสำหรับครอบครัวขนาดใหญ่ เน้นพื้นที่ใช้สอยกว้างขวางและการเชื่อมต่อกับธรรมชาติภายนอก',
    location: 'กรุงเทพมหานคร',
    area: 320,
  },
  {
    id: 'proj-002',
    slug: 'cozy-single-story-chiangmai',
    title: 'บ้านสวนชั้นเดียวของคุณมานี',
    category: 'บ้านชั้นเดียว',
    coverImage: 'https://picsum.photos/seed/proj2-cover/800/600',
    images: [
      'https://picsum.photos/seed/proj2-img1/1200/800',
      'https://picsum.photos/seed/proj2-img2/1200/800',
    ],
    description: 'บ้านชั้นเดียวขนาดกะทัดรัด อบอุ่น ท่ามกลางสวนสวย เหมาะสำหรับการพักผ่อนอย่างแท้จริง',
    location: 'เชียงใหม่',
    area: 180,
  },
  {
    id: 'proj-003',
    slug: 'contemporary-villa-phuket',
    title: 'วิลล่าร่วมสมัยของคุณเดวิด',
    category: 'สไตล์ร่วมสมัย',
    coverImage: 'https://picsum.photos/seed/proj3-cover/800/600',
    images: [
        'https://picsum.photos/seed/proj3-img1/1200/800',
        'https://picsum.photos/seed/proj3-img2/1200/800',
        'https://picsum.photos/seed/proj3-img3/1200/800',
    ],
    description: 'วิลล่าสุดหรูสไตล์ร่วมสมัย พร้อมสระว่ายน้ำส่วนตัว มองเห็นวิวทะเลที่สวยงาม',
    location: 'ภูเก็ต',
    area: 450,
  },
  {
    id: 'proj-004',
    slug: 'minimalist-loft-khonkaen',
    title: 'บ้านลอฟท์ของคุณปิติ',
    category: 'สไตล์โมเดิร์น',
    coverImage: 'https://picsum.photos/seed/proj4-cover/800/600',
    images: [
        'https://picsum.photos/seed/proj4-img1/1200/800',
        'https://picsum.photos/seed/proj4-img2/1200/800',
    ],
    description: 'บ้านสองชั้นสไตล์โมเดิร์นลอฟท์ โดดเด่นด้วยการตกแต่งแบบปูนเปลือยและโครงสร้างเหล็ก',
    location: 'ขอนแก่น',
    area: 260,
  },
    {
    id: 'proj-005',
    slug: 'classic-two-story-nakhonratchasima',
    title: 'บ้านอบอุ่นของคุณสมศรี',
    category: 'บ้านสองชั้น',
    coverImage: 'https://picsum.photos/seed/proj5-cover/800/600',
    images: [
      'https://picsum.photos/seed/proj5-img1/1200/800',
      'https://picsum.photos/seed/proj5-img2/1200/800',
    ],
    description: 'บ้านสองชั้นสไตล์คลาสสิคที่ให้ความรู้สึกอบอุ่นและเป็นกันเอง เหมาะสำหรับทุกครอบครัว',
    location: 'นครราชสีมา',
    area: 290,
  },
  {
    id: 'proj-006',
    slug: 'compact-modern-home-rayong',
    title: 'บ้านโมเดิร์นของคุณวิชัย',
    category: 'บ้านชั้นเดียว',
    coverImage: 'https://picsum.photos/seed/proj6-cover/800/600',
    images: [
        'https://picsum.photos/seed/proj6-img1/1200/800',
    ],
    description: 'บ้านชั้นเดียวสไตล์โมเดิร์นขนาดกะทัดรัด ออกแบบฟังก์ชันการใช้งานอย่างลงตัวทุกตารางเมตร',
    location: 'ระยอง',
    area: 150,
  }
];


export const INITIAL_CUSTOM_PAGES: CustomPage[] = [
  {
    id: 'page-privacy-policy',
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    content: `<h2 class="text-2xl font-bold mb-4">นโยบายความเป็นส่วนตัว</h2>
<p class="mb-4">เว็บไซต์ของเราเคารพสิทธิความเป็นส่วนตัวของผู้ใช้ทุกคนที่เข้าเยี่ยมชมเว็บไซต์ของเรา ดังนั้นเราจึงต้องการที่จะชี้แจงให้ท่านทราบเกี่ยวกับการใช้ข้อมูลส่วนบุคคลของท่าน</p>
<h3 class="text-xl font-bold mb-2">การเก็บรวบรวมข้อมูลส่วนบุคคล</h3>
<p class="mb-4">เราจะเก็บรวบรวมข้อมูลส่วนบุคคลที่ท่านให้กับเราโดยตรง เช่น ชื่อ, ที่อยู่อีเมล, และเบอร์โทรศัพท์ เมื่อท่านทำการลงทะเบียนหรือติดต่อเราผ่านทางเว็บไซต์</p>
<h3 class="text-xl font-bold mb-2">การใช้คุกกี้</h3>
<p class="mb-4">เว็บไซต์ของเรามีการใช้คุกกี้เพื่อเก็บข้อมูลการเข้าเยี่ยมชม และเพื่อปรับปรุงประสบการณ์การใช้งานของท่านให้ดียิ่งขึ้น ท่านสามารถเลือกที่จะยอมรับหรือไม่ยอมรับการใช้งานคุกกี้ได้ผ่านการตั้งค่าเบราว์เซอร์ของท่าน</p>
<h3 class="text-xl font-bold mb-2">การเปิดเผยข้อมูล</h3>
<p>เราจะไม่เปิดเผยข้อมูลส่วนบุคคลของท่านแก่บุคคลภายนอกโดยไม่ได้รับความยินยอมจากท่าน เว้นแต่จะเป็นไปตามที่กฎหมายกำหนด</p>`,
    seo: { title: 'Privacy Policy | DDHOUSE', description: 'Read our privacy policy to understand how we handle your data.' }
  },
  {
    id: 'page-002',
    slug: 'construction-process',
    title: 'ขั้นตอนการปลูกสร้าง',
    content: `<p class="text-lg text-gray-600 mb-12">ที่ DDHOUSE เราเข้าใจดีว่าการสร้างบ้านคือการลงทุนครั้งสำคัญในชีวิต เราจึงได้พัฒนากระบวนการก่อสร้างที่เป็นมาตรฐาน โปร่งใส และตรวจสอบได้ทุกขั้นตอน เพื่อให้คุณมั่นใจได้ว่าจะได้รับบ้านคุณภาพสูงสุดตามความฝัน</p><div class="space-y-12"><!-- Step 1 --><div class="flex flex-col md:flex-row items-center gap-8"><div class="flex-shrink-0 w-24 h-24 bg-red-100 text-primary rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 13v-3m6 3v-3m0 0V7" /></svg></div><div><h3 class="text-2xl font-bold mb-2 text-gray-800">ขั้นตอนที่ 1: ปรึกษาและออกแบบ</h3><p class="text-gray-700">ทีมสถาปนิกและที่ปรึกษาของเราจะทำงานร่วมกับคุณเพื่อทำความเข้าใจความต้องการ ไลฟ์สไตล์ และงบประมาณของคุณ จากนั้นจึงนำข้อมูลมาสร้างสรรค์เป็นแบบบ้าน 3 มิติที่สมบูรณ์แบบและตรงใจคุณที่สุด</p></div></div><!-- Step 2 --><div class="flex flex-col md:flex-row items-center gap-8"><div class="flex-shrink-0 w-24 h-24 bg-red-100 text-primary rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div><div><h3 class="text-2xl font-bold mb-2 text-gray-800">ขั้นตอนที่ 2: เซ็นสัญญาและขออนุญาต</h3><p class="text-gray-700">เมื่อแบบบ้านเป็นที่พอใจแล้ว เราจะจัดทำสัญญาก่อสร้างที่ระบุรายละเอียดวัสดุ (BOQ) และระยะเวลาอย่างชัดเจน พร้อมทั้งดำเนินการยื่นขออนุญาตก่อสร้างกับหน่วยงานราชการที่เกี่ยวข้องให้ทั้งหมด</p></div></div><!-- Step 3 --><div class="flex flex-col md:flex-row items-center gap-8"><div class="flex-shrink-0 w-24 h-24 bg-red-100 text-primary rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div><div><h3 class="text-2xl font-bold mb-2 text-gray-800">ขั้นตอนที่ 3: เตรียมพื้นที่ก่อสร้าง</h3><p class="text-gray-700">ทีมงานจะเข้าสำรวจพื้นที่ของคุณเพื่อวางผังอาคาร กำหนดระดับ และเตรียมความพร้อมของพื้นที่ เช่น การปรับหน้าดิน การรื้อถอน (ถ้ามี) และการเตรียมระบบไฟฟ้า-ประปาชั่วคราวสำหรับงานก่อสร้าง</p></div></div><!-- Step 4 --><div class="flex flex-col md:flex-row items-center gap-8"><div class="flex-shrink-0 w-24 h-24 bg-red-100 text-primary rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.517a1 1 0 00.217.625l2.428 3.642a1 1 0 01.176.776V20h-4v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2H4v-4.441a1 1 0 01.176-.776l2.428-3.642A1 1 0 007 8.517V5l-1-1z" /></svg></div><div><h3 class="text-2xl font-bold mb-2 text-gray-800">ขั้นตอนที่ 4: งานฐานรากและโครงสร้าง</h3><p class="text-gray-700">ขั้นตอนที่สำคัญที่สุดของการสร้างบ้าน เริ่มตั้งแต่การลงเสาเข็ม เทฐานราก หล่อเสา คาน และพื้น ไปจนถึงการติดตั้งโครงหลังคา ทุกขั้นตอนควบคุมโดยวิศวกรผู้เชี่ยวชาญเพื่อให้ได้โครงสร้างที่แข็งแรงทนทาน</p></div></div><!-- Step 5 --><div class="flex flex-col md:flex-row items-center gap-8"><div class="flex-shrink-0 w-24 h-24 bg-red-100 text-primary rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg></div><div><h3 class="text-2xl font-bold mb-2 text-gray-800">ขั้นตอนที่ 5: งานสถาปัตยกรรม</h3><p class="text-gray-700">บ้านของคุณจะเริ่มเป็นรูปเป็นร่างในขั้นตอนนี้ ซึ่งประกอบด้วยการก่อผนัง, การมุงหลังคา, การติดตั้งประตู-หน้าต่าง และการฉาบปูน เพื่อเตรียมพร้อมสำหรับงานตกแต่งในลำดับถัดไป</p></div></div><!-- Step 6 --><div class="flex flex-col md:flex-row items-center gap-8"><div class="flex-shrink-0 w-24 h-24 bg-red-100 text-primary rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg></div><div><h3 class="text-2xl font-bold mb-2 text-gray-800">ขั้นตอนที่ 6: งานระบบ</h3><p class="text-gray-700">การเดินท่อประปาและท่อน้ำทิ้ง, การร้อยสายไฟฟ้าและสายสัญญาณต่างๆ, รวมถึงการติดตั้งระบบปรับอากาศ จะถูกดำเนินการโดยทีมช่างผู้ชำนาญการ เพื่อให้ระบบต่างๆ ภายในบ้านทำงานได้อย่างสมบูรณ์และปลอดภัย</p></div></div><!-- Step 7 --><div class="flex flex-col md:flex-row items-center gap-8"><div class="flex-shrink-0 w-24 h-24 bg-red-100 text-primary rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12.5a2 2 0 002-2v-6.5a2 2 0 00-2-2H7" /></svg></div><div><h3 class="text-2xl font-bold mb-2 text-gray-800">ขั้นตอนที่ 7: งานตกแต่งและภายใน</h3><p class="text-gray-700">ขั้นตอนสุดท้ายของการสร้างสรรค์ความสวยงาม ตั้งแต่การปูพื้น, ทาสี, ติดตั้งฝ้าเพดาน, ติดตั้งสุขภัณฑ์และอุปกรณ์ในห้องน้ำ-ห้องครัว ไปจนถึงการติดตั้งดวงโคมและปลั๊กไฟ</p></div></div><!-- Step 8 --><div class="flex flex-col md:flex-row items-center gap-8"><div class="flex-shrink-0 w-24 h-24 bg-red-100 text-primary rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 0121 7z" /></svg></div><div><h3 class="text-2xl font-bold mb-2 text-gray-800">ขั้นตอนที่ 8: ตรวจสอบและส่งมอบ</h3><p class="text-gray-700">เราจะทำการตรวจสอบคุณภาพงาน (QC) ในทุกรายละเอียด และเชิญคุณเข้าร่วมตรวจสอบความเรียบร้อยของบ้านเป็นครั้งสุดท้าย ก่อนที่จะส่งมอบบ้านในฝันพร้อมการรับประกันโครงสร้างให้แก่คุณ</p></div></div></div>`,
    seo: { title: 'ขั้นตอนการปลูกสร้าง | DDHOUSE', description: 'เรียนรู้ขั้นตอนการสร้างบ้านกับ DDHOUSE ตั้งแต่เริ่มต้นจนส่งมอบ' }
  },
  {
    id: 'page-003',
    slug: 'system-spec',
    title: 'ระบบก่อสร้าง & Material Spec',
    content: `<p class="text-lg text-gray-600 mb-12">ที่ DDHOUSE เราเลือกใช้แต่วัสดุคุณภาพสูงและเทคโนโลยีการก่อสร้างที่ทันสมัย ซึ่งควบคุมโดยทีมวิศวกรและสถาปนิกมืออาชีพ เพื่อให้คุณมั่นใจได้ว่าบ้านทุกหลังของเราแข็งแรง ทนทาน และสวยงามตามมาตรฐานสูงสุด</p><div class="space-y-8"><div><h3 class="text-2xl font-bold text-primary mb-3 border-b-2 border-red-200 pb-2">งานโครงสร้าง (Structural Work)</h3><ul class="list-disc list-inside space-y-2 text-gray-700 pl-2"><li><strong>เสาเข็ม:</strong> เสาเข็มเจาะ หรือเสาเข็มตอก ตามผลการสำรวจดินทางธรณีวิทยา</li><li><strong>ฐานราก:</strong> คอนกรีตเสริมเหล็ก (คสล.) ตามมาตรฐานวิศวกรรม</li><li><strong>เสาและคาน:</strong> คอนกรีตเสริมเหล็ก (คสล.) พร้อมเหล็กเส้นมาตรฐาน มอก.</li><li><strong>คอนกรีต:</strong> กำลังอัดไม่น้อยกว่า 240 KSC (Cylinder)</li></ul></div><div><h3 class="text-2xl font-bold text-primary mb-3 border-b-2 border-red-200 pb-2">งานหลังคา (Roofing Work)</h3><ul class="list-disc list-inside space-y-2 text-gray-700 pl-2"><li><strong>โครงหลังคา:</strong> โครงเหล็กรูปพรรณทาสีกันสนิมคุณภาพสูง</li><li><strong>กระเบื้องหลังคา:</strong> กระเบื้องคอนกรีต SCG รุ่น Prestige หรือเทียบเท่า</li><li><strong>ฉนวนกันความร้อน:</strong> แผ่นสะท้อนความร้อนใต้หลังคา SCG</li></ul></div><div><h3 class="text-2xl font-bold text-primary mb-3 border-b-2 border-red-200 pb-2">งานผนัง (Wall Work)</h3><ul class="list-disc list-inside space-y-2 text-gray-700 pl-2"><li><strong>ผนังก่อ:</strong> อิฐมวลเบา Q-CON หรือ Superblock ช่วยกันความร้อนและเสียงได้ดี</li><li><strong>การฉาบ:</strong> ปูนฉาบสำเร็จรูป ฉาบเรียบเนียน ไม่แตกร้าว</li></ul></div><div><h3 class="text-2xl font-bold text-primary mb-3 border-b-2 border-red-200 pb-2">งานพื้น (Flooring Work)</h3><ul class="list-disc list-inside space-y-2 text-gray-700 pl-2"><li><strong>พื้นชั้นล่าง:</strong> เทคอนกรีตบนดิน (Slab on Ground) พร้อมปูผิวด้วยกระเบื้องแกรนิตโต้ ขนาด 60x60 ซม.</li><li><strong>พื้นชั้นบน:</strong> แผ่นพื้นคอนกรีตสำเร็จรูป พร้อมปูผิวด้วยกระเบื้องแกรนิตโต้ ขนาด 60x60 ซม.</li><li><strong>พื้นห้องน้ำ:</strong> กระเบื้องเซรามิคกันลื่น ขนาด 30x30 ซม.</li></ul></div><div><h3 class="text-2xl font-bold text-primary mb-3 border-b-2 border-red-200 pb-2">งานฝ้าเพดาน (Ceiling Work)</h3><ul class="list-disc list-inside space-y-2 text-gray-700 pl-2"><li><strong>โครงฝ้า:</strong> โครงเคร่าเหล็กชุบสังกะสี (กัลวาไนซ์) ไม่เป็นสนิม</li><li><strong>แผ่นฝ้า:</strong> แผ่นยิปซัมบอร์ด SCG ความหนา 9 มม. ฉาบเรียบ ทาสี</li></ul></div><div><h3 class="text-2xl font-bold text-primary mb-3 border-b-2 border-red-200 pb-2">งานประตู-หน้าต่าง (Door & Window)</h3><ul class="list-disc list-inside space-y-2 text-gray-700 pl-2"><li><strong>วงกบและบาน:</strong> UPVC หรือ อลูมิเนียมคุณภาพสูง</li><li><strong>กระจก:</strong> กระจกเขียวตัดแสง ช่วยลดความร้อนและรังสี UV</li></ul></div><div><h3 class="text-2xl font-bold text-primary mb-3 border-b-2 border-red-200 pb-2">งานทาสี (Painting Work)</h3><ul class="list-disc list-inside space-y-2 text-gray-700 pl-2"><li><strong>สีทาภายนอก:</strong> TOA SuperShield หรือเทียบเท่า</li><li><strong>สีทาภายใน:</strong> TOA 4 Seasons หรือเทียบเท่า</li></ul></div><div><h3 class="text-2xl font-bold text-primary mb-3 border-b-2 border-red-200 pb-2">งานระบบ (System Work)</h3><ul class="list-disc list-inside space-y-2 text-gray-700 pl-2"><li><strong>ระบบสุขาภิบาล:</strong> ท่อ PVC คุณภาพสูงจาก SCG (ตราช้าง)</li><li><strong>ระบบไฟฟ้า:</strong> สายไฟฟ้ามาตรฐาน มอก. ยี่ห้อ Yazaki หรือ BCC เดินท่อร้อยสายฝังในผนัง</li></ul></div><div class="mt-12 bg-red-50 border-l-4 border-primary text-gray-800 p-6 rounded-r-lg"><h3 class="text-2xl font-bold text-primary mb-2">การรับประกันคุณภาพ</h3><p><strong>โครงสร้าง:</strong> รับประกันความแข็งแรงทนทานนาน 10 ปี</p><p><strong>งานสถาปัตยกรรมทั่วไป:</strong> รับประกันคุณภาพงาน 1 ปี</p></div></div>`,
    seo: { title: 'ระบบก่อสร้าง & Material Spec | DDHOUSE', description: 'ดูรายละเอียดระบบก่อสร้างและสเปควัสดุมาตรฐานของเรา' }
  },
  {
    id: 'page-004',
    slug: 'appointment',
    title: 'นัดหมายปรึกษาสถาปนิก',
    content: `<p class="text-lg text-gray-700 leading-relaxed mb-8">สนใจสร้างบ้านกับ DDHOUSE? กรอกข้อมูลด้านล่างเพื่อทำการนัดหมายพูดคุยกับสถาปนิกและทีมงานผู้เชี่ยวชาญของเราได้เลย! เราพร้อมให้คำปรึกษาและประเมินราคาเบื้องต้นโดยไม่มีค่าใช้จ่าย เพื่อให้คุณได้บ้านในฝันที่ตรงกับความต้องการและงบประมาณของคุณมากที่สุด</p><div class="my-12 p-6 bg-red-50 border-l-4 border-primary rounded-r-lg"><h3 class="text-xl font-bold text-gray-800 mb-4">หรือติดต่อเราผ่านช่องทางอื่น</h3><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><a href="tel:029383456" class="flex items-center p-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow group"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg><span class="ml-3 font-semibold text-gray-700 group-hover:text-primary transition-colors">02 938 3456</span></a><a href="mailto:contact@ddhouse.com" class="flex items-center p-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow group"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg><span class="ml-3 font-semibold text-gray-700 group-hover:text-primary transition-colors">contact@ddhouse.com</span></a><a href="https://wa.me/6629383456" target="_blank" rel="noopener noreferrer" class="flex items-center p-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow group"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.296-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path></svg><span class="ml-3 font-semibold text-gray-700 group-hover:text-primary transition-colors">WhatsApp</span></a><a href="https://line.me" target="_blank" rel="noopener noreferrer" class="flex items-center p-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow group"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M11.5,2C6.257,2,2,6.257,2,11.5,2.001,13.738,2.83,15.8,4.242,17.391,4.242,17.391,4,22,4,22L8.414,19.5,9.621,19.2A10.329,10.329,0,0,0,11.5,19.5c5.243,0,9.5-4.257,9.5-9.5S16.743,2,11.5,2Zm-3.4,11.571a1.214,1.214,0,1,1,1.214-1.214A1.214,1.214,0,0,1,8.1,13.571Zm3.429,0a1.214,1.214,0,1,1,1.214-1.214A1.214,1.214,0,0,1,11.529,13.571Zm3.428,0a1.214,1.214,0,1,1,1.214-1.214A1.214,1.214,0,0,1,14.957,13.571Z"></path></svg><span class="ml-3 font-semibold text-gray-700 group-hover:text-primary transition-colors">Line Official</span></a><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="flex items-center p-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow group sm:col-span-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg><span class="ml-3 font-semibold text-gray-700 group-hover:text-primary transition-colors">Facebook Page</span></a></div></div>`,
    seo: { title: 'นัดหมายปรึกษาสถาปนิก | DDHOUSE', description: 'นัดหมายเพื่อพูดคุยและรับคำปรึกษาจากสถาปนิกผู้เชี่ยวชาญ' }
  },
  {
    id: 'page-005',
    slug: 'extra-services',
    title: 'สินค้าและบริการเสริมครบวงจร',
    content: `<p class="text-lg text-gray-600 mb-12">เติมเต็มบ้านในฝันของคุณให้สมบูรณ์แบบยิ่งขึ้น ด้วยบริการเสริมคุณภาพจาก DDHOUSE ที่ครอบคลุมทุกความต้องการ เพื่อให้การสร้างบ้านของคุณเป็นเรื่องง่ายและจบในที่เดียว</p><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"><!-- Service Card 1 --><div class="bg-gray-50 rounded-lg shadow-md p-6 text-center transform hover:-translate-y-2 transition-transform duration-300"><div class="flex justify-center mb-4"><div class="w-16 h-16 bg-red-100 text-primary rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h6m-6 4h6m-6 4h6" /></svg></div></div><h3 class="text-xl font-bold text-gray-800 mb-2">ออกแบบและตกแต่งภายใน</h3><p class="text-gray-600">ทีมมัณฑนากรผู้เชี่ยวชาญพร้อมสร้างสรรค์พื้นที่ภายในบ้านของคุณให้สวยงาม ตรงตามไลฟ์สไตล์ และใช้ประโยชน์ได้สูงสุด</p></div><!-- Service Card 2 --><div class="bg-gray-50 rounded-lg shadow-md p-6 text-center transform hover:-translate-y-2 transition-transform duration-300"><div class="flex justify-center mb-4"><div class="w-16 h-16 bg-red-100 text-primary rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.8 9.91l4.243-4.243a1 1 0 011.414 0l4.243 4.243M3 15.586V19a2 2 0 002 2h14a2 2 0 002-2v-3.414" /></svg></div></div><h3 class="text-xl font-bold text-gray-800 mb-2">รับสร้างสระว่ายน้ำ</h3><p class="text-gray-600">บริการออกแบบและก่อสร้างสระว่ายน้ำทุกรูปแบบ พร้อมระบบที่ทันสมัยและปลอดภัย ได้มาตรฐาน</p></div><!-- Service Card 3 --><div class="bg-gray-50 rounded-lg shadow-md p-6 text-center transform hover:-translate-y-2 transition-transform duration-300"><div class="flex justify-center mb-4"><div class="w-16 h-16 bg-red-100 text-primary rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6H8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg></div></div><h3 class="text-xl font-bold text-gray-800 mb-2">ออกแบบและจัดสวน</h3><p class="text-gray-600">เปลี่ยนพื้นที่รอบบ้านให้เป็นสวนสวยน่าพักผ่อน เพิ่มความร่มรื่นและมีชีวิตชีวาให้กับบ้านของคุณ</p></div><!-- Service Card 4 --><div class="bg-gray-50 rounded-lg shadow-md p-6 text-center transform hover:-translate-y-2 transition-transform duration-300"><div class="flex justify-center mb-4"><div class="w-16 h-16 bg-red-100 text-primary rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg></div></div><h3 class="text-xl font-bold text-gray-800 mb-2">ติดตั้งระบบ Smart Home</h3><p class="text-gray-600">ยกระดับการอยู่อาศัยด้วยเทคโนโลยีบ้านอัจฉริยะ ควบคุมระบบไฟฟ้า แอร์ และความปลอดภัยได้ง่ายๆ ผ่านสมาร์ทโฟน</p></div><!-- Service Card 5 --><div class="bg-gray-50 rounded-lg shadow-md p-6 text-center transform hover:-translate-y-2 transition-transform duration-300"><div class="flex justify-center mb-4"><div class="w-16 h-16 bg-red-100 text-primary rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0-3.517 3.08-4 5.5-4 1.372 0 2.5 1.055 2.5 2.5S19 12 17.5 12H12zm0 0H6.5C5.128 12 4 10.945 4 9.5 4 8.055 5.128 7 6.5 7 9 7 12 7.483 12 11zm0 0v9" /></svg></div></div><h3 class="text-xl font-bold text-gray-800 mb-2">ทำรั้วและประตู</h3><p class="text-gray-600">เสริมความปลอดภัยและความเป็นส่วนตัว พร้อมความสวยงาม ด้วยบริการออกแบบและติดตั้งรั้วและประตูบ้านหลากหลายสไตล์</p></div><!-- Service Card 6 --><div class="bg-gray-50 rounded-lg shadow-md p-6 text-center transform hover:-translate-y-2 transition-transform duration-300"><div class="flex justify-center mb-4"><div class="w-16 h-16 bg-red-100 text-primary rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg></div></div><h3 class="text-xl font-bold text-gray-800 mb-2">ขออนุญาตมิเตอร์น้ำ-ไฟ</h3><p class="text-gray-600">อำนวยความสะดวกในการดำเนินการขอติดตั้งมิเตอร์ประปาและไฟฟ้า เพื่อให้บ้านของคุณพร้อมสำหรับเข้าอยู่อาศัย</p></div></div><div class="mt-16 text-center bg-white p-8 rounded-lg shadow-xl border-t-4 border-accent"><h2 class="text-3xl font-bold text-primary mb-4">สนใจบริการเสริมเพิ่มเติม?</h2><p class="text-gray-600 text-lg max-w-2xl mx-auto">ติดต่อทีมงานของเราเพื่อสอบถามรายละเอียดและรับข้อเสนอพิเศษสำหรับบ้านของคุณโดยเฉพาะ</p></div>`,
    seo: { title: 'สินค้าและบริการเสริม | DDHOUSE', description: 'เลือกชมสินค้าและบริการเสริมเพื่อบ้านของคุณ เช่น ตกแต่งภายใน สระว่ายน้ำ จัดสวน และอื่นๆ' }
  }
];

export const INITIAL_PROMO_CARDS: PromoCard[] = [
  {
    id: 'promo-001',
    title: 'นวัตกรรมที่มีเฉพาะ DDHOUSE',
    subtitle: '',
    imageUrl: 'https://picsum.photos/seed/promo1/800/400',
    linkType: 'page',
    linkValue: 'system-spec',
    size: '2x1',
    order: 1,
  },
  {
    id: 'promo-002',
    title: 'ผลงานสร้างบ้าน',
    subtitle: '',
    imageUrl: 'https://picsum.photos/seed/promo2/400/400',
    linkType: 'view',
    linkValue: 'portfolio',
    size: '1x1',
    order: 2,
  },
  {
    id: 'promo-003',
    title: 'แบบบ้านพร้อม',
    subtitle: 'Interior',
    imageUrl: 'https://picsum.photos/seed/promo3/1200/400',
    linkType: 'view',
    linkValue: 'designs',
    size: '3x1',
    order: 3,
  },
  {
    id: 'promo-004',
    title: 'ขั้นตอนการก่อสร้าง',
    subtitle: '',
    imageUrl: 'https://picsum.photos/seed/promo4/400/400',
    linkType: 'page',
    linkValue: 'construction-process',
    size: '1x1',
    order: 4,
  },
  {
    id: 'promo-005',
    title: 'ดาวน์โหลด',
    subtitle: 'E-Catalog',
    imageUrl: 'https://picsum.photos/seed/promo5/400/400',
    linkType: 'url',
    linkValue: '#', // Placeholder link
    size: '1x1',
    order: 5,
  },
  {
    id: 'promo-006',
    title: 'สินค้าและบริการเสริม',
    subtitle: '',
    imageUrl: 'https://picsum.photos/seed/promo6/400/400',
    linkType: 'page',
    linkValue: 'extra-services',
    size: '1x1',
    order: 6,
  },
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-001',
    title: 'ทำไม? คุณหมอ ถึงสร้างบ้านกับ แลนดี้ โฮม มากที่สุด',
    imageUrl: 'https://picsum.photos/seed/test1/800/450',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder video
    order: 1,
    isFeatured: true,
  },
  {
    id: 'test-002',
    title: 'สร้างบ้านอยากบอกต่อ คิดจะสร้างบ้านต้องดู EP.1',
    imageUrl: 'https://picsum.photos/seed/test2/400/225',
    videoUrl: 'https://www.youtube.com/embed/o-YBDTqX_ZU', // Placeholder video
    order: 2,
    isFeatured: false,
  },
  {
    id: 'test-003',
    title: 'ตอบโจทย์ทุกความต้องการ ใส่ใจทุกรายละเอียด ต้องแลนดี้ โฮม',
    imageUrl: 'https://picsum.photos/seed/test3/400/225',
    videoUrl: 'https://www.youtube.com/embed/3tmd-ClpJxA', // Placeholder video
    order: 3,
    isFeatured: false,
  },
  {
    id: 'test-004',
    title: 'รีวิวบ้าน Bristol',
    imageUrl: 'https://picsum.photos/seed/test4/400/225',
    videoUrl: 'https://www.youtube.com/embed/C0DPdy98e4c', // Placeholder video
    order: 4,
    isFeatured: false,
  },
];

export const INITIAL_NOTIFICATIONS: SiteNotification[] = [
  {
    id: 'notif-001',
    message: '🎉 ขอต้อนรับสู่เว็บไซต์โฉมใหม่ของเรา',
    isActive: true,
  }
];

export const INITIAL_POPUP_MODAL: PopupModalContent = {
  id: 'popup-001',
  isEnabled: true,
  imageUrl: 'https://picsum.photos/seed/popup/600/400',
  title: 'โปรโมชันพิเศษ!',
  description: 'ลงทะเบียนวันนี้ รับส่วนลดพิเศษสำหรับแบบบ้านทุกหลัง พร้อมรับคำปรึกษาจากสถาปนิกฟรี!',
  ctaText: 'ดูโปรโมชัน',
  linkType: 'view',
  linkValue: 'designs'
};

export const INITIAL_SITE_INFO: SiteInfo = {
  phone: '02 938 3456',
  socials: {
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
    line: 'https://line.me',
    tiktok: 'https://tiktok.com',
    instagram: 'https://instagram.com'
  },
  promoFormImageUrl: 'https://picsum.photos/seed/modern-house-promo/800/1000',
};