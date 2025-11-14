'use client';
import React from 'react';
import { useAppContext } from '@/context/AppContext';
import ArticleDetailView from '@/components/ArticleDetailView';
import { View } from '@/lib/types';

interface ArticleDetailPageProps {
    params: { slug: string };
    onNavigate: (view: View, slug?: string) => void;
}

export default function ArticleDetailPage({ params, onNavigate }: ArticleDetailPageProps) {
    const { articles } = useAppContext();
    
    const slug = params.slug;
    const selectedArticle = articles.find(article => article.slug === slug);

    if (!selectedArticle) {
        return <div className="text-center py-20">
            <h1 className="text-2xl font-bold">Article Not Found</h1>
            <p className="text-gray-600 mt-2">The article you are looking for does not exist.</p>
        </div>;
    }

    return (
        <ArticleDetailView 
            article={selectedArticle} 
            onBack={() => onNavigate('articles')}
        />
    );
}
