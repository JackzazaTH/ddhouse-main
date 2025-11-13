import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const home = await request.json();
    const client = await db.connect();
    
    // Generate a new ID for the home
    const newId = `ddh-${Date.now()}`;

    await client.sql`
      INSERT INTO homes (id, name, description, area, bedrooms, bathrooms, images, is_featured, seo, parking, price_popular_original, price_popular_discounted, price_signature_original, price_signature_discounted, discount_percentage, promotion_enabled)
      VALUES (${newId}, ${home.name}, ${home.description}, ${home.area}, ${home.bedrooms}, ${home.bathrooms}, ${home.images}, ${home.isFeatured}, ${JSON.stringify(home.seo)}, ${home.parking}, ${home.price_popular_original}, ${home.price_popular_discounted}, ${home.price_signature_original}, ${home.price_signature_discounted}, ${home.discount_percentage}, ${home.promotion_enabled});
    `;
    
    const newHomeRecord = { ...home, id: newId };
    return NextResponse.json(newHomeRecord, { status: 201 });

  } catch (error) {
    console.error('API Error:', error);
    if (error instanceof Error) {
        return NextResponse.json({ message: 'Failed to create home', error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Failed to create home' }, { status: 500 });
  }
}
