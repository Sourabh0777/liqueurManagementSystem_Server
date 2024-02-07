-- CreateEnum
CREATE TYPE "orderStatus" AS ENUM ('PENDING', 'PLACED', 'PICKED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "paymentStatus" AS ENUM ('PENDING', 'SUCCESSFUL');

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "categoryName" TEXT NOT NULL,
    "categoryDetails" TEXT,
    "categoryImageLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subCategories" (
    "id" SERIAL NOT NULL,
    "categoryDetailsID" INTEGER NOT NULL,
    "subCategoryName" TEXT NOT NULL,
    "subCategoryDetails" TEXT,
    "subCategoryImageLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "subCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "subCategoryDetailsID" INTEGER NOT NULL,
    "productName" TEXT NOT NULL,
    "measureQuantity" DOUBLE PRECISION NOT NULL,
    "measureUnit" TEXT NOT NULL,
    "countryOfOrigin" TEXT NOT NULL,
    "alcoholByVolume" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "subCategories" ADD CONSTRAINT "subCategories_categoryDetailsID_fkey" FOREIGN KEY ("categoryDetailsID") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_subCategoryDetailsID_fkey" FOREIGN KEY ("subCategoryDetailsID") REFERENCES "subCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
