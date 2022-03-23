import { prismaClient } from "../database/prismaClient";

export class PermissaoEntity {
  createOne = async (descricao: string) => {
    const permissao = await prismaClient.permissao.create({
      data: { descricao },
    });
    return permissao;
  };

  findAll = async () => {
    const permissoes = prismaClient.permissao.findMany();
    return permissoes;
  };

  findOne = async (id: number) => {
    const permissao = await prismaClient.permissao.findUnique({
      where: { id },
    });
    return permissao;
  };

  updateOne = async (id: number, descricao: string) => {
    const permissao = await prismaClient.permissao.update({
      where: { id },
      data: { descricao },
    });
    return permissao;
  };

  deleteOne = async (id: number) => {
    const permissao = await prismaClient.permissao.delete({
      where: { id },
    });
    return permissao;
  };
}
