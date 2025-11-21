
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    const updatedCard = await prisma.promoCard.update({
      where: { id: params.id },
      data: updateData,
    });
    return NextResponse.json(updatedCard);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update promo card' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.promoCard.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete promo card' }, { status: 500 });
  }
}
