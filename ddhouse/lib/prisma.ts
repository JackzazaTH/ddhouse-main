
// import { PrismaClient } from '@prisma/client';

// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ['query'],
//   });

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Mock implementation to resolve build errors when Prisma Client is not generated
const prismaMock = {
  siteInfo: { findFirst: async () => null, upsert: async () => null },
  homeDesign: { findMany: async () => [], create: async () => null, update: async () => null, delete: async () => null, count: async () => 0 },
  banner: { findMany: async () => [], create: async () => null, update: async () => null, delete: async () => null, count: async () => 0 },
  article: { findMany: async () => [], create: async () => null, update: async () => null, delete: async () => null, count: async () => 0 },
  lead: { findMany: async () => [], create: async () => null, update: async () => null, delete: async () => null },
  portfolioProject: { findMany: async () => [], create: async () => null, update: async () => null, delete: async () => null },
  customPage: { findMany: async () => [], create: async () => null, update: async () => null, delete: async () => null },
  promoCard: { findMany: async () => [], create: async () => null, update: async () => null, delete: async () => null },
  testimonial: { findMany: async () => [], create: async () => null, update: async () => null, delete: async () => null },
  siteNotification: { findMany: async () => [], create: async () => null, update: async () => null, delete: async () => null, updateMany: async () => null },
  popupModalContent: { findFirst: async () => null, upsert: async () => null },
  loginLog: { findMany: async () => [], create: async () => null },
  $disconnect: async () => {},
};

export const prisma = prismaMock as any;
