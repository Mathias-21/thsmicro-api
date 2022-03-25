// import { CargoPermissoesProps } from "./../types/index";
import { Request, Response } from "express";
import { CargoPermissoesEntity } from "../entities/CargoPermissoesEntity";
import { Prisma } from "@prisma/client";

export class CargoPermissoesController {
  createCargoPermissoes = async (req: Request, res: Response) => {
    try {
      const CargoPermissoesProps = req.body;

      const cargoPermissoesEntity = new CargoPermissoesEntity();
      const cargoPermissoes = await cargoPermissoesEntity.createOne(
        CargoPermissoesProps
      );

      return res.status(201).json({
        message: "Cargo Permissoes cadastrado com sucesso",
        data: cargoPermissoes,
      });
    } catch (error) {
      if (error === "CAMPO_VAZIO") {
        return res.status(400).json({ message: "Campo(s) vazio(s)" });
      } else if (error === "CARGO_NOT_FOUND") {
        return res.status(404).json({ message: "Cargo não encontrado" });
      } else if (error === "PERMISSAO_NOT_FOUND") {
        return res.status(404).json({ message: "Permissão não encontrada" });
      }
      return res.status(500).json(error);
    }
  };

  findAllCargoPermissoes = async (req: Request, res: Response) => {
    try {
      const cargoPermissoesEntity = new CargoPermissoesEntity();
      const cargoPermissoes = await cargoPermissoesEntity.findAll();

      return res.json(cargoPermissoes);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  findCargoPermissoes = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const cargoPermissoesEntity = new CargoPermissoesEntity();
      const cargoPermissoes = await cargoPermissoesEntity.findOne(id);

      return res.json(cargoPermissoes);
    } catch (error) {
      if (error === "CARGO_PERMISSOES_NOT_FOUND") {
        return res
          .status(404)
          .json({ message: "Cargo Permissoes não encontrado" });
      }
      return res.status(500).json(error);
    }
  };

  updateCargoPermissoes = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const CargoPermissoesProps = req.body;

      const cargoPermissoesEntity = new CargoPermissoesEntity();
      const cargoPermissoes = await cargoPermissoesEntity.updateOne(
        id,
        CargoPermissoesProps
      );

      return res.json({
        message: "Cargo Permissoes atualizada com sucesso",
        data: cargoPermissoes,
      });
    } catch (error) {
      if (error === "CARGO_PERMISSOES_NOT_FOUND") {
        return res
          .status(404)
          .json({ message: "Cargo Permissoes não encontrado" });
      }
      return res.status(500).json(error);
    }
  };

  deleteCargoPermissoes = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const cargoPermissoesEntity = new CargoPermissoesEntity();
      await cargoPermissoesEntity.deleteOne(id);

      return res.json({ message: "Cargo Permissoes excluida com sucesso" });
    } catch (error) {
      if (error === "CARGO_PERMISSOES_NOT_FOUND") {
        return res
          .status(404)
          .json({ message: "Cargo Permissoes não encontrado" });
      }
      return res.status(500).json(error);
    }
  };
}
