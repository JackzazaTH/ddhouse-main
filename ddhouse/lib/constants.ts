
import { HomeDesign, Banner, Article, CustomPage, PromoCard, Testimonial, SiteNotification, PopupModalContent, SiteInfo, PortfolioProject, CalendarEvent, GalleryAlbum } from './types';

export const INITIAL_HOMES: HomeDesign[] = [
  {
    id: 'ddh-001',
    name: 'LONDON',
    description: 'A masterpiece of modern architecture, The Serene Villa offers a tranquil escape with its open-plan living spaces, large glass walls, and a seamless connection to the surrounding nature. Perfect for families seeking both comfort and style.',
    area: 597,
    bedrooms: 5,
    bathrooms: 6,
    parking: 4,
    style: 'Modern Luxury',
    dimensions: '22.50 x 18.00 ม.',
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
    style: 'Contemporary Loft',
    dimensions: '19.00 x 16.50 ม.',
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
    style: 'Tropical Modern',
    dimensions: '24.00 x 14.00 ม.',
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
    style: 'Classic Contemporary',
    dimensions: '28.50 x 22.00 ม.',
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
    style: 'Minimalist',
    dimensions: '15.00 x 18.50 ม.',
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
    style: 'Classic',
    dimensions: '14.00 x 16.00 ม.',
    images: [
      'https://picsum.photos/seed/suburb1/800/600',
      'https://picsum.photos/seed/suburb2/800/600',
      'https://picsum.photos/seed/suburb3/800/600',
    ],
    isFeatured: false,
    promotion_enabled: false,
  },
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
    seo: { title: 'Privacy Policy | DDHOUSE', description: 'Read our privacy policy to understand how we handle your data.' },
    menuLocation: 'none',
    order: 99
  },
  {
    id: 'page-002',
    slug: 'construction-process',
    title: 'ขั้นตอนการปลูกสร้าง',
    content: `<div class="w-full font-sans">
      <h2 class="text-3xl font-bold mb-6 text-primary">ขั้นตอนการปลูกสร้างบ้านกับ DDHOUSE</h2>
      <div class="space-y-8">
        <div class="flex flex-col md:flex-row gap-6 items-start">
          <div class="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">1</div>
          <div>
             <h3 class="text-xl font-bold mb-2">ปรึกษาและวางแผน</h3>
             <p class="text-gray-600">พูดคุยกับทีมสถาปนิกและวิศวกรเพื่อสรุปความต้องการ งบประมาณ และเลือกแบบบ้านที่เหมาะสมกับที่ดินของท่าน</p>
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-6 items-start">
          <div class="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">2</div>
          <div>
             <h3 class="text-xl font-bold mb-2">ทำสัญญาและขออนุญาต</h3>
             <p class="text-gray-600">ดำเนินการทำสัญญาก่อสร้าง และทีมงานจะดำเนินการยื่นขออนุญาตก่อสร้างกับหน่วยงานราชการให้ถูกต้องครบถ้วน</p>
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-6 items-start">
          <div class="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">3</div>
          <div>
             <h3 class="text-xl font-bold mb-2">งานโครงสร้าง</h3>
             <p class="text-gray-600">เริ่มงานตอกเสาเข็ม งานฐานราก คาน และเสา ด้วยมาตรฐานวิศวกรรมที่เข้มงวด พร้อมการตรวจสอบทุกขั้นตอน</p>
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-6 items-start">
          <div class="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">4</div>
          <div>
             <h3 class="text-xl font-bold mb-2">งานสถาปัตยกรรมและระบบ</h3>
             <p class="text-gray-600">งานก่ออิฐ ฉาบปูน มุงหลังคา และติดตั้งระบบไฟฟ้า ประปา สุขาภิบาล โดยช่างผู้ชำนาญการ</p>
          </div>
        </div>
         <div class="flex flex-col md:flex-row gap-6 items-start">
          <div class="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">5</div>
          <div>
             <h3 class="text-xl font-bold mb-2">งานตกแต่งและส่งมอบ</h3>
             <p class="text-gray-600">ติดตั้งสุขภัณฑ์ งานพื้น งานสี และทำความสะอาด พร้อมตรวจสอบความเรียบร้อยก่อนส่งมอบบ้านให้ลูกค้า</p>
          </div>
        </div>
      </div>
    </div>`,
    seo: { title: 'ขั้นตอนการปลูกสร้าง | DDHOUSE', description: 'เรียนรู้ขั้นตอนการสร้างบ้านกับ DDHOUSE ตั้งแต่เริ่มต้นจนส่งมอบ' },
    menuLocation: 'service_submenu',
    order: 1
  },
  {
    id: 'page-003',
    slug: 'system-spec',
    title: 'ระบบก่อสร้าง & Material Spec',
    content: `<div class="w-full font-sans">
        <h2 class="text-3xl font-bold mb-6 text-primary">มาตรฐานงานก่อสร้างระดับพรีเมียม</h2>
        <p class="text-lg text-gray-600 mb-8">เราคัดสรรวัสดุคุณภาพสูงและใช้เทคนิคการก่อสร้างที่ทันสมัย เพื่อความแข็งแรง ทนทาน และสวยงามของบ้านคุณ</p>

        <div class="grid md:grid-cols-2 gap-8">
            <div class="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 class="text-xl font-bold mb-4 text-gray-800 border-b border-gray-300 pb-2">โครงสร้างและฐานราก</h3>
                <ul class="space-y-2 text-gray-600">
                    <li>• เสาเข็มคอนกรีตอัดแรงมาตรฐาน มอก.</li>
                    <li>• คอนกรีตผสมเสร็จจาก CPAC หรือเทียบเท่า</li>
                    <li>• เหล็กเส้นก่อสร้างมาตรฐานโรงงาน (SD40)</li>
                    <li>• ระบบกันซึมคุณภาพสูง</li>
                </ul>
            </div>
             <div class="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 class="text-xl font-bold mb-4 text-gray-800 border-b border-gray-300 pb-2">งานหลังคาและฝ้า</h3>
                <ul class="space-y-2 text-gray-600">
                    <li>• กระเบื้องหลังคา SCG รุ่น Prestige หรือเทียบเท่า</li>
                    <li>• โครงหลังคาสำเร็จรูปเคลือบกันสนิม</li>
                    <li>• ฉนวนกันความร้อนใต้หลังคา</li>
                    <li>• ฝ้าเพดานยิปซั่มฉาบเรียบกันชื้น</li>
                </ul>
            </div>
             <div class="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 class="text-xl font-bold mb-4 text-gray-800 border-b border-gray-300 pb-2">วัสดุปูพื้นและผนัง</h3>
                <ul class="space-y-2 text-gray-600">
                    <li>• กระเบื้องแกรนิตโต้เกรด A ขนาด 60x60 ซม.</li>
                    <li>• พื้นไม้ลามิเนตหนา 12 มม. ในห้องนอน</li>
                    <li>• สีทาภายนอกและภายในเกรดพรีเมียม (TOA/Jotun)</li>
                    <li>• อิฐมวลเบา Q-CON เพื่อการกันความร้อนและเสียง</li>
                </ul>
            </div>
             <div class="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 class="text-xl font-bold mb-4 text-gray-800 border-b border-gray-300 pb-2">สุขภัณฑ์และระบบไฟฟ้า</h3>
                <ul class="space-y-2 text-gray-600">
                    <li>• สุขภัณฑ์ COTTO / American Standard</li>
                    <li>• อุปกรณ์สวิทช์และปลั๊กไฟ Panasonic</li>
                    <li>• สายร้อยท่อฝังผนังมาตรฐานความปลอดภัย</li>
                    <li>• ระบบถังบำบัดน้ำเสีย DOS</li>
                </ul>
            </div>
        </div>
    </div>`,
    seo: { title: 'ระบบก่อสร้าง & Material Spec | DDHOUSE', description: 'ดูรายละเอียดระบบก่อสร้างและสเปควัสดุมาตรฐานของเรา' },
    menuLocation: 'service_submenu',
    order: 2
  },
  {
    id: 'page-005',
    slug: 'extra-services',
    title: 'สินค้าและบริการเสริมครบวงจร',
    content: `<div class="w-full font-sans bg-white">
        <h2 class="text-3xl font-bold mb-6 text-primary">บริการเสริมเพื่อบ้านที่สมบูรณ์แบบ</h2>
        <div class="grid md:grid-cols-3 gap-6">
            <div class="group">
                <div class="overflow-hidden rounded-xl mb-4 h-48">
                    <img src="https://picsum.photos/seed/interior/600/400" alt="Interior Design" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 class="text-xl font-bold mb-2">ออกแบบตกแต่งภายใน</h3>
                <p class="text-gray-600 text-sm">บริการออกแบบตกแต่งภายในครบวงจร โดยมัณฑนากรมืออาชีพ เพื่อให้บ้านสวยงามน่าอยู่และตอบโจทย์การใช้งาน</p>
            </div>
            <div class="group">
                <div class="overflow-hidden rounded-xl mb-4 h-48">
                    <img src="https://picsum.photos/seed/landscape/600/400" alt="Landscape Design" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 class="text-xl font-bold mb-2">จัดสวนและภูมิทัศน์</h3>
                <p class="text-gray-600 text-sm">เนรมิตพื้นที่สีเขียวรอบบ้าน ให้ร่มรื่น สวยงาม และเป็นธรรมชาติ ด้วยบริการจัดสวนแบบมืออาชีพ</p>
            </div>
            <div class="group">
                <div class="overflow-hidden rounded-xl mb-4 h-48">
                    <img src="https://picsum.photos/seed/pool/600/400" alt="Swimming Pool" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 class="text-xl font-bold mb-2">สระว่ายน้ำระบบเกลือ</h3>
                <p class="text-gray-600 text-sm">ออกแบบและก่อสร้างสระว่ายน้ำระบบเกลือ มาตรฐานสากล เพื่อสุขภาพและการพักผ่อนของทุกคนในครอบครัว</p>
            </div>
        </div>
    </div>`,
    seo: { title: 'สินค้าและบริการเสริม | DDHOUSE', description: 'เลือกชมสินค้าและบริการเสริมเพื่อบ้านของคุณ เช่น ตกแต่งภายใน สระว่ายน้ำ จัดสวน และอื่นๆ' },
    menuLocation: 'service_submenu',
    order: 3
  },
  {
    id: 'page-portfolio',
    slug: 'portfolio',
    title: 'ผลงานของเรา',
    content: '<p>ชมผลงานการสร้างสรรค์บ้านคุณภาพ ที่เราภาคภูมิใจส่งมอบให้กับลูกค้าทุกท่าน</p>',
    imageUrl: 'https://picsum.photos/seed/portfolio-hero/1600/800',
    seo: { title: 'ผลงานของเรา | DDHOUSE', description: 'ชมผลงานการสร้างสรรค์บ้านคุณภาพจาก DDHOUSE' },
    menuLocation: 'primary',
    order: 5
  },
  {
    id: 'page-appointment',
    slug: 'appointment',
    title: 'ติดต่อเรา',
    content: `<div class="w-full font-sans">
        <div class="grid md:grid-cols-2 gap-12">
            <div>
                <h2 class="text-3xl font-bold mb-6 text-primary">ช่องทางการติดต่อ</h2>
                <div class="space-y-6">
                    <div class="flex items-start gap-4">
                         <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </div>
                        <div>
                            <h3 class="font-bold text-gray-800">ที่อยู่สำนักงาน</h3>
                            <p class="text-gray-600">123/45 ถนนมิตรภาพ ตำบลในเมือง อำเภอเมือง จังหวัดอุบลราชธานี 34000</p>
                        </div>
                    </div>
                     <div class="flex items-center gap-4">
                         <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        </div>
                        <div>
                            <h3 class="font-bold text-gray-800">เบอร์โทรศัพท์</h3>
                            <p class="text-gray-600">097 978 7459</p>
                        </div>
                    </div>
                     <div class="flex items-center gap-4">
                         <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        </div>
                        <div>
                            <h3 class="font-bold text-gray-800">อีเมล</h3>
                            <p class="text-gray-600">contact@ddhouse.co.th</p>
                        </div>
                    </div>
                     <div class="flex items-center gap-4">
                         <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div>
                            <h3 class="font-bold text-gray-800">เวลาทำการ</h3>
                            <p class="text-gray-600">ทุกวัน 08:00 - 17:30 น.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                <h3 class="text-2xl font-bold mb-4">นัดหมายปรึกษาฟรี</h3>
                <p class="text-gray-600 mb-6">กรอกข้อมูลเพื่อให้เจ้าหน้าที่ติดต่อกลับ เพื่อนัดหมายเวลาและให้คำปรึกษาเรื่องสร้างบ้าน</p>
                <form class="space-y-4" onsubmit="event.preventDefault(); alert('ขอบคุณสำหรับข้อมูล ทางเราจะติดต่อกลับโดยเร็วที่สุด');">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">ชื่อ-นามสกุล</label>
                        <input type="text" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="กรุณากรอกชื่อของคุณ" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์</label>
                        <input type="tel" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="กรุณากรอกเบอร์โทรศัพท์" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">เรื่องที่ต้องการปรึกษา</label>
                        <textarea class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none h-32" placeholder="รายละเอียดเบื้องต้น..."></textarea>
                    </div>
                    <button type="submit" class="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primaryDark transition-colors shadow-lg hover:shadow-xl">ส่งข้อมูลนัดหมาย</button>
                </form>
            </div>
        </div>
    </div>`,
    seo: { title: 'ติดต่อเรา | DDHOUSE', description: 'ติดต่อ DDHOUSE ศูนย์รับสร้างบ้าน บ้านดีดีวิศวกรรม' },
    menuLocation: 'primary',
    order: 90
  },
  {
    id: 'page-calendar',
    slug: 'calendar',
    title: 'ตารางกิจกรรม',
    content: '',
    menuLocation: 'service_submenu',
    order: 4
  },
  {
    id: 'page-gallery',
    slug: 'gallery',
    title: 'อัลบั้มรูปภาพ',
    content: '', 
    menuLocation: 'service_submenu',
    order: 5
  }
];

