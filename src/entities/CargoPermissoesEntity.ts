import { PrismaClientValidationError } from "@prisma/client/runtime";
import { CargoPermissoesProps } from "./../types/index";
import { prismaClient } from "../database/prismaClient";
import { PermissaoEntity } from "./PermissaoEntity";
import { CargoEntity } from "./CargoEntity";

export class CargoPermissoesEntity {
  createOne = async (data: CargoPermissoesProps) => {
    return new Promise(async (resolve, reject) => {
      try {
        const cargoEntity = new CargoEntity();
        const permissaoEntity = new PermissaoEntity();

        const cargo = await cargoEntity.findOne(data.id_cargo);
        const permissao = await permissaoEntity.findOne(data.id_permissao);

        if (data.id_cargo === null || data.id_permissao === null) {
          reject("CAMPO_VAZIO");
        } else if (!cargo) {
          reject("CARGO_NOT_FOUND");
        } else if (!permissao) {
          reject("PERMISSAO_NOT_FOUND");
        } else {
          resolve(
            await prismaClient.cargoPermissoes.create({
              data,
            })
          );
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  findAll = async () => {
    return await prismaClient.cargoPermissoes.findMany({
      include: {
        cargo: {
          include: {
            empresa: true,
          },
        },
        permissao: true,
      },
    });
  };

  findOne = async (id: number) => {
    return new Promise(async (resolve, reject) => {
      const cargoPermissoes = await prismaClient.cargoPermissoes.findUnique({
        where: { id },
        include: {
          cargo: {
            include: {
              empresa: true,
            },
          },
          permissao: true,
        },
      });

      if (!cargoPermissoes) {
        reject("CARGO_PERMISSOES_NOT_FOUND");
      }

      resolve(cargoPermissoes);
    });
  };

  updateOne = async (id: number, data: CargoPermissoesProps) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!(await this.findOne(id))) {
          reject("CARGO_PERMISSOES_NOT_FOUND");
        }

        resolve(
          await prismaClient.cargoPermissoes.update({
            where: { id },
            data: data,
          })
        );
      } catch (error) {
        reject(error);
      }
    });
  };

  deleteOne = async (id: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!(await this.findOne(id))) {
          reject("CARGO_PERMISSOES_NOT_FOUND");
        }

        resolve(
          await prismaClient.cargoPermissoes.delete({
            where: { id },
          })
        );
      } catch (error) {
        reject(error);
      }
    });
  };
}
