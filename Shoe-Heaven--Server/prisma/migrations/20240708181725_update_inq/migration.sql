/*
  Warnings:

  - You are about to drop the `feedback` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `feedback`;

-- CreateTable
CREATE TABLE `Inquiry` (
    `InqId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`InqId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
