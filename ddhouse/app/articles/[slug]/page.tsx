import type { Metadata } from 'next'
import { fetchArticles } from '@/lib/data';
import ArticleDetailView from '@/components/ArticleDetailView';
import React from 'react';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug
  
  // In a real app, you would fetch a single item: await fetchArticleBySlug(slug);
  const articles = await fetchArticles();
  const article = articles.find((a) => a.slug === slug);
 
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

export async function generateStaticParams() {
  const articles = await fetchArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    
    // In a real app, you would fetch a single item: await fetchArticleBySlug(slug);
    const articles = await fetchArticles();
    const selectedArticle = articles.find(article => article.slug === slug);

    if (!selectedArticle) {
        notFound();
    }

    return (
        <ArticleDetailView 
            article={selectedArticle} 
        />
    );
}