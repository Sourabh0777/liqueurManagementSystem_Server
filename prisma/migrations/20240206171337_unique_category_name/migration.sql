/*
  Warnings:

  - A unique constraint covering the columns `[categoryName]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productName]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subCategoryName]` on the table `subCategories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "categories_categoryName_key" ON "categories"("categoryName");

-- CreateIndex
CREATE UNIQUE INDEX "products_productName_key" ON "products"("productName");

-- CreateIndex
CREATE UNIQUE INDEX "subCategories_subCategoryName_key" ON "subCategories"("subCategoryName");
