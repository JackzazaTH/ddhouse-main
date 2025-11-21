
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { timestamp: 'desc' },
    });
    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, ...createData } = body;
    
    // Ensure timestamp is set if not provided
    if (!createData.timestamp) {
        createData.timestamp = new Date();
    }

    const newLead = await prisma.lead.create({
      data: createData,
    });
    return NextResponse.json(newLead);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
