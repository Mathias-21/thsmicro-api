import { prismaClient } from "../database/prismaClient";

export class PermissaoEntity {
  createOne = async (descricao: string) => {
    return new Promise(async (resolve, reject) => {
      if (descricao === "") {
        reject("CAMPO_VAZIO");
      } else {
        resolve(
          await prismaClient.permissao.create({
            data: { descricao },
          })
        );
      }
    });
  };

  findAll = async () => {
    return await prismaClient.permissao.findMany();
  };

  findOne = async (id: number) => {
    return new Promise(async (resolve, reject) => {
      const permissao = await prismaClient.permissao.findUnique({
        where: { id },
      });

      if (!permissao) {
        reject("PERMISSAO_NOT_FOUND");
      }

      resolve(permissao);
    });
  };

  updateOne = async (id: number, descricao: string) => {
    return new Promise(async (resolve, reject) => {
      const permissao = await prismaClient.permissao.findUnique({
        where: { id },
      });

      if (!permissao) {
        reject("PERMISSAO_NOT_FOUND");
      } else {
        resolve(
          await prismaClient.permissao.update({
            where: { id },
            data: { descricao },
          })
        );
      }
    });
  };

  deleteOne = async (id: number) => {
    return new Promise(async (resolve, reject) => {
      const permissao = await prismaClient.permissao.findUnique({
        where: { id },
      });

      if (!permissao) {
        reject("PERMISSAO_NOT_FOUND");
      } else {
        resolve(
          await prismaClient.permissao.delete({
            where: { id },
          })
        );
      }
    });
  };
}
