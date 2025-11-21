
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const cards = await prisma.promoCard.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(cards);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch promo cards' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, ...createData } = body;
    const newCard = await prisma.promoCard.create({ data: createData });
    return NextResponse.json(newCard);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create promo card' }, { status: 500 });
  }
}
