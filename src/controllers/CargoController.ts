import { Request, Response } from "express";
import { CargoEntity } from "../entities/CargoEntity";
import { Prisma } from "@prisma/client";

export class CargoController {
  async createCargo(req: Request, res: Response) {
    try {
      const { descricao, id_empresa } = req.body;

      const cargoEntity = new CargoEntity();
      const cargos = await cargoEntity.createOne(descricao, id_empresa);

      return res
        .status(201)
        .json({ message: "Cargo cadastrado com sucesso", data: cargos });
    } catch (error) {
      if (error === "CARGO_NOT_FOUND" || error === "EMPRESA_NOT_FOUND") {
        return res.status(404).json({ message: "Empresa não existente" });
      } else if (error === "CAMPO_VAZIO") {
        return res.status(400).json({ message: "Campo(s) vazio(s)" });
      }
      return res.status(500).json({ error });
    }
  }

  async findAllCargos(req: Request, res: Response) {
    try {
      const cargoEntity = new CargoEntity();
      const cargos = await cargoEntity.findAll();

      return res.json(cargos);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async findCargo(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const cargoEntity = new CargoEntity();
      const cargos = await cargoEntity.findOne(id);

      return res.json(cargos);
    } catch (error) {
      if (error === "CARGO_NOT_FOUND") {
        return res.status(404).json({ message: "Cargo não encontrado" });
      }
      return res.status(500).json({ error });
    }
  }

  async updateCargo(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { descricao } = req.body;

      const cargoEntity = new CargoEntity();
      const cargos = await cargoEntity.updateOne(id, descricao);

      return res.json({
        message: "Cargo atualizado com sucesso",
        data: cargos,
      });
    } catch (error) {
      if (error === "CARGO_NOT_FOUND") {
        return res.status(404).json({ message: "Cargo não encontrado" });
      }
      return res.status(500).json({ error });
    }
  }

  async deleteCargo(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const cargoEntity = new CargoEntity();
      await cargoEntity.deleteOne(id);

      return res.json({ message: "Cargo removido com sucesso" });
    } catch (error) {
      if (error === "CARGO_NOT_FOUND") {
        return res.status(404).json({ message: "Cargo não encontrado" });
      }
      return res.status(500).json({ error });
    }
  }
}
