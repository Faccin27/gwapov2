/*
  Warnings:

  - You are about to drop the column `contactBudgetOptions` on the `SiteContent` table. All the data in the column will be lost.
  - You are about to drop the column `contactGoalOptions` on the `SiteContent` table. All the data in the column will be lost.
  - You are about to drop the column `contactSegmentOptions` on the `SiteContent` table. All the data in the column will be lost.
  - You are about to drop the column `contactServiceOptions` on the `SiteContent` table. All the data in the column will be lost.
  - You are about to drop the column `contactTimelineOptions` on the `SiteContent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SiteContent" DROP COLUMN "contactBudgetOptions",
DROP COLUMN "contactGoalOptions",
DROP COLUMN "contactSegmentOptions",
DROP COLUMN "contactServiceOptions",
DROP COLUMN "contactTimelineOptions",
ADD COLUMN     "contactQuestions" JSONB NOT NULL DEFAULT '[]';
