"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const date_fns_1 = require("date-fns");
const prisma = new client_1.PrismaClient();
const weekFromNow = (0, date_fns_1.add)(new Date(), { days: 7 });
const twoFromNow = (0, date_fns_1.add)(new Date(), { days: 7 });
const monthFromNow = (0, date_fns_1.add)(new Date(), { days: 7 });
async function main() {
    const newUser = await prisma.user.create({
        data: {
            email: "a@gmail.com",
            firstName: "Binh",
            lastName: "Tran",
            birthdate: "23/11/1999",
            role: "DOCTOR",
            appointments: {
                create: {
                    startTime: weekFromNow,
                    endTime: monthFromNow,
                }
            }
        }
    });
    console.log('Created new user: ', newUser);
    const allUsers = await prisma.user.findMany({
        include: { appointments: true },
    });
    console.log('All users: ');
    console.dir(allUsers, { depth: null });
}
main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
//# sourceMappingURL=main.js.map