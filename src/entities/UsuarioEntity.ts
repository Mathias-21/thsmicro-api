import { EmpresaEntity } from "./EmpresaEntity";
import { PrismaClientValidationError } from "@prisma/client/runtime";
import { prismaClient } from "../database/prismaClient";
import { UsuarioProps } from "./../types/index";
import { CargoEntity } from "./CargoEntity";

export class UsuarioEntity {
  createOne = (data: UsuarioProps) => {
    return new Promise(async (resolve, reject) => {
      try {
        const empresaEntity = new EmpresaEntity();
        const cargoEntity = new CargoEntity();

        if (!(await empresaEntity.findOne(data.id_empresa))) {
          reject("EMPRESA_NOT_FOUND");
        } else if (!(await cargoEntity.findOne(data.id_cargo))) {
          reject("CARGO_NOT_FOUND");
        } else if (
          data.nome === "" ||
          data.email === "" ||
          data.senha === "" ||
          data.telefone === "" ||
          data.id_cargo === null ||
          data.id_empresa === null
        ) {
          reject("CAMPO_VAZIO");
        } else {
          resolve(
            await prismaClient.usuario.create({
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
    return await prismaClient.usuario.findMany({
      include: {
        empresa: true,
        cargo: {
          include: {
            CargoPermissoes: {
              include: {
                permissao: true,
              },
            },
          },
        },
      },
    });
  };

  findOne = async (id: number) => {
    return new Promise(async (resolve, reject) => {
      const usuario = await prismaClient.usuario.findUnique({
        where: { id },
      });

      if (!usuario) {
        reject("USUARIO_NOT_FOUND");
      }

      resolve(usuario);
    });
  };

  updateOne = async (id: number, data: UsuarioProps) => {
    return new Promise(async (resolve, reject) => {
      const usuario = await prismaClient.usuario.findUnique({
        where: { id },
      });

      if (!usuario) {
        reject("USUARIO_NOT_FOUND");
      } else {
        resolve(
          await prismaClient.usuario.update({
            where: { id },
            data: data,
          })
        );
      }
    });
  };

  deleteOne = (id: number) => {
    return new Promise(async (resolve, reject) => {
      const usuario = await prismaClient.usuario.findUnique({
        where: { id },
      });

      if (usuario === null) {
        reject("USUARIO_NOT_FOUND");
      } else {
        resolve(
          await prismaClient.usuario.delete({
            where: { id },
          })
        );
      }
    });
  };
}
