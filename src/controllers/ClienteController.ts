import { Request, Response } from "express";
import { ClienteEntity } from "../entities/ClienteEntity";

export class ClienteController {
  createCliente = async (req: Request, res: Response) => {
    try {
      const ClienteProps = req.body;

      const clienteEntity = new ClienteEntity();
      const cliente = await clienteEntity.createOne(ClienteProps);

      return res
        .status(201)
        .json({ message: "Cliente cadastrado com sucesso", data: cliente });
    } catch (error) {
      if (error === "EMPRESA_NOT_FOUND") {
        return res.status(404).json({ message: "Empresa não encontrada" });
      } else if (error === "CAMPO_VAZIO") {
        return res.status(400).json({ message: "Campo(s) vazio(s)" });
      }
      return res.status(500).json({ error });
    }
  };

  findAllClientes = async (req: Request, res: Response) => {
    try {
      const clienteEntity = new ClienteEntity();
      const cliente = await clienteEntity.findAll();

      return res.json(cliente);
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  findCliente = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const clienteEntity = new ClienteEntity();
      const cliente = await clienteEntity.findOne(id);

      return res.json(cliente);
    } catch (error) {
      if (error === "CLIENTE_NOT_FOUND") {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }
      return res.status(500).json({ error });
    }
  };

  updateCliente = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const ClienteProps = req.body;

      const clienteEntity = new ClienteEntity();
      const cliente = await clienteEntity.updateOne(id, ClienteProps);

      return res.json({
        message: "Cliente atualizado com sucesso",
        data: cliente,
      });
    } catch (error) {
      if (error === "CLIENTE_NOT_FOUND") {
        return res.status(404).json({ message: "Cliente não encontrado" });
      } else if (error === "CAMPO_VAZIO") {
        return res.status(400).json({ message: "Campo(s) vazio(s)" });
      } else if (error === "EMPRESA_NOT_FOUND") {
        return res.status(404).json({ message: "Empresa não encontrada" });
      }
      return res.status(500).json({ error });
    }
  };

  deleteCliente = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const clienteEntity = new ClienteEntity();
      await clienteEntity.deleteOne(id);

      return res.json({ message: "Cliente excluido com sucesso" });
    } catch (error) {
      if (error === "CLIENTE_NOT_FOUND") {
        return res.status(404).json({ message: "Cliente não encontrado" });
      }
      return res.status(500).json({ error });
    }
  };
}
