/*
  Warnings:

  - You are about to drop the column `cartDetailsID` on the `orders` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userDetailsID]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userDetailsID` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_cartDetailsID_fkey";

-- DropIndex
DROP INDEX "orders_cartDetailsID_key";

-- AlterTable
ALTER TABLE "cartDetails" ADD COLUMN     "price" INTEGER[];

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "cartDetailsID",
ADD COLUMN     "inventoryId" INTEGER[],
ADD COLUMN     "userDetailsID" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "orders_userDetailsID_key" ON "orders"("userDetailsID");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userDetailsID_fkey" FOREIGN KEY ("userDetailsID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
