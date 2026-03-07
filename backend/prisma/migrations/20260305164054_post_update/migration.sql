-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "parentId" INTEGER;

-- CreateIndex
CREATE INDEX "Post_parentId_idx" ON "Post"("parentId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
