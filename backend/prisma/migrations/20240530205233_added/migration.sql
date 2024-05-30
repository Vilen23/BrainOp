/*
  Warnings:

  - You are about to drop the column `profilepic` on the `User` table. All the data in the column will be lost.
  - Added the required column `profilepicture` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profilepic",
ADD COLUMN     "profilepicture" TEXT NOT NULL;
