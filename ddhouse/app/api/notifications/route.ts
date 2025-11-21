
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const items = await prisma.siteNotification.findMany();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, ...createData } = body;
    
    // If new notification is active, deactivate others (logic can also be handled in frontend, but safe here)
    if (createData.isActive) {
        await prisma.siteNotification.updateMany({
            data: { isActive: false }
        });
    }

    const newItem = await prisma.siteNotification.create({ data: createData });
    return NextResponse.json(newItem);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create notification' }, { status: 500 });
  }
}
