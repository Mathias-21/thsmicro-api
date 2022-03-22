import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class CreateEmpresaController {
  async createEmpresa(req: Request, res: Response) {
    try {
      const { nome, email, telefone, endereco, is_ativo } = req.body;

      const empresa = await prismaClient.empresa.create({
        data: {
          nome,
          email,
          telefone,
          endereco,
          is_ativo,
        },
      });

      return res.json(empresa);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async findAllEmpresas(req: Request, res: Response) {
    try {
      const empresa = await prismaClient.empresa.findMany();
      return res.json(empresa);
    } catch (error) {
      return res.status(404).json({ error });
    }
  }

  async findEmpresa(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const empresa = await prismaClient.empresa.findUnique({
        where: { id: Number(id) },
      });

      if (!empresa) {
        res.status(404).json({ message: "Empresa não encontrada" });
      }

      return res.json({ empresa });
    } catch (error) {
      return res.status(404).json({ error });
    }
  }

  async updateEmpresa(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { nome, email, telefone, endereco, is_ativo } = req.body;

      const empresa = await prismaClient.empresa.findUnique({
        where: { id: Number(id) },
      });

      if (!empresa) {
        res.status(404).json({ message: "Empresa não encontrada" });
      }

      await prismaClient.empresa.update({
        where: { id: Number(id) },
        data: { nome, email, telefone, endereco, is_ativo },
      });

      res.status(201).json({ message: "Empresa atualizada com sucesso" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async deleteEmpresa(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const empresa = await prismaClient.empresa.findUnique({
        where: { id: Number(id) },
      });

      if (!empresa) {
        res.status(404).json({ message: "Empresa não encontrada" });
      }

      await prismaClient.empresa.delete({
        where: { id: Number(id) },
      });
      res
        .status(200)
        .json({ message: "Empresa excluida com sucesso", data: empresa });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
