
'use client';

import React, { Suspense } from 'react';
// FIX: Import usePathname to determine current route
import { useRouter, usePathname } from 'next/navigation';
// FIX: Import AppProvider here to wrap the layout content.
import { AppProvider, useAppContext } from '@/context/AppContext';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotificationBanner from "@/components/NotificationBanner";
import VideoModal from "@/components/VideoModal";
import MainPopupModal from "@/components/MainPopupModal";
import ToastContainer from '@/components/ToastContainer';
import PageLoader from '@/components/PageLoader';
import CookieConsent from '@/components/CookieConsent';
// FIX: Import View type for navigation handler
import { View } from '@/lib/types';

// FIX: Create an inner component to consume the context, ensuring it's a child of AppProvider.
const LayoutWithContext = ({ children }: { children: React.ReactNode }) => {
  const {
    activeNotification,
    showNotification,
    setShowNotification,
    siteInfo,
    videoModalUrl,
    setVideoModalUrl,
    isMainPopupOpen,
    setIsMainPopupOpen,
    popupModalContent,
    toasts,
    removeToast,
    homes,
  } = useAppContext();
  const router = useRouter();
  // FIX: Get current pathname to determine view state
  const pathname = usePathname();

  const handleSearch = (term: string) => {
    router.push(`/designs?q=${encodeURIComponent(term)}`);
  };

  // FIX: Implement navigation handler for Header component
  const handleNavigate = (view: View, slug?: string) => {
    let path = '/';
    if (view === 'list') {
      path = '/';
    } else if (view === 'detail' && slug) {
      path = `/designs/${slug}`;
    } else if (view === 'articleDetail' && slug) {
      path = `/articles/${slug}`;
    } else if (view === 'portfolioDetail' && slug) {
      path = `/portfolio/${slug}`;
    } else if (['designs', 'articles', 'portfolio'].includes(view)) {
      path = `/${view}`;
    } else if (view === 'customPage' && slug) {
      path = `/${slug}`;
    }
    router.push(path);
  };

  // FIX: Implement admin click handler for Footer component
  const handleAdminClick = () => {
    if (pathname === '/admin') {
      router.push('/');
    } else {
      router.push('/admin');
    }
  };

  // FIX: Determine if the current view is the admin panel
  const isAdminView = pathname === '/admin';
  
  // FIX: Derive currentView and selectedPageSlug from pathname for active link highlighting
  // FIX: Add explicit return type to useMemo to prevent `currentView` from being inferred as `string`.
  const { currentView, selectedPageSlug } = React.useMemo<{ currentView: View, selectedPageSlug: string | null }>(() => {
    const segments = pathname.split('/').filter(Boolean);

    if (pathname === '/') {
        return { currentView: 'list', selectedPageSlug: null };
    }
    
    if (segments[0] === 'designs') {
        return { currentView: segments.length > 1 ? 'detail' : 'designs', selectedPageSlug: null };
    }
    if (segments[0] === 'articles') {
        return { currentView: segments.length > 1 ? 'articleDetail' : 'articles', selectedPageSlug: null };
    }
    if (segments[0] === 'portfolio') {
        return { currentView: segments.length > 1 ? 'portfolioDetail' : 'portfolio', selectedPageSlug: null };
    }
    if (segments[0] === 'admin') {
        return { currentView: 'admin', selectedPageSlug: null };
    }

    // Default to custom page for other top-level routes
    return { currentView: 'customPage', selectedPageSlug: segments[0] || null };
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800">
      <Suspense fallback={null}>
        <PageLoader />
      </Suspense>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      {activeNotification && showNotification && (
        <NotificationBanner
          notification={activeNotification}
          onClose={() => setShowNotification(false)}
        />
      )}
      {/* FIX: Pass all required props to Header */}
      <Header
        homes={homes}
        onSearch={handleSearch}
        onNavigate={handleNavigate}
        currentView={currentView}
        selectedPageSlug={selectedPageSlug}
      />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {children}
      </main>
      {/* FIX: Conditionally render Footer only when siteInfo is not null */}
      {siteInfo && (
        <Footer 
          siteInfo={siteInfo}
          onAdminClick={handleAdminClick}
          isAdminView={isAdminView}
        />
      )}
      
      {videoModalUrl && (
        <VideoModal videoUrl={videoModalUrl} onClose={() => setVideoModalUrl(null)} />
      )}
      {/* FIX: Conditionally render MainPopupModal only when popupModalContent is not null */}
      {isMainPopupOpen && popupModalContent && (
        <MainPopupModal
          content={popupModalContent}
          onClose={() => setIsMainPopupOpen(false)}
        />
      )}
      <CookieConsent />
    </div>
  );
}

// FIX: The main export now wraps the layout content with the AppProvider.
export default function AppClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <LayoutWithContext>{children}</LayoutWithContext>
    </AppProvider>
  );
}
