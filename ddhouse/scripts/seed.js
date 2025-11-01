const { db } = require('postgres://53a2035e8dbd7185af2e9ee6ffb28fc3eeaab91556e725d8183d344f96a1c000:sk_mv9cqhEoO6_TQco_XjRCF@db.prisma.io:5432/postgres?sslmode=require');
const { INITIAL_HOMES } = require('../lib/constants.js');

async function seedHomes(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    
    // Create the "homes" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS homes (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        area INT NOT NULL,
        bedrooms INT NOT NULL,
        bathrooms INT NOT NULL,
        images TEXT[] NOT NULL,
        "isFeatured" BOOLEAN NOT NULL,
        seo JSONB
      );
    `;

    console.log(`Created "homes" table`);

    // Insert data into the "homes" table
    const insertedHomes = await Promise.all(
      INITIAL_HOMES.map(async (home) => {
        return client.sql`
        INSERT INTO homes (id, name, description, area, bedrooms, bathrooms, images, "isFeatured", seo)
        VALUES (${home.id}, ${home.name}, ${home.description}, ${home.area}, ${home.bedrooms}, ${home.bathrooms}, ${home.images}, ${home.isFeatured}, ${JSON.stringify(home.seo)})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedHomes.length} homes`);

    return {
      createTable,
      homes: insertedHomes,
    };
  } catch (error) {
    console.error('Error seeding homes:', error);
    throw error;
  }
}


async function main() {
  const client = await db.connect();

  await seedHomes(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
