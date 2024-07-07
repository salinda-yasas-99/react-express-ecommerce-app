/*
  Warnings:

  - You are about to drop the `cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cartitem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_fk_userId_fkey`;

-- DropForeignKey
ALTER TABLE `cartitem` DROP FOREIGN KEY `CartItem_fk_cartId_fkey`;

-- DropForeignKey
ALTER TABLE `cartitem` DROP FOREIGN KEY `CartItem_fk_productId_fkey`;

-- DropForeignKey
ALTER TABLE `cartitem` DROP FOREIGN KEY `CartItem_fk_sizeId_fkey`;

-- DropTable
DROP TABLE `cart`;

-- DropTable
DROP TABLE `cartitem`;

-- CreateTable
CREATE TABLE `Order` (
    `orderId` INTEGER NOT NULL AUTO_INCREMENT,
    `Total` INTEGER NOT NULL,
    `orderItems` JSON NOT NULL,
    `fk_userId` INTEGER NOT NULL,

    UNIQUE INDEX `Order_fk_userId_key`(`fk_userId`),
    PRIMARY KEY (`orderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_fk_userId_fkey` FOREIGN KEY (`fk_userId`) REFERENCES `User`(`uid`) ON DELETE NO ACTION ON UPDATE CASCADE;