export const INITIAL_CALENDAR_EVENTS: CalendarEvent[] = [
  { id: 'ev-1', title: 'เริ่มก่อสร้างบ้านคุณสมชาย', date: '2023-11-15', type: 'construction', description: 'เริ่มงานตอกเสาเข็ม' },
  { id: 'ev-2', title: 'ส่งมอบบ้านคุณมานี', date: '2023-11-20', type: 'handover', description: 'นัดตรวจรับและส่งมอบกุญแจ' },
  { id: 'ev-3', title: 'วันหยุดบริษัท', date: '2023-11-25', type: 'holiday', description: 'หยุดประจำปี' },
  { id: 'ev-4', title: 'ประชุมทีมวิศวกร', date: '2023-11-10', type: 'meeting', description: 'อัปเดตความคืบหน้าโครงการ' },
];

export const INITIAL_GALLERY_ALBUMS: GalleryAlbum[] = [
  {
    id: 'album-1',
    title: 'รวมภาพส่งมอบบ้าน 2023',
    description: 'ภาพความประทับใจในวันส่งมอบบ้านให้กับลูกค้าของเรา',
    coverImage: 'https://picsum.photos/seed/album1/800/600',
    date: '2023-10-01',
    images: [
        'https://picsum.photos/seed/h1/800/600',
        'https://picsum.photos/seed/h2/800/600',
        'https://picsum.photos/seed/h3/800/600',
        'https://picsum.photos/seed/h4/800/600',
    ]
  },
  {
    id: 'album-2',
    title: 'บรรยากาศหน้างานก่อสร้าง',
    description: 'ติดตามการทำงานของทีมช่างและวิศวกรในไซต์งานจริง',
    coverImage: 'https://picsum.photos/seed/album2/800/600',
    date: '2023-09-15',
    images: [
        'https://picsum.photos/seed/c1/800/600',
        'https://picsum.photos/seed/c2/800/600',
        'https://picsum.photos/seed/c3/800/600',
    ]
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
    linkValue: '#', 
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
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    order: 1,
    isFeatured: true,
  },
  {
    id: 'test-002',
    title: 'สร้างบ้านอยากบอกต่อ คิดจะสร้างบ้านต้องดู EP.1',
    imageUrl: 'https://picsum.photos/seed/test2/400/225',
    videoUrl: 'https://www.youtube.com/embed/o-YBDTqX_ZU',
    order: 2,
    isFeatured: false,
  },
  {
    id: 'test-003',
    title: 'ตอบโจทย์ทุกความต้องการ ใส่ใจทุกรายละเอียด ต้องแลนดี้ โฮม',
    imageUrl: 'https://picsum.photos/seed/test3/400/225',
    videoUrl: 'https://www.youtube.com/embed/3tmd-ClpJxA', 
    order: 3,
    isFeatured: false,
  },
  {
    id: 'test-004',
    title: 'รีวิวบ้าน Bristol',
    imageUrl: 'https://picsum.photos/seed/test4/400/225',
    videoUrl: 'https://www.youtube.com/embed/C0DPdy98e4c',
    order: 4,
    isFeatured: false,
  },
];

