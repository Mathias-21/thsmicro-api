import { EmpresaEntity } from "./EmpresaEntity";
import { prismaClient } from "../database/prismaClient";
import { ClienteProps } from "../types";

export class ClienteEntity {
  createOne = async (data: ClienteProps) => {
    return new Promise(async (resolve, reject) => {
      try {
        const empresaEntity = new EmpresaEntity();
        const empresa = await empresaEntity.findOne(data.id_empresa);
        if (
          data.id_empresa === null ||
          data.nome === "" ||
          data.email === "" ||
          data.telefone === "" ||
          data.endereco === ""
        ) {
          reject("CAMPO_VAZIO");
        } else if (!empresa) {
          reject("EMPRESA_NOT_FOUND");
        } else {
          resolve(await prismaClient.cliente.create({ data }));
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  findAll = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const cliente = await prismaClient.cliente.findMany({
          include: {
            empresa: true,
          },
        });

        resolve(cliente);
      } catch (error) {
        reject(error);
      }
    });
  };

  findOne = async (id: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        const cliente = await prismaClient.cliente.findUnique({
          where: {
            id,
          },
          include: {
            empresa: true,
          },
        });

        if (!cliente) {
          reject("CLIENTE_NOT_FOUND");
        } else {
          resolve(cliente);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  updateOne = async (id: number, data: ClienteProps) => {
    return new Promise(async (resolve, reject) => {
      try {
        const empresaEntity = new EmpresaEntity();
        const empresa = await empresaEntity.findOne(data.id_empresa);

        if (!(await this.findOne(id))) {
          reject("CLIENTE_NOT_FOUND");
        } else if (!empresa) {
          reject("EMPRESA_NOT_FOUND");
        } else if (
          data.id_empresa === null ||
          data.nome === "" ||
          data.email === "" ||
          data.telefone === "" ||
          data.endereco === ""
        ) {
          reject("CAMPO_VAZIO");
        } else {
          resolve(
            await prismaClient.cliente.update({
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
        if (!(await this.findOne(id))) {
          reject("CLIENTE_NOT_FOUND");
        } else {
          resolve(
            await prismaClient.cliente.delete({
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
