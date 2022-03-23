import { Request, Response } from "express";
import { PermissaoEntity } from "../entities/PermissaoEntity";

export class PermissaoController {
  createPermissao = async (req: Request, res: Response) => {
    try {
      const { descricao } = req.body;

      const permissaoEntity = new PermissaoEntity();
      const permissao = await permissaoEntity.createOne(descricao);

      return res
        .status(201)
        .json({ message: "Permissão cadastrada com sucesso", data: permissao });
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  findAllPermissoes = async (req: Request, res: Response) => {
    try {
      const permissaoEntity = new PermissaoEntity();
      const permissoes = await permissaoEntity.findAll();

      return res.json(permissoes);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  findPermissao = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const permissaoEntity = new PermissaoEntity();
      const permissao = await permissaoEntity.findOne(id);

      return res.json(permissao);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  updatePermissao = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { descricao } = req.body;

      const permissaoEntity = new PermissaoEntity();
      const permissao = await permissaoEntity.updateOne(id, descricao);

      return res.json({
        message: "Permissão atualizada com sucesso",
        data: permissao,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  deletePermissao = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const permissaoEntity = new PermissaoEntity();
      await permissaoEntity.deleteOne(id);

      return res.json({ message: "Permissão excluida com sucesso" });
    } catch (error) {
      return res.status(500).json(error);
    }
  };
}
