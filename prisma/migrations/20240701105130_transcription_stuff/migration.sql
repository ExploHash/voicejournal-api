/*
  Warnings:

  - Added the required column `status` to the `Recording` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Recording` ADD COLUMN `status` ENUM('PROCESSING', 'PROCESSED', 'FAILED') NOT NULL,
    MODIFY `url` VARCHAR(191) NULL,
    MODIFY `transcriptFormatted_enc` VARCHAR(191) NULL,
    MODIFY `transcript_enc` VARCHAR(191) NULL;
