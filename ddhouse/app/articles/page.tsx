'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import ArticleListView from '@/components/ArticleListView';

export default function ArticlesPage() {
    const router = useRouter();
    const { articles } = useAppContext();

    const handleSelectArticle = (slug: string) => {
        router.push(`/articles/${slug}`);
    };

    return (
        <ArticleListView 
            articles={articles}
            onSelectArticle={handleSelectArticle}
        />
    );
}
