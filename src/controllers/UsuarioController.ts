import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { UsuarioEntity } from "../entities/UsuarioEntity";

export class UsuarioController {
  createUsuario = async (req: Request, res: Response) => {
    try {
      const UsuarioProps = req.body;

      const usuarioEntity = new UsuarioEntity();
      const usuario = await usuarioEntity.createOne(UsuarioProps);

      return res
        .status(201)
        .json({ message: "Usuário cadastrado com sucesso", data: usuario });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        return res.status(404).json({ message: "Empresa não encontrada" });
      }
      if (error === "CAMPO_VAZIO") {
        return res.status(400).json({ message: "Campo(s) vazio(s)" });
      }
      return res.status(500).json(error);
    }
  };

  findAllUsuarios = async (req: Request, res: Response) => {
    try {
      const usuarioEntity = new UsuarioEntity();
      const usuario = await usuarioEntity.findAll();

      return res.json(usuario);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };

  findUsuario = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const usuarioEntity = new UsuarioEntity();
      const usuario = await usuarioEntity.findOne(id);

      return res.json(usuario);
    } catch (error) {
      if (Prisma.PrismaClientValidationError) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      return res.status(500).json(error);
    }
  };

  updateUsuario = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const UsuarioProps = req.body;

      const usuarioEntity = new UsuarioEntity();
      const usuario = await usuarioEntity.updateOne(id, UsuarioProps);

      return res.json({
        message: "Usuário atualizado com sucesso",
        data: usuario,
      });
    } catch (error) {
      if (Prisma.PrismaClientValidationError) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      return res.status(500).json(error);
    }
  };

  deleteUsuario = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      await new UsuarioEntity().deleteOne(id);

      return res.json({ message: "Usuário excluido com sucesso" });
    } catch (error) {
      if (Prisma.PrismaClientValidationError) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      return res.status(500).json(error);
    }
  };
}
