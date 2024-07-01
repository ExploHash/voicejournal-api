/*
  Warnings:

  - You are about to drop the column `title` on the `Journal` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `JournalEntry` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `JournalEntry` table. All the data in the column will be lost.
  - You are about to drop the column `transcript` on the `Recording` table. All the data in the column will be lost.
  - You are about to drop the column `transcriptFormatted` on the `Recording` table. All the data in the column will be lost.
  - Added the required column `title_enc` to the `Journal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content_enc` to the `JournalEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title_enc` to the `JournalEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transcriptFormatted_enc` to the `Recording` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transcript_enc` to the `Recording` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Journal` DROP COLUMN `title`,
    ADD COLUMN `title_enc` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `JournalEntry` DROP COLUMN `content`,
    DROP COLUMN `title`,
    ADD COLUMN `content_enc` VARCHAR(191) NOT NULL,
    ADD COLUMN `title_enc` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Recording` DROP COLUMN `transcript`,
    DROP COLUMN `transcriptFormatted`,
    ADD COLUMN `transcriptFormatted_enc` VARCHAR(191) NOT NULL,
    ADD COLUMN `transcript_enc` VARCHAR(191) NOT NULL;
