
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch the first record, if not exists, return null (frontend should handle defaults)
    let data = await prisma.siteInfo.findFirst();
    if (!data) {
        // Optional: Return default structure if DB is empty
        return NextResponse.json({}); 
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching site info:', error);
    return NextResponse.json({ error: 'Failed to fetch site info' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    // Upsert: Update if ID 1 exists, otherwise create with ID 1
    const data = await prisma.siteInfo.upsert({
      where: { id: 1 },
      update: updateData,
      create: { ...updateData, id: 1 },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating site info:', error);
    return NextResponse.json({ error: 'Failed to update site info' }, { status: 500 });
  }
}
