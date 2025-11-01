// app/actions.ts
"use server";
import { neon } from "ep-lingering-fire-a1mif4bh-pooler.ap-southeast-1.aws.neon.tech";

export async function getData() {
    const sql = neon(process.env.DATABASE_URL);
    const data = await sql`neondb`;
    return data;
}
