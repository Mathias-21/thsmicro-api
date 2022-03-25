-- CreateTable
CREATE TABLE "pedido_produtos" (
    "id" SERIAL NOT NULL,
    "id_produto" INTEGER NOT NULL,
    "id_pedido" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "pedido_produtos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pedido_produtos" ADD CONSTRAINT "pedido_produtos_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_produtos" ADD CONSTRAINT "pedido_produtos_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
