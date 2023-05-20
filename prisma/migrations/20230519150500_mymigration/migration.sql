/*
  Warnings:

  - You are about to drop the column `authorId` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `contenu` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `titre` on the `Article` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nom` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Categorie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Commentaire` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ArticleCategorie` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorName` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Article` DROP FOREIGN KEY `Article_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Commentaire` DROP FOREIGN KEY `Commentaire_articleId_fkey`;

-- DropForeignKey
ALTER TABLE `_ArticleCategorie` DROP FOREIGN KEY `_ArticleCategorie_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ArticleCategorie` DROP FOREIGN KEY `_ArticleCategorie_B_fkey`;

-- AlterTable
ALTER TABLE `Article` DROP COLUMN `authorId`,
    DROP COLUMN `contenu`,
    DROP COLUMN `titre`,
    ADD COLUMN `authorName` VARCHAR(191) NOT NULL,
    ADD COLUMN `categoryName` VARCHAR(191) NULL,
    ADD COLUMN `content` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ALTER COLUMN `published` DROP DEFAULT;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `nom`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    MODIFY `role` ENUM('AUTHOR', 'ADMIN') NOT NULL DEFAULT 'AUTHOR',
    ADD PRIMARY KEY (`name`);

-- DropTable
DROP TABLE `Categorie`;

-- DropTable
DROP TABLE `Commentaire`;

-- DropTable
DROP TABLE `_ArticleCategorie`;

-- CreateTable
CREATE TABLE `Category` (
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Category_name_key`(`name`),
    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `authorEmail` VARCHAR(191) NOT NULL,
    `articleId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_name_key` ON `User`(`name`);

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_authorName_fkey` FOREIGN KEY (`authorName`) REFERENCES `User`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_categoryName_fkey` FOREIGN KEY (`categoryName`) REFERENCES `Category`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
