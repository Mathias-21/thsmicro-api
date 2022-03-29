import { prismaClient } from "../database/prismaClient";
import { EmpresaEntity } from "./EmpresaEntity";

export class CargoEntity {
  createOne = async (descricao: string, id_empresa: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        const empresaEntity = new EmpresaEntity();
        const empresa = await empresaEntity.findOne(id_empresa);

        if (!empresa) {
          reject("EMPRESA_NOT_FOUND");
        } else if (descricao === "" || id_empresa === null) {
          reject("CAMPO_VAZIO");
        } else {
          resolve(
            await prismaClient.cargo.create({
              data: { descricao, id_empresa },
            })
          );
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  findAll = async () => {
    return await prismaClient.cargo.findMany({
      include: {
        empresa: true,
      },
    });
  };

  findOne = async (id: number) => {
    return new Promise(async (resolve, reject) => {
      const cargo = await prismaClient.cargo.findUnique({
        where: { id },
        include: {
          empresa: true,
        },
      });

      if (!cargo) {
        reject("CARGO_NOT_FOUND");
      } else {
        resolve(cargo);
      }
    });
  };

  findEmpresa = async (id: number) => {
    return new Promise(async (resolve, reject) => {
      const hasEmpresa = await prismaClient.cargo.findMany({
        where: { id_empresa: id },
      });

      if (hasEmpresa) {
        resolve("EMPRESA_FOUND");
      } else {
        resolve("EMPRESA_NOT_FOUND");
      }
    });
  };

  updateOne = async (id: number, descricao: string) => {
    return new Promise(async (resolve, reject) => {
      const cargo = await prismaClient.cargo.findUnique({
        where: { id },
      });

      if (!cargo) {
        reject("CARGO_NOT_FOUND");
      } else {
        resolve(
          await prismaClient.cargo.update({
            where: { id },
            data: { descricao },
          })
        );
      }
    });
  };

  deleteOne = async (id: number) => {
    return new Promise(async (resolve, reject) => {
      const cargo = await prismaClient.cargo.findUnique({
        where: { id },
      });

      if (!cargo) {
        reject("CARGO_NOT_FOUND");
      } else {
        resolve(
          await prismaClient.cargo.delete({
            where: { id },
          })
        );
      }
    });
  };
}
