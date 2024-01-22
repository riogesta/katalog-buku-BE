import { PrismaClient, Prisma } from "@prisma/client";
const prisma: PrismaClient = new PrismaClient();

export { prisma, Prisma };
