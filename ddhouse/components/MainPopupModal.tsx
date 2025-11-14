'use client';
import React from 'react';
import { PopupModalContent, View } from '@/lib/types';

interface MainPopupModalProps {
  content: PopupModalContent;
  onClose: () => void;
  onNavigate: (view: View, slug?: string) => void;
}

const MainPopupModal: React.FC<MainPopupModalProps> = ({ content, onClose, onNavigate }) => {
  const handleCTAClick = () => {
    if (onNavigate) {
      if (content.linkType === 'page') {
        onNavigate('customPage', content.linkValue);
      } else if (content.linkType === 'view') {
        onNavigate(content.linkValue as View, undefined);
      } else if (content.linkType === 'url') {
        window.open(content.linkValue, '_blank', 'noopener,noreferrer');
      }
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[100] animate-fade-in p-4"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-200 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold hover:bg-gray-300 transition-colors z-10"
          aria-label="Close popup"
        >
          &times;
        </button>
        <img src={content.imageUrl} alt={content.title} className="w-full h-56 object-cover" />
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-2">{content.title}</h2>
          <p className="text-gray-600 mb-6">{content.description}</p>
          <button
            onClick={handleCTAClick}
            className="w-full bg-secondary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            {content.ctaText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPopupModal;
