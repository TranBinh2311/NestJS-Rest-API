-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT E'DOCTOR';
