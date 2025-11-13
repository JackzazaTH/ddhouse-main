'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const PageLoader: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 h-1 bg-accent z-[999] transition-all duration-500 ease-out ${
        loading ? 'w-full opacity-100' : 'w-0 opacity-0'
      }`}
      style={{
          transitionProperty: 'width, opacity',
      }}
    />
  );
};

export default PageLoader;
