
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const logs = await prisma.loginLog.findMany({
      orderBy: { timestamp: 'desc' },
      take: 100 // Limit to last 100 logs
    });
    return NextResponse.json(logs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, ...createData } = body;
    
    // Force timestamp
    createData.timestamp = new Date();
    
    const newLog = await prisma.loginLog.create({ data: createData });
    return NextResponse.json(newLog);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create log' }, { status: 500 });
  }
}
