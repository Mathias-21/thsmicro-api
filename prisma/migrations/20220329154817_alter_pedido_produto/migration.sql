/*
  Warnings:

  - You are about to alter the column `valor_total` on the `pedidos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `preco` on the `produtos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "pedidos" ALTER COLUMN "valor_total" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "produtos" ALTER COLUMN "preco" SET DATA TYPE DECIMAL(10,2);
