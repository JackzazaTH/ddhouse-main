import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const lead = await request.json();
    const client = await db.connect();

    const result = await client.sql`
      UPDATE leads
      SET first_name = ${lead.firstName},
          last_name = ${lead.lastName},
          phone = ${lead.phone},
          email = ${lead.email},
          land_size = ${lead.landSize},
          province = ${lead.province},
          district = ${lead.district},
          budget = ${lead.budget},
          construction_date = ${lead.constructionDate},
          status = ${lead.status},
          notes = ${lead.notes || null}
      WHERE id = ${id}
      RETURNING id, first_name as "firstName", last_name as "lastName", phone, email, land_size as "landSize", province, district, budget, construction_date as "constructionDate", timestamp, status, notes;
    `;
    
    const updatedLead = result.rows[0];
    return NextResponse.json(updatedLead, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Failed to update lead', error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const client = await db.connect();
        await client.sql`DELETE FROM leads WHERE id = ${id};`;
        return NextResponse.json({ message: `Deleted lead with id: ${id}` }, { status: 200 });
    } catch (error) {
        console.error('API Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ message: 'Failed to delete lead', error: errorMessage }, { status: 500 });
    }
}
