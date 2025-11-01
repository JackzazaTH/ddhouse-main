import { HomeDesign, Banner, Article, CustomPage, PromoCard, Testimonial, SiteNotification, PopupModalContent, SiteInfo, PortfolioProject } from './types';

export const INITIAL_HOMES: HomeDesign[] = [
  {
    id: 'ddh-001',
    name: 'The Serene Villa',
    description: 'A masterpiece of modern architecture, The Serene Villa offers a tranquil escape with its open-plan living spaces, large glass walls, and a seamless connection to the surrounding nature. Perfect for families seeking both comfort and style.',
    area: 250,
    bedrooms: 4,
    bathrooms: 3,
    images: [
      'https://picsum.photos/seed/villa1/800/600',
      'https://picsum.photos/seed/villa2/800/600',
      'https://picsum.photos/seed/villa3/800/600',
    ],
    isFeatured: true,
    seo: {
      title: 'The Serene Villa - Modern Family Home | DDHOUSE',
      description: 'Discover The Serene Villa, a 250m² modern masterpiece with 4 bedrooms and 3 bathrooms. Experience tranquil living with open-plan spaces and nature integration.'
    }
  },
  {
    id: 'ddh-002',
    name: 'Urban Loft',
    description: 'Experience city living at its finest in the Urban Loft. Featuring industrial-chic design elements, a double-height ceiling in the living area, and a private rooftop terrace, this home is designed for the modern urbanite.',
    area: 180,
    bedrooms: 2,
    bathrooms: 2,
    images: [
      'https://picsum.photos/seed/ loft1/800/600',
      'https://picsum.photos/seed/loft2/800/600',
      'https://picsum.photos/seed/loft3/800/600',
    ],
    isFeatured: true,
    seo: {
      title: 'Urban Loft - Industrial-Chic City Living | DDHOUSE',
      description: 'Explore the Urban Loft, a 180m² home with 2 bedrooms and a private rooftop terrace. Designed for the modern urbanite seeking style and function.'
    }
  },
  {
    id: 'ddh-003',
    name: 'Coastal Retreat',
    description: 'Wake up to the sound of waves in this stunning Coastal Retreat. With panoramic ocean views, light and airy interiors, and expansive decks for outdoor entertaining, it’s the ultimate beachside sanctuary.',
    area: 220,
    bedrooms: 3,
    bathrooms: 3,
    images: [
      'https://picsum.photos/seed/coast1/800/600',
      'https://picsum.photos/seed/coast2/800/600',
    ],
    isFeatured: true,
    seo: {
      title: 'Coastal Retreat - Beachside Sanctuary | DDHOUSE',
      description: 'The Coastal Retreat offers panoramic ocean views in a 220m² layout with 3 bedrooms. Your ultimate beachside sanctuary awaits.'
    }
  },
   {
    id: 'ddh-004',
    name: 'Mountain Chalet',
    description: 'Nestled in the mountains, this cozy chalet combines rustic charm with modern amenities. Features include a stone fireplace, exposed wood beams, and large windows that frame breathtaking mountain vistas.',
    area: 190,
    bedrooms: 3,
    bathrooms: 2,
    images: [
      'https://picsum.photos/seed/chalet1/800/600',
      'https://picsum.photos/seed/chalet2/800/600',
      'https://picsum.photos/seed/chalet3/800/600',
    ],
    isFeatured: false,
  },
  {
    id: 'ddh-005',
    name: 'Minimalist Cube',
    description: 'A bold statement in minimalist design. The Cube House focuses on clean lines, geometric shapes, and a monochromatic palette to create a space that is both calming and intellectually stimulating.',
    area: 160,
    bedrooms: 2,
    bathrooms: 2,
    images: [
      'https://picsum.photos/seed/cube1/800/600',
      'https://picsum.photos/seed/cube2/800/600',
    ],
    isFeatured: false,
  },
  {
    id: 'ddh-006',
    name: 'Suburban Classic',
    description: 'The perfect family home, the Suburban Classic offers spacious rooms, a large backyard, and a timeless design. Its functional layout and warm, inviting atmosphere make it an ideal place to create lasting memories.',
    area: 280,
    bedrooms: 5,
    bathrooms: 4,
    images: [
      'https://picsum.photos/seed/suburb1/800/600',
      'https://picsum.photos/seed/suburb2/800/600',
      'https://picsum.photos/seed/suburb3/800/600',
    ],
    isFeatured: false,
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
    id: 'page-002',
    slug: 'construction-process',
    title: 'ขั้นตอนการปลูกสร้าง',
    content: `<p class="text-lg text-gray-600 mb-12">ที่ DDHOUSE เราเข้าใจดีว่าการสร้างบ้านคือการลงทุนครั้งสำคัญในชีวิต เราจึงได้พัฒนากระบวนการก่อสร้างที่เป็นมาตรฐาน โปร่งใส และตรวจสอบได้ทุกขั้นตอน เพื่อให้คุณมั่นใจได้ว่าจะได้รับบ้านคุณภาพสูงสุดตามความฝัน</p><div class="space-y-12"><!-- Step 1 --><div class="flex flex-col md:flex-row items-center gap-8"><div class="flex-shrink-0 w-24 h-24 bg-red-100 text-primary rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 13v-3m6 3v-3m0 0V7" /></svg></div><div><h3 class="text-2xl font-bold mb-2 text-gray-800">ขั้นตอนที่ 1: ปรึกษาและออกแบบ</h3><p class="text-gray-700">ทีมสถาปนิกและที่ปรึกษาของเราจะทำงานร่วมกับคุณเพื่อทำความเข้าใจความต้องการ ไลฟ์สไตล์ และงบประมาณของคุณ จากนั้นจึงนำข้อมูลมาสร้างสรรค์เป็นแบบบ้าน 3 มิติที่สมบูรณ์แบบและตรงใจคุณที่สุด</p></div></div><!-- Step 2 --><div class="flex flex-col md:flex-row items-center gap-8"><div class="flex-shrink-0 w-24 h-24 bg-red-100 text-primary rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div><div><h3 class="text-2xl font-bold mb-2 text-gray-800">ขั้นตอนที่ 2: เซ็นสัญญาและขออนุญาต</h3><p class="text-gray-700">เมื่อแบบบ้านเป็นที่พอใจแล้ว เราจะจัดทำสัญญาก่อสร้างที่ระบุรายละเอียดวัสดุ (BOQ) และระยะเวลาอย่างชัดเจน พร้อมทั้งดำเนินการยื่นขออนุญาตก่อสร้างกับหน่วยงานราชการที่เกี่ยวข้องให้ทั้งหมด</p></div></div><!-- Step 3 --><div class="flex flex-col md:flex-row items-center gap-8"><div class="flex-shrink-0 w-24 h-24 bg-red-100 text-primary rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div><div><h3 class="text-2xl font-bold mb-2 text-gray-800">ขั้นตอนที่ 3: เตรียมพื้นที่ก่อสร้าง</h3><p class="text-gray-700">ทีมงานจะเข้าสำรวจพื้นที่ของคุณเพื่อวางผังอาคาร กำหนดระดับ และเตรียมความพร้อมของพื้นที่ เช่น การปรับหน้าดิน การรื้อถอน (ถ้ามี) และการเตรียมระบบไฟฟ้า-ประปาชั่วคราวสำหรับงานก่อสร้าง</p></div></div><!-- Step 4 --><div class="flex flex-col md:flex-row items-center gap-8"><div class="flex-shrink-0 w-24 h-24 bg-red-100 text-primary rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v4.517a1 1 0 00.217.625l2.428 3.642a1 1 0 01.176.776V20h-4v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2H4v-4.441a1 1 0 01.176-.776l2.428-3.642A1 1 0 007 8.517V5l-1-1z" /></svg></div><div><h3 class="text-2xl font-bold mb-2 text-gray-800">ขั้นตอนที่ 4: งานฐานรากและโครงสร้าง</h3><p class="text-gray-700">ขั้นตอนที่สำคัญที่สุดของการสร้างบ้าน เริ่มตั้งแต่การลงเสาเข็ม เทฐานราก หล่อเสา คาน และพื้น ไปจนถึงการติดตั้งโครงหลังคา ทุกขั้นตอนควบคุมโดยวิศวกรผู้เชี่ยวชาญเพื่อให้ได้โครงสร้างที่แข็งแรงทนทาน</p></div></div><!-- Step 5 --><div class="flex flex-col md:flex-row items-center gap-8"><div class="flex-shrink-0 w-24 h-24 bg-red-100 text-primary rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg></div><div><h3 class="text-2xl font-bold mb-2 text-gray-800">ขั้นตอนที่ 5: งานสถาปัตยกรรม</h3><p class="text-gray-700">บ้านของคุณจะเริ่มเป็นรูปเป็นร่างในขั้นตอนนี้ ซึ่งประกอบด้วยการก่อผนัง การมุงหลังคา การติดตั้งประตู-หน้าต่าง และการฉาบปูน เพื่อเตรียมพร้อมสำหรับงานตกแต่งในลำดับถัดไป</p></div></div><!-- Step 6 --><div class="flex flex-col md:flex-row items-center gap-8"><div class="flex-shrink-0 w-24 h-24 bg-red-100 text-primary rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg></div><div><h3 class="text-2xl font-bold mb-2 text-gray-800">ขั้นตอนที่ 6: งานระบบ</h3><p class="text-gray-700">การเดินท่อประปาและท่อน้ำทิ้ง, การร้อยสายไฟฟ้าและสายสัญญาณต่างๆ, รวมถึงการติดตั้งระบบปรับอากาศ จะถูกดำเนินการโดยทีมช่างผู้ชำนาญการ เพื่อให้ระบบต่างๆ ภายในบ้านทำงานได้อย่างสมบูรณ์และปลอดภัย</p></div></div><!-- Step 7 --><div class="flex flex-col md:flex-row items-center gap-8"><div class="flex-shrink-0 w-24 h-24 bg-red-100 text-primary rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12.5a2 2 0 002-2v-6.5a2 2 0 00-2-2H7" /></svg></div><div><h3 class="text-2xl font-bold mb-2 text-gray-800">ขั้นตอนที่ 7: งานตกแต่งและภายใน</h3><p class="text-gray-700">ขั้นตอนสุดท้ายของการสร้างสรรค์ความสวยงาม ตั้งแต่การปูพื้น, ทาสี, ติดตั้งฝ้าเพดาน, ติดตั้งสุขภัณฑ์และอุปกรณ์ในห้องน้ำ-ห้องครัว ไปจนถึงการติดตั้งดวงโคมและปลั๊กไฟ</p></div></div><!-- Step 8 --><div class="flex flex-col md:flex-row items-center gap-8"><div class="flex-shrink-0 w-24 h-24 bg-red-100 text-primary rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 0121 7z" /></svg></div><div><h3 class="text-2xl font-bold mb-2 text-gray-800">ขั้นตอนที่ 8: ตรวจสอบและส่งมอบ</h3><p class="text-gray-700">เราจะทำการตรวจสอบคุณภาพงาน (QC) ในทุกรายละเอียด และเชิญคุณเข้าร่วมตรวจสอบความเรียบร้อยของบ้านเป็นครั้งสุดท้าย ก่อนที่จะส่งมอบบ้านในฝันพร้อมการรับประกันโครงสร้างให้แก่คุณ</p></div></div></div>`,
    seo: { title: 'ขั้นตอนการปลูกสร้าง | DDHOUSE', description: 'เรียนรู้ขั้นตอนการสร้างบ้านกับ DDHOUSE ตั้งแต่เริ่มต้นจนส่งมอบ' }
  },
  {
    id: 'page-003',
    slug: 'system-spec',
    title: 'ระบบก่อสร้าง & Material Spec',
    content: 'หน้านี้จะแสดงข้อมูลเกี่ยวกับระบบก่อสร้างและสเปควัสดุที่เราใช้ โปรดรอการอัปเดตข้อมูลเร็วๆ นี้',
    seo: { title: 'ระบบก่อสร้าง & Material Spec | DDHOUSE', description: 'ดูรายละเอียดระบบก่อสร้างและสเปควัสดุมาตรฐานของเรา' }
  },
  {
    id: 'page-004',
    slug: 'appointment',
    title: 'นัดหมายปรึกษาสถาปนิก',
    content: 'หน้านี้สำหรับนัดหมายเพื่อปรึกษากับสถาปนิกของเรา โปรดรอการอัปเดตข้อมูลเร็วๆ นี้',
    seo: { title: 'นัดหมายปรึกษาสถาปนิก | DDHOUSE', description: 'นัดหมายเพื่อพูดคุยและรับคำปรึกษาจากสถาปนิกผู้เชี่ยวชาญ' }
  },
  {
    id: 'page-005',
    slug: 'extra-services',
    title: 'สินค้าและบริการเสริม',
    content: 'หน้านี้จะนำเสนอสินค้าและบริการเสริมต่างๆ ของเรา โปรดรอการอัปเดตข้อมูลเร็วๆ นี้',
    seo: { title: 'สินค้าและบริการเสริม | DDHOUSE', description: 'เลือกชมสินค้าและบริการเสริมเพื่อบ้านของคุณ' }
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
    message: '🎉 ขอต้อนรับสู่เว็บไซต์โฉมใหม่ของเรา! พบกับแบบบ้านและฟีเจอร์ใหม่ๆ มากมาย',
    isActive: false,
    link: '#',
    linkLabel: 'ดูเพิ่มเติม'
  }
];

export const INITIAL_POPUP_MODAL: PopupModalContent = {
  id: 'popup-001',
  isEnabled: false,
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