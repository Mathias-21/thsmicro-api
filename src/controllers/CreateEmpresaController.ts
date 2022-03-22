import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class CreateEmpresaController {
  async handle(req: Request, res: Response) {
    const { nome, email, telefone, endereco, is_ativo } = req.body;

    const empresa = await prismaClient.empresa.create({
      data: {
        nome,
        email,
        endereco,
        telefone,
        is_ativo,
      },
    });

    return res.json(empresa);
  }
}
