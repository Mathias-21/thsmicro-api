import { PrismaClientValidationError } from "@prisma/client/runtime";
import { prismaClient } from "../database/prismaClient";
import { EmpresaEntity } from "./EmpresaEntity";

export class CargoEntity {
  createOne = async (descricao: string, id_empresa: number) => {
    const empresaEntity = new EmpresaEntity();
    if (!(await empresaEntity.findOne(id_empresa))) {
      throw new PrismaClientValidationError();
    }

    const cargo = await prismaClient.cargo.create({
      data: { descricao, id_empresa },
    });
    return cargo;
  };

  findAll = async () => {
    return await prismaClient.cargo.findMany();
  };

  findOne = async (id: number) => {
    const cargo = await prismaClient.cargo.findUnique({
      where: { id },
    });

    if (!cargo) {
      throw new PrismaClientValidationError();
    }
    return cargo;
  };

  updateOne = async (id: number, descricao: string) => {
    if (!(await this.findOne(id))) {
      throw new PrismaClientValidationError();
    }

    return await prismaClient.cargo.update({
      where: { id },
      data: { descricao },
    });
  };

  deleteOne = async (id: number) => {
    if (!(await this.findOne(id))) {
      throw new PrismaClientValidationError();
    }

    return await prismaClient.cargo.delete({
      where: { id },
    });
  };
}
