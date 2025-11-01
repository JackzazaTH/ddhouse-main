import { generateDescription as generateDesc } from '@/lib/gemini';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // This is a server-side route, so we can access process.env directly
    if (!process.env.API_KEY) {
      return NextResponse.json({ error: 'API key is not configured on the server' }, { status: 500 });
    }

    const { keywords } = await request.json();
    if (!keywords || typeof keywords !== 'string') {
      return NextResponse.json({ error: 'Keywords are required and must be a string' }, { status: 400 });
    }
    const description = await generateDesc(keywords);
    return NextResponse.json({ description });
  } catch (error) {
    console.error("Error in /api/generate-description:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown server error occurred.";
    return NextResponse.json({ error: 'Failed to generate description', details: errorMessage }, { status: 500 });
  }
}