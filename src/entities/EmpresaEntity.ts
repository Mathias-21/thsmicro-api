import { EmpresaProps } from "./../types/index";
import { prismaClient } from "../database/prismaClient";
import { CargoEntity } from "./CargoEntity";

export class EmpresaEntity {
  createOne = async (data: EmpresaProps) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (
          data.nome === "" ||
          data.email === "" ||
          data.telefone === "" ||
          data.endereco === "" ||
          data.is_ativo === undefined
        ) {
          reject("CAMPO_VAZIO");
        } else {
          resolve(
            await prismaClient.empresa.create({
              data: data,
            })
          );
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  findAll = async () => {
    return await prismaClient.empresa.findMany();
  };

  findOne = async (id: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        const empresa = await prismaClient.empresa.findUnique({
          where: { id },
        });

        if (!empresa) {
          reject("EMPRESA_NOT_FOUND");
        } else {
          resolve(empresa);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  updateOne = async (id: number, data: EmpresaProps) => {
    return new Promise(async (resolve, reject) => {
      try {
        const empresa = await prismaClient.empresa.findUnique({
          where: { id },
        });

        if (!empresa) {
          reject("EMPRESA_NOT_FOUND");
        } else {
          resolve(
            await prismaClient.empresa.update({
              where: { id },
              data: data,
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
        const empresa = await prismaClient.empresa.findUnique({
          where: { id },
        });

        const cargoEntity = new CargoEntity();
        const cargo = await cargoEntity.findEmpresa(id);

        if (cargo === "FOUND") {
          reject("EMPRESA_EM_USO");
        } else if (!empresa) {
          reject("EMPRESA_NOT_FOUND");
        } else {
          resolve(
            await prismaClient.empresa.delete({
              where: { id },
            })
          );
        }
      } catch (error) {
        reject(error);
      }
    });
  };
}
