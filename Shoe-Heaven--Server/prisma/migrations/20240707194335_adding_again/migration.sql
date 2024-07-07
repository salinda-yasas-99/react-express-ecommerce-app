-- CreateTable
CREATE TABLE `Order` (
    `orderId` INTEGER NOT NULL AUTO_INCREMENT,
    `Total` INTEGER NOT NULL,
    `orderItems` JSON NOT NULL,
    `fk_userId` INTEGER NOT NULL,

    PRIMARY KEY (`orderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_fk_userId_fkey` FOREIGN KEY (`fk_userId`) REFERENCES `User`(`uid`) ON DELETE NO ACTION ON UPDATE CASCADE;
