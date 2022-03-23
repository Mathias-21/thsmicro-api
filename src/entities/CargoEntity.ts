import { PrismaClientValidationError } from "@prisma/client/runtime";
import { prismaClient } from "../database/prismaClient";
import { EmpresaEntity } from "./EmpresaEntity";

export class CargoEntity {
  createOne = async (descricao: string, id_empresa: number) => {
    const empresaEntity = new EmpresaEntity();
    const empresa = await empresaEntity.findOne(id_empresa);

    if (!empresa) {
      throw new PrismaClientValidationError();
    }
    const cargo = await prismaClient.cargo.create({
      data: { descricao, id_empresa },
    });
    return cargo;
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

  findAll = async () => {
    return await prismaClient.cargo.findMany();
  };

  updateOne = async (id: number, descricao: string) => {
    return await prismaClient.cargo.update({
      where: { id },
      data: { descricao },
    });
  };

  deleteOne = async (id: number) => {
    return await prismaClient.cargo.delete({
      where: { id },
    });
  };
}
