/*
  Warnings:

  - A unique constraint covering the columns `[no]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `no` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "no" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Post_no_key" ON "Post"("no");
