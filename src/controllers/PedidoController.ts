import { Request, Response } from "express";
import { PedidoEntity } from "../entities/PedidoEntity";

export class PedidoController {
  createPedido = async (req: Request, res: Response) => {
    try {
      const PedidoProps = req.body;

      const pedidoEntity = new PedidoEntity();
      const pedido = await pedidoEntity.createOne(PedidoProps);

      return res
        .status(201)
        .json({ message: "Pedido cadastrado com sucesso", data: pedido });
    } catch (error) {
      if (error === "EMPRESA_NOT_FOUND") {
        return res.status(404).json({ message: "Empresa não encontrada" });
      } else if (error === "USUARIO_NOT_FOUND") {
        return res.status(404).json({ message: "Usuário não encontrado" });
      } else if (error === "CLIENTE_NOT_FOUND") {
        return res.status(404).json({ message: "Cliente não encontrado" });
      } else if (error === "CAMPO_VAZIO") {
        return res.status(400).json({ message: "Campo(s) vazio(s)" });
      }
      return res.status(500).json({ error });
    }
  };

  findAllPedidos = async (req: Request, res: Response) => {
    try {
      const pedidoEntity = new PedidoEntity();
      const pedidos = await pedidoEntity.findAll();

      return res.json(pedidos);
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  findPedido = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const pedidoEntity = new PedidoEntity();
      const pedido = await pedidoEntity.findOne(id);

      return res.json(pedido);
    } catch (error) {
      if (error === "PEDIDO_NOT_FOUND") {
        return res.status(404).json({ message: "Pedido não encontrado" });
      }
      return res.status(500).json({ error });
    }
  };

  updatePedido = async (req: Request, res: Response) => {
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
      if (error === "PEDIDO_NOT_FOUND") {
        return res.status(404).json({ message: "Pedido não encontrado" });
      } else if (error === "EMPRESA_NOT_FOUND") {
        return res.status(404).json({ message: "Empresa não encontrada" });
      } else if (error === "USUARIO_NOT_FOUND") {
        return res.status(404).json({ message: "Usuário não encontrado" });
      } else if (error === "CLIENTE_NOT_FOUND") {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }
      return res.status(500).json({ error });
    }
  };

  deletePedido = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const pedidoEntity = new PedidoEntity();
      await pedidoEntity.deleteOne(id);

      return res.json({ message: "Pedido excluido com sucesso" });
    } catch (error) {
      if (error === "PEDIDO_NOT_FOUND") {
        return res.status(404).json({ message: "Pedido não encontrado" });
      }
      return res.status(500).json({ error });
    }
  };
}
