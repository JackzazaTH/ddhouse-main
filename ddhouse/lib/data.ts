import { sql } from '@vercel/postgres';
import { HomeDesign } from './types';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchHomes() {
  // noStore() ถูกใช้เพื่อป้องกันการ cache ข้อมูล ทำให้เราเห็นข้อมูลล่าสุดเสมอเมื่อมีการเปลี่ยนแปลงใน Admin Panel
  noStore();

  try {
    console.log('Fetching homes data...');
    const data = await sql<HomeDesign>`SELECT * FROM homes ORDER BY name ASC`;
    console.log('Data fetch complete.');
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch homes data.');
  }
}

export async function fetchHomeById(id: string) {
  noStore();
  
  try {
    const data = await sql<HomeDesign>`SELECT * FROM homes WHERE id = ${id}`;
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch home data.');
  }
}
