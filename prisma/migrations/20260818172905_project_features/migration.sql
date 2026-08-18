-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "features" TEXT[] DEFAULT ARRAY[]::TEXT[];
