import { Request, Response } from "express";
import { PedidoEntity } from "../entities/PedidoEntity";

export class PedidoController {
  createProduto = async (req: Request, res: Response) => {
    try {
      const PedidoProps = req.body;

      const pedidoEntity = new PedidoEntity();
      const pedido = await pedidoEntity.createOne(PedidoProps);

      return res
        .status(201)
        .json({ message: "Pedido cadastrado com sucesso", data: pedido });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  findAllProdutos = async (req: Request, res: Response) => {
    try {
      const pedidoEntity = new PedidoEntity();
      const pedidos = await pedidoEntity.findAll();

      return res.json(pedidos);
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  findProduto = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const pedidoEntity = new PedidoEntity();
      const pedido = await pedidoEntity.findOne(id);

      return res.json(pedido);
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  updateProduto = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const PedidoProps = req.body;

      const pedidoEntity = new PedidoEntity();
      const pedido = await pedidoEntity.updateOne(id, PedidoProps);

      return res.json({
        message: "Pedido atualizado com sucesso",
        data: pedido,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  deleteProduto = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const pedidoEntity = new PedidoEntity();
      const pedido = await pedidoEntity.deleteOne(id);

      return res.json({ message: "Pedido excluido com sucesso" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };
}
