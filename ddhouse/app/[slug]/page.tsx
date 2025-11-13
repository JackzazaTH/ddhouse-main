import React from 'react';
import CustomPageView from '@/components/CustomPageView';
import { fetchCustomPages } from '@/lib/data';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const pages = await fetchCustomPages();
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export default async function CustomPageSlug({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    
    // In a real app, you'd fetch one: await fetchCustomPageBySlug(slug)
    const pages = await fetchCustomPages();
    const selectedPage = pages.find(page => page.slug === slug);
    
    if (!selectedPage) {
        notFound();
    }

    return <CustomPageView page={selectedPage} />;
}