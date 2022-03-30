import { PedidoProdutosEntity } from "./../entities/PedidoProdutosEntity";
import { Request, Response } from "express";
import { PedidoEntity } from "../entities/PedidoEntity";
import { ProdutoEntity } from "../entities/ProdutoEntity";

export class PedidoProdutosController {
  createPedidoProdutos = async (req: Request, res: Response) => {
    try {
      const data = req.body;

      const pedidoProdutosEntity = new PedidoProdutosEntity();
      const pedidoProdutos = await pedidoProdutosEntity.createOne(data);

      return res.status(201).json(pedidoProdutos);
    } catch (error) {
      if (error === "PRODUTO_NOT_FOUND") {
        return res.status(404).json({ message: "Produto não encontrado" });
      } else if (error === "PEDIDO_NOT_FOUND") {
        return res.status(404).json({ message: "Pedido não encontrado" });
      } else if (error === "CAMPO_VAZIO") {
        return res.status(400).json({ message: "Campo vazio" });
      }
      return res.status(500).json({ error });
    }
  };

  findAllPedidoProdutos = async (req: Request, res: Response) => {
    try {
      const pedidoProdutosEntity = new PedidoProdutosEntity();
      const pedidoProdutos = await pedidoProdutosEntity.findAll();
      await pedidoProdutosEntity.findQuantidade(6);

      return res.json(pedidoProdutos);
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  findPedidoProdutos = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const pedidoProdutosEntity = new PedidoProdutosEntity();
      const pedidoProdutos = await pedidoProdutosEntity.findOne(id);

      return res.json(pedidoProdutos);
    } catch (error) {
      if (error === "PEDIDOPRODUTO_NOT_FOUND") {
        return res
          .status(404)
          .json({ message: "Pedido Produtos não encontrado" });
      }
      return res.status(500).json({ error });
    }
  };

  updatePedidoProdutos = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const PedidoProdutosProps = req.body;

      const pedidoProdutosEntity = new PedidoProdutosEntity();
      const pedidoProdutos = await pedidoProdutosEntity.updateOne(
        id,
        PedidoProdutosProps
      );

      return res.json(pedidoProdutos);
    } catch (error) {
      if (error === "PEDIDOPRODUTO_NOT_FOUND") {
        return res
          .status(404)
          .json({ message: "Pedido Produtos não encontrado" });
      } else if (error === "PRODUTO_NOT_FOUND") {
        return res.status(404).json({ message: "Produto não encontrado" });
      } else if (error === "PEDIDO_NOT_FOUND") {
        return res.status(404).json({ message: "Pedido não encontrado" });
      } else if (error === "CAMPO_VAZIO") {
        return res.status(400).json({ message: "Campo(s) vazio(s)" });
      }
      return res.status(500).json({ error });
    }
  };

  deletePedidoProdutos = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const pedidoProdutosEntity = new PedidoProdutosEntity();
      const pedidoProdutos = await pedidoProdutosEntity.deleteOne(id);

      return res.json(pedidoProdutos);
    } catch (error) {
      if (error === "PEDIDOPRODUTO_NOT_FOUND") {
        return res
          .status(404)
          .json({ message: "Pedido Produtos não encontrado" });
      }
      return res.status(500).json({ error });
    }
  };
}
