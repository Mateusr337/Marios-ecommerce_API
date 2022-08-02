/*
  Warnings:

  - You are about to drop the column `productTypeId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `productsTypes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ProductType` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_productTypeId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "productTypeId",
ADD COLUMN     "ProductType" TEXT NOT NULL;

-- DropTable
DROP TABLE "productsTypes";
