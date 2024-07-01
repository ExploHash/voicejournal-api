/*
  Warnings:

  - You are about to drop the column `status` on the `Recording` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Recording` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Recording` DROP COLUMN `status`,
    DROP COLUMN `url`,
    ADD COLUMN `isProcessed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isUploaded` BOOLEAN NOT NULL DEFAULT false;
