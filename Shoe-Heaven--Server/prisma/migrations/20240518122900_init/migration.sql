-- CreateTable
CREATE TABLE `User` (
    `uid` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `contactNumber` VARCHAR(191) NOT NULL,
    `Address` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `prodId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `new_price` INTEGER NOT NULL,
    `old_price` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`prodId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `itemName` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `itemQuantity` INTEGER NOT NULL,
    `itemTotal` INTEGER NOT NULL,
    `fk_cartId` INTEGER NOT NULL,
    `fk_productId` VARCHAR(191) NOT NULL,
    `fk_sizeId` INTEGER NOT NULL,

    PRIMARY KEY (`cartItemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductSizes` ADD CONSTRAINT `ProductSizes_fk_prodId_fkey` FOREIGN KEY (`fk_prodId`) REFERENCES `Product`(`prodId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_fk_userId_fkey` FOREIGN KEY (`fk_userId`) REFERENCES `User`(`uid`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_fk_cartId_fkey` FOREIGN KEY (`fk_cartId`) REFERENCES `Cart`(`cartId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_fk_productId_fkey` FOREIGN KEY (`fk_productId`) REFERENCES `Product`(`prodId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_fk_sizeId_fkey` FOREIGN KEY (`fk_sizeId`) REFERENCES `ProductSizes`(`sizeId`) ON DELETE RESTRICT ON UPDATE CASCADE;
