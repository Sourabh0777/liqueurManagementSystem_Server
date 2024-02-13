/*
  Warnings:

  - The `inventoryId` column on the `cartDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "cartDetails" DROP COLUMN "inventoryId",
ADD COLUMN     "inventoryId" INTEGER[];
