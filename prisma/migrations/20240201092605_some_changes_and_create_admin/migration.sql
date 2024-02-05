/*
  Warnings:

  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[emailAddress]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emailAddress` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "addressLine1" TEXT,
ADD COLUMN     "addressLine2" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "countryCode" TEXT DEFAULT '+91',
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "emailAddress" TEXT NOT NULL,
ADD COLUMN     "enabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "isOTPVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "userImage" TEXT,
ADD COLUMN     "username" TEXT NOT NULL,
ADD COLUMN     "zipcode" TEXT;

-- CreateTable
CREATE TABLE "admins" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "countryCode" TEXT,
    "phoneNumber" TEXT,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "zipcode" TEXT,
    "gender" "Gender",
    "dateOfBirth" TIMESTAMP(3),
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userImage" TEXT,
    "roleType" TEXT,
    "accessID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_emailAddress_key" ON "admins"("emailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "admins_username_key" ON "admins"("username");

-- CreateIndex
CREATE UNIQUE INDEX "admins_accessID_key" ON "admins"("accessID");

-- CreateIndex
CREATE UNIQUE INDEX "users_emailAddress_key" ON "users"("emailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
