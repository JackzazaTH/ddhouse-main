
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    const updatedHome = await prisma.homeDesign.update({
      where: { id: params.id },
      data: updateData,
    });
    return NextResponse.json(updatedHome);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update home' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.homeDesign.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete home' }, { status: 500 });
  }
}
