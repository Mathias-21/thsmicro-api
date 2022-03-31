import { PedidoEntity } from "./PedidoEntity";
import { ProdutoEntity } from "./ProdutoEntity";
import { prismaClient } from "../database/prismaClient";
import { Pedido, PedidoProdutos, Produto } from "@prisma/client";

export class PedidoProdutosEntity {
  createOne = async (data: PedidoProdutos) => {
    return new Promise(async (resolve, reject) => {
      try {
        const produtoEntity = new ProdutoEntity();
        const pedidoEntity = new PedidoEntity();
        const produto = await produtoEntity.findOne(data.id_produto);
        const pedido = await pedidoEntity.findOne(data.id_pedido);

        if (!produto) {
          reject("PRODUTO_NOT_FOUND");
        } else if (!pedido) {
          reject("PEDIDO_NOT_FOUND");
        } else if (
          data.id_pedido === null ||
          data.id_produto === null ||
          data.quantidade === (null || 0)
        ) {
          reject("CAMPO_VAZIO");
        } else {
          await prismaClient.pedidoProdutos.create({
            data,
            include: {
              pedido: true,
              produto: true,
            },
          });

          const pedidoProdutosEntity = new PedidoProdutosEntity();
          const quantidade = await pedidoProdutosEntity.findQuantidade(
            data.id_pedido,
            data.id_produto
          );
          const preco = await produtoEntity.findPreco(data.id_produto);
          const valorTotal = Number(quantidade) * Number(preco);
          resolve(
            await pedidoEntity.updateValorTotal(data.id_pedido, valorTotal)
          );
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  findAll = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(
          await prismaClient.pedidoProdutos.findMany({
            // include: {
            //   pedido: true,
            //   produto: true,
            // },
          })
        );
      } catch (error) {
        reject(error);
      }
    });
  };

  findOne = async (id: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        const pedido = await prismaClient.pedidoProdutos.findUnique({
          where: {
            id,
          },
        });

        if (!pedido) {
          reject("PEDIDOPRODUTO_NOT_FOUND");
        } else {
          resolve(pedido);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  updateOne = async (id: number, data: PedidoProdutos) => {
    return new Promise(async (resolve, reject) => {
      try {
        const produtoEntity = new ProdutoEntity();
        const produto = await produtoEntity.findOne(data.id_produto);
        const pedidoEntity = new PedidoEntity();
        const pedido = await pedidoEntity.findOne(data.id_pedido);

        if (!(await this.findOne(id))) {
          reject("PEDIDOPRODUTOS_NOT_FOUND");
        } else if (!produto) {
          reject("PRODUTO_NOT_FOUND");
        } else if (!pedido) {
          reject("PEDIDO_NOT_FOUND");
        } else if (data.quantidade === (0 || null)) {
          reject("CAMPO_VAZIO");
        } else {
          resolve(
            await prismaClient.pedidoProdutos.update({
              where: { id },
              data,
            })
          );
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  deleteOne = async (id: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!(await this.findOne(id))) {
          reject("PEDIDOPRODUTOS_NOT_FOUND");
        } else {
          resolve(
            await prismaClient.pedidoProdutos.delete({
              where: {
                id,
              },
            })
          );
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  findQuantidade = async (id_pedido: number, id_produto: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        const pedido = await prismaClient.pedidoProdutos.groupBy({
          by: ["id_pedido"],
          where: {
            id_pedido: id_pedido,
            id_produto: id_produto,
          },
          _sum: {
            quantidade: true,
          },
        });

        let quantidade: number | any;

        pedido.forEach((pedido) => (quantidade = pedido._sum.quantidade));

        resolve(quantidade);
      } catch (error) {
        reject(error);
      }
    });
  };
}
