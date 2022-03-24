import { EmpresaProps } from "./../types/index";
import { prismaClient } from "../database/prismaClient";
import { PrismaClientValidationError } from "@prisma/client/runtime";

export class EmpresaEntity {
  createOne = async (data: EmpresaProps) => {
    if (
      data.nome === "" ||
      data.email === "" ||
      data.telefone === "" ||
      data.endereco === "" ||
      data.is_ativo === undefined
    ) {
      throw new PrismaClientValidationError();
    }

    return await prismaClient.empresa.create({
      data: data,
    });
  };

  findAll = async () => {
    return await prismaClient.empresa.findMany();
  };

  findOne = async (id: number) => {
    const empresa = await prismaClient.empresa.findUnique({
      where: { id },
    });

    if (!empresa) {
      throw new PrismaClientValidationError();
    }

    return empresa;
  };

  updateOne = async (id: number, data: EmpresaProps) => {
    if (!(await this.findOne(id))) {
      throw new PrismaClientValidationError();
    }

    return await prismaClient.empresa.update({
      where: { id },
      data: data,
    });
  };

  deleteOne = async (id: number) => {
    if (!(await this.findOne(id))) {
      throw new PrismaClientValidationError();
    }

    return await prismaClient.empresa.delete({
      where: { id },
    });
  };
}
