/*
  Warnings:

  - The `status` column on the `workflow` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "WorkflowStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'RUNNING', 'FAILED');

-- AlterTable
ALTER TABLE "workflow" DROP COLUMN "status",
ADD COLUMN     "status" "WorkflowStatus" NOT NULL DEFAULT 'INACTIVE';
