import { EmpresaEntity } from "../entities/EmpresaEntity";
import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

export class EmpresaController {
  async createEmpresa(req: Request, res: Response) {
    try {
      const EmpresaProps = req.body;

      const empresaEntity = new EmpresaEntity();
      const empresa = await empresaEntity.createOne(EmpresaProps);

      return res.status(201).json({
        message: "Empresa cadastrada com sucesso",
        data: empresa,
      });
    } catch (error) {
      if (error === "CAMPO_VAZIO") {
        return res.status(400).json({ message: "Campo(s) vazio(s)" });
      }
      return res.status(500).json({ error });
    }
  }

  async findAllEmpresas(req: Request, res: Response) {
    try {
      const empresaEntity = new EmpresaEntity();
      const empresas = await empresaEntity.findAll();

      return res.json(empresas);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async findEmpresa(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const empresaEntity = new EmpresaEntity();
      const empresa = await empresaEntity.findOne(id);

      return res.json(empresa);
    } catch (error) {
      if (error === "EMPRESA_NOT_FOUND") {
        return res.status(404).json({ message: "Empresa não encontrada" });
      }
      return res.status(500).json({ error });
    }
  }

  async updateEmpresa(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const EmpresaProps = req.body;

      const empresa = await new EmpresaEntity().updateOne(id, EmpresaProps);

      return res.json({
        message: "Empresa atualizada com sucesso",
        data: empresa,
      });
    } catch (error) {
      if (error === "EMPRESA_NOT_FOUND") {
        return res.status(404).json({ message: "Empresa não encontrada" });
      }
      return res.status(500).json({ error });
    }
  }

  async deleteEmpresa(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      await new EmpresaEntity().deleteOne(id);

      return res.json({ message: "Empresa excluida com sucesso" });
    } catch (error) {
      if (error === "EMPRESA_NOT_FOUND") {
        return res.status(404).json({ message: "Empresa não existente" });
      }
      if (error === "EMPRESA_EM_USO") {
        return res
          .status(401)
          .json({ message: "Existe(m) cargo(s) associado(s) a esta empresa" });
      }
      return res.status(500).json({ error });
    }
  }
}
