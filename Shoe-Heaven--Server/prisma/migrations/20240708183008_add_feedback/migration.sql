-- CreateTable
CREATE TABLE `FeedBack` (
    `FeedId` INTEGER NOT NULL AUTO_INCREMENT,
    `stars` INTEGER NOT NULL,
    `comment` VARCHAR(191) NOT NULL,
    `fk_prodId` VARCHAR(191) NOT NULL,
    `fk_userId` INTEGER NOT NULL,

    PRIMARY KEY (`FeedId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FeedBack` ADD CONSTRAINT `FeedBack_fk_prodId_fkey` FOREIGN KEY (`fk_prodId`) REFERENCES `Product`(`prodId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedBack` ADD CONSTRAINT `FeedBack_fk_userId_fkey` FOREIGN KEY (`fk_userId`) REFERENCES `User`(`uid`) ON DELETE NO ACTION ON UPDATE CASCADE;
