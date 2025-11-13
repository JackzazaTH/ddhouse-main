import React from 'react';
import HomeDetailView from '@/components/HomeDetailView';
import { INITIAL_HOMES } from '@/lib/constants';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return INITIAL_HOMES.map((home) => ({
    id: home.id,
  }));
}

export default function HomeDetailPage({ params }: { params: { id: string } }) {
    const id = params.id;
    const selectedHome = INITIAL_HOMES.find(home => home.id === id);

    if (!selectedHome) {
        notFound();
    }

    return (
        <HomeDetailView 
            home={selectedHome} 
        />
    );
}