import { prismaClient } from "../database/prismaClient";
import { ProdutoProps } from "../types";
import { EmpresaEntity } from "./EmpresaEntity";

export class ProdutoEntity {
  createOne = async (data: ProdutoProps) => {
    return new Promise(async (resolve, reject) => {
      try {
        const empresaEntity = new EmpresaEntity();
        const empresa = await empresaEntity.findOne(data.id_empresa);
        if (data.id_empresa === null || data.nome === "" || data.preco === 0) {
          reject("CAMPO_VAZIO");
        } else if (!empresa) {
          reject("EMPRESA_NOT_FOUND");
        } else {
          resolve(await prismaClient.produto.create({ data }));
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  findAll = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const produto = await prismaClient.produto.findMany({
          include: {
            empresa: true,
          },
        });

        resolve(produto);
      } catch (error) {
        reject(error);
      }
    });
  };

  findOne = async (id: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        const produto = await prismaClient.produto.findUnique({
          where: {
            id,
          },
          include: {
            empresa: true,
          },
        });

        if (!produto) {
          reject("PRODUTO_NOT_FOUND");
        } else {
          resolve(produto);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  updateOne = async (id: number, data: ProdutoProps) => {
    return new Promise(async (resolve, reject) => {
      try {
        const empresaEntity = new EmpresaEntity();
        const empresa = await empresaEntity.findOne(data.id_empresa);

        if (!(await this.findOne(id))) {
          reject("PRODUTO_NOT_FOUND");
        } else if (!empresa) {
          reject("EMPRESA_NOT_FOUND");
        } else {
          resolve(
            await prismaClient.produto.update({
              data,
              where: {
                id,
              },
            })
          );
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  deleteOne = async (id: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!(await this.findOne(id))) {
          reject("PRODUTO_NOT_FOUND");
        } else {
          resolve(
            await prismaClient.produto.delete({
              where: {
                id,
              },
            })
          );
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  findPreco = async (id: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        const produto = await prismaClient.produto.findUnique({
          where: {
            id: id,
          },
          select: {
            preco: true,
          },
        });

        const preco = Number(produto?.preco);

        resolve(preco);
      } catch (error) {
        reject(error);
      }
    });
  };
}
