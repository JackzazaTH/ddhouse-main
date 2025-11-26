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
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div>
                <h3 className="text-3xl font-extrabold text-white tracking-tight mb-1">{siteInfo.siteName}</h3>
                <div className="h-1 w-12 bg-primary rounded-full"></div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              ศูนย์รับสร้างบ้าน บ้านดีดีวิศวกรรม มุ่งมั่นสร้างบ้านคุณภาพ ด้วยมาตรฐานวิศวกรรม และการออกแบบที่ใส่ใจทุกรายละเอียด เพื่อบ้านในฝันที่เป็นจริง
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
             <h4 className="text-lg font-bold text-white">เมนูแนะนำ</h4>
             <ul className="space-y-3 text-sm">
                <li><a href="/designs" className="hover:text-primary transition-colors duration-300 flex items-center gap-2"><span className="text-gray-600">›</span> แบบบ้านทั้งหมด</a></li>
                <li><a href="/portfolio" className="hover:text-primary transition-colors duration-300 flex items-center gap-2"><span className="text-gray-600">›</span> ผลงานของเรา</a></li>
                <li><a href="/articles" className="hover:text-primary transition-colors duration-300 flex items-center gap-2"><span className="text-gray-600">›</span> บทความน่ารู้</a></li>
                <li><a href="/appointment" className="hover:text-primary transition-colors duration-300 flex items-center gap-2"><span className="text-gray-600">›</span> นัดหมายปรึกษา</a></li>
             </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-white">ติดต่อเรา</h4>
            <div className="space-y-4">
                <a href={`tel:${siteInfo.phone.replace(/\s/g, '')}`} className="flex items-center gap-4 group">
                    <div className="bg-gray-800 p-3 rounded-full group-hover:bg-primary transition-colors text-white">
                        <PhoneIcon className="w-5 h-5" />
                    </div>
                    <div>
                        <span className="block text-xs text-gray-500 uppercase tracking-wider">Call Center</span>
                        <span className="text-lg font-bold text-white group-hover:text-primary transition-colors">{siteInfo.phone}</span>
                    </div>
                </a>
                <div className="flex items-start gap-4">
                     <div className="bg-gray-800 p-3 rounded-full text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                        <span className="block text-xs text-gray-500 uppercase tracking-wider">Office Hours</span>
                        <span className="text-sm">{siteInfo.officeHours}</span>
                    </div>
                </div>
            </div>
          </div>

          {/* Social Column */}
          <div className="space-y-6">
             <h4 className="text-lg font-bold text-white">ติดตามเรา</h4>
             <div className="flex flex-wrap gap-3">
                <SocialLink href={siteInfo.socials.facebook} icon={<FacebookIcon className="w-5 h-5" />} label="Facebook" />
                <SocialLink href={siteInfo.socials.line} icon={<LineIcon className="w-5 h-5" />} label="Line" />
                <SocialLink href={siteInfo.socials.youtube} icon={<YouTubeIcon className="w-5 h-5" />} label="Youtube" />
                <SocialLink href={siteInfo.socials.tiktok} icon={<TiktokIcon className="w-5 h-5" />} label="Tiktok" />
                <SocialLink href={siteInfo.socials.whatsapp} icon={<WhatsAppIcon className="w-5 h-5" />} label="Whatsapp" />
             </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <p>&copy; {currentYear} {siteInfo.siteName}. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
            <button
              onClick={onAdminClick}
              className="hover:text-white transition-colors bg-gray-800 px-3 py-1 rounded text-xs"
            >
              {isAdminView ? 'Exit Admin' : 'Admin Panel'}
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
        className="bg-gray-800 text-gray-400 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white hover:text-primary transition-all duration-300 hover:-translate-y-1 shadow-lg"
        aria-label={label}
    >
        {icon}
    </a>
);

export default Footer;