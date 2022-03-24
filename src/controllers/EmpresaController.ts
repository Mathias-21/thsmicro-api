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
      if (Prisma.PrismaClientValidationError) {
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
      if (error instanceof Prisma.PrismaClientValidationError) {
        return res.status(404).json({ message: "Empresa não encontrada" });
      }
      return res.status(500).json({ error });
    }
  }

  async updateEmpresa(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const EmpresaProps = req.body;

      // const empresaEntity = new EmpresaEntity();
      // const empresa = await empresaEntity.updateOne(id, EmpresaProps);

      const empresa = await new EmpresaEntity().updateOne(id, EmpresaProps);

      return res.json({
        message: "Empresa atualizada com sucesso",
        data: empresa,
      });
    } catch (error) {
      if (Prisma.PrismaClientValidationError) {
        return res.status(404).json({ message: "Empresa não encontrada" });
      }
      return res.status(500).json(error);
    }
  }

  async deleteEmpresa(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      // const empresaEntity = new EmpresaEntity();
      // await empresaEntity.deleteOne(id);

      await new EmpresaEntity().deleteOne(id);

      return res.json({ message: "Empresa excluida com sucesso" });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2003") {
          return res.status(401).json({
            message:
              "Não foi possível excluir essa empresa pois algum cadastro esta vinculado a ela",
          });
        }
      }
      if (error instanceof Prisma.PrismaClientValidationError) {
        return res.status(404).json({ message: "Empresa não existente" });
      }
      return res.status(500).json(error);
    }
  }
}
