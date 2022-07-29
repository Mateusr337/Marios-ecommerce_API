import pkg from '@prisma/client';

const { PrismaClient } = pkg;
const database = new PrismaClient();

export default database;
