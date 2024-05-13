/*
  Warnings:

  - Added the required column `Address` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNumber` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `Address` VARCHAR(191) NOT NULL,
    ADD COLUMN `contactNumber` VARCHAR(191) NOT NULL;
