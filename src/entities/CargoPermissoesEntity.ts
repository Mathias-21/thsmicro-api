import { PrismaClientValidationError } from "@prisma/client/runtime";
import { CargoPermissoesProps } from "./../types/index";
import { prismaClient } from "../database/prismaClient";
import { PermissaoEntity } from "./PermissaoEntity";
import { CargoEntity } from "./CargoEntity";

export class CargoPermissoesEntity {
  createOne = async (data: CargoPermissoesProps) => {
    const cargoEntity = new CargoEntity();
    const permissaoEntity = new PermissaoEntity();
    if (
      !(await cargoEntity.findOne(data.id_cargo)) ||
      !(await permissaoEntity.findOne(data.id_permissao))
    ) {
      throw new PrismaClientValidationError();
    }

    return await prismaClient.cargoPermissoes.create({
      data: data,
    });
  };

  findAll = async () => {
    return await prismaClient.cargoPermissoes.findMany({
      include: {
        cargo: {
          select: {
            descricao: true,
          },
        },
        permissao: {
          select: {
            descricao: true,
          },
        },
      },
    });
  };

  findOne = async (id: number) => {
    const cargoPermissoes = await prismaClient.cargoPermissoes.findUnique({
      where: { id },
    });

    if (!cargoPermissoes) {
      throw new PrismaClientValidationError();
    }

    return cargoPermissoes;
  };

  updateOne = async (id: number, data: CargoPermissoesProps) => {
    if (!(await this.findOne(id))) {
      throw new PrismaClientValidationError();
    }

    return await prismaClient.cargoPermissoes.update({
      where: { id },
      data: data,
    });
  };

  deleteOne = async (id: number) => {
    if (!(await this.findOne(id))) {
      throw new PrismaClientValidationError();
    }

    return await prismaClient.cargoPermissoes.delete({
      where: { id },
    });
  };
}
