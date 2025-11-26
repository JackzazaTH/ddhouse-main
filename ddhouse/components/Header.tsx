import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { View, HomeDesign, SiteInfo, CustomPage } from '@/lib/types';
import SearchPopup from './SearchPopup';

interface HeaderProps {
  onSearch: (term: string) => void;
  currentView: View;
  selectedPageSlug: string | null;
  homes: HomeDesign[];
  siteInfo: SiteInfo;
  customPages?: CustomPage[];
}

interface NavItem {
  name: string;
  view: View;
  slug?: string;
  subItems?: NavItem[];
}

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
        if (item.slug === 'portfolio' && (currentView === 'portfolio' || currentView === 'portfolioDetail')) {
            isActive = true;
        }
    }

    const defaultClassName = isMobile
      ? `block w-full text-left py-3 px-4 rounded-lg transition-all ${isActive ? 'bg-red-50 text-primary font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`
      : `font-medium transition-all duration-300 relative py-2 px-1 group ${isActive ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'}`;

    return (
      <button
        onClick={() => {
            onNavigate(item.view, item.slug);
            if (onClick) onClick();
        }}
        className={className || defaultClassName}
      >
        {item.name}
        {!isMobile && !item.subItems && (
            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full transition-all duration-300 ease-out transform origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 opacity-50'}`}></span>
        )}
        {item.subItems && !isMobile && <DownArrowIcon className={`w-4 h-4 ml-1 inline-block transition-transform duration-300 ${isActive ? 'rotate-180' : 'group-hover:rotate-180'}`} />}
      </button>
    );
};

