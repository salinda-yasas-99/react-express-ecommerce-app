-- CreateTable
CREATE TABLE `Product` (
    `prodId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `catergory` VARCHAR(191) NOT NULL,
    `new_price` INTEGER NOT NULL,
    `old_price` INTEGER NOT NULL,
    `sizes` JSON NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`prodId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
