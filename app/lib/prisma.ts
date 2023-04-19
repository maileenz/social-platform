import { PrismaClient } from "@prisma/client";

export let prisma: PrismaClient;

declare global {
  var __prisma: PrismaClient;
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // Ensure the prisma instance is re-used during hot-reloading
  // Otherwise, a new client will be created on every reload
  global.__prisma = global.__prisma || new PrismaClient();
  prisma = global.__prisma;
}
