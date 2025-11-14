

'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PromoCard, View } from '@/lib/types';

interface PromoGridProps {
  cards: PromoCard[];
  onNavigate?: (view: View, slug?: string) => void;
}

const sizeToClassMap: Record<PromoCard['size'], string> = {
  '1x1': 'md:col-span-1 h-80',
  '2x1': 'md:col-span-2 h-80',
  '3x1': 'md:col-span-3 h-64',
};

const CardContent: React.FC<{ card: PromoCard }> = ({ card }) => (
  <>
    <Image 
      src={card.imageUrl} 
      alt={card.title} 
      fill
      sizes="(max-width: 768px) 100vw, 33vw"
      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/70"></div>
    <div className="absolute bottom-0 left-0 p-6 text-white">
      <h3 className="text-2xl font-bold drop-shadow-md">{card.title}</h3>
      {card.subtitle && <p className="text-xl font-semibold drop-shadow-md">{card.subtitle}</p>}
    </div>
  </>
);

const SpaPromoCard: React.FC<{ card: PromoCard; onNavigate: (view: View, slug?: string) => void; }> = ({ card, onNavigate }) => {
  const handleClick = () => {
    if (card.linkType === 'page') {
      onNavigate('customPage', card.linkValue);
    } else if (card.linkType === 'view') {
      onNavigate(card.linkValue as View, undefined);
    } else if (card.linkType === 'url') {
      window.open(card.linkValue, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`relative rounded-xl overflow-hidden shadow-lg group cursor-pointer ${sizeToClassMap[card.size] || 'md:col-span-1'}`}
      onClick={handleClick}
    >
      <CardContent card={card} />
    </div>
  );
};

const NextJsPromoCard: React.FC<{ card: PromoCard }> = ({ card }) => {
  const router = useRouter();

  const handleClick = () => {
    if (card.linkType === 'page' || card.linkType === 'view') {
      router.push(`/${card.linkValue}`);
    } else if (card.linkType === 'url') {
      window.open(card.linkValue, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`relative rounded-xl overflow-hidden shadow-lg group cursor-pointer ${sizeToClassMap[card.size] || 'md:col-span-1'}`}
      onClick={handleClick}
    >
      <CardContent card={card} />
    </div>
  );
};

const PromoGrid: React.FC<PromoGridProps> = ({ cards, onNavigate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards
        .sort((a, b) => a.order - b.order)
        .map(card =>
          onNavigate
            ? <SpaPromoCard key={card.id} card={card} onNavigate={onNavigate} />
            : <NextJsPromoCard key={card.id} card={card} />
        )}
    </div>
  );
};

export default PromoGrid;