-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "isBookMarked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPinned" BOOLEAN NOT NULL DEFAULT false;