export const INITIAL_NOTIFICATIONS: SiteNotification[] = [
  {
    id: 'notif-001',
    message: '🎉 ขอต้อนรับสู่เว็บไซต์โฉมใหม่ของเรา พบกันโปรโมชั่นใหม่เร็วๆนี้ - Coming Soon',
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
    defaultDescription: 'ศูนย์รับสร้างบ้าน บ้านดีดีวิศวกรรม รับสร้างบ้านคุณภาพ การออกแบบทันสมัย ทั่วประเทศ พร้อมให้คำปรึกษาจากผู้เชี่ยวชาญ',
    defaultKeywords: 'home design, build house, modern homes, construction, architecture',
  },
  serviceArea: {
      title: 'รับสร้างบ้านทั่วไทย พร้อมดูแลพื้นที่ อุบลราชธานี ศรีสะเกษ ยโสธร อำนาจเจริญ',
      content: 'DDHOUSE ศูนย์รับสร้างบ้านอันดับ 1 ที่คุณไว้วางใจ เราให้บริการรับสร้างบ้านทั่วประเทศ ด้วยมาตรฐานเดียวกัน พร้อมทีมงานวิศวกรและสถาปนิกมืออาชีพ โดยเรามีความเชี่ยวชาญพิเศษในการดูแลลูกค้าในโซนภาคตะวันออกเฉียงเหนือ ได้แก่ อุบลราชธานี ศรีสะเกษ ยโสธร อำนาจเจริญ และจังหวัดใกล้เคียง มั่นใจได้ในคุณภาพ ไม่ทิ้งงาน สร้างเสร็จจริงตามงบประมาณ'
  }
};

