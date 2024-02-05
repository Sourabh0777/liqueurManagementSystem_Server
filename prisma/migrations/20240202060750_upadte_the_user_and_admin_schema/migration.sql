/*
  Warnings:

  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `zipcode` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phoneNumber]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userName]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phoneNumber` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_username_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "password",
DROP COLUMN "username",
DROP COLUMN "zipcode",
ADD COLUMN     "otp" INTEGER,
ADD COLUMN     "otpExpiry" TIMESTAMP(3),
ADD COLUMN     "userName" TEXT,
ADD COLUMN     "zipCode" TEXT,
ALTER COLUMN "emailAddress" DROP NOT NULL,
ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL,
DROP COLUMN "phoneNumber",
ADD COLUMN     "phoneNumber" BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_phoneNumber_key" ON "users"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "users_userName_key" ON "users"("userName");
