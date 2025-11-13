// import { generateDescription as generateDesc } from '@/lib/gemini'; // Disabled to resolve build error
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // NOTE: The Gemini AI feature has been temporarily disabled to resolve a build error
  // as the '@google/genai' package was not included as a dependency.
  // See /lib/gemini.ts to re-enable.
  return NextResponse.json({ error: 'AI feature is currently disabled.' }, { status: 501 });

  /*
  try {
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
  */
}
