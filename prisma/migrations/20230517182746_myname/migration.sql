/*
  Warnings:

  - You are about to drop the `_ArticleToCategorie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ArticleToCategorie` DROP FOREIGN KEY `_ArticleToCategorie_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ArticleToCategorie` DROP FOREIGN KEY `_ArticleToCategorie_B_fkey`;

-- DropTable
DROP TABLE `_ArticleToCategorie`;

-- CreateTable
CREATE TABLE `_ArticleCategorie` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ArticleCategorie_AB_unique`(`A`, `B`),
    INDEX `_ArticleCategorie_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ArticleCategorie` ADD CONSTRAINT `_ArticleCategorie_A_fkey` FOREIGN KEY (`A`) REFERENCES `Article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ArticleCategorie` ADD CONSTRAINT `_ArticleCategorie_B_fkey` FOREIGN KEY (`B`) REFERENCES `Categorie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
