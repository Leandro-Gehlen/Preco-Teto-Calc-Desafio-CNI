-- CreateTable
CREATE TABLE "stocks" (
    "stock_id" TEXT NOT NULL,
    "asset_name" TEXT,
    "asset_code" TEXT NOT NULL,
    "year1" TEXT NOT NULL DEFAULT '0',
    "year2" TEXT NOT NULL DEFAULT '0',
    "year3" TEXT NOT NULL DEFAULT '0',
    "year4" TEXT NOT NULL DEFAULT '0',
    "year5" TEXT NOT NULL DEFAULT '0',
    "top_price" TEXT NOT NULL DEFAULT '0',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "stocks_pkey" PRIMARY KEY ("stock_id")
);

-- AddForeignKey
ALTER TABLE "stocks" ADD CONSTRAINT "stocks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
