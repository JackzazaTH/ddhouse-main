import { db } from '@vercel/postgres';
import {
  INITIAL_HOMES,
  INITIAL_BANNERS,
  INITIAL_ARTICLES,
  INITIAL_CUSTOM_PAGES,
  INITIAL_PROMO_CARDS,
  INITIAL_TESTIMONIALS,
  INITIAL_PORTFOLIO_PROJECTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_POPUP_MODAL,
  INITIAL_SITE_INFO
} from '../lib/constants.ts';

async function seedHomes(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS homes (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        area INT NOT NULL,
        bedrooms INT NOT NULL,
        bathrooms INT NOT NULL,
        images TEXT[] NOT NULL,
        is_featured BOOLEAN DEFAULT false,
        seo JSONB,
        parking INT,
        price_popular_original NUMERIC,
        price_popular_discounted NUMERIC,
        price_signature_original NUMERIC,
        price_signature_discounted NUMERIC,
        discount_percentage INT,
        promotion_enabled BOOLEAN
      );
    `;
    console.log(`Created "homes" table`);

    const insertedHomes = await Promise.all(
      INITIAL_HOMES.map(async (home) => {
        return client.sql`
        INSERT INTO homes (id, name, description, area, bedrooms, bathrooms, images, is_featured, seo, parking, price_popular_original, price_popular_discounted, price_signature_original, price_signature_discounted, discount_percentage, promotion_enabled)
        VALUES (${home.id}, ${home.name}, ${home.description}, ${home.area}, ${home.bedrooms}, ${home.bathrooms}, ${home.images}, ${home.isFeatured}, ${JSON.stringify(home.seo)}, ${home.parking}, ${home.price_popular_original}, ${home.price_popular_discounted}, ${home.price_signature_original}, ${home.price_signature_discounted}, ${home.discount_percentage}, ${home.promotion_enabled})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedHomes.length} homes`);
    return { createTable, homes: insertedHomes };
  } catch (error) {
    console.error('Error seeding homes:', error);
    throw error;
  }
}


async function seedBanners(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS banners (
        id VARCHAR(255) PRIMARY KEY,
        image_url TEXT NOT NULL
      );
    `;
    console.log(`Created "banners" table`);

    const inserted = await Promise.all(
      INITIAL_BANNERS.map(b => client.sql`
        INSERT INTO banners (id, image_url)
        VALUES (${b.id}, ${b.imageUrl})
        ON CONFLICT (id) DO NOTHING;
      `),
    );
    console.log(`Seeded ${inserted.length} banners`);
    return { createTable, banners: inserted };
  } catch (error) {
    console.error('Error seeding banners:', error);
    throw error;
  }
}

async function seedArticles(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS articles (
        id VARCHAR(255) PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        image_url TEXT,
        author VARCHAR(255),
        published_date VARCHAR(255),
        tags TEXT[],
        seo JSONB
      );
    `;
    console.log(`Created "articles" table`);

    const inserted = await Promise.all(
      INITIAL_ARTICLES.map(a => client.sql`
        INSERT INTO articles (id, slug, title, content, excerpt, image_url, author, published_date, tags, seo)
        VALUES (${a.id}, ${a.slug}, ${a.title}, ${a.content}, ${a.excerpt}, ${a.imageUrl}, ${a.author}, ${a.publishedDate}, ${a.tags}, ${JSON.stringify(a.seo)})
        ON CONFLICT (id) DO NOTHING;
      `),
    );
    console.log(`Seeded ${inserted.length} articles`);
    return { createTable, articles: inserted };
  } catch (error) {
    console.error('Error seeding articles:', error);
    throw error;
  }
}

async function seedCustomPages(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS custom_pages (
        id VARCHAR(255) PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        seo JSONB
      );
    `;
    console.log(`Created "custom_pages" table`);
    const inserted = await Promise.all(
      INITIAL_CUSTOM_PAGES.map(p => client.sql`
        INSERT INTO custom_pages (id, slug, title, content, seo)
        VALUES (${p.id}, ${p.slug}, ${p.title}, ${p.content}, ${JSON.stringify(p.seo)})
        ON CONFLICT (id) DO NOTHING;
      `),
    );
    console.log(`Seeded ${inserted.length} custom pages`);
    return { createTable, pages: inserted };
  } catch (error) {
    console.error('Error seeding custom pages:', error);
    throw error;
  }
}

