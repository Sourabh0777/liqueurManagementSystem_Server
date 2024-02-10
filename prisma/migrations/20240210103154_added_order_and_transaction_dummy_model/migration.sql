/*
  Warnings:

  - Changed the type of `vendorBusinessID` on the `inventory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "inventory" DROP COLUMN "vendorBusinessID",
ADD COLUMN     "vendorBusinessID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "measureUnit" SET DEFAULT 'mL',
ALTER COLUMN "countryOfOrigin" SET DEFAULT 'India';

-- AlterTable
ALTER TABLE "subCategories" ADD COLUMN     "vendorId" INTEGER;

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "cartDetailsID" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "Status" "orderStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "orderID" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentMode" TEXT NOT NULL,
    "status" "paymentStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_cartDetailsID_key" ON "orders"("cartDetailsID");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_orderID_key" ON "transactions"("orderID");

-- AddForeignKey
ALTER TABLE "subCategories" ADD CONSTRAINT "subCategories_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_vendorBusinessID_fkey" FOREIGN KEY ("vendorBusinessID") REFERENCES "vendors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_cartDetailsID_fkey" FOREIGN KEY ("cartDetailsID") REFERENCES "cartDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
