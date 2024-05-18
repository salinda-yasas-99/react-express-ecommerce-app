/*
  Warnings:

  - You are about to drop the column `sizes` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `sizes`;

-- CreateTable
CREATE TABLE `ProductSizes` (
    `sizeId` INTEGER NOT NULL AUTO_INCREMENT,
    `sizeName` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `fk_prodId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`sizeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cart` (
    `cartId` INTEGER NOT NULL AUTO_INCREMENT,
    `subtotal` INTEGER NOT NULL,
    `shippingFee` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,
    `fk_userId` INTEGER NOT NULL,

    UNIQUE INDEX `Cart_fk_userId_key`(`fk_userId`),
    PRIMARY KEY (`cartId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CartItem` (
    `cartItemId` INTEGER NOT NULL AUTO_INCREMENT,
    `size` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,
    `fk_cartId` INTEGER NOT NULL,
    `fk_productId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cartItemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductSizes` ADD CONSTRAINT `ProductSizes_fk_prodId_fkey` FOREIGN KEY (`fk_prodId`) REFERENCES `Product`(`prodId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_fk_userId_fkey` FOREIGN KEY (`fk_userId`) REFERENCES `User`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_fk_cartId_fkey` FOREIGN KEY (`fk_cartId`) REFERENCES `Cart`(`cartId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_fk_productId_fkey` FOREIGN KEY (`fk_productId`) REFERENCES `Product`(`prodId`) ON DELETE RESTRICT ON UPDATE CASCADE;
