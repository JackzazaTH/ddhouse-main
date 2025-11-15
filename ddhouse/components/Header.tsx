import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { View, HomeDesign, SiteInfo } from '@/lib/types';
import SearchPopup from './SearchPopup';

interface HeaderProps {
  onSearch: (term: string) => void;
  currentView: View;
  selectedPageSlug: string | null;
  homes: HomeDesign[];
  siteInfo: SiteInfo;
}

interface NavItem {
  name: string;
  view: View;
  slug?: string;
  subItems?: NavItem[];
}

const navItems: NavItem[] = [
    { name: 'หน้าแรก', view: 'list' },
    { name: 'แบบบ้าน', view: 'designs' },
    { name: 'ผลงานของเรา', view: 'portfolio' },
    {
        name: 'บริการของเรา',
        view: 'customPage',
        subItems: [
            { name: 'ขั้นตอนการสร้างบ้าน', view: 'customPage', slug: 'construction-process' },
            { name: 'ระบบก่อสร้าง & Material Spec', view: 'customPage', slug: 'system-spec' },
            { name: 'สินค้าและบริการเสริม', view: 'customPage', slug: 'extra-services' },
        ]
    },
    { name: 'บทความ', view: 'articles' },
    { name: 'ติดต่อเรา', view: 'customPage', slug: 'appointment' },
];

const DownArrowIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

const NavLink: React.FC<{ item: NavItem; currentView: View; selectedPageSlug: string | null; onNavigate: (view: View, slug?: string) => void; isMobile?: boolean; className?: string; onClick?: () => void }> = ({ item, currentView, selectedPageSlug, onNavigate, isMobile, className, onClick }) => {
    let isActive = false;
    if (item.subItems) {
        isActive = item.view === currentView && !!item.subItems.find(sub => sub.slug === selectedPageSlug);
    } else if (item.view === 'list') {
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

    const defaultClassName = isMobile
      ? "block w-full text-left py-3 text-gray-700 hover:text-primary transition-colors"
      : `font-medium transition-colors duration-300 relative py-2 md:py-1 group ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}`;

    return (
      <button
        onClick={() => {
            onNavigate(item.view, item.slug);
            if (onClick) onClick();
        }}
        className={className || defaultClassName}
      >
        {item.name}
        {!isMobile && !item.subItems && <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-accent transition-transform duration-300 ease-out transform ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>}
        {item.subItems && !isMobile && <DownArrowIcon className="w-4 h-4 ml-1 inline-block transition-transform duration-300 group-hover:rotate-180" />}
      </button>
    );
};

const Header: React.FC<HeaderProps> = ({ onSearch, currentView, selectedPageSlug, homes, siteInfo }) => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [openMobileSubMenu, setOpenMobileSubMenu] = React.useState<string | null>(null);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleNavigate = (view: View, slug?: string) => {
    let path = '/';
    if (view === 'list') {
        path = '/';
    } else if (view === 'designs') {
        path = '/designs';
    } else if (view === 'articles') {
        path = '/articles';
    } else if (view === 'portfolio') {
        path = '/portfolio';
    } else if (view === 'customPage' && slug) {
        path = `/${slug}`;
    }
    router.push(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileSubMenu(null);
  };
  
  const handleSearchSubmit = (term: string) => {
    onSearch(term);
  };

  return (
    <>
      <header className={`bg-white/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-md'}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button onClick={() => handleNavigate('list')} className="text-2xl font-bold text-primary cursor-pointer flex items-center">
            {siteInfo.logoUrl ? (
                <img src={siteInfo.logoUrl} alt={siteInfo.siteName} className="h-10 w-auto" />
            ) : (
                <>{siteInfo.siteName.substring(0,2)}<span className="text-accent">{siteInfo.siteName.substring(2)}</span></>
            )}
          </button>
          
          <div className="hidden md:flex items-center gap-6">
              <nav className="flex items-center space-x-5 text-sm lg:space-x-6 lg:text-base">
                  {navItems.map(item =>
                      item.subItems ? (
                          <div key={item.name} className="relative group">
                              <NavLink item={item} currentView={currentView} selectedPageSlug={selectedPageSlug} onNavigate={handleNavigate} isMobile={false} className={`flex items-center ${
                                (item.view === currentView && item.subItems.some(sub => sub.slug === selectedPageSlug)) ? 'text-primary' : 'text-gray-600 hover:text-primary'
                              } font-medium transition-colors duration-300 relative py-2 md:py-1`}/>
                              <div className="absolute top-full left-1/2 -translate-x-1/2 w-max bg-white shadow-lg rounded-md p-2 pt-4 hidden group-hover:block ring-1 ring-black ring-opacity-5 z-10">
                                  {item.subItems.map(subItem => (
                                      <div key={subItem.name} onClick={handleNavClick}>
                                        <NavLink item={subItem} currentView={currentView} selectedPageSlug={selectedPageSlug} onNavigate={handleNavigate} isMobile={true} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary rounded-md"/>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      ) : (
                           <NavLink key={item.name} item={item} currentView={currentView} selectedPageSlug={selectedPageSlug} onNavigate={handleNavigate} onClick={handleNavClick}/>
                      )
                  )}
              </nav>
              <button
                onClick={() => setIsSearchPopupOpen(true)}
                className="text-gray-600 hover:text-primary p-2"
                aria-label="Open search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
          </div>
          
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsSearchPopupOpen(true)}
              className="text-gray-600 hover:text-primary p-2"
              aria-label="Open search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>
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
                        {item.subItems ? (
                          <>
                            <button 
                              onClick={() => setOpenMobileSubMenu(openMobileSubMenu === item.name ? null : item.name)} 
                              className="w-full flex justify-between items-center py-3 text-gray-700 hover:text-primary transition-colors"
                            >
                              <span>{item.name}</span>
                              <DownArrowIcon className={`w-5 h-5 transition-transform ${openMobileSubMenu === item.name ? 'rotate-180' : ''}`} />
                            </button>
                            {openMobileSubMenu === item.name && (
                              <div className="pl-4 pb-2">
                                {item.subItems.map(subItem => (
                                  <div key={subItem.name} onClick={handleNavClick}>
                                    <NavLink item={subItem} currentView={currentView} selectedPageSlug={selectedPageSlug} onNavigate={handleNavigate} isMobile={true} />
                                  </div>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                           <NavLink item={item} currentView={currentView} selectedPageSlug={selectedPageSlug} onNavigate={handleNavigate} isMobile={true} onClick={handleNavClick}/>
                        )}
                      </div>
                  ))}
                </div>
            </nav>
        )}
      </header>
      <SearchPopup 
        isOpen={isSearchPopupOpen}
        onClose={() => setIsSearchPopupOpen(false)}
        onSearch={handleSearchSubmit}
        homes={homes || []}
      />
    </>
  );
};

export default Header;