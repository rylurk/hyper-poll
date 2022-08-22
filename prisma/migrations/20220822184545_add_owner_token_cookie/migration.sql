/*
  Warnings:

  - Added the required column `ownerToken` to the `PollQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PollQuestion` ADD COLUMN `ownerToken` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE INDEX `PollQuestion_ownerToken_idx` ON `PollQuestion`(`ownerToken`);
