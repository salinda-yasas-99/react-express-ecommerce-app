/*
  Warnings:

  - You are about to drop the column `itemName` on the `cartitem` table. All the data in the column will be lost.
  - You are about to drop the column `itemTotal` on the `cartitem` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `cartitem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cartitem` DROP COLUMN `itemName`,
    DROP COLUMN `itemTotal`,
    DROP COLUMN `price`;
