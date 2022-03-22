import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class CreateCargoController {
  async createCargo(req: Request, res: Response) {
    try {
      const { descricao, id_empresa } = req.body;

      const cargo = await prismaClient.cargo.create({
        data: { descricao, id_empresa },
      });

      return res.json(cargo);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async findAllCargos(req: Request, res: Response) {
    try {
      const cargos = await prismaClient.cargo.findMany();

      res.status(200).json(cargos);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  async findCargo(req: Request, res: Response) {
    try {
      const id = req.params.id;
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  async updateCargo(req: Request, res: Response) {
    try {
      const id = req.params.id;
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  async deleteCargo(req: Request, res: Response) {
    try {
      const id = req.params.id;
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