export const INITIAL_BANNERS: Banner[] = [
  {
    id: 'banner-new-001',
    imageUrl: 'https://i.ibb.co/n8Rzc0gF/banner-1.png',
  },
  {
    id: 'banner-001',
    imageUrl: 'https://i.ibb.co/n8Rzc0gF/banner-1.png',
  },
  {
    id: 'banner-002',
    imageUrl: 'https://i.ibb.co/n8Rzc0gF/banner-1.png',
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
    author: 'DDHOUSE Staff',
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
    slug: 'modern-luxury-residence',
    title: 'Modern Luxury Residence',
    category: 'สไตล์โมเดิร์น',
    coverImage: 'https://picsum.photos/seed/proj1/800/600',
    images: [
        'https://picsum.photos/seed/proj1-1/800/600',
        'https://picsum.photos/seed/proj1-2/800/600',
    ],
    description: 'บ้านสไตล์โมเดิร์นที่เน้นความหรูหราและพื้นที่ใช้สอยที่โปร่งโล่ง ออกแบบเพื่อการพักผ่อนอย่างแท้จริง',
    location: 'กรุงเทพมหานคร',
    area: 450,
  },
  {
    id: 'proj-002',
    slug: 'contemporary-family-home',
    title: 'Contemporary Family Home',
    category: 'สไตล์ร่วมสมัย',
    coverImage: 'https://picsum.photos/seed/proj2/800/600',
    images: [
        'https://picsum.photos/seed/proj2-1/800/600',
        'https://picsum.photos/seed/proj2-2/800/600',
    ],
    description: 'บ้านร่วมสมัยสำหรับครอบครัวใหญ่ ผสมผสานความอบอุ่นและการใช้งานที่ลงตัว',
    location: 'นนทบุรี',
    area: 320,
  },
  {
    id: 'proj-003',
    slug: 'nordic-style-house',
    title: 'Nordic Style House',
    category: 'บ้านสองชั้น',
    coverImage: 'https://picsum.photos/seed/proj3/800/600',
    images: [
        'https://picsum.photos/seed/proj3-1/800/600',
    ],
    description: 'บ้านสไตล์นอร์ดิก เรียบง่ายแต่มีเอกลักษณ์ เน้นแสงธรรมชาติและวัสดุไม้',
    location: 'เชียงใหม่',
    area: 280,
  }
];
