import { PrismaClient } from '@trylinky/prisma';
import 'server-only';

// Optional: query logging in dev only
const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    query: {
      async $allOperations({ model, operation, args, query }) {
        const before = Date.now();
        const result = await query(args);
        const after = Date.now();

        if (process.env.NODE_ENV !== 'production') {
          console.log(`Query ${model}.${operation} took ${after - before}ms`);
        }

        return result;
      },
    },
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;