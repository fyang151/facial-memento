import { PrismaClient } from "@prisma/client";

declare const global: {
  prisma?: PrismaClient;
};

const prisma = process.env.NODE_ENV === "production"
  ? new PrismaClient()
  : global.prisma || (global.prisma = new PrismaClient());

export default prisma;
