
import React from 'react';
import { Article } from '../lib/types';
import ArticleCard from './ArticleCard';

interface ArticleListViewProps {
  articles: Article[];
  onSelectArticle: (slug: string) => void;
}

const ArticleListView: React.FC<ArticleListViewProps> = ({ articles, onSelectArticle }) => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">บทความและสาระน่ารู้</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">อัปเดตเทรนด์ล่าสุด เคล็ดลับการสร้างบ้าน และแรงบันดาลใจในการออกแบบจากเรา</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <ArticleCard 
            key={article.id}
            article={article}
            onSelect={onSelectArticle}
            animationDelay={`${index * 100}ms`}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticleListView;