-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "orderStatus" AS ENUM ('PENDING', 'PLACED', 'PICKED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "paymentStatus" AS ENUM ('PENDING', 'SUCCESSFUL');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "city" TEXT,
    "country" TEXT,
    "countryCode" TEXT DEFAULT '+91',
    "dateOfBirth" TIMESTAMP(3),
    "emailAddress" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "firstName" TEXT,
    "gender" "Gender",
    "isOTPVerified" BOOLEAN NOT NULL DEFAULT false,
    "lastName" TEXT,
    "state" TEXT,
    "userImage" TEXT,
    "otp" INTEGER,
    "otpExpiry" TIMESTAMP(3),
    "userName" TEXT,
    "zipCode" TEXT,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

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
    "roleType" TEXT NOT NULL DEFAULT 'admin',
    "accessID" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendors" (
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
    "accessID" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "vendors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "categoryName" TEXT NOT NULL,
    "categoryDetails" TEXT NOT NULL,
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
    "subCategoryDetails" TEXT NOT NULL,
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
    "ABV" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory" (
    "id" SERIAL NOT NULL,
    "vendorBusinessID" TEXT NOT NULL,
    "productDetailsID" INTEGER NOT NULL,
    "productPrice" DOUBLE PRECISION NOT NULL,
    "totalQuantity" INTEGER NOT NULL,
    "availableQuantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "cartDetailsId" INTEGER,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cartDetails" (
    "id" SERIAL NOT NULL,
    "userDetailsID" INTEGER NOT NULL,
    "inventoryId" TEXT NOT NULL,
    "quantity" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "cartDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_emailAddress_key" ON "users"("emailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "users_userName_key" ON "users"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "users_phoneNumber_key" ON "users"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "admins_emailAddress_key" ON "admins"("emailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "admins_username_key" ON "admins"("username");

-- CreateIndex
CREATE UNIQUE INDEX "admins_accessID_key" ON "admins"("accessID");

-- CreateIndex
CREATE UNIQUE INDEX "vendors_emailAddress_key" ON "vendors"("emailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "vendors_username_key" ON "vendors"("username");

-- CreateIndex
CREATE UNIQUE INDEX "vendors_accessID_key" ON "vendors"("accessID");

-- CreateIndex
CREATE UNIQUE INDEX "cartDetails_userDetailsID_key" ON "cartDetails"("userDetailsID");

-- AddForeignKey
ALTER TABLE "subCategories" ADD CONSTRAINT "subCategories_categoryDetailsID_fkey" FOREIGN KEY ("categoryDetailsID") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_subCategoryDetailsID_fkey" FOREIGN KEY ("subCategoryDetailsID") REFERENCES "subCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_productDetailsID_fkey" FOREIGN KEY ("productDetailsID") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_cartDetailsId_fkey" FOREIGN KEY ("cartDetailsId") REFERENCES "cartDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cartDetails" ADD CONSTRAINT "cartDetails_userDetailsID_fkey" FOREIGN KEY ("userDetailsID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
