-- AlterTable
ALTER TABLE `Journal` MODIFY `title_enc` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `JournalEntry` MODIFY `title_enc` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `Recording` MODIFY `transcriptFormatted_enc` TEXT NULL,
    MODIFY `transcript_enc` TEXT NULL;
