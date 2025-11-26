import type { Metadata } from 'next'
import { INITIAL_ARTICLES } from '@/lib/constants';
import ArticleDetailView from '@/components/ArticleDetailView';
import React from 'react';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug
 
  const article = INITIAL_ARTICLES.find((a) => a.slug === slug);
 
  if (!article) {
    return {
        title: "Article Not Found",
        description: "The article you are looking for does not exist."
    }
  }

  const title = article.seo?.title || article.title;
  const description = article.seo?.description || article.excerpt;

  return {
    title: `${title} | DDHOUSE`,
    description: description,
    openGraph: {
      title: `${title} | DDHOUSE`,
      description: description,
      images: [article.imageUrl],
    },
  }
}

// This is now a Server Component
export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    const selectedArticle = INITIAL_ARTICLES.find(article => article.slug === slug);

    if (!selectedArticle) {
        return <div className="text-center py-20">
            <h1 className="text-2xl font-bold">Article Not Found</h1>
            <p className="text-gray-600 mt-2">The article you are looking for does not exist.</p>
        </div>;
    }

    // Render the view component, but without the onBack prop,
    // so it will use the <Link> component internally.
    return (
        <ArticleDetailView 
            article={selectedArticle} 
        />
    );
}