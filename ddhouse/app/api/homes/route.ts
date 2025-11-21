
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const homes = await prisma.homeDesign.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(homes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch homes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Remove ID if present to let Prisma generate CUID
    const { id, ...createData } = body;
    
    const newHome = await prisma.homeDesign.create({
      data: createData,
    });
    return NextResponse.json(newHome);
  } catch (error) {
    console.error('Error creating home:', error);
    return NextResponse.json({ error: 'Failed to create home' }, { status: 500 });
  }
}
