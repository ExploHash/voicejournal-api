-- DropForeignKey
ALTER TABLE `JournalEntry` DROP FOREIGN KEY `JournalEntry_journalId_fkey`;

-- AddForeignKey
ALTER TABLE `JournalEntry` ADD CONSTRAINT `JournalEntry_journalId_fkey` FOREIGN KEY (`journalId`) REFERENCES `Journal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
