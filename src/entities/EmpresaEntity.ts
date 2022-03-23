import { EmpresaProps } from "./../types/index";
import { prismaClient } from "../database/prismaClient";
import { PrismaClientValidationError } from "@prisma/client/runtime";

export class EmpresaEntity {
  createOne = async (props: EmpresaProps) => {
    return await prismaClient.empresa.create({
      data: props,
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
    } else {
      return empresa;
    }
  };

  updateOne = async (id: number, props: EmpresaProps) => {
    const empresa = await this.findOne(id);
    await prismaClient.empresa.update({
      where: { id },
      data: props,
    });

    if (!empresa) {
      throw new PrismaClientValidationError();
    } else {
      return {
        message: "Empresa atualizada com sucesso",
      };
    }
  };

  deleteOne = async (id: number) => {
    const empresa = await prismaClient.empresa.findUnique({
      where: { id },
    });
    if (!empresa) {
      throw new PrismaClientValidationError();
    } else {
      await prismaClient.empresa.delete({
        where: { id },
      });
      return { message: "Empresa excluida com sucesso" };
    }
  };
}
