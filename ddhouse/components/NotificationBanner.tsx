

import React from 'react';
import { SiteNotification } from '@/lib/types';

interface NotificationBannerProps {
  notification: SiteNotification;
  onClose: () => void;
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({ notification, onClose }) => {
  return (
    <div className="bg-primary text-white p-3 text-center text-sm relative animate-fade-in-down z-[51]">
      <span>{notification.message}</span>
      {notification.link && notification.linkLabel && (
        <a href={notification.link} className="underline font-bold ml-2 hover:text-accent transition-colors">
          {notification.linkLabel}
        </a>
      )}
      <button onClick={onClose} className="absolute top-1/2 right-4 -translate-y-1/2 font-bold text-2xl hover:text-accent transition-colors" aria-label="Close notification">
        &times;
      </button>
    </div>
  );
};

export default NotificationBanner;