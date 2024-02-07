/*
  Warnings:

  - Made the column `roleType` on table `admins` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "admins" ALTER COLUMN "roleType" SET NOT NULL,
ALTER COLUMN "roleType" SET DEFAULT 'admin';
