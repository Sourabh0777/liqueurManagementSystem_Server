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

-- CreateIndex
CREATE UNIQUE INDEX "vendors_emailAddress_key" ON "vendors"("emailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "vendors_username_key" ON "vendors"("username");

-- CreateIndex
CREATE UNIQUE INDEX "vendors_accessID_key" ON "vendors"("accessID");
