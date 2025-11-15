'use client';
import React, { useState, useEffect } from 'react';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (consent === null) {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (consent: boolean) => {
    localStorage.setItem('cookie_consent', consent.toString());
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-[101] animate-fade-in-up shadow-2xl md:flex md:items-center md:justify-between">
      <p className="text-sm md:text-base mb-4 md:mb-0">
        เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์ของคุณในเว็บไซต์ของเรา{' '}
        <a href="/privacy-policy" className="underline hover:text-accent">
          เรียนรู้เพิ่มเติม
        </a>
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => handleConsent(true)}
          className="bg-primary hover:bg-secondary text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
        >
          ยอมรับ
        </button>
        <button
          onClick={() => handleConsent(false)}
          className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
        >
          ปฏิเสธ
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
