
'use client';

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotificationBanner from "@/components/NotificationBanner";
import VideoModal from "@/components/VideoModal";
import MainPopupModal from "@/components/MainPopupModal";
import ToastContainer from '@/components/ToastContainer';

export default function AppClientLayout({ children }: { children: React.ReactNode }) {
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
  } = useAppContext();

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      {activeNotification && showNotification && (
        <NotificationBanner
          notification={activeNotification}
          onClose={() => setShowNotification(false)}
        />
      )}
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {children}
      </main>
      <Footer siteInfo={siteInfo} />
      
      {videoModalUrl && (
        <VideoModal videoUrl={videoModalUrl} onClose={() => setVideoModalUrl(null)} />
      )}
      {isMainPopupOpen && (
        <MainPopupModal
          content={popupModalContent}
          onClose={() => setIsMainPopupOpen(false)}
        />
      )}
    </div>
  );
}