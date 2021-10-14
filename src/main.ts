import { PrismaClient } from '@prisma/client'
import {add} from 'date-fns'
const prisma = new PrismaClient()

const weekFromNow =  add(new Date(), {days: 7})
const twoFromNow =  add(new Date(), {days: 7})
const monthFromNow =  add(new Date(), {days: 7})

async function main() {
  const newUser = await prisma.user.create({
    data:{
      email : "a@gmail.com",
      firstName: "Binh",
      lastName: "Tran",
      birthdate: weekFromNow,
      role : "DOCTOR",
      timeStamp: twoFromNow,
      timeZone: monthFromNow,
      appointments: {
        create: {
          startTime : weekFromNow,
          endTime: monthFromNow,
        }
      }

    }
  })
  console.log('Created new user: ', newUser)

  const allUsers = await prisma.user.findMany({
    include: { appointments: true },
  })
  console.log('All users: ')
  console.dir(allUsers, { depth: null })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())