async function seedLeads(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS leads (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        land_size INT NOT NULL,
        province VARCHAR(255) NOT NULL,
        district VARCHAR(255) NOT NULL,
        budget NUMERIC NOT NULL,
        construction_date VARCHAR(255) NOT NULL,
        "timestamp" TIMESTAMPTZ DEFAULT NOW(),
        status VARCHAR(50) NOT NULL,
        notes TEXT
      );
    `;
    console.log(`Created "leads" table`);
    return { createTable };
  } catch (error) {
    console.error('Error seeding leads:', error);
    throw error;
  }
}

// Add other seed functions similarly...
async function seedPortfolioProjects(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS portfolio_projects (
        id VARCHAR(255) PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        cover_image TEXT NOT NULL,
        images TEXT[] NOT NULL,
        description TEXT,
        location VARCHAR(255),
        area INT
      );
    `;
    console.log(`Created "portfolio_projects" table`);

    const inserted = await Promise.all(
      INITIAL_PORTFOLIO_PROJECTS.map(p => client.sql`
        INSERT INTO portfolio_projects (id, slug, title, category, cover_image, images, description, location, area)
        VALUES (${p.id}, ${p.slug}, ${p.title}, ${p.category}, ${p.coverImage}, ${p.images}, ${p.description}, ${p.location}, ${p.area})
        ON CONFLICT (id) DO NOTHING;
      `),
    );
    console.log(`Seeded ${inserted.length} portfolio projects`);
    return { createTable, projects: inserted };
  } catch(e) { console.error(e); throw e; }
}

async function seedPromoCards(client) {
    try {
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS promo_cards (
                id VARCHAR(255) PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                subtitle VARCHAR(255),
                image_url TEXT,
                link_type VARCHAR(50),
                link_value VARCHAR(255),
                size VARCHAR(50),
                "order" INT
            );
        `;
        console.log(`Created "promo_cards" table`);
        const inserted = await Promise.all(
            INITIAL_PROMO_CARDS.map(p => client.sql`
                INSERT INTO promo_cards (id, title, subtitle, image_url, link_type, link_value, size, "order")
                VALUES (${p.id}, ${p.title}, ${p.subtitle}, ${p.imageUrl}, ${p.linkType}, ${p.linkValue}, ${p.size}, ${p.order})
                ON CONFLICT (id) DO NOTHING;
            `),
        );
        console.log(`Seeded ${inserted.length} promo cards`);
        return { createTable, cards: inserted };
    } catch (e) { console.error(e); throw e; }
}

async function seedTestimonials(client) {
    try {
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS testimonials (
                id VARCHAR(255) PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                image_url TEXT,
                video_url TEXT,
                "order" INT,
                is_featured BOOLEAN
            );
        `;
        console.log(`Created "testimonials" table`);
        const inserted = await Promise.all(
            INITIAL_TESTIMONIALS.map(t => client.sql`
                INSERT INTO testimonials (id, title, image_url, video_url, "order", is_featured)
                VALUES (${t.id}, ${t.title}, ${t.imageUrl}, ${t.videoUrl}, ${t.order}, ${t.isFeatured})
                ON CONFLICT (id) DO NOTHING;
            `),
        );
        console.log(`Seeded ${inserted.length} testimonials`);
        return { createTable, testimonials: inserted };
    } catch (e) { console.error(e); throw e; }
}

async function seedSiteConfig(client) {
    try {
        await client.sql`
            CREATE TABLE IF NOT EXISTS site_config (
                key VARCHAR(255) PRIMARY KEY,
                value JSONB
            );
        `;
        console.log(`Created "site_config" table`);

        await client.sql`
            INSERT INTO site_config (key, value)
            VALUES ('notifications', ${JSON.stringify(INITIAL_NOTIFICATIONS)})
            ON CONFLICT (key) DO UPDATE SET value = ${JSON.stringify(INITIAL_NOTIFICATIONS)};
        `;
         await client.sql`
            INSERT INTO site_config (key, value)
            VALUES ('popupModal', ${JSON.stringify(INITIAL_POPUP_MODAL)})
            ON CONFLICT (key) DO UPDATE SET value = ${JSON.stringify(INITIAL_POPUP_MODAL)};
        `;
         await client.sql`
            INSERT INTO site_config (key, value)
            VALUES ('siteInfo', ${JSON.stringify(INITIAL_SITE_INFO)})
            ON CONFLICT (key) DO UPDATE SET value = ${JSON.stringify(INITIAL_SITE_INFO)};
        `;
        console.log('Seeded site configurations');
    } catch(e) { console.error(e); throw e; }
}


async function main() {
  const client = await db.connect();

  await seedHomes(client);
  await seedBanners(client);
  await seedArticles(client);
  await seedCustomPages(client);
  await seedLeads(client);
  await seedPortfolioProjects(client);
  await seedPromoCards(client);
  await seedTestimonials(client);
  await seedSiteConfig(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});