import { PrismaClientValidationError } from "@prisma/client/runtime";
import { prismaClient } from "../database/prismaClient";

export class PermissaoEntity {
  createOne = async (descricao: string) => {
    if (descricao === "") {
      throw new PrismaClientValidationError();
    }

    const permissao = await prismaClient.permissao.create({
      data: { descricao },
    });
    return permissao;
  };

  findAll = async () => {
    return await prismaClient.permissao.findMany();
  };

  findOne = async (id: number) => {
    const permissao = await prismaClient.permissao.findUnique({
      where: { id },
    });

    if (!permissao) {
      throw new PrismaClientValidationError();
    }

    return permissao;
  };

  updateOne = async (id: number, descricao: string) => {
    const permissao = await this.findOne(id);

    if (!permissao) {
      throw new PrismaClientValidationError();
    }

    return await prismaClient.permissao.update({
      where: { id },
      data: { descricao },
    });
  };

  deleteOne = async (id: number) => {
    const permissao = await this.findOne(id);

    if (!permissao) {
      throw new PrismaClientValidationError();
    }

    return await prismaClient.permissao.delete({
      where: { id },
    });
  };
}