const Header: React.FC<HeaderProps> = ({ onSearch, currentView, selectedPageSlug, homes, siteInfo, customPages = [] }) => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [openMobileSubMenu, setOpenMobileSubMenu] = React.useState<string | null>(null);
  const [isSearchPopupOpen, setIsSearchPopupOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const navItems: NavItem[] = useMemo(() => {
      const servicePages = customPages
        .filter(p => p.menuLocation === 'service_submenu')
        .sort((a, b) => (a.order || 0) - (b.order || 0));

      const primaryPages = customPages
        .filter(p => p.menuLocation === 'primary')
        .sort((a, b) => (a.order || 0) - (b.order || 0));

      const serviceSubItems: NavItem[] = servicePages.map(page => ({
        name: page.title,
        view: 'customPage',
        slug: page.slug
      }));

      const baseItems: NavItem[] = [
        { name: 'หน้าแรก', view: 'list' },
        { name: 'แบบบ้าน', view: 'designs' },
      ];

      const primaryNavItems: NavItem[] = primaryPages.map(page => ({
          name: page.title,
          view: 'customPage',
          slug: page.slug
      }));
      
      const items = [...baseItems, ...primaryNavItems];

      if (serviceSubItems.length > 0) {
          items.push({
              name: 'บริการของเรา',
              view: 'customPage',
              subItems: serviceSubItems
          });
      }

      items.push({ name: 'บทความ', view: 'articles' });

      return items;
  }, [customPages]);

  const handleNavigate = (view: View, slug?: string) => {
    let path = '/';
    if (view === 'list') path = '/';
    else if (view === 'designs') path = '/designs';
    else if (view === 'articles') path = '/articles';
    else if (view === 'portfolio') path = '/portfolio';
    else if (view === 'customPage' && slug) path = `/${slug}`;
    router.push(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileSubMenu(null);
  };
  
  const handleSearchSubmit = (term: string) => {
    onSearch(term);
  };

  return (
    <>
      <header 
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out w-full border-b ${
            isScrolled 
            ? 'bg-white/90 backdrop-blur-xl shadow-soft border-gray-200/50 py-2' 
            : 'bg-white/80 backdrop-blur-md py-4 border-transparent'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <button onClick={() => handleNavigate('list')} className="cursor-pointer flex items-center group">
            {siteInfo.logoUrl ? (
                <img src={siteInfo.logoUrl} alt={siteInfo.siteName} className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
            ) : (
                <div className="flex flex-col items-start">
                    <span className="text-2xl font-extrabold text-primary tracking-tight leading-none">{siteInfo.siteName}</span>
                    {siteInfo.siteTagline && (
                        <span className="text-xs font-medium text-gray-500 tracking-wide hidden lg:inline-block mt-0.5">
                            {siteInfo.siteTagline}
                        </span>
                    )}
                </div>
            )}
          </button>
          
          <div className="hidden lg:flex items-center gap-8">
              <nav className="flex items-center space-x-8">
                  {navItems.map(item =>
                      item.subItems ? (
                          <div key={item.name} className="relative group h-full flex items-center">
                              <NavLink item={item} currentView={currentView} selectedPageSlug={selectedPageSlug} onNavigate={handleNavigate} isMobile={false} />
                              
                              {/* Improved Dropdown */}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-64 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
                                  <div className="bg-white rounded-xl shadow-glass border border-gray-100 p-2 overflow-hidden ring-1 ring-black/5">
                                      {item.subItems.map(subItem => (
                                          <div key={subItem.name} onClick={handleNavClick}>
                                            <NavLink 
                                                item={subItem} 
                                                currentView={currentView} 
                                                selectedPageSlug={selectedPageSlug} 
                                                onNavigate={handleNavigate} 
                                                isMobile={true} // Reusing mobile styling for dropdown items
                                                className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-primary rounded-lg transition-colors duration-200 font-medium"
                                            />
                                          </div>
                                      ))}
                                  </div>
                              </div>
                          </div>
                      ) : (
                           <NavLink key={item.name} item={item} currentView={currentView} selectedPageSlug={selectedPageSlug} onNavigate={handleNavigate} onClick={handleNavClick}/>
                      )
                  )}
              </nav>
              
              <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                  <button
                    onClick={() => setIsSearchPopupOpen(true)}
                    className="text-gray-500 hover:text-primary hover:bg-red-50 p-2.5 rounded-full transition-all duration-300"
                    aria-label="Open search"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </button>
              </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={() => setIsSearchPopupOpen(true)}
              className="text-gray-600 hover:text-primary p-1"
              aria-label="Open search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle mobile menu" className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                {isMobileMenuOpen ? (
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
            <div className="lg:hidden bg-white/95 backdrop-blur-xl shadow-xl absolute top-full left-0 w-full animate-fade-in-down border-b border-gray-200 h-screen max-h-[calc(100vh-4rem)] overflow-y-auto">
                <div className="flex flex-col px-4 py-6 space-y-2">
                  {navItems.map(item => (
                      <div key={item.name} className="border-b border-gray-50 last:border-b-0 pb-2 mb-2 last:mb-0 last:pb-0">
                        {item.subItems ? (
                          <div className="bg-gray-50/50 rounded-xl overflow-hidden">
                            <button 
                              onClick={() => setOpenMobileSubMenu(openMobileSubMenu === item.name ? null : item.name)} 
                              className="w-full flex justify-between items-center py-4 px-4 text-gray-800 font-bold hover:text-primary transition-colors"
                            >
                              <span className="text-base">{item.name}</span>
                              <DownArrowIcon className={`w-5 h-5 transition-transform duration-300 text-gray-400 ${openMobileSubMenu === item.name ? 'rotate-180 text-primary' : ''}`} />
                            </button>
                            <div className={`transition-all duration-300 ease-in-out ${openMobileSubMenu === item.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                              <div className="px-4 pb-4 space-y-1">
                                {item.subItems.map(subItem => (
                                  <div key={subItem.name} onClick={handleNavClick}>
                                    <NavLink item={subItem} currentView={currentView} selectedPageSlug={selectedPageSlug} onNavigate={handleNavigate} isMobile={true} />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                           <NavLink item={item} currentView={currentView} selectedPageSlug={selectedPageSlug} onNavigate={handleNavigate} isMobile={true} onClick={handleNavClick} />
                        )}
                      </div>
                  ))}
                </div>
            </div>
        )}
      </header>

      <SearchPopup 
        isOpen={isSearchPopupOpen}
        onClose={() => setIsSearchPopupOpen(false)}
        onSearch={handleSearchSubmit}
        homes={homes || []}
      />

      <button
        onClick={scrollToTop}
        className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 z-40 bg-white text-primary p-3.5 rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:bg-primary hover:text-white hover:-translate-y-1 transition-all duration-300 transform ${
            showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        } border border-gray-100`}
        aria-label="Scroll to top"
      >
         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
         </svg>
      </button>
    </>
  );
};

export default Header;