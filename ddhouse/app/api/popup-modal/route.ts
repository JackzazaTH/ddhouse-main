
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const data = await prisma.popupModalContent.findFirst();
    return NextResponse.json(data || {});
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch popup modal' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    const data = await prisma.popupModalContent.upsert({
      where: { id: 1 },
      update: updateData,
      create: { ...updateData, id: 1 },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update popup modal' }, { status: 500 });
  }
}
