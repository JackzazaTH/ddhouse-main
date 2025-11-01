
'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SiteInfo } from '@/lib/types';
import { PhoneIcon, FacebookIcon, YouTubeIcon, LineIcon, TiktokIcon, InstagramIcon } from './Icon';

interface FooterProps {
  siteInfo: SiteInfo;
  onAdminClick?: () => void;
  isAdminView?: boolean;
}

// This component is only used within the Next.js app router context.
const NextJsAdminLink: React.FC = () => {
  const pathname = usePathname();
  const isAdminView = pathname === '/admin';

  return (
    <Link
      href={isAdminView ? '/' : '/admin'}
      className="text-xs text-gray-500 hover:text-white hover:underline transition-colors duration-200"
    >
      {isAdminView ? 'Exit Admin Panel' : 'Admin Panel'}
    </Link>
  );
}

const Footer: React.FC<FooterProps> = ({ siteInfo, onAdminClick, isAdminView }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold">DD<span className="text-accent">HOUSE</span></h3>
            <p className="text-sm text-gray-400 mt-2">Your trusted partner in home design.</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4 flex-1">
             <div className="flex items-center gap-3 text-lg font-semibold">
                <PhoneIcon className="w-6 h-6 text-accent" />
                <a href={`tel:${siteInfo.phone.replace(/\s/g, '')}`} className="hover:text-accent transition-colors">{siteInfo.phone}</a>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <a href={siteInfo.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform duration-300 hover:scale-110"><FacebookIcon className="w-6 h-6" /></a>
              <a href={siteInfo.socials.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform duration-300 hover:scale-110"><YouTubeIcon className="w-6 h-6" /></a>
              <a href={siteInfo.socials.line} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform duration-300 hover:scale-110"><LineIcon className="w-6 h-6" /></a>
              <a href={siteInfo.socials.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform duration-300 hover:scale-110"><TiktokIcon className="w-6 h-6" /></a>
              <a href={siteInfo.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-transform duration-300 hover:scale-110"><InstagramIcon className="w-6 h-6" /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} DDHOUSE. All Rights Reserved.</p>
          <div className="mt-2">
            {onAdminClick ? (
              <button
                onClick={onAdminClick}
                className="text-xs text-gray-500 hover:text-white hover:underline transition-colors duration-200"
              >
                {isAdminView ? 'Exit Admin Panel' : 'Admin Panel'}
              </button>
            ) : (
              <NextJsAdminLink />
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;