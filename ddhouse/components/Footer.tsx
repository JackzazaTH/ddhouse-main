
import React from 'react';
import { SiteInfo } from '@/lib/types';
import { PhoneIcon, FacebookIcon, YouTubeIcon, LineIcon, TiktokIcon, WhatsAppIcon } from './Icon';

interface FooterProps {
  siteInfo: SiteInfo;
  onAdminClick: () => void;
  isAdminView: boolean;
}

const Footer: React.FC<FooterProps> = ({ siteInfo, onAdminClick, isAdminView }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto border-t border-gray-800">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tight">{siteInfo.siteName}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              ศูนย์รับสร้างบ้าน บ้านดีดีวิศวกรรม มุ่งมั่นสร้างบ้านคุณภาพ ด้วยมาตรฐานวิศวกรรม และการออกแบบที่ใส่ใจทุกรายละเอียด
            </p>
          </div>

          {/* Quick Links (Example) */}
          <div className="space-y-4">
             <h4 className="text-lg font-semibold text-white">เมนูแนะนำ</h4>
             <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/designs" className="hover:text-primary transition-colors">แบบบ้านทั้งหมด</a></li>
                <li><a href="/portfolio" className="hover:text-primary transition-colors">ผลงานของเรา</a></li>
                <li><a href="/articles" className="hover:text-primary transition-colors">บทความน่ารู้</a></li>
                <li><a href="/appointment" className="hover:text-primary transition-colors">นัดหมายปรึกษา</a></li>
             </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">ติดต่อเรา</h4>
            <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                <div className="bg-gray-800 p-2 rounded-full group-hover:bg-primary transition-colors">
                    <PhoneIcon className="w-5 h-5" />
                </div>
                <a href={`tel:${siteInfo.phone.replace(/\s/g, '')}`} className="font-medium">{siteInfo.phone}</a>
            </div>
             <div className="text-sm text-gray-400">
                <p>{siteInfo.officeHours}</p>
             </div>
          </div>

          {/* Social Column */}
          <div className="space-y-4">
             <h4 className="text-lg font-semibold text-white">ติดตามเรา</h4>
             <div className="flex gap-3">
                <SocialLink href={siteInfo.socials.facebook} icon={<FacebookIcon className="w-5 h-5" />} label="Facebook" />
                <SocialLink href={siteInfo.socials.line} icon={<LineIcon className="w-5 h-5" />} label="Line" />
                <SocialLink href={siteInfo.socials.youtube} icon={<YouTubeIcon className="w-5 h-5" />} label="Youtube" />
                <SocialLink href={siteInfo.socials.tiktok} icon={<TiktokIcon className="w-5 h-5" />} label="Tiktok" />
                <SocialLink href={siteInfo.socials.whatsapp} icon={<WhatsAppIcon className="w-5 h-5" />} label="Whatsapp" />
             </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {currentYear} {siteInfo.siteName}. All Rights Reserved.</p>
          <div className="mt-4 md:mt-0 flex gap-6">
            <a href="/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <button
              onClick={onAdminClick}
              className="hover:text-gray-300 transition-colors"
            >
              {isAdminView ? 'Exit Admin' : 'Admin'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="bg-gray-800 p-3 rounded-full text-gray-400 hover:bg-white hover:text-primary transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg"
        aria-label={label}
    >
        {icon}
    </a>
);

export default Footer;
