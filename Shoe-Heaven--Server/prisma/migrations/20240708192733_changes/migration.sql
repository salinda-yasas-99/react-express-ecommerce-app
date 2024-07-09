/*
  Warnings:

  - Added the required column `date` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `date` VARCHAR(191) NOT NULL,
    ADD COLUMN `time` VARCHAR(191) NOT NULL;
