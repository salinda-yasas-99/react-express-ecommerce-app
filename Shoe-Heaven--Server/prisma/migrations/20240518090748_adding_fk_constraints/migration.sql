-- DropForeignKey
ALTER TABLE `productsizes` DROP FOREIGN KEY `ProductSizes_fk_prodId_fkey`;

-- AddForeignKey
ALTER TABLE `ProductSizes` ADD CONSTRAINT `ProductSizes_fk_prodId_fkey` FOREIGN KEY (`fk_prodId`) REFERENCES `Product`(`prodId`) ON DELETE CASCADE ON UPDATE CASCADE;
