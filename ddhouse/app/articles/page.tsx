'use client';
import React from 'react';
import { useAppContext } from '@/context/AppContext';
import ArticleListView from '@/components/ArticleListView';
import { View } from '@/lib/types';

interface ArticlesPageProps {
     onNavigate: (view: View, slug?: string) => void;
}

export default function ArticlesPage({ onNavigate }: ArticlesPageProps) {
    const { articles } = useAppContext();

    const handleSelectArticle = (slug: string) => {
        onNavigate('articleDetail', slug);
    };

    return (
        <ArticleListView 
            articles={articles}
            onSelectArticle={handleSelectArticle}
        />
    );
}
