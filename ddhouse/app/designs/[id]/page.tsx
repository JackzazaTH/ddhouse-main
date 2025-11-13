import React from 'react';
import HomeDetailView from '@/components/HomeDetailView';
import { fetchHomes } from '@/lib/data';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const homes = await fetchHomes();
  return homes.map((home) => ({
    id: home.id,
  }));
}

export default async function HomeDetailPage({ params }: { params: { id: string } }) {
    const id = params.id;
    // In a real app, you would fetch a single item: await fetchHomeById(id);
    const homes = await fetchHomes();
    const selectedHome = homes.find(home => home.id === id);

    if (!selectedHome) {
        notFound();
    }

    return (
        <HomeDetailView 
            home={selectedHome} 
        />
    );
}