import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { Lead } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const leadData: Omit<Lead, 'id' | 'timestamp' | 'status'> = await request.json();
    const client = await db.connect();
    
    const result = await client.sql`
      INSERT INTO leads (first_name, last_name, phone, email, land_size, province, district, budget, construction_date, status, notes)
      VALUES (
        ${leadData.firstName}, 
        ${leadData.lastName}, 
        ${leadData.phone}, 
        ${leadData.email}, 
        ${leadData.landSize}, 
        ${leadData.province}, 
        ${leadData.district}, 
        ${leadData.budget}, 
        ${leadData.constructionDate}, 
        'New',
        ${leadData.notes || null}
      )
      RETURNING id, first_name as "firstName", last_name as "lastName", phone, email, land_size as "landSize", province, district, budget, construction_date as "constructionDate", timestamp, status, notes;
    `;
    
    const newLead = result.rows[0];
    return NextResponse.json(newLead, { status: 201 });

  } catch (error) {
    console.error('API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Failed to create lead', error: errorMessage }, { status: 500 });
  }
}
