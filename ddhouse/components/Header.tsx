'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { View } from '@/lib/types';

interface HeaderProps {
  onNavigate?: (view: View, slug?: string) => void;
  currentView?: View;
  selectedPageSlug?: string | null;
}

interface NavItem {
  name: string;
  href: string;
  view: View;
  slug?: string;
}

const navItems: NavItem[] = [
    { name: 'หน้าแรก', href: '/', view: 'list' },
    { name: 'แบบบ้าน', href: '/designs', view: 'designs' },
    { name: 'ผลงานของเรา', href: '/portfolio', view: 'portfolio' },
    { name: 'ขั้นตอนการสร้างบ้าน', href: '/construction-process', view: 'customPage', slug: 'construction-process' },
    { name: 'ระบบก่อสร้าง & Material Spec', href: '/system-spec', view: 'customPage', slug: 'system-spec' },
    { name: 'สินค้าและบริการเสริม', href: '/extra-services', view: 'customPage', slug: 'extra-services' },
    { name: 'บทความ', href: '/articles', view: 'articles' },
    { name: 'นัดหมายปรึกษาสถาปนิก', href: '/appointment', view: 'customPage', slug: 'appointment' },
];


const SpaNavLink: React.FC<{ item: NavItem; onClick: () => void; currentView: View; selectedPageSlug: string | null; onNavigate: (view: View, slug?: string) => void; isMobile?: boolean; }> = ({ item, onClick, currentView, selectedPageSlug, onNavigate, isMobile }) => {
    let isActive = false;
    if (item.view === 'list') {
        isActive = currentView === 'list';
    } else if (item.view === 'designs') {
        isActive = currentView === 'designs' || currentView === 'detail';
    } else if (item.view === 'articles') {
        isActive = currentView === 'articles' || currentView === 'articleDetail';
    } else if (item.view === 'portfolio') {
        isActive = currentView === 'portfolio' || currentView === 'portfolioDetail';
    } else if (item.view === 'customPage' && item.slug) {
        isActive = currentView === 'customPage' && selectedPageSlug === item.slug;
    }

    const className = isMobile
      ? "block w-full text-left py-3 text-gray-700 hover:text-primary transition-colors"
      : `font-medium transition-colors duration-300 relative py-2 md:py-1 group ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}`;

    return (
      <button
        onClick={() => {
          onClick();
          onNavigate(item.view, item.slug);
        }}
        className={className}
      >
        {item.name}
        {!isMobile && <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-accent transition-transform duration-300 ease-out transform ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>}
      </button>
    );
};

const NextNavLink: React.FC<{ item: NavItem; onClick: () => void; isMobile?: boolean; }> = ({ item, onClick, isMobile }) => {
    const pathname = usePathname();
    const params = useParams();

    // FIX: Argument of type 'unknown' is not assignable to parameter of type 'string'.
    const slug = (Array.isArray(params.slug) ? params.slug[0] : params.slug) as string | undefined;

    // FIX: Declare isActive variable before use.
    let isActive = false;

    if (item.href === '/') {
        isActive = pathname === '/';
    } else if (item.href.startsWith('/designs')) {
        isActive = pathname.startsWith('/designs');
    } else if (item.href.startsWith('/articles')) {
        isActive = pathname.startsWith('/articles');
    } else if (item.href.startsWith('/portfolio')) {
        isActive = pathname.startsWith('/portfolio');
    } else {
        isActive = pathname === item.href || (!!item.slug && slug === item.slug);
    }

    const className = isMobile
      ? "block py-3 text-gray-700 hover:text-primary transition-colors"
      : `font-medium transition-colors duration-300 relative py-2 md:py-1 group ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}`;

    return (
       <Link 
          href={item.href}
          onClick={onClick}
          className={className}
        >
          {item.name}
          {!isMobile && <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-accent transition-transform duration-300 ease-out transform ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>}
        </Link>
    );
};

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView, selectedPageSlug }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {onNavigate ? (
          <button onClick={() => onNavigate('list')} className="text-2xl font-bold text-primary cursor-pointer">
            DD<span className="text-accent">HOUSE</span>
          </button>
        ) : (
          <Link href="/" className="text-2xl font-bold text-primary cursor-pointer">
            DD<span className="text-accent">HOUSE</span>
          </Link>
        )}
        
        <nav className="hidden md:flex items-center space-x-5 text-sm lg:space-x-6 lg:text-base">
          {navItems.map(item =>
            onNavigate && currentView && selectedPageSlug !== undefined
              ? <SpaNavLink key={item.name} item={item} onClick={handleNavClick} currentView={currentView} selectedPageSlug={selectedPageSlug} onNavigate={onNavigate} />
              : <NextNavLink key={item.name} item={item} onClick={handleNavClick} />
          )}
        </nav>
        
        <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle mobile menu">
                {isMobileMenuOpen ? (
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                )}
            </button>
        </div>
      </div>
      
      {isMobileMenuOpen && (
          <nav className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full animate-fade-in-down">
              <div className="flex flex-col px-4 py-2">
                {navItems.map(item => (
                    <div key={item.name} className="border-b last:border-b-0">
                      {onNavigate && currentView && selectedPageSlug !== undefined
                        ? <SpaNavLink key={item.name} item={item} onClick={handleNavClick} currentView={currentView} selectedPageSlug={selectedPageSlug} onNavigate={onNavigate} isMobile={true} />
                        : <NextNavLink key={item.name} item={item} onClick={handleNavClick} isMobile={true} />}
                    </div>
                ))}
              </div>
          </nav>
      )}
    </header>
  );
};

export default Header;