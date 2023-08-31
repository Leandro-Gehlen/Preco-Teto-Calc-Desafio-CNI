-- DropForeignKey
ALTER TABLE "stocks" DROP CONSTRAINT "stocks_userId_fkey";

-- AlterTable
ALTER TABLE "stocks" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "stocks" ADD CONSTRAINT "stocks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
