/*
  Warnings:

  - Added the required column `options` to the `PollQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PollQuestion` ADD COLUMN `options` JSON NOT NULL;

-- CreateTable
CREATE TABLE `Vote` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `choice` INTEGER NOT NULL,
    `questionId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `PollQuestion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
