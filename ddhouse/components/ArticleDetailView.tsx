import React from 'react';
import Link from 'next/link';
import { Article } from '@/lib/types';

interface ArticleDetailViewProps {
  article: Article;
  onBack?: () => void;
}

const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({ article, onBack }) => {

  const BackButton = () => (
    <div className="mb-6">
       {onBack ? (
        <button
          onClick={onBack}
          className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-primary transition-colors duration-300 flex items-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>Back to Articles</span>
        </button>
      ) : (
        <Link
          href="/articles"
          className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-primary transition-colors duration-300 flex items-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>Back to Articles</span>
        </Link>
      )}
    </div>
  );


  return (
    <div className="bg-white p-4 sm:p-8 rounded-xl shadow-2xl animate-fade-in max-w-4xl mx-auto">
      <BackButton />

      <article>
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{article.title}</h1>
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <span>By {article.author}</span>
          <span className="mx-2">|</span>
          <span>Published on {article.publishedDate}</span>
        </div>
        
        <img src={article.imageUrl} alt={article.title} className="w-full h-auto max-h-[400px] object-cover rounded-lg shadow-lg mb-8" />
        
        <div 
            className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }}
        />

        {article.tags && article.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <span key={tag} className="bg-gray-200 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default ArticleDetailView;