import { EmpresaEntity } from "./EmpresaEntity";
import { PrismaClientValidationError } from "@prisma/client/runtime";
import { prismaClient } from "../database/prismaClient";
import { UsuarioProps } from "./../types/index";
import { CargoEntity } from "./CargoEntity";

export class UsuarioEntity {
  createOne = async (data: UsuarioProps) => {
    return new Promise(async (resolve, reject) => {
      const empresaEntity = new EmpresaEntity();
      if (!(await empresaEntity.findOne(data.id_empresa))) {
        reject("NOT_EMPRESA");
      }
      const cargoEntity = new CargoEntity();
      if (!(await cargoEntity.findOne(data.id_cargo))) {
        reject("NOT_CARGO");
      }
      if (
        data.nome === "" ||
        data.email === "" ||
        data.senha === "" ||
        data.telefone === "" ||
        data.id_cargo === null ||
        data.id_empresa === null
      ) {
        reject("CAMPO_VAZIO");
      }

      resolve(
        await prismaClient.usuario.create({
          data,
        })
      );
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
    const usuario = await prismaClient.usuario.findUnique({
      where: { id },
    });

    if (!usuario) {
      throw new PrismaClientValidationError();
    }

    return usuario;
  };

  updateOne = async (id: number, data: UsuarioProps) => {
    if (!(await this.findOne(id))) {
      throw new PrismaClientValidationError();
    }

    return await prismaClient.usuario.update({
      where: { id },
      data,
    });
  };

  deleteOne = async (id: number) => {
    if (!(await this.findOne(id))) {
      throw new PrismaClientValidationError();
    }

    return await prismaClient.usuario.delete({
      where: { id },
    });
  };
}
