import React from 'react';
import CustomPageView from '@/components/CustomPageView';
import { INITIAL_CUSTOM_PAGES } from '@/lib/constants';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return INITIAL_CUSTOM_PAGES.map((page) => ({
    slug: page.slug,
  }));
}

export default function CustomPageSlug({ params }: { params: { slug: string } }) {
    const slug = params.slug;

    const selectedPage = INITIAL_CUSTOM_PAGES.find(page => page.slug === slug);
    
    if (!selectedPage) {
        // In a real app with `output: 'export'`, any slug not in `generateStaticParams` will 404 automatically.
        // This is for robustness during development or if config changes.
        notFound();
    }

    return <CustomPageView page={selectedPage} />;
}