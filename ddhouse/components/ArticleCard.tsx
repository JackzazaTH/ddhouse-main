

import React from 'react';
import { Article } from '@/lib/types';

interface ArticleCardProps {
  article: Article;
  onSelect: (slug: string) => void;
  animationDelay?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onSelect, animationDelay }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer group animate-fade-in-up"
      style={{ animationDelay, animationFillMode: 'backwards' }}
      onClick={() => onSelect(article.slug)}
    >
      <div className="relative overflow-hidden h-56">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
      </div>
      <div className="p-6">
        <p className="text-sm text-gray-500 mb-2">{article.publishedDate} • {article.author}</p>
        <h3 className="text-xl font-bold text-primary mb-3 h-14 overflow-hidden">{article.title}</h3>
        <p className="text-gray-600 mb-4 h-24 overflow-hidden text-ellipsis">{article.excerpt}</p>
        <div className="text-right">
            <span className="font-semibold text-secondary group-hover:text-primary transition-colors">อ่านต่อ &rarr;</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;