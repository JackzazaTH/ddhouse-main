
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

     if (updateData.isActive) {
        await prisma.siteNotification.updateMany({
            where: { id: { not: params.id } },
            data: { isActive: false }
        });
    }

    const updatedItem = await prisma.siteNotification.update({
      where: { id: params.id },
      data: updateData,
    });
    return NextResponse.json(updatedItem);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update notification' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.siteNotification.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete notification' }, { status: 500 });
  }
}
