import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const home = await request.json();
    const client = await db.connect();

    await client.sql`
      UPDATE homes
      SET name = ${home.name},
          description = ${home.description},
          area = ${home.area},
          bedrooms = ${home.bedrooms},
          bathrooms = ${home.bathrooms},
          images = ${home.images},
          is_featured = ${home.isFeatured},
          seo = ${JSON.stringify(home.seo)},
          parking = ${home.parking},
          price_popular_original = ${home.price_popular_original},
          price_popular_discounted = ${home.price_popular_discounted},
          price_signature_original = ${home.price_signature_original},
          price_signature_discounted = ${home.price_signature_discounted},
          discount_percentage = ${home.discount_percentage},
          promotion_enabled = ${home.promotion_enabled}
      WHERE id = ${id};
    `;
    
    return NextResponse.json(home, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    if (error instanceof Error) {
        return NextResponse.json({ message: 'Failed to update home', error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Failed to update home' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const client = await db.connect();
        await client.sql`DELETE FROM homes WHERE id = ${id};`;
        return NextResponse.json({ message: `Deleted home with id: ${id}` }, { status: 200 });
    } catch (error) {
        console.error('API Error:', error);
        if (error instanceof Error) {
            return NextResponse.json({ message: 'Failed to delete home', error: error.message }, { status: 500 });
        }
        return NextResponse.json({ message: 'Failed to delete home' }, { status: 500 });
    }
}
