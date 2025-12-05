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
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div>
                <h3 className="text-3xl font-extrabold text-white tracking-tight mb-2">{siteInfo.siteName}</h3>
                <div className="h-1.5 w-16 bg-gradient-to-r from-primary to-red-600 rounded-full"></div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-light pr-4">
              ศูนย์รับสร้างบ้าน บ้านดีดีวิศวกรรม มุ่งมั่นสร้างบ้านคุณภาพ ด้วยมาตรฐานวิศวกรรม และการออกแบบที่ใส่ใจทุกรายละเอียด เพื่อบ้านในฝันที่เป็นจริง
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
             <h4 className="text-lg font-bold text-white tracking-wide">เมนูแนะนำ</h4>
             <ul className="space-y-3.5 text-sm">
                <li><a href="/designs" className="hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-3 group"><span className="text-primary group-hover:text-white transition-colors">›</span> แบบบ้านทั้งหมด</a></li>
                <li><a href="/portfolio" className="hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-3 group"><span className="text-primary group-hover:text-white transition-colors">›</span> ผลงานของเรา</a></li>
                <li><a href="/articles" className="hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-3 group"><span className="text-primary group-hover:text-white transition-colors">›</span> บทความน่ารู้</a></li>
                <li><a href="/appointment" className="hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-3 group"><span className="text-primary group-hover:text-white transition-colors">›</span> นัดหมายปรึกษา</a></li>
             </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-white tracking-wide">ติดต่อเรา</h4>
            <div className="space-y-5">
                <a href={`tel:${siteInfo.phone.replace(/\s/g, '')}`} className="flex items-center gap-4 group bg-gray-800/50 p-3 rounded-2xl hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-700">
                    <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary group-hover:text-white transition-all text-primary">
                        <PhoneIcon className="w-5 h-5" />
                    </div>
                    <div>
                        <span className="block text-[10px] text-gray-500 uppercase tracking-wider font-bold">Call Center</span>
                        <span className="text-lg font-bold text-white tracking-wide">{siteInfo.phone}</span>
                    </div>
                </a>
                <div className="flex items-start gap-4 p-2">
                     <div className="mt-1 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                        <span className="block text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-1">Office Hours</span>
                        <span className="text-sm text-gray-300">{siteInfo.officeHours}</span>
                    </div>
                </div>
            </div>
          </div>

          {/* Social Column */}
          <div className="space-y-6">
             <h4 className="text-lg font-bold text-white tracking-wide">ติดตามเรา</h4>
             <div className="flex flex-wrap gap-3">
                <SocialLink href={siteInfo.socials.facebook} icon={<FacebookIcon className="w-5 h-5" />} label="Facebook" color="hover:bg-[#1877F2]" />
                <SocialLink href={siteInfo.socials.line} icon={<LineIcon className="w-5 h-5" />} label="Line" color="hover:bg-[#00C300]" />
                <SocialLink href={siteInfo.socials.youtube} icon={<YouTubeIcon className="w-5 h-5" />} label="Youtube" color="hover:bg-[#FF0000]" />
                <SocialLink href={siteInfo.socials.tiktok} icon={<TiktokIcon className="w-5 h-5" />} label="Tiktok" color="hover:bg-black border hover:border-gray-700" />
                <SocialLink href={siteInfo.socials.whatsapp} icon={<WhatsAppIcon className="w-5 h-5" />} label="Whatsapp" color="hover:bg-[#25D366]" />
             </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>&copy; {currentYear} <span className="text-gray-400 font-semibold">{siteInfo.siteName}</span>. All Rights Reserved.</p>
          <div className="flex items-center gap-8">
            <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
            <button
              onClick={onAdminClick}
              className="hover:text-white transition-colors opacity-50 hover:opacity-100"
            >
              {isAdminView ? 'Exit Admin' : 'Admin'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink: React.FC<{ href: string; icon: React.ReactNode; label: string; color?: string }> = ({ href, icon, label, color }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`bg-gray-800 text-gray-400 w-11 h-11 flex items-center justify-center rounded-xl hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-lg ${color || 'hover:bg-primary'}`}
        aria-label={label}
    >
        {icon}
    </a>
);

export default Footer;