import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default prisma;
// declare let global: {
//   prisma: PrismaClient;
// };
// let prisma;
// if (process.env.NODE_ENV === "production") {
//   prisma = new PrismaClient();
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient();
//   }
//   prisma = global.prisma;
// }

// export default prisma;